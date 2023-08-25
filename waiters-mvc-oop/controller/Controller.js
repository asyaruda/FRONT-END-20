import { FormView } from '../view/FormView.js'
import { ListView } from '../view/ListView.js'
import { Collection } from '../model/Collection.js'
import { showError } from '../../../lib – module/showError.js'

export class Controller {
    constructor(rootEl) {
        this.rootEl = rootEl

        this.collection = new Collection()
        this.formView = new FormView({
            onSubmit: waiter => this.saveWaiter(waiter),
        });

        this.listView = new ListView({  
            onEdit: (id) => {
                const waiter = this.collection.getWaiterById(id)

                this.formView.fillForm(waiter)
            },

            onDelete: (id) => {
                this.collection.remove(id)
                    .then(() => this.listView.deleteWaiterById(id))
                    .catch(showError)
            }
        })

        this.formView.appendTo(this.rootEl)
        this.listView.appendTo(this.rootEl)

        this.collection.getList()
            .then(list => this.listView.renderList(list))  
            .catch(showError)
    }

    saveWaiter(waiter) {
        if (waiter.id) {
            this.collection.update(waiter)
                .then(() => {
                    this.listView.replaceWaiterEl(waiter.id, waiter)
                    this.formView.clearForm()
                })
                .catch(showError)
        } 
        
        else {
            this.collection.create(waiter)
                .then((newWaiterWithId) => {
                    this.listView.renderWaiter(newWaiterWithId)
                    this.formView.clearForm()
                })
                .catch(showError)
        }
    }
}


