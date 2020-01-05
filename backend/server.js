const app = require('./app')
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
  console.log('Listening on ' + bind)
}

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

// =========================================================================================
// -------------------------------     IO Socket API     -----------------------------------
// =========================================================================================

const server = http.Server(app)
const io = require('socket.io')(server)

let time = Infinity
let round = 1
let questions = []
let currIndex = 0
let foundCounter = 0
let status = 'sleep'

const players = new Map()

io.on('connection', socket => {
  socket.on('new-player', res => {
    addPlayer(res.pseudo)
    socket.emit('status', { status: status })
  })

  socket.on('user-answer', res => {
    if (!players.get(res.pseudo).found) {
      if (checkAnswer(res.answer)) {
        socket.emit('found')

        foundCounter++
        players.get(res.pseudo).found = true
        players.get(res.pseudo).score += getScore()
        sendPlayersData()
      } else {
        socket.emit('fail')
      }
    }
  })

  socket.on('active', res => {
    players.get(res.pseudo).active = true
  })
})

function addPlayer (pseudo) {
  if (players.get(pseudo) === undefined) {
    players.set(pseudo, {
      pseudo: pseudo,
      score: 0,
      found: false,
      active: true
    })

    if (status === 'sleep') {
      gameStart()
    }
  }
  sendPlayersData()
}

function checkAnswer (answer) {
  if (status !== 'question') { return false }

  const realAnswer = questions[currIndex].response.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  const userAnswer = answer.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  return realAnswer === userAnswer
}

function getScore () {
  let score = 0
  const timeBonusPoint = Math.floor(time / 2)

  switch (foundCounter) {
    case 1:
      score = 10
      break
    case 2:
      score = 7
      break
    case 3:
      score = 5
      break
    case 4:
      score = 3
      break
    case 5:
    case 6:
      score = 2
      break
    default:
      score = 1
      break
  }
  score += timeBonusPoint
  return score
}

function gameStart () {
  if (players.size >= 2) {
    time = 30
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

    selectQuestions()
  }
}

async function selectQuestions () {
  const selectedIds = []
  const ids = await databaseServices.getAllIdOfQuestions()
  for (let i = 0; i < 10; i++) {
    const index = Math.floor(Math.random() * Math.floor(ids.length))
    selectedIds.push(ids[index].question_id)
    ids.splice(index, 1)
  }

  questions = await databaseServices.getQuestions(selectedIds)
}

function game () {
  round = 1
  foundCounter = 0
  resetScore()

  for (const key of players.keys()) {
    if (!players.get(key).active) {
      players.delete(key)
    } else {
      players.get(key).active = false
    }
  }
  sendPlayersData()
  questionEngine()
}

function questionEngine () {
  if (round <= 10) {
    status = 'question'
    sendStatus()
    sendRound()
    sendQuestion()
    time = 15
    const timeClockQuestion = setInterval(function timeInterval () {
      sendTime()
      time--
      if (time === -1) {
        clearInterval(timeClockQuestion)

        time = 5
        status = 'answer'
        sendStatus()
        sendAnswer()
        resetBeforeRound()
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
  } else {
    gameEnd()
  }
}

function resetBeforeRound () {
  foundCounter = 0
  for (const key of players.keys()) {
    players.get(key).found = false
  }
  sendPlayersData()
}

function gameEnd () {
  questions = []
  selectQuestions()

  sendPlayersData()
  for (const key of players.keys()) {
    players.get(key).active = false
  }

  status = 'end'
  sendStatus()

  time = 20
  const timeClock = setInterval(function timeInterval () {
    sendTime()
    time--
    if (time === -1) {
      clearInterval(timeClock)
      if (players.size >= 2) {
        game()
      } else {
        setSleep()
      }
    }
  }, 1000)
}

function setSleep () {
  status = 'sleep'
  sendStatus()

  time = Infinity
  round = 1
  questions = []
  currIndex = 0
  foundCounter = 0

  for (const key of players.keys()) {
    players.delete(key)
  }
}

function resetScore () {
  for (const key of players.keys()) {
    players.get(key).score = 0
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

function sendPlayersData () {
  io.emit('players', { players: [...players.values()] })
}

// Node Server
server.on('error', onError)
server.on('listening', onListening)
server.listen(port)
