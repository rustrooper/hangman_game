class Hangman {
	constructor() {
		this._questions = [
			{ id: 1, question: 'Всё в javascript - это?', answer: 'объект' },
			{
				id: 2,
				question: 'Вёрстка, где элементы подстраиваются под размер экрана?',
				answer: 'адаптивная',
			},
			{
				id: 3,
				question: 'Готовый блок кода для повторного использования',
				answer: 'компонент',
			},
			{
				id: 4,
				question: 'Инструмент для проверки кода на ошибки',
				answer: 'линтер',
			},
			{
				id: 5,
				question:
					'Технология, которая позволяет обновлять часть страницы без перезагрузки',
				answer: 'асинхронный запрос',
			},
			{
				id: 6,
				question:
					'Специальные правила для адаптации сайта под мобильные устройства',
				answer: 'медиа запросы',
			},
			{
				id: 7,
				question:
					'Функция, которая передаётся другой функции для вызова позже.',
				answer: 'колбэк',
			},
			{
				id: 8,
				question: 'Эффект при наведении',
				answer: 'ховер',
			},
		]
		this._alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя'
		this._lives = 5
		this._guessedLetters = []
		this._currentQuestion = ''
		this._currentAnswer = ''
		this._displayAnswer = []
		this._letterButtonsMap = new Map()
		this._solvedQuestionsIDs = new Set()
		this._unsolvedQuestions = []
		this._randomIndex

		this._scaffoldContainer = document.createElement('div')
		this._scaffoldBalkBottomElement = document.createElement('div')
		this._scaffoldBalkMiddleElement = document.createElement('div')
		this._scaffoldBalkTopElement = document.createElement('div')
		this._scaffoldRopeElement = document.createElement('img')
		this._scaffoldManAliveElement = document.createElement('img')
		this._scaffoldManDeadElement = document.createElement('img')
		this._scaffoldGPTElement = document.createElement('span')

		this._gameContainer = document.querySelector('.game')
		this._gameWrapperElement = document.createElement('div')
		this._questionElement = document.createElement('p')
		this._answerElement = document.createElement('p')
		this._livesContainerElement = document.createElement('div')
		this._livesHintElement = document.createElement('p')
		this._livesNumberElement = document.createElement('span')
		this._keyboardElement = document.createElement('div')
		this._resultElement = document.createElement('span')
		this._restartBtnElement = document.createElement('button')
		this._resetBtnElement = document.createElement('button')
		this._finishedGameTextElement = document.createElement('span')

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

		const handleResetGameButton = e => {
			localStorage.removeItem('solvedQuestionsIDs')
			this.initGame()
		}

		this._keyboardElement.addEventListener('click', handleKeyButton)
		this._restartBtnElement.addEventListener('click', handleRestartButton)
		this._resetBtnElement.addEventListener('click', handleResetGameButton)

		document.addEventListener('keydown', e => {
			this.guessLetter(e.key)
		})
	}

	renderFinishedGame() {
		this._gameContainer.innerHTML = ''
		this._gameWrapperElement.innerHTML = ''

		this._finishedGameTextElement.classList.add('game__result')
		this._finishedGameTextElement.textContent =
			'Поздравляю! Вы отгадали все вопросы!'
		this._resetBtnElement.classList.add('btn', 'btn_reset')
		this._resetBtnElement.textContent = 'Начать заново'

		this._gameContainer.append(
			this._finishedGameTextElement,
			this._resetBtnElement
		)
	}

	initGame() {
		this._solvedQuestionsIDs = new Set(
			JSON.parse(localStorage.getItem('solvedQuestionsIDs') || '[]')
		)
		this._unsolvedQuestions = this._questions.filter(
			question => !this._solvedQuestionsIDs.has(question.id)
		)

		if (!this._unsolvedQuestions?.length) {
			this.renderFinishedGame()
			return
		}

		this._randomIndex = Math.floor(
			Math.random() * this._unsolvedQuestions.length
		)

		this._currentQuestion = this._unsolvedQuestions[this._randomIndex].question
		this._currentAnswer =
			this._unsolvedQuestions[this._randomIndex].answer.toLowerCase()

		this._displayAnswer = this._currentAnswer
			.split('')
			.map(char => (char === ' ' ? ' ' : '_'))

		this._guessedLetters = []
		this._lives = 5

		this.renderNewGame()
	}

	renderNewGame() {
		this._gameContainer.innerHTML = ''
		this._gameWrapperElement.innerHTML = ''
		this._keyboardElement.innerHTML = ''
		this._letterButtonsMap.clear()
		this._scaffoldContainer.querySelectorAll('.open').forEach(child => {
			child.classList.remove('open')
		})

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
		this._scaffoldManAliveElement.classList.add('scaffold__man')
		this._scaffoldManAliveElement.src = '/src/assets/icons/vasia-alive.svg'
		this._scaffoldManDeadElement.classList.add('scaffold__man')
		this._scaffoldManDeadElement.src = '/src/assets/icons/vasia-dead.svg'
		this._scaffoldGPTElement.classList.add('scaffold__gpt')
		this._scaffoldGPTElement.textContent = `GPT`
		this._scaffoldContainer.append(
			this._scaffoldBalkBottomElement,
			this._scaffoldBalkMiddleElement,
			this._scaffoldBalkTopElement,
			this._scaffoldRopeElement,
			this._scaffoldManAliveElement,
			this._scaffoldManDeadElement,
			this._scaffoldGPTElement
		)

		this._questionElement.classList.add('game__question')
		this._questionElement.textContent = `${this._currentQuestion}`

		this._answerElement.classList.add('game__answer')
		this._answerElement.textContent = `${this._displayAnswer.join('')}`

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

		this._gameWrapperElement.classList.add('game__wrapper')
		this._gameWrapperElement.append(
			this._questionElement,
			this._answerElement,
			this._keyboardElement,
			this._livesContainerElement
		)

		this._gameContainer.append(
			this._gameWrapperElement,
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
			this._gameWrapperElement.innerHTML = ''

			this._solvedQuestionsIDs.add(
				this._unsolvedQuestions[this._randomIndex].id
			)
			localStorage.setItem(
				'solvedQuestionsIDs',
				JSON.stringify(Array.from(this._solvedQuestionsIDs))
			)

			this._resultElement.className = ''
			this._resultElement.classList.add('game__result', 'game__result_win')
			this._resultElement.textContent = 'WIN!'

			this._gameWrapperElement.appendChild(this._resultElement)
			this.renderRestartBtn()
		}

		if (this._lives <= 0) {
			this._gameWrapperElement.innerHTML = ''

			this._resultElement.className = ''
			this._resultElement.classList.add('game__result', 'game__result_lose')
			this._resultElement.textContent = 'GAME OVER.'

			this._gameWrapperElement.appendChild(this._resultElement)
			this.renderRestartBtn()
		}
	}

	renderRestartBtn() {
		this._restartBtnElement.classList.add('btn', 'btn_restart')
		this._restartBtnElement.textContent = 'Сыграть еще'
		this._gameWrapperElement.appendChild(this._restartBtnElement)
	}

	updateState() {
		this._livesNumberElement.textContent = `${this._lives}`
		this._answerElement.textContent = `${this._displayAnswer.join('')}`
		switch (this._lives) {
			case 4:
				this._scaffoldBalkBottomElement.classList.add('open')
				break
			case 3:
				this._scaffoldBalkMiddleElement.classList.add('open')
				break
			case 2:
				this._scaffoldBalkTopElement.classList.add('open')
				break
			case 1:
				this._scaffoldRopeElement.classList.add('open')
				this._scaffoldManAliveElement.classList.add('open')
				this._scaffoldGPTElement.classList.add('open')
				break
			case 0:
				this._scaffoldManAliveElement.classList.remove('open')
				this._scaffoldGPTElement.classList.remove('open')
				this._scaffoldManDeadElement.classList.add('open')
				break
		}
	}
}

const btnStartGame = document.querySelector('.btn_start-game')

btnStartGame.addEventListener('click', () => {
	new Hangman()
})
