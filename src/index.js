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
		this._letterButtonsMap = new Map()

		this._scaffoldContainer = document.createElement('div')
		this._scaffoldBalkBottomElement = document.createElement('div')
		this._scaffoldBalkMiddleElement = document.createElement('div')
		this._scaffoldBalkTopElement = document.createElement('div')
		this._scaffoldRopeElement = document.createElement('img')
		this._scaffoldManAliveElement = document.createElement('img')
		this._scaffoldManDeadElement = document.createElement('img')
		this._scaffoldGPTElement = document.createElement('span')

		this._gameContainer = document.querySelector('.game')
		this._questionElement = document.createElement('p')
		this._answerElement = document.createElement('p')
		this._livesContainerElement = document.createElement('div')
		this._livesHintElement = document.createElement('p')
		this._livesNumberElement = document.createElement('span')
		this._keyboardElement = document.createElement('div')
		this._resultElement = document.createElement('span')
		this._restartBtnElement = document.createElement('button')

		this.addGameHandlers()
		this.initGame()
	}

	addGameHandlers() {
		const handleKeyButton = e => {
			if (e.target.classList.contains('keyboard__letter')) {
				this.guessLetter(e.target.textContent)
			}
		}

		const handleRestartButton = e => {
			this.initGame()
		}

		this._keyboardElement.addEventListener('click', handleKeyButton)
		this._restartBtnElement.addEventListener('click', handleRestartButton)

		document.addEventListener('keydown', e => {
			this.guessLetter(e.key)
		})
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

	renderNewGame() {
		this._gameContainer.innerHTML = ''
		this._keyboardElement.innerHTML = ''
		this._letterButtonsMap.clear()

		this._scaffoldContainer.classList.add('scaffold')
		this._scaffoldBalkBottomElement.classList.add(
			'scaffold__balk',
			'scaffold__balk_bottom'
		)
		this._scaffoldBalkMiddleElement.classList.add(
			'scaffold__balk',
			'scaffold__balk_middle'
		)
		this._scaffoldBalkTopElement.classList.add(
			'scaffold__balk',
			'scaffold__balk_top'
		)
		this._scaffoldRopeElement.classList.add('scaffold__rope')
		this._scaffoldRopeElement.src = '/src/assets/icons/rope.svg'
		this._scaffoldManAliveElement.classList.add('scaffold__hangman')
		this._scaffoldManAliveElement.src = '/src/assets/icons/vasia-alive.svg'
		this._scaffoldGPTElement.classList.add('scaffold__gpt')
		this._scaffoldGPTElement.textContent = `GPT`
		this._scaffoldContainer.append(
			this._scaffoldBalkBottomElement,
			this._scaffoldBalkMiddleElement,
			this._scaffoldBalkTopElement,
			this._scaffoldRopeElement,
			this._scaffoldManAliveElement,
			this._scaffoldGPTElement
		)

		this._questionElement.classList.add('game__question')
		this._questionElement.textContent = `${this._currentQuestion}`

		this._answerElement.classList.add('game__answer')
		this._answerElement.textContent = `${this._displayAnswer.join(' ')}`

		this._livesContainerElement.classList.add('game__lives')
		this._livesHintElement.classList.add('hint')
		this._livesHintElement.textContent = 'Осталось попыток:'
		this._livesNumberElement.classList.add('number')
		this._livesNumberElement.textContent = `${this._lives}`
		this._livesContainerElement.append(
			this._livesHintElement,
			this._livesNumberElement
		)

		this._keyboardElement.classList.add('keyboard')
		this._alphabet.split('').forEach(letter => {
			const keyElement = document.createElement('button')
			keyElement.classList.add('keyboard__letter')
			keyElement.textContent = letter.toUpperCase()

			this._letterButtonsMap.set(letter, keyElement)

			this._keyboardElement.appendChild(keyElement)
		})

		this._gameContainer.append(
			this._questionElement,
			this._answerElement,
			this._keyboardElement,
			this._livesContainerElement,
			this._scaffoldContainer
		)
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

		const currentLetterElement = this._letterButtonsMap.get(letter)

		const isCorrect = this._currentAnswer.includes(letter)

		if (!isCorrect) {
			this._lives--
			currentLetterElement.classList.add('keyboard__letter_red')
		} else {
			this._currentAnswer.split('').forEach((char, index) => {
				if (char === letter) {
					this._displayAnswer[index] = letter
					currentLetterElement.classList.add('keyboard__letter_green')
				}
			})
		}

		this.checkGameStatus()
		this.updateState()
	}

	checkGameStatus() {
		if (!this._displayAnswer.includes('_')) {
			this._gameContainer.innerHTML = ''

			this._resultElement.className = ''
			this._resultElement.classList.add('game__result', 'game__result_win')
			this._resultElement.textContent = 'WIN!'

			this._gameContainer.appendChild(this._resultElement)
			this.renderRestartBtn()
		}

		if (this._lives <= 0) {
			this._gameContainer.innerHTML = ''

			this._resultElement.className = ''
			this._resultElement.classList.add('game__result', 'game__result_lose')
			this._resultElement.textContent = 'GAME OVER.'

			this._gameContainer.appendChild(this._resultElement)
			this.renderRestartBtn()
		}
	}

	renderRestartBtn() {
		this._restartBtnElement.classList.add('btn', 'btn_restart')
		this._restartBtnElement.textContent = 'Сыграть еще'
		this._gameContainer.appendChild(this._restartBtnElement)
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
