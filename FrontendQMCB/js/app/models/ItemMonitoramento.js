class ItemMonitoramento {
    
    constructor(id, data, numero, idUoInss) {
        
        this._id = id;
        this._data = new Date(data.getTime());
        this._numero = numero;
        this._idUoInss = idUoInss;
        Object.freeze(this);
    }
    
    get id() {
        
        return this._id;
    }

    get data() {
        
        return new Date(this._data.getTime());
    }
    
    get numero() {
        
        return this._numero;
    }
    
    get idUoInss() {
        
        return this._idUoInss;
    }
}