import Select from './selector.js'

function salert(title, text, icon, buttons, callback) {
  swal({
    title,
    text,
    icon,
    buttons
  }).then(callback)
}

// GLOBAL VARS
const words = ['programming', 'computer', 'lecture', 'encyclopedia', 'booking']
let guessedWords = ['c', 'p']

let mistake = 0
const maxMistake = 6
let answer = ''
let randomWord = words[Math.floor(Math.random() * words.length)]

// SELECTORS
const keyboard = Select('.keyboard')
const inputs = Select('.inputs')

function win() {
  salert(
    'Congratulations',
    'You won',
    'success',
    { cancel: true, replay: true },
    answer => {
      if (answer) init()
    }
  )
}

function lose() {
  salert(
    'Sorry',
    'You lost',
    'error',
    { cancel: true, replay: true },
    answer => {
      if (answer) init()
    }
  )
}

function inputsHandler() {
  answer = ''
  randomWord.split('').map(letter => {
    answer += guessedWords.indexOf(letter) >= 0 ? letter : '_'
  })
  inputs.html(answer)
}

function buttonsGenerator() {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  let keyboardHTML = ''
  letters.split('').map(letter => {
    keyboardHTML += `<button class="btn">${letter}</button>`
  })

  keyboard.html(keyboardHTML)
}

function imageHandler() {
  Select('img').query().src = `${mistake + 1}.jpg`
}

function statusChecker() {
  if (mistake >= maxMistake) {
    cancel()
    setTimeout(lose, 500)
  }
  if (answer == randomWord) {
    cancel()
    setTimeout(win, 500)
  }
}

function letterChecker(letter) {
  if (guessedWords.indexOf(letter) >= 0) return

  if (randomWord.indexOf(letter) < 0) {
    mistake++
  }

  guessedWords.push(letter)
  inputsHandler()
}

function init() {
  guessedWords = []
  mistake = 0
  answer = ''
  randomWord = words[Math.floor(Math.random() * words.length)]
  Select('img').query().src = '1.jpg'
  inputsHandler()
  buttonsGenerator()
  Select('.mistake').text(`Mistake: ${mistake}`)

  Select('.btn')
    .queryAll()
    .all(btn => {
      btn.listen('click', buttonClicked)
    })
}

function cancel() {
  Select('.btn')
    .queryAll()
    .all(btn => {
      Select(btn.selector)
        .query()
        .setAttribute('disabled', true)
    })
}

function buttonClicked(e) {
  e.target.setAttribute('disabled', true)
  letterChecker(e.target.textContent)
  imageHandler()
  statusChecker()
  Select('.mistake').text(`Mistake: ${mistake}`)
  console.log(randomWord)
}

init()
