class Mensagem {
    
    constructor(texto='', tipo=2) {
        // tipo : 1 = success, 2 = info, 3 = warn, 4 = danger
        this._texto = texto;
        this._tipo = tipo;
    }
    
    get texto() {
        
        return this._texto;
    }
    
    set texto(texto) {
        
        this._texto = texto;
    }

    get tipo() {
        
        return this._tipo;
    }
    
    set tipo(tipo) {
        
        this._tipo = tipo;
    }    
}