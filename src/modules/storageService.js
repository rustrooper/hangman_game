export default class StorageService {
	constructor(storageKey) {
		this._storageKey = storageKey
	}

	getItems() {
		const items = localStorage.getItem(this._storageKey)
		return items ? JSON.parse(items) : []
	}

	setItems(items) {
		localStorage.setItem(this._storageKey, JSON.stringify(items))
	}

	addItem(item) {
		const items = this.getItems()
		items.push(item)
		this.setItems(items)
	}

	hasItem(item) {
		const items = this.getItems()
		return items.includes(item)
	}

	addItemIfNotExists(item) {
		if (!this.hasItem(item)) {
			this.addItem(item)
		}
	}

	removeItem(item) {
		const items = this.getItems()
		const updatedItems = items.filter(existingItem => existingItem !== item)
		this.setItems(updatedItems)
	}

	clear() {
		localStorage.removeItem(this._storageKey)
	}
}
