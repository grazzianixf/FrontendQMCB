class ItemMonitoramentoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);

        this._listaItensMonitoramento = new ListaItensMonitoramento();
        
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaItensMonitoramento);
        
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
        
    }
    
    adiciona(event) {
        
        event.preventDefault();
        this._listaItensMonitoramento.adiciona(this._criaNegociacao());
        this._negociacoesView.update(this._listaItensMonitoramento);
        
        this._mensagem.texto = 'Item de Monitoramento adicionado com sucesso';
        this._mensagemView.update(this._mensagem);   
    }
    
    _criaNegociacao() {
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);    
    }
}