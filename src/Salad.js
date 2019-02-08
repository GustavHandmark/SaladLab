export default class Salad {
    constructor() {
        this.foundation = [];
        this.proteins = [];
        this.extras = [];
        this.dressing = [];
    }

    addSelection(items) {
        if (items) {
            Object.keys(items).forEach((key) => {
                let obj = { 'name': key, ...items[key] }
                if (items[key].foundation === true) {
                    this.foundation.push(obj);
                }
                if (items[key].protein === true) {
                    this.proteins.push(obj);
                    return true;
                }
                if (items[key].extra === true) {
                    this.extras.push(obj);
                    return true;
                }
                if (items[key].dressing === true) {
                    this.dressing.push(obj);
                    return true;
                }
            });
        }
    }

    removeSelection(item) {
        if (item) {
            Object.keys(item).forEach((key) => {
                if (item[key].foundation === true) {
                    this.foundation.forEach((item, index) => {
                        if (item.name === key) {
                            this.foundation.splice(index, 1);
                        }
                    })
                }
                if (item[key].extra === true) {
                    this.extras.forEach((item, index) => {
                        if (item.name === key) {
                            this.extras.splice(index, 1);
                        }
                    })
                }
                if (item[key].protein === true) {
                    this.protein.forEach((item, index) => {
                        if (item.name === key) {
                            this.proteins.splice(index, 1);
                        }
                    })
                }
                if (item[key].dressing === true) {
                    this.dressing.forEach((item, index) => {
                        if (item.name === key) {
                            this.dressing.splice(index, 1);
                        }
                    })
                }
            });
        }
    }

    price() {
        let priceE = 0;
        let priceF = 0;
        let priceP = 0;
        let priceD = 0;

        if (this.extras.length) {
            priceE = this.extras.map(x => x['price']).reduce((total, value) => {
                return total + value;
            });
        }

        if (this.foundation.length) {
            priceF = this.foundation.map(x => x['price']).reduce((total, value) => {
                return total + value;
            });
        }

        if (this.proteins.length) {
            priceP = this.proteins.map(x => x['price']).reduce((total, value) => {
                return total + value;
            });

        }

        if (this.dressing.length) {
            priceD = this.dressing.map(x => x['price']).reduce((total, value) => {
                return total + value;
            });
        }
        return (priceE + priceF + priceP + priceD);
    }

    asString() {
        let items = []
        this.foundation.forEach(entry => items.push(entry.name));
        this.proteins.forEach(entry => items.push(entry.name));
        this.extras.forEach(entry => items.push(entry.name));
        this.dressing.forEach(entry => items.push(entry.name));
        return items.toString();
    }
}
