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
    
    _atualizaMensagem(texto) {
        this._mensagem.texto = texto;
        this._mensagemView.update(this._mensagem);           
    }
    
    _criaItemMonitoramento(itemArray) {
        console.log(itemArray);
        return new ItemMonitoramento(itemArray.id,
            new Date(),
            itemArray.numero,
            itemArray.idUOMantenedora);  
    }

    _errorCallBackFunction(e) {
        console.log(this);
        console.error(e);
    }

    atualizarItens(event) {
        var that = this;

        let ajax = new XMLHttpRequest();
        ajax.onload = functionName;
        ajax.onerror = that._errorCallBackFunction;
        ajax.open("GET", "http://localhost:8080/ServicesQMCB/itensMonitoramento", true); //Habilitar Corss no navegador
        ajax.send();

        this._atualizaMensagem('Pesquisando itens ...');

        function functionName() {
            
            if (this.status == 200) { // request succeeded
                console.log(this.responseText);
                let json = JSON.parse(this.responseText);
                console.log(json);

                json.forEach(itemArray => {
                    that._listaItensMonitoramento.adiciona(that._criaItemMonitoramento(itemArray));
                }, that);
                that._itensMonitoramentoView.update(that._listaItensMonitoramento);
                that._listaItensMonitoramento = new ListaItensMonitoramento();

                that._atualizaMensagem('');
            } else {
                console.log("Resultado: statusCode = " + this.status);
            }
        }      
    }

    _atualizaDocumentoView(json, nomeView) {
        let $ = document.querySelector.bind(document);
        let documento = new Documento();
        documento.id = json.id;
        let documentoView = new DocumentoView($('#' + nomeView));
        documentoView.update(documento);
    }

    gerarDespacho(idItem) {
        var that = this;

        let params = "id=" + idItem;
        let ajax = new XMLHttpRequest();
        ajax.onload = functionName;
        ajax.onerror = that._errorCallBackFunction;
        ajax.open("POST", "http://localhost:8080/ServicesQMCB/documentos/despachoInstauracao", true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send(params);

        this._atualizaMensagem('Gerando despacho ...');

        function functionName() {
            
            if (this.status == 200) { 
                
                let json = JSON.parse(this.responseText);
                console.log(json);

                that._atualizaDocumentoView(json, "despachoView" + idItem);

                that._atualizaMensagem('');
            } else {
                console.log(this.responseText);
                console.log("Resultado: statusCode = " + this.status);
            }
        }       
    }

    gerarOficioDefesa(idItem) {
        var that = this;

        let params = "id=" + idItem;
        let ajax = new XMLHttpRequest();
        ajax.onload = functionName;
        ajax.onerror = that._errorCallBackFunction;
        ajax.open("POST", "http://localhost:8080/ServicesQMCB/documentos/oficioDefesa", true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send(params);

        this._atualizaMensagem('Gerando ofício de defesa ...');

        function functionName() {
            
            if (this.status == 200) {
                
                let json = JSON.parse(this.responseText);
                console.log(json);

                that._atualizaDocumentoView(json, "oficioDefesaView" + idItem);

                that._atualizaMensagem('');
            } else {
                console.log("Resultado: statusCode = " + this.status);
            }
        }      
    }
}