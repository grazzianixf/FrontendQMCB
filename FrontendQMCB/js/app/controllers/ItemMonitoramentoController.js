class ItemMonitoramentoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);

        this._listaItensMonitoramento = new ListaItensMonitoramento();
        
        this._itensMonitoramentoView = new ItensMonitoramentoView($('#itensMonitoramentoView'));
        this._itensMonitoramentoView.update(this._listaItensMonitoramento);
        
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
        
    }
    
    adiciona(event) {
        
        event.preventDefault();
        this._listaItensMonitoramento.adiciona(this._criaItemMonitoramento());
        this._itensMonitoramentoView.update(this._listaItensMonitoramento);
        
        this._mensagem.texto = 'Item de Monitoramento adicionado com sucesso';
        this._mensagemView.update(this._mensagem);   
    }
    
    _criaItemMonitoramento() {
        
        return new ItemMonitoramento(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);    
    }

    atualizarItens(event) {
        
    }
}