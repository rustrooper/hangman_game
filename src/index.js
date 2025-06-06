import AppConfig from './modules/consts.js'
const {domClasses, sources, elementsContent} = AppConfig
import StorageService from './modules/storageService.js'

class Hangman {
	constructor() {
		this.#initConsts()
		this.#initGameHandlers()
		this.#renderStartMenu()
	}

	#initConsts() {
		this._gameContainer = document.querySelector(`.${domClasses.container}`)

		this._storageService = new StorageService(AppConfig.localStorageKeys.questionsIds)

		this._questions = AppConfig.questions
		this._alphabet = AppConfig.alphabet
		this._initialLives = AppConfig.lives

		this._curQuestion
		this._curAnswer
		this._displayAnswer
		this._letterBtnsMap = new Map()
		this._guessedLetters = new Set()
		this._unsolvedQuestions
		this._curLives
		this._randomIndex
		this._scElementsArr
		this._isGameActive = false
	}

	#initGameHandlers() {
		this.handleKeyScreenBtn = e => {
			if (this._isGameActive && e.target.matches(`.${domClasses.keyLetter}`)) {
				this.#guessLetter(e.target.textContent)
			}
		}

		this.handleKeyBtn = e => {
			if (this._isGameActive) {
				this.#guessLetter(e.key)
			}
		}

		this.handleRestartBtn = () => {
			this.#clearGame()
			this.#initNewGame()
		}

		this.handleStartBtn = () => {
			this.#renderGame()
			this.#initNewGame()
		}
	}

	#setGameListeners() {
		this._keyboardEl.addEventListener('click', this.handleKeyScreenBtn)
		this._modalBtn.addEventListener('click', this.handleRestartBtn)
		document.addEventListener('keydown', this.handleKeyBtn)
	}

	#cacheElements() {
		this._questionEl = this._gameContainer.querySelector(`.${domClasses.question}`)
		this._answerEl = this._gameContainer.querySelector(`.${domClasses.answer}`)
		this._livesCounterEl = this._gameContainer.querySelector(`.${domClasses.counter}`)
		this._keyboardEl = this._gameContainer.querySelector(`.${domClasses.keyboard}`)
		this._scaffold = this._gameContainer.querySelector(`.${domClasses.scaffold}`)
		this._vasiaImg = this._gameContainer.querySelector(`.${domClasses.vasia}`)
		this._gptImg = this._gameContainer.querySelector(`.${domClasses.gpt}`)
		this._modal = this._gameContainer.querySelector(`.${domClasses.modal}`)
		this._modalContent = this._gameContainer.querySelector(`.${domClasses.modalContent}`)
		this._modalBtn = this._gameContainer.querySelector(`.${domClasses.btnModal}`)

		this._letterBtnsMap = new Map(
			Array.from(this._keyboardEl.children).map(button => {
				const letter = button.textContent.toLowerCase()
				return [letter, button]
			})
		)

		this._scaffoldArr = Array.from(this._scaffold.children)
	}

	#createDOMElement(config) {
		const element = document.createElement(config.tagName)
		if (config.className) element.className = config.className
		if (config.textContent) element.textContent = config.textContent
		if (config.src) element.src = config.src

		if (config.children) {
			config.children.forEach(child => {
				element.appendChild(this.#createDOMElement(child))
			})
		}

		return element
	}

	#renderStartMenu() {
		this._gameContainer.innerHTML = ''

		const element = this.#createDOMElement(JSON.parse(AppConfig.domMenuConfig))
		this._gameContainer.append(element)
		document.querySelector(`.${domClasses.btnStart}`).addEventListener('click', this.handleStartBtn)
	}

	#renderGame() {
		this._gameContainer.innerHTML = ''

		JSON.parse(AppConfig.domGameConfig).children.forEach(child => {
			const element = this.#createDOMElement(child)
			this._gameContainer.append(element)
		})
		this.#cacheElements()
		this.#setGameListeners()
	}

	#initNewGame() {
		this.#getUnsolvedQuestions()

		if (!this._unsolvedQuestions.length) {
			this.#openModal(elementsContent.restartGame, elementsContent.congratulations)
			return
		}

		this._randomIndex = Math.floor(Math.random() * this._unsolvedQuestions.length)

		const {question, answer} = this._unsolvedQuestions[this._randomIndex]
		this._curQuestion = question
		this._curAnswer = answer.toLowerCase()

		this._displayAnswer = this._curAnswer.split('').map(char => (char === ' ' ? ' ' : '_'))

		this._curLives = this._initialLives
		this._questionEl.textContent = `${this._curQuestion}`
		this._answerEl.textContent = `${this._displayAnswer.join('')}`
		this._livesCounterEl.textContent = `${this._curLives}`

		this._isGameActive = true
	}

	#getUnsolvedQuestions() {
		this._unsolvedQuestions = this._questions.filter(question => !this._storageService.hasItem(question.id))
	}

	#clearGame() {
		if (!this._unsolvedQuestions.length) {
			this._storageService.clear()
		}

		this._modal.classList.remove(domClasses.modalOpen)

		this._scaffoldArr.forEach(child => {
			child.classList.add(domClasses.hidden)
		})
		this._vasiaImg.src = sources.vasiaAlive
		this._gptImg.classList.remove(domClasses.hidden)

		this._keyboardEl.querySelectorAll(`.${domClasses.keyChecked}`).forEach(key => {
			key.classList.remove(domClasses.keyRed, domClasses.keyGreen, domClasses.keyChecked)
		})

		this._guessedLetters.clear()
	}

	#guessLetter(letter) {
		letter = letter.toLowerCase()

		if (!this._alphabet.has(letter) || this._guessedLetters.has(letter)) return

		this._guessedLetters.add(letter)

		const curLetterEl = this._letterBtnsMap.get(letter)
		curLetterEl.classList.add(domClasses.keyChecked)

		const isCorrect = this._curAnswer.includes(letter)

		if (isCorrect) {
			this._curAnswer.split('').forEach((char, index) => {
				if (char === letter) {
					this._displayAnswer[index] = letter
				}
				curLetterEl.classList.add(domClasses.keyGreen)
			})
		} else {
			this._curLives--
			curLetterEl.classList.add(domClasses.keyRed)
		}

		this.#checkGameStatus()
		this.#updateState()
	}

	#checkGameStatus() {
		if (!this._displayAnswer.includes('_')) {
			this._storageService.addItem(this._unsolvedQuestions[this._randomIndex].id)

			this.#openModal(elementsContent.playAgain, elementsContent.win, domClasses.modalWin)
		}

		if (this._curLives <= 0) {
			this.#openModal(elementsContent.playAgain, elementsContent.lose, domClasses.modalLose)
		}
	}

	#openModal(btnText, content, contentColor = '') {
		this._isGameActive = false

		this._modalContent.textContent = content
		this._modalContent.className = `${domClasses.modalContent} ${contentColor}`
		this._modalBtn.textContent = btnText
		this._modal.classList.add(domClasses.modalOpen)
	}

	#updateState() {
		this._livesCounterEl.textContent = `${this._curLives}`
		this._answerEl.textContent = `${this._displayAnswer.join('')}`

		if (this._curLives == 0) {
			this._vasiaImg.src = sources.vasiaDead
			this._gptImg.classList.add(domClasses.hidden)
			return
		}

		this._scaffold.children[this._scaffold.children.length - this._curLives]?.classList.remove(domClasses.hidden)
	}
}

new Hangman()
