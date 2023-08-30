const EDIT_BTN_CLASS = 'editBtn'
const DELETE_BTN_CLASS = 'deleteBtn'
const WAITER_ITEM_CLASS = 'waiterItem'

export class ListView {
    constructor(options) {
        this.options = options
        this.container = this.init()
        this.waitersContainer = this.container.querySelector('#waitersContainer')

        this.bindEvents()
    }

    init() {
        const div = document.createElement('div')

        div.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="waitersContainer"></tbody>
            </table>
        `

        return div.firstChild
    }

    bindEvents() {
        this.waitersContainer.addEventListener('click', this.onWaitersContainerClick.bind(this))
    }

    onWaitersContainerClick(e) {
        const target = e.target
        const waiterEl = this.findWaiterEl(target)
        const id = Number(waiterEl?.dataset?.id)

        if (id) {
            if (this.isEditButtonClicked(target)) {
                this.options.onEdit(id)
            } else if (this.isDeleteButtonClicked(target)) {
                this.options.onDelete(id)
            }
        }
    }

    appendTo(rootEl) {
        rootEl.appendTo(this.container)
    }

    isEditButtonClicked(el) {
        return el.classList.contains(`.${EDIT_BTN_CLASS}`)
    }

    isDeleteButtonClicked(el) {
        return el.classList.contains(`.${DELETE_BTN_CLASS}`)
    }

    findWaiterEl(el) {
        return el.closest(`.${WAITER_ITEM_CLASS}`)
    }

    renderList(waiters) {
        this.waitersContainer.innerHTML = waiters.map(this.generateWaiterHtml).join('')
    }

    generateWaiterHtml(waiter) {
        return `
            <tr class="${WAITER_ITEM_CLASS}" data-id="${waiter.id}">
                <td>${waiter.firstName}</td>
                <td>${waiter.phone}</td>
                <td>
                    <span>
                        <button class="${EDIT_BTN_CLASS}">[Edit]</button>
                        <button class="${DELETE_BTN_CLASS}">[Delete]</button>
                    </span>
                </td>
            </tr>
        `
    }

    replaceWaiterEl(id, waiter) {
        const oldWaiterEl = this.findWaiterElById(id)
        if (oldWaiterEl) {
            oldWaiterEl.outerHTML = this.generateWaiterHtml(waiter)
        }
    }

    findWaiterElById(id) {
        return this.waitersContainer.querySelector(`[data-id="${id}"]`)
    }

    replaceWaiterInList(id, waiter) {
        this.waitersList = this.waitersList.map(w => w.id === Number(id) ? { ...waiter, id: Number(id) } : w)
    }
}














































/*const EDIT_BTN_CLASS = 'editBtn'
const DELETE_BTN_CLASS = 'deleteBtn'
const WAITER_ITEM_CLASS = 'waiterItem'

export class ListView {
    constructor (options) {
        this.options = options
        this.container = this.init()
        this.waitersContainer = this.container.querySelector('#waitersContainer')

        this.bindEvents()
    }

    init() {
        const div = document.createElement('div')

        div.innerHTML = `
            <table>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Actions</th>
                 </tr>

                <tbody id="waitersContainer"></tbody>
            </table>
         `

         return div.children[0];
    }

    bindEvents() {
        this.waitersContainer.addEventListener('click', this.onWaitersContainerClick.bind(this))
    }

    onWaitersContainerClick(e) {
        const target = e.target;
        const waiterEl = this.findWaiterEl(target);
        const id = Number(waiterEl?.dataset?.id);
      
        if (id) {
          if (isEditButtonClicked(target)) {
            this.options.onEdit(id)
          } 
          else if (isDeleteButtonClicked(target)) {
            this.options.onDelete(id)
          }
        }
      }

    appendTo(rootEl) {
        rootEl.append(this.container)
    }
}

isEditButtonClicked(el) {
    return el.closest(`.${EDIT_BTN_CLASS}`)
  }
  
isDeleteButtonClicked(el) {
    return el.closest(`.${DELETE_BTN_CLASS}`)
  }

findWaiterEl(el) {
    return el.closest(`.${WAITER_ITEM_CLASS}`)
  }

  renderList (waiters) {
    console.log(this.waitersContainer)

    this.waitersContainer.innerHTML = waiters.map(this.generateWaiterHtml(waiter))
  }

  generateWaiterHtml(waiter) {
    return `
      <tr class="${WAITER_ITEM_CLASS}" 
      data-id="${waiter.id}">

        <td>${waiter.firstName}</td>
        <td>${waiter.phone}</td>
        <td>
          <span>
            <button class="${EDIT_BTN_CLASS}">[Edit]</button>
            <button class="${DELETE_BTN_CLASS}">[Delete]</button>
          </span>
        </td>
      </tr>
    `
  }


  replaceWaiterEl(id, waiter) {
    const oldWaiterEl = findWaiterElById(id)
  
    oldWaiterEl.outerHTML = generateWaiterHtml(waiter)
  }
  
 findWaiterElById(id) {
    return waitersContainer.querySelector(`[data-id="${id}"]`)
  }
  
  getWaiterById(id) {
    return waitersList.find(waiter => waiter.id === id)
  }
  
replaceWaiterInList(id, waiter) {
    waitersList = waitersList.map(w => w.id === Number(id) ? { ...waiter, id: Number(id) } : w)
  }

*/