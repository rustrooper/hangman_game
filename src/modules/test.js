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


initDOMElements() {
  this._gContainerEl = document.querySelector('.game')

  // this._gMenuEl = this.createDOMElement('div', {
  // 	class: 'game__menu',
  // })

  // this._gTitleEl = this.createDOMElement(
  // 	'h1',
  // 	{
  // 		class: 'game__title',
  // 	},
  // 	'IT виселица'
  // )

  // this._gStartBtnEl = this.createDOMElement(
  // 	'button',
  // 	{
  // 		class: 'btn btn_start-game',
  // 	},
  // 	'Новая игра'
  // )

  // this._sqTopLeftEl = this.createDOMElement('span', {
  // 	class: 'square square_top-left',
  // })

  // this._sqTopRightEl = this.createDOMElement('span', {
  // 	class: 'square square_top-right',
  // })

  // this._sqBottLeftEl = this.createDOMElement('span', {
  // 	class: 'square square_bottom-left',
  // })

  // this._sqBottRightEl = this.createDOMElement('span', {
  // 	class: 'square square_bottom-right',
  // })

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