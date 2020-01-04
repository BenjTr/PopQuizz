const app = require('./app')
const debug = require('debug')('node-angular')
const http = require('http')
var databaseServices = require('./services/databaseService.js')

const normalizePort = val => {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

const onError = error => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port
  debug('Listening on ' + bind)
}

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

// IO Socket API

const server = http.Server(app)
const io = require('socket.io')(server)

let connectUsers = 0
let time = Infinity
let round = 1
let questions = []
let currIndex = 0
let status = 'sleep'

const players = new Map()

io.on('connection', socket => {
  io.emit('new-connection')
})

io.on('new-player', res => {
  if (players.get(res.pseudo) === undefined) {
    players.set(res.pseudo, {
      pseudo: res.pseudo,
      score: 0,
      found: false
    })

    sendPlayers()

    if (status === 'spleep') {
      gameStart()
    }
  }
})

io.on('disconnect', () => {
  connectUsers--
  console.log('User disconnected ' + connectUsers)
})

async function gameStart () {
  if (players.size >= 2) {
    time = 30
    round = 1
    status = 'start'

    sendStatus()

    const timeClock = setInterval(function timeInterval () {
      sendTime()
      time--
      if (time === -1) {
        clearInterval(timeClock)
        game()
      }
    }, 1000)

    const selectedIds = []
    const ids = await databaseServices.getAllIdOfQuestions()
    for (let i = 0; i < 10; i++) {
      const index = Math.floor(Math.random() * Math.floor(ids.length))
      selectedIds.push(ids[index].question_id)
      ids.splice(index, 1)
    }
    console.log(selectedIds)

    questions = await databaseServices.getQuestions(selectedIds)
    for (const question of questions) {
      console.log(question)
      console.log(question.data)
    }
  }
}

function game () {
  // Get Datas

  status = 'game'
  sendStatus()

  questionEngine()
}

function questionEngine () {
  if (round <= 10) {
    sendRound()
    sendQuestion()
    time = 15
    const timeClockQuestion = setInterval(function timeInterval () {
      sendTime()
      time--
      if (time === -1) {
        clearInterval(timeClockQuestion)

        time = 5
        sendAnswer()
        const timeClockAnswer = setInterval(function timeInterval () {
          sendTime()
          time--
          if (time === -1) {
            clearInterval(timeClockAnswer)
            round++
            questionEngine()
          }
        }, 1000)
      }
    }, 1000)
  }
}

function sendTime () {
  if (time === Infinity) {
    return 1
  }
  io.emit('time', { time: time })
}

function sendRound () {
  io.emit('round', { round: round })
}

function sendStatus () {
  io.emit('status', { status: status })
}

function sendQuestion () {
  currIndex = Math.floor(Math.random() * Math.floor(questions.length))
  const selectedQuestion = questions[currIndex]
  io.emit('question', {
    theme: selectedQuestion.theme,
    is_picture: selectedQuestion.is_picture,
    data: selectedQuestion.data
  })
}

function sendAnswer () {
  const selectedQuestion = questions[currIndex]
  io.emit('answer', { answer: selectedQuestion.response })
  questions.splice(currIndex, 1)
  currIndex = 0
}

function sendPlayers () {
  io.emit('players', { players: players })
}

// Node Server
server.on('error', onError)
server.on('listening', onListening)
server.listen(port)
