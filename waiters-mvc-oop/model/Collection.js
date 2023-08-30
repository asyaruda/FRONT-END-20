import { Api } from '../../../api/Api.js'
import { waitersUrl } from '../../../api/url.js'

export class Collection {
  #list = []

  constructor () {
      this.api = new Api(waitersUrl)
  }

  getList () {
      return this.api
        .getList()
        .then((list) => {
          this.setWaiters(list)

          return list
        })
    }

  remove (id) {
      return this.api
        .delete(id)
        .then(() => {
          this.deleteWaiterInList(id)

          return id
        })
    }

  create (waiter) {
      return this.api
        .create(waiter)
        .then((newWaiterWithId) => {
          this.addWaiterInList(newWaiterWithId)

          return newWaiterWithId
        })
    }

  update (waiter) {
      return this.api  
        .update(waiter.id, waiter)
        .then(() => {
          this.replaceWaiterInList(waiter.id, waiter)

          return waiter
        })
    }

  setWaiters (list) {
      this.#list = list
  }
  
  getWaiters () {
      return this.#list
  }
  
  getWaiterById (id) {
      return this.#list.find(waiter => waiter.id === id)
  }
  
  replaceWaiterInList (id, waiter) {
      this.#list = this.#list.map(w => w.id === Number(id) ? { ...waiter, id: Number(id) } : w)
  }
  
  addWaiterInList (waiter) {
      this.#list.push(waiter)
  }
  
  deleteWaiterInList (id) {
      this.#list = this.#list.filter(waiter => waiter.id !== Number(id))
  }
}










































