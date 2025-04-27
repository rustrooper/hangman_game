class Hangman {
	constructor() {
		this._questions = [
			{ qusetion: '', answer: '' },
			{ qusetion: '', answer: '' },
			{ qusetion: '', answer: '' },
			{ qusetion: '', answer: '' },
			{ qusetion: '', answer: '' },
		]
		this._lives = 5
		this._guessedLetters = []
		this._currentQuestion = ''
		this._currentAnswer = ''
		this._displayAnswer = []

		this.initGame()
	}

	initGame() {
		const randomIndex = Math.floor(Math.random() * this._questions.length)

		this._currentQuestion = this._questions[randomIndex].qusetion
		this._currentAnswer = this._questions[randomIndex].answer.toLowerCase()

		this._displayAnswer = this._currentAnswer
			.split('')
			.map(char => (char === ' ' ? ' ' : '_'))

		this._guessedLetters = []
		this._lives = 5

		this.render()
	}

	guessLetter(letter) {
		letter = letter.toLowerCase()

		if (this._guessedLetters.includes(letter)) {
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
		this.render()
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
}

const btnStartGame = document.querySelector('btn_start-game')

btnStartGame.addEventListener('click', () => {
	new Hangman()
})
