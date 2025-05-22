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
const domConfig = {
	elements: [
		{
			tagName: 'div',
			attributes: {
				class: 'game__wrapper',
			},
			name: 'gWrapperEl',
		},
		{
			tagName: 'p',
			attributes: {
				class: 'game__question',
			},
			name: 'questionEl',
		},
		{
			tagName: 'p',
			attributes: {
				class: 'game__answer',
			},
			name: 'answerEl',
		},
		{
			tagName: 'div',
			attributes: {
				class: 'keyboard',
			},
			name: 'keyboardEl',
		},
		{
			tagName: 'div',
			attributes: {
				class: 'modal_overlay',
			},
			name: 'mOverlayEl',
		},
		{
			tagName: 'div',
			attributes: {
				class: 'modal__inner',
			},
			name: 'mInnerEl',
		},
		{
			tagName: 'div',
			attributes: {
				class: 'modal__content',
			},
			name: 'mContentEl',
		},
		{
			tagName: 'button',
			attributes: {
				class: 'btn btn_modal',
			},
			name: 'mBtnEl',
		},
	],
	menu: [
		{
			tagName: 'div',
			attributes: {
				class: 'game__menu',
			},
			name: 'menu',
		},
		{
			tagName: 'h1',
			attributes: {
				class: 'game__title',
			},
			content: 'IT виселица',
			name: 'title',
		},
		{
			tagName: 'button',
			attributes: {
				class: 'btn btn_start-game',
			},
			content: 'Новая игра',
			name: 'startBtn',
		},
		{
			tagName: 'span',
			attributes: {
				class: 'square square_top-left',
			},
			name: 'squareTopLeft',
		},
		{
			tagName: 'span',
			attributes: {
				class: 'square square_top-right',
			},
			name: 'squareTopRight',
		},
		{
			tagName: 'span',
			attributes: {
				class: 'square square_bottom-left',
			},
			name: 'squareBottLeft',
		},
		{
			tagName: 'span',
			attributes: {
				class: 'square square_bottom-right',
			},
			name: 'squareBottRight',
		},
	],
	livesCounter: [
		{
			tagName: 'div',
			attributes: {
				class: 'game__lives',
			},
			name: 'container',
		},
		{
			tagName: 'p',
			attributes: {
				class: 'hint',
			},
			content: 'Осталось попыток:',
			name: 'hint',
		},
		{
			tagName: 'span',
			attributes: {
				class: 'number',
			},
			name: 'number',
		},
	],
	scaffold: [
		{
			tagName: 'div',
			attributes: {
				class: 'scaffold',
			},
			name: 'container',
		},
		{
			tagName: 'div',
			attributes: {
				class: 'scaffold__balk scaffold__balk_bottom hidden',
			},
			name: 'balkBottom',
			activeClass: 'hidden',
		},
		{
			tagName: 'div',
			attributes: {
				class: 'scaffold__balk scaffold__balk_middle hidden',
			},
			name: 'balkMiddle',
			activeClass: 'hidden',
		},
		{
			tagName: 'div',
			attributes: {
				class: 'scaffold__balk scaffold__balk_top hidden',
			},
			name: 'balkTop',
			activeClass: 'hidden',
		},
		{
			tagName: 'img',
			attributes: {
				class: 'scaffold__rope',
				src: '/src/assets/icons/rope.svg',
			},
			name: 'scRopeEl',
			activeClass: 'hidden',
		},
		{
			tagName: 'img',
			attributes: {
				class: 'scaffold__man',
				src: '/src/assets/icons/vasia-alive.svg',
			},
			name: 'scVasiaEl',
			activeClass: 'hidden',
		},
		{
			tagName: 'span',
			attributes: {
				class: 'scaffold__gpt',
			},
			content: 'GPT',
			name: 'scGptEl',
			activeClass: 'hidden',
		},
		{
			tagName: 'div',
			attributes: {
				class: 'scaffold__inner hidden',
			},
			name: 'scInnerEl',
			activeClass: 'hidden',
		},
	],
}

export default {
	alphabet,
	lives,
	questions,
	domConfig,
}
