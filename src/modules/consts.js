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

const domMenuConfig = {
	tagName: 'div',
	className: 'game__menu',
	children: [
		{
			tagName: 'span',
			className: 'square square_top-left',
		},
		{
			tagName: 'span',
			className: 'square square_top-right',
		},
		{
			tagName: 'span',
			className: 'square square_bottom-left',
		},
		{
			tagName: 'span',
			className: 'square square_bottom-right',
		},
		{
			tagName: 'h1',
			className: 'game__title',
			textContent: 'IT виселица',
		},
		{
			tagName: 'button',
			className: 'btn btn_start-game',
			textContent: 'Новая игра',
		},
	],
}

const domGameConfig = {
	children: [
		{
			tagName: 'div',
			className: 'game__wrapper',
			children: [
				{
					tagName: 'p',
					className: 'game__question',
					textContent: 'Инструмент для проверки кода на ошибки',
				},
				{
					tagName: 'p',
					className: 'game__answer',
					textContent: '______',
				},
				{
					tagName: 'div',
					className: 'keyboard',
					children: Array.from('АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ').map(letter => ({
						tagName: 'button',
						className: 'keyboard__letter',
						textContent: letter,
					})),
				},
				{
					tagName: 'div',
					className: 'game__lives',
					children: [
						{
							tagName: 'p',
							className: 'hint',
							textContent: 'Осталось попыток:',
						},
						{
							tagName: 'span',
							className: 'number',
						},
					],
				},
			],
		},
		{
			tagName: 'div',
			className: 'scaffold',
			children: [
				{
					tagName: 'div',
					className: 'scaffold__balk scaffold__balk_bottom hidden',
				},
				{
					tagName: 'div',
					className: 'scaffold__balk scaffold__balk_middle hidden',
				},
				{
					tagName: 'div',
					className: 'scaffold__balk scaffold__balk_top hidden',
				},
				{
					tagName: 'div',
					className: 'scaffold__inner hidden',
					children: [
						{
							tagName: 'img',
							className: 'scaffold__rope',
							src: '/src/assets/icons/rope.svg',
						},
						{
							tagName: 'img',
							className: 'scaffold__man',
							src: '/src/assets/icons/vasia-alive.svg',
						},
						{
							tagName: 'span',
							className: 'scaffold__gpt',
							textContent: 'GPT',
						},
					],
				},
			],
		},
		{
			tagName: 'div',
			className: 'modal_overlay',
			children: [
				{
					tagName: 'div',
					className: 'modal__inner',
					children: [
						{
							tagName: 'div',
							className: 'modal__content',
						},
						{
							tagName: 'button',
							className: 'btn btn_modal',
						},
					],
				},
			],
		},
	],
}

const domClasses = {
	container: 'game',
	btnStart: 'btn_start-game',
	btnModal: 'btn_modal',
	keyboard: 'keyboard',
	keyLetter: 'keyboard__letter',
	question: 'game__question',
	answer: 'game__answer',
	counter: 'number',
	keyChecked: 'keyboard__letter_checked',
	keyGreen: 'keyboard__letter_green',
	keyRed: 'keyboard__letter_red',
	vasia: 'scaffold__man',
	gpt: 'scaffold__gpt',
	scaffold: 'scaffold',
	hidden: 'hidden',
	modal: 'modal_overlay',
	modalContent: 'modal__content',
	modalOpen: 'modal_open',
	modalWin: 'modal__content_win',
	modalLose: 'modal__content_lose',
}

const sources = {
	vasiaDead: '/src/assets/icons/vasia-dead.svg',
	vasiaAlive: '/src/assets/icons/vasia-alive.svg',
}

const elementsContent = {
	playAgain: 'Сыграть ещё',
	win: 'WIN!',
	lose: 'GAME OVER!',
	restartGame: 'Начать заново',
	congratulations: 'Поздравляю!\nВы отгадали все вопросы!',
}

export default {
	alphabet,
	lives,
	questions,
	domClasses,
	sources,
	elementsContent,
	domMenuConfig: JSON.stringify(domMenuConfig),
	domGameConfig: JSON.stringify(domGameConfig),
}
