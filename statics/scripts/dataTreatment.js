import 'https://cdnjs.cloudflare.com/ajax/libs/d3/6.2.0/d3.min.js'

class DataTreatment {
    constructor() {
        this.filepath = '/statics/data/export.csv'
        this.data = undefined
        this.editedData = undefined

        this.loadData()
    }

    loadData() {
        d3.csv(this.filepath).then(data => {
            this.data = data

            this.prepareDataDisplay()
        })
    }

    prepareDataDisplay() {
        this.data.forEach((d, i) => this.displayData(d, i))
    }

    displayData({ x, y }, i) {
        const form = document.createElement('form')
        form.action = '/results'
        form.method = 'POST'
        form.className = `formContainer-${i}`

        const inputX = document.createElement('input')
        inputX.type = 'number'
        inputX.name = 'x'
        inputX.value = x
        inputX.className = 'input'
        this.changeListener(inputX)

        const inputY = document.createElement('input')
        inputY.type = 'number'
        inputY.name = 'y'
        inputY.value = y
        inputY.className = 'input'
        this.changeListener(inputY)

        const result = document.createElement('span')
        result.className = 'result'

        form.append(inputX, inputY, result)
        document.body.append(form)
    }

    changeListener(element) {
        element.addEventListener('change', e => {
            const form = e.target.form

            fetch(form.action, {
                method: form.method,
                body: new FormData(form)
            })
                .then(data => data.text())
                .then(result => element.parentElement.lastChild.textContent = result)
        })
    }
}

new DataTreatment()
