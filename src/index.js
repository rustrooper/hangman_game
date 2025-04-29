class Hangman {
	constructor() {
		this._questions = [
			{ question: 'Всё в javascript - это?', answer: 'объект' },
			// { question: '', answer: '' },
			// { question: '', answer: '' },
			// { question: '', answer: '' },
			// { question: '', answer: '' },
		]
		this._alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя'
		this._lives = 5
		this._guessedLetters = []
		this._currentQuestion = ''
		this._currentAnswer = ''
		this._displayAnswer = []

		this._gameContainer = document.querySelector('.game')
		this._questionElement = document.createElement('p')
		this._answerElement = document.createElement('p')
		this._livesContainerElement = document.createElement('div')
		this._livesHintElement = document.createElement('p')
		this._livesNumberElement = document.createElement('span')
		this._keyboardElement = document.createElement('div')

		this.initGame()
	}

	initGame() {
		const randomIndex = Math.floor(Math.random() * this._questions.length)

		this._currentQuestion = this._questions[randomIndex].question
		this._currentAnswer = this._questions[randomIndex].answer.toLowerCase()

		this._displayAnswer = this._currentAnswer
			.split('')
			.map(char => (char === ' ' ? ' ' : '_'))

		this._guessedLetters = []
		this._lives = 5

		this.renderNewGame()
	}

	guessLetter(letter) {
		letter = letter.toLowerCase()

		if (
			this._guessedLetters.includes(letter) ||
			!this._alphabet.includes(letter)
		) {
			return
		}

		this._guessedLetters.push(letter)

		const isCorrect = this._currentAnswer.includes(letter)

		if (!isCorrect) {
			this._lives--
		} else {
			this._currentAnswer.split('').forEach((char, index) => {
				if (char === letter) {
					this._displayAnswer[index] = letter
				}
			})
		}
		this.checkGameStatus()
		// this.render()
		this.updateState()
	}

	checkGameStatus() {
		if (!this._displayAnswer.includes('_')) {
			// Удалить все элементы контейнера?
			// Добавить рендер кнопки, на которую повесить функцию начала новой игры
			return
		}

		if (this._lives <= 0) {
			// Удалить все элементы контейнера?
			// Добавить рендер кнопки, на которую повесить функцию начала новой игры
			return
		}
	}

	renderNewGame() {
		this._gameContainer.innerHTML = ''

		this._questionElement.classList.add('game__question')
		this._questionElement.textContent = `${this._currentQuestion}`

		this._answerElement.classList.add('game__answer')
		this._answerElement.textContent = `${this._displayAnswer.join(' ')}`

		this._livesContainerElement.classList.add('game__lives')
		this._livesHintElement.classList.add('hint')
		this._livesHintElement.textContent = 'Осталось попыток:'
		this._livesNumberElement.classList.add('number')
		this._livesNumberElement.textContent = `${this._lives}`
		this._livesContainerElement.append(this._livesHintElement)
		this._livesContainerElement.append(this._livesNumberElement)

		this._keyboardElement.classList.add('keyboard')
		this._alphabet.split('').forEach(letter => {
			const keyElement = document.createElement('button')
			keyElement.classList.add('keyboard__letter')
			keyElement.textContent = letter.toUpperCase()

			keyElement.addEventListener('click', e => {
				this.guessLetter(keyElement.textContent)
			})

			this._keyboardElement.appendChild(keyElement)
		})

		document.addEventListener('keydown', e => {
			this.guessLetter(e.key)
		})

		this._gameContainer.appendChild(this._questionElement)
		this._gameContainer.appendChild(this._answerElement)
		this._gameContainer.appendChild(this._keyboardElement)
		this._gameContainer.appendChild(this._livesContainerElement)
	}

	updateState() {
		this._livesNumberElement.textContent = `${this._lives}`
		this._answerElement.textContent = `${this._displayAnswer.join(' ')}`
	}
}

const btnStartGame = document.querySelector('.btn_start-game')

btnStartGame.addEventListener('click', () => {
	new Hangman()
})
