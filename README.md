# Install
Go into the project folder
Run in the command: ```npm install```

# Run
Run in the command: ```npm run start:server```



# PopQuizz [Current Version:  **0**]
**PopQuizz** is a web application. You can, on the web site, play on our real time game which is a kind of quizz based on the pop culture (It's why the name of the game is PopQuizz)

##### Start of the game
This game haven't got preconditions. You just have to be connected to the game 
##### Game Progress
Each 15 secondes will appear an image or a citation and a theme. With those informations, you have to discover where the image or the citation come from. The faster you are, the more points you get.
At the end of the 15 seconds the answer appear during 3 seconds and the game goes on.
##### End Game
The game is finished when a player reached the limit of point (Not already defined). In the case two players have the same score at the end, the winner is the player who have reached the score first.

# Project Design
### Page Design & Application Structure

To be clear we created a full mockup of the application on InVision Tool to have a base of what we want to do.
Thanks the solution we have for free cloud version of the InVision project result
Design Goal : [InVision Project]('https://projects.invisionapp.com/prototype/ck2ruzs70000hdb01i33fvn1c/play')

### Used Colors
| Name                     | Color       |
| ------------------------ |:-----------:|
| Main Color               | **#FF3366** |
| Main Background Color    | **#192229** |
| Second Background Color  | **#151D23** |
| Main Text Color          | **#FFFFFF** |
| Placeholder Color        | **#BDBDBD** |


# Project Version
### Design Versions
- **Version 0**
  - Login Page
  - Register Page
  - Confirmation Page
  - Home Page
  - User page
  - Password Page
  - Game Page (Without Chat)
- **Version 1**
  - Version 0
  - Game Page (With Chat)

- **Version 2**
  - Version 1
  - Add Image Page

### Features Versions
- **Version 0**
  - Create account
  - Login to the app
  - Modify your profile account
  - Join the game
  - The game can be join by 10 players in the same time
  - Type your answer to the quizz
  - You are rewarded with more points if you want the answer quickly(the amount of point is not yet defined)
  - See your score in live in the game 
  - See the score of others player in live in the game
  - Get the information when you find the right answer
  - Have the possibility to restart a game when the previous one is done
  - The questions asked can be text and images
  - Have a live Countdown for the remain time 
  - The front-end and back-end of the application are hosted in the same server
  - The ReadMe must update to use the version

- **Version 1**
  - All the features from Version 0
  - The game can be join by 30 players in the same time
  - You a forgot password case in the login page (with a mail or  a secret question)
  - In the end of each question, all players can see who was the first to find the answer
  - Have a chat who:
  - Write down the player who entered in the game
  - Write down the player who leaved the game
  - Possibility to write message and read them from other players

- **Version 2** 
  - All the features from Version 1 
  - Have a new page to create new question:
  - A form to fill with the input to create a question
  - You have to be log to create new question
  - The person who created the question have to be add with the question
