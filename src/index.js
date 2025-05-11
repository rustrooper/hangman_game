class Hangman {
	constructor(questions, alphabet, initialLives) {
		this.initConsts(questions, alphabet, initialLives)
		this.initDOMElements()
		this.initGameHandlers()
		this.renderStartMenu()
	}

	initConsts(questions, alphabet, initialLives) {
		this._questions = questions
		this._alphabet = alphabet
		this._initialLives = initialLives

		this._guessedLetters = new Set()
		this._currentQuestion
		this._currentAnswer
		this._displayAnswer
		this._letterButtonsMap = new Map()
		this._solvedQuestionsIDs
		this._unsolvedQuestions
		this._currentLives
		this._randomIndex
	}

	initDOMElements() {
		this._gameMenu = this.createDOMElement('div', {
			class: 'game__menu',
		})

		this._squareTopLeftElem = this.createDOMElement('span', {
			class: 'square square_top-left',
		})

		this._squareTopRightElem = this.createDOMElement('span', {
			class: 'square square_top-right',
		})

		this._squareBottomLeftElem = this.createDOMElement('span', {
			class: 'square square_bottom-left',
		})

		this._squareBottomRightElem = this.createDOMElement('span', {
			class: 'square square_bottom-right',
		})

		this._gameTitleElem = this.createDOMElement(
			'h1',
			{
				class: 'game__title',
			},
			'IT виселица'
		)

		this._startBtnElem = this.createDOMElement(
			'button',
			{
				class: 'btn btn_start-game',
			},
			'Новая игра'
		)

		this._scaffoldContainer = this.createDOMElement('div', {
			class: 'scaffold',
		})

		this._scaffoldBalkBottomElement = this.createDOMElement('div', {
			class: 'scaffold__balk scaffold__balk_bottom',
		})

		this._scaffoldBalkMiddleElement = this.createDOMElement('div', {
			class: 'scaffold__balk scaffold__balk_middle',
		})

		this._scaffoldBalkTopElement = this.createDOMElement('div', {
			class: 'scaffold__balk scaffold__balk_top',
		})
		this._scaffoldRopeElement = this.createDOMElement('img', {
			class: 'scaffold__rope',
			src: '/src/assets/icons/rope.svg',
		})
		this._scaffoldManAliveElement = this.createDOMElement('img', {
			class: 'scaffold__man',
			src: '/src/assets/icons/vasia-alive.svg',
		})
		this._scaffoldManDeadElement = this.createDOMElement('img', {
			class: 'scaffold__man',
			src: '/src/assets/icons/vasia-dead.svg',
		})
		this._scaffoldGPTElement = this.createDOMElement(
			'span',
			{
				class: 'scaffold__gpt',
			},
			'GPT'
		)

		this._gameContainer = document.querySelector('.game')
		this._gameWrapperElement = this.createDOMElement('div', {
			class: 'game__wrapper',
		})
		this._questionElement = this.createDOMElement('p', {
			class: 'game__question',
		})
		this._answerElement = this.createDOMElement('p', {
			class: 'game__answer',
		})
		this._livesContainerElement = this.createDOMElement('div', {
			class: 'game__lives',
		})
		this._livesHintElement = this.createDOMElement(
			'p',
			{
				class: 'hint',
			},
			'Осталось попыток:'
		)
		this._livesNumberElement = this.createDOMElement('span', {
			class: 'number',
		})
		this._resultElement = this.createDOMElement('span', {
			class: 'game__result',
		})
		this._restartBtnElement = this.createDOMElement(
			'button',
			{
				class: 'btn btn_restart',
			},
			'Сыграть еще'
		)
		this._resetBtnElement = this.createDOMElement(
			'button',
			{
				class: 'btn btn_reset',
			},
			'Начать заново'
		)
		this._finishedGameTextElement = this.createDOMElement(
			'span',
			{
				class: 'game__result',
			},
			'Поздравляю! Вы отгадали все вопросы!'
		)
		this._keyboardElement = this.createDOMElement('div', {
			class: 'keyboard',
		})

		this._alphabet.forEach(letter => {
			const keyElement = this.createDOMElement(
				'button',
				{
					class: 'keyboard__letter',
				},
				`${letter.toUpperCase()}`
			)
			this._letterButtonsMap.set(letter, keyElement)
		})

		this._mRestartWrap = this.createDOMElement('div', {
			class: 'modal',
			id: 'modal-restart',
		})

		this._mRestartContent = this.createDOMElement('span', {
			class: 'modal__content',
		})

		this._mRestartBtn = this.createDOMElement(
			'button',
			{
				class: 'btn btn_restart',
			},
			'Сыграть еще'
		)
	}

	createDOMElement(tagName, attributes = {}, textContent = '') {
		const element = document.createElement(tagName)

		for (const [key, value] of Object.entries(attributes)) {
			if (key === 'class') {
				element.classList.add(...value.split(' '))
			} else {
				element.setAttribute(key, value)
			}
		}

		if (typeof textContent === 'string') element.textContent = textContent

		return element
	}

	initGameHandlers() {
		const handleKeyButton = e => {
			if (e.target.classList.contains('keyboard__letter')) {
				this.guessLetter(e.target.textContent)
			}
		}

		const handleRestartButton = e => {
			this.clearGame()
			this.initNewGame()
		}

		const handleResetGameButton = e => {
			localStorage.removeItem('solvedQuestionsIDs')
			this.clearGame()
			this.initNewGame()
		}

		this._keyboardElement.addEventListener('click', handleKeyButton)
		this._mRestartBtn.addEventListener('click', handleRestartButton)
		this._resetBtnElement.addEventListener('click', handleResetGameButton)
		this._startBtnElem.addEventListener('click', handleRestartButton)

		document.addEventListener('keydown', e => {
			this.guessLetter(e.key)
		})
	}

	renderStartMenu() {
		this._gameMenu.append(
			this._squareTopLeftElem,
			this._squareTopRightElem,
			this._squareBottomLeftElem,
			this._squareBottomRightElem,
			this._gameTitleElem,
			this._startBtnElem
		)
		this._gameContainer.append(this._gameMenu)
	}

	initNewGame() {
		this.getRandomUnsolved()

		if (!this._unsolvedQuestions.length) {
			this.finishGame()
			return
		}

		this._randomIndex = Math.floor(
			Math.random() * this._unsolvedQuestions.length
		)

		const { question, answer } = this._unsolvedQuestions[this._randomIndex]
		this._currentQuestion = question
		this._currentAnswer = answer.toLowerCase()

		this._displayAnswer = this._currentAnswer
			.split('')
			.map(char => (char === ' ' ? ' ' : '_'))

		this._guessedLetters.clear()
		this._currentLives = this._initialLives
		this._questionElement.textContent = `${this._currentQuestion}`
		this._answerElement.textContent = `${this._displayAnswer.join('')}`
		this._livesNumberElement.textContent = `${this._currentLives}`

		this.renderNewGame()
	}

	getRandomUnsolved() {
		this._solvedQuestionsIDs = new Set(
			JSON.parse(localStorage.getItem('solvedQuestionsIDs') || '[]')
		)
		this._unsolvedQuestions = this._questions.filter(
			question => !this._solvedQuestionsIDs.has(question.id)
		)
	}

	renderNewGame() {
		this._gameContainer.innerHTML = ''

		this._keyboardElement.append(...this._letterButtonsMap.values())

		this._mRestartWrap.append(this._mRestartContent, this._mRestartBtn)

		this._scaffoldContainer.append(
			this._scaffoldBalkBottomElement,
			this._scaffoldBalkMiddleElement,
			this._scaffoldBalkTopElement,
			this._scaffoldRopeElement,
			this._scaffoldManAliveElement,
			this._scaffoldManDeadElement,
			this._scaffoldGPTElement
		)

		this._livesContainerElement.append(
			this._livesHintElement,
			this._livesNumberElement
		)

		this._gameWrapperElement.append(
			this._questionElement,
			this._answerElement,
			this._keyboardElement,
			this._livesContainerElement
		)

		this._gameContainer.append(
			this._gameWrapperElement,
			this._scaffoldContainer,
			this._mRestartWrap
		)
	}

	clearGame() {
		this._mRestartWrap.classList.remove('modal_open')
		this._scaffoldContainer.querySelectorAll('.open').forEach(child => {
			child.classList.remove('open')
		})
		this._keyboardElement
			.querySelectorAll('.keyboard__letter_red, .keyboard__letter_green')
			.forEach(key => {
				key.classList.remove('keyboard__letter_red', 'keyboard__letter_green')
			})
	}

	guessLetter(letter) {
		letter = letter.toLowerCase()

		if (this._guessedLetters.has(letter) || !this._alphabet.has(letter)) return

		this._guessedLetters.add(letter)

		const currentLetterElement = this._letterButtonsMap.get(letter)

		const isCorrect = this._currentAnswer.includes(letter)

		if (!isCorrect) {
			this._currentLives--
			currentLetterElement.classList.add('keyboard__letter_red')
		} else {
			this._currentAnswer.split('').forEach((char, index) => {
				if (char === letter) {
					this._displayAnswer[index] = letter
				}
				currentLetterElement.classList.add('keyboard__letter_green')
			})
		}

		this.checkGameStatus()
		this.updateState()
	}

	checkGameStatus() {
		if (!this._displayAnswer.includes('_')) {
			this._solvedQuestionsIDs.add(
				this._unsolvedQuestions[this._randomIndex].id
			)
			localStorage.setItem(
				'solvedQuestionsIDs',
				JSON.stringify(Array.from(this._solvedQuestionsIDs))
			)

			this._mRestartContent.textContent = 'WIN!'
			this._mRestartWrap.classList.add('modal_open')
		}

		if (this._currentLives <= 0) {
			this._mRestartContent.textContent = 'GAME OVER.'
			this._mRestartWrap.classList.add('modal_open')
		}
	}

	updateState() {
		this._livesNumberElement.textContent = `${this._currentLives}`
		this._answerElement.textContent = `${this._displayAnswer.join('')}`
		switch (this._currentLives) {
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

	renderRestartBtn() {
		// this._restartBtnElement.classList.add('btn', 'btn_restart')
		// this._restartBtnElement.textContent = 'Сыграть еще'
		this._gameWrapperElement.appendChild(this._restartBtnElement)
	}

	finishGame() {
		// this._gameContainer.innerHTML = ''
		// this._gameWrapperElement.innerHTML = ''

		// this._finishedGameTextElement.classList.add('game__result')
		// this._finishedGameTextElement.textContent =
		// 	'Поздравляю! Вы отгадали все вопросы!'
		// this._resetBtnElement.classList.add('btn', 'btn_reset')
		// this._resetBtnElement.textContent = 'Начать заново'

		this._gameContainer.append(
			this._finishedGameTextElement,
			this._resetBtnElement
		)
	}
}

const alphabet = new Set('абвгдежзийклмнопрстуфхцчшщъыьэюя')
const lives = 5
const questions = [
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
		question: 'Функция, которая передаётся другой функции для вызова позже.',
		answer: 'колбэк',
	},
	{
		id: 8,
		question: 'Эффект при наведении',
		answer: 'ховер',
	},
]

new Hangman(questions, alphabet, lives)
