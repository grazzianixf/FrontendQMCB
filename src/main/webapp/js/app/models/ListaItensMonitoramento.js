class ListaItensMonitoramento {
    
    constructor() {
        
        this._itensMonitoramento = [];
    }
    
    adiciona(itemMonitoramento) {
        
        this._itensMonitoramento.push(itemMonitoramento);
    }
    
    get itensMonitoramento() {
        
        return [].concat(this._itensMonitoramento);
    }
}