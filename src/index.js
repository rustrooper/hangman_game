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

		this._curQuestion
		this._curAnswer
		this._displayAnswer
		this._letterBtnsMap = new Map()
		this._solvedQuestionsIDs
		this._unsolvedQuestions
		this._curLives
		this._randomIndex
		this._scElementsArr
		this._isGameActive = false
	}

	initDOMElements() {
		this._gContainerEl = document.querySelector('.game')

		this._gMenuEl = this.createDOMElement('div', {
			class: 'game__menu',
		})

		this._gTitleEl = this.createDOMElement(
			'h1',
			{
				class: 'game__title',
			},
			'IT виселица'
		)

		this._gStartBtnEl = this.createDOMElement(
			'button',
			{
				class: 'btn btn_start-game',
			},
			'Новая игра'
		)

		this._sqTopLeftEl = this.createDOMElement('span', {
			class: 'square square_top-left',
		})

		this._sqTopRightEl = this.createDOMElement('span', {
			class: 'square square_top-right',
		})

		this._sqBottLeftEl = this.createDOMElement('span', {
			class: 'square square_bottom-left',
		})

		this._sqBottRightEl = this.createDOMElement('span', {
			class: 'square square_bottom-right',
		})

		this._scContainerEl = this.createDOMElement('div', {
			class: 'scaffold',
		})

		this._scBalkBottEl = this.createDOMElement('div', {
			class: 'scaffold__balk scaffold__balk_bottom hidden',
		})

		this._scBalkMidEl = this.createDOMElement('div', {
			class: 'scaffold__balk scaffold__balk_middle hidden',
		})

		this._scBalkTopEl = this.createDOMElement('div', {
			class: 'scaffold__balk scaffold__balk_top hidden',
		})

		this._scRopeEl = this.createDOMElement('img', {
			class: 'scaffold__rope',
			src: '/src/assets/icons/rope.svg',
		})

		this._scVasiaEl = this.createDOMElement('img', {
			class: 'scaffold__man',
			src: '/src/assets/icons/vasia-alive.svg',
		})

		this._scGptEl = this.createDOMElement(
			'span',
			{
				class: 'scaffold__gpt',
			},
			'GPT'
		)
		this._scInnerEl = this.createDOMElement('div', {
			class: 'scaffold__inner hidden',
		})

		this._scElementsArr = [this._scBalkBottEl, this._scBalkMidEl, this._scBalkTopEl, this._scInnerEl]

		this._gWrapperEl = this.createDOMElement('div', {
			class: 'game__wrapper',
		})
		this._questionEl = this.createDOMElement('p', {
			class: 'game__question',
		})
		this._answerEl = this.createDOMElement('p', {
			class: 'game__answer',
		})
		this._lContainerEl = this.createDOMElement('div', {
			class: 'game__lives',
		})
		this._lHintEl = this.createDOMElement(
			'p',
			{
				class: 'hint',
			},
			'Осталось попыток:'
		)
		this._lNumberEl = this.createDOMElement('span', {
			class: 'number',
		})

		this._keyboardEl = this.createDOMElement('div', {
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
			this._letterBtnsMap.set(letter, keyElement)
		})

		this._mOverlayEl = this.createDOMElement('div', {
			class: 'modal_overlay',
		})

		this._mInnerEl = this.createDOMElement('div', {
			class: 'modal__inner',
		})

		this._mContentEl = this.createDOMElement('div', {
			class: 'modal__content',
		})

		this._mBtnEl = this.createDOMElement('button', {
			class: 'btn btn_modal',
		})
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

		element.textContent = textContent

		return element
	}

	initGameHandlers() {
		const handleKeyButton = e => {
			if (this._isGameActive && e.target.classList.contains('keyboard__letter')) {
				this.guessLetter(e.target.textContent)
			}
		}

		const handleRestartBtn = e => {
			this.clearGame()
			this.initNewGame()
		}

		const handleStartBtn = e => {
			this.initNewGame()
			this.renderGame()
		}

		this._keyboardEl.addEventListener('click', handleKeyButton)
		this._mBtnEl.addEventListener('click', handleRestartBtn)
		this._gStartBtnEl.addEventListener('click', handleStartBtn)

		document.addEventListener('keydown', e => {
			if (this._isGameActive) {
				this.guessLetter(e.key)
			}
		})
	}

	renderStartMenu() {
		this._gMenuEl.append(
			this._sqTopLeftEl,
			this._sqTopRightEl,
			this._sqBottLeftEl,
			this._sqBottRightEl,
			this._gTitleEl,
			this._gStartBtnEl
		)
		this._gContainerEl.append(this._gMenuEl)
	}

	initNewGame() {
		this.getRandomUnsolved()

		if (!this._unsolvedQuestions.length) {
			this.openModal('Начать заново', 'Поздравляю!\nВы отгадали все вопросы!')
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
		this._lNumberEl.textContent = `${this._curLives}`

		this._isGameActive = true
	}

	getRandomUnsolved() {
		this._solvedQuestionsIDs = new Set(JSON.parse(localStorage.getItem('solvedQuestionsIDs') || '[]'))
		this._unsolvedQuestions = this._questions.filter(question => !this._solvedQuestionsIDs.has(question.id))
	}

	renderGame() {
		this._gContainerEl.innerHTML = ''

		this._keyboardEl.append(...this._letterBtnsMap.values())

		this._mInnerEl.append(this._mContentEl, this._mBtnEl)
		this._mOverlayEl.append(this._mInnerEl)

		this._scInnerEl.append(this._scRopeEl, this._scVasiaEl, this._scGptEl)
		this._scContainerEl.append(this._scBalkBottEl, this._scBalkMidEl, this._scBalkTopEl, this._scInnerEl)

		this._lContainerEl.append(this._lHintEl, this._lNumberEl)

		this._gWrapperEl.append(this._questionEl, this._answerEl, this._keyboardEl, this._lContainerEl)

		this._gContainerEl.append(this._gWrapperEl, this._scContainerEl, this._mOverlayEl)
	}

	clearGame() {
		if (!this._unsolvedQuestions.length) {
			localStorage.removeItem('solvedQuestionsIDs')
		}

		this._mOverlayEl.classList.remove('modal_open')

		this._scElementsArr.forEach(child => {
			child.classList.add('hidden')
		})
		this._scVasiaEl.src = '/src/assets/icons/vasia-alive.svg'
		this._scGptEl.classList.remove('hidden')

		this._keyboardEl.querySelectorAll('.keyboard__letter_checked').forEach(key => {
			key.classList.remove('keyboard__letter_red', 'keyboard__letter_green', 'keyboard__letter_checked')
		})
	}

	guessLetter(letter) {
		letter = letter.toLowerCase()

		if (!this._alphabet.has(letter)) return

		const curLetterEl = this._letterBtnsMap.get(letter)
		curLetterEl.classList.add('keyboard__letter_checked')

		const isCorrect = this._curAnswer.includes(letter)

		if (isCorrect) {
			this._curAnswer.split('').forEach((char, index) => {
				if (char === letter) {
					this._displayAnswer[index] = letter
				}
				curLetterEl.classList.add('keyboard__letter_green')
			})
		} else {
			this._curLives--
			curLetterEl.classList.add('keyboard__letter_red')
		}

		this.checkGameStatus()
		this.updateState()
	}

	checkGameStatus() {
		if (!this._displayAnswer.includes('_')) {
			this._solvedQuestionsIDs.add(this._unsolvedQuestions[this._randomIndex].id)
			localStorage.setItem('solvedQuestionsIDs', JSON.stringify(Array.from(this._solvedQuestionsIDs)))

			this.openModal('Сыграть ещё', 'WIN!', 'modal__content_win')
		}

		if (this._curLives <= 0) {
			this.openModal('Сыграть ещё', 'GAME OVER!', 'modal__content_lose')
		}
	}

	openModal(btnText, content, contentColor = '') {
		this._isGameActive = false

		this._mContentEl.textContent = content
		this._mContentEl.className = `modal__content ${contentColor}`
		this._mBtnEl.textContent = btnText
		this._mOverlayEl.classList.add('modal_open')
	}

	updateState() {
		this._lNumberEl.textContent = `${this._curLives}`
		this._answerEl.textContent = `${this._displayAnswer.join('')}`

		if (this._curLives == 0) {
			this._scVasiaEl.src = '/src/assets/icons/vasia-dead.svg'
			this._scGptEl.classList.add('hidden')
			return
		}
		this._scElementsArr[this._scElementsArr.length - this._curLives]?.classList.remove('hidden')
	}
}

const alphabet = new Set('абвгдежзийклмнопрстуфхцчшщъыьэюя')
const lives = 5
const questions = [
	{id: 1, question: 'Всё в javascript - это?', answer: 'объект'},
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
		question: 'Технология, которая позволяет обновлять часть страницы без перезагрузки',
		answer: 'асинхронный запрос',
	},
	{
		id: 6,
		question: 'Специальные правила для адаптации сайта под мобильные устройства',
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
