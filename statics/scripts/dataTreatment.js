import 'https://cdnjs.cloudflare.com/ajax/libs/d3/6.2.0/d3.min.js'

class DataTreatment {
    constructor() {
        this.loadData()
    }

    loadData() {
        d3.csv(this.filepath).then(data => {
            console.log(data)
        })
    }
}

new DataTreatment()
