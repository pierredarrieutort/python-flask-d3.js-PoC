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
        inputX.placeholder = x
        inputX.step = 0.01
        inputX.value = x
        inputX.required = true
        inputX.className = 'input'

        const plus = document.createElement('p')
        plus.textContent = '+'

        const inputY = document.createElement('input')
        inputY.type = 'number'
        inputY.name = 'y'
        inputY.placeholder = y
        inputY.step = 0.01
        inputY.value = y
        inputY.required = true
        inputY.className = 'input'

        const equal = document.createElement('p')
        equal.textContent = '='

        const result = document.createElement('span')
        result.className = 'result'

        form.append(inputX, plus, inputY, equal, result)
        document.body.append(form)

        this.changeListener(inputX, form)
        this.changeListener(inputY, form)
    }

    changeListener(element, form) {
        this.findResult(form)
        element.addEventListener('change', e => this.findResult(e.target.form))
    }

    findResult(form) {
        const { x, y } = form.children

        if (x.value && y.value)
            fetch(form.action, {
                method: form.method,
                body: new FormData(form)
            })
                .then(data => data.text())
                .then(result => form.lastChild.textContent = parseFloat(result).toFixed(2))
    }
}

new DataTreatment()
