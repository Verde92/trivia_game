

const tvData      = require('./tv.json')
const filmData    = require('./film.json')
const scienceData = require('./science-nature.json')

const themes = {
  'Film'           : filmData,
  'Television'     : tvData,
  'Science/Nature' : scienceData
}

let currentData
let currentTheme = ''

function printLines() {
  console.log('                                                  ')
  console.log('--------------------------------------------------')
  console.log('                                                  ')
}

class Player {
  
  constructor(name, score=0) {
    this.name = name
    this.score = score
  }

  incrementScore() {
    this.score++
  }

}

class Round {
  
  constructor(player, roundNumber) {
    this.player = player
    this.roundNumber = roundNumber
    this.randomNumber = Math.floor(Math.random() * Math.floor(currentData.length))
    this.question = currentData[this.randomNumber].question
    this.answer = currentData[this.randomNumber].correct_answer
    this.incorrectAnswers = currentData[this.randomNumber].incorrect_answers.slice()
  }

  askQuestion() {
    const choices = ['a', 'b', 'c', 'd']
    console.log(`Round ${this.roundNumber}`)
    console.log(`${this.player.name}'s score: ${this.player.score}\n`)
    console.log(this.question)
    console.log(' ')

    const j = Math.floor(Math.random() * Math.floor(4))
    const answers = []

    for(let i=0; i<4; i++) {
      if(i==j) {
        answers.push(this.answer)
      } else {
        answers.push(this.incorrectAnswers.pop())
      }
    }

    answers.forEach((elem, i) => console.log(`${choices[i]}. ${elem}`))

    let a
    let answer

    while(1) {
      a = prompt('\n')
      if (choices.includes(a)) {
        answer = answers[choices.indexOf(a)]
        break
      } else {
        console.log('Invalid input. Please re-enter answer: ')
      }
    }

    if (answer === this.answer) {
      this.player.incrementScore()
      console.log('Correct!')
      prompt('Press enter to continue. ')
    } else {
      console.log('Incorrect.')
      prompt('Press enter to continue. ')
    }

  }

}

function themeSelect() {
  console.clear()
  console.log('Please select a theme from the following: ')
  for(theme in themes) {
    console.log(theme)
  }

  //Accept LowerCase Input
  let p = prompt('').toLowerCase()

  // for (let key in themes) { // changes to lowercase
  //   let newKey = key.toLowerCase();
  //   themes[newKey] = themes[key];
  // }
  
  const lowercaseKeys = Object.keys(themes).map(elem => elem.toLowerCase())

  if(lowercaseKeys.includes(p)) {
    const keys = Object.keys(themes)
    currentData = themes[keys[lowercaseKeys.indexOf(p)]]
    playGame()
  } else {
    console.log('Invalid input.')
    themeSelect()
  }

}

function playGame() {
  let round
  player1.score = 0

  for(let i=1; i<=5; i++){
    console.clear()
    round = new Round(player1, i)
    round.askQuestion()
  }

  console.clear()
  printLines()
  console.log(`After 5 rounds, your score is: ${player1.score}`)

  playAgain()
}

function playAgain() {
  const options = ['y', 'n']
  printLines()
  console.log('Play again? y/n')
  const p = prompt('')

  if(options.includes(p)) {
    if (p === 'y') {
    delete themes['film']; //removes exta lowercase categories
    delete themes['television'];
    delete themes['science/nature'];
      themeSelect()
    } else {
      console.log('Exit.')
    }
  } else {
    console.log('Invalid input.')
    playAgain()
  }
}

// **********************************************************************

console.log( 'Game start!' )
printLines()
let username = prompt("What is your name?");
let player1 = new Player(username)
themeSelect()