class ItemMonitoramentoController {

	
    constructor() {
        var context = this;
        
        let $ = document.querySelector.bind(document);

        this._listaItensMonitoramento = new ListaItensMonitoramento();
        
        this._itensMonitoramentoView = new ItensMonitoramentoView($('#itensMonitoramentoView'));
        this._itensMonitoramentoView.update(this._listaItensMonitoramento);
        
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
    }
    
    _atualizaMensagem(texto, tipo) {
        this._mensagem.texto = texto;
        this._mensagem.tipo = tipo;
        this._mensagemView.update(this._mensagem);           
    }
    
    _criaItemMonitoramento(itemArray) {
        console.log(itemArray);
        return new ItemMonitoramento(itemArray.id,
            new Date(),
            itemArray.numero,
            itemArray.idUOMonitoramento);  
    }

    _errorCallBackFunction(e, o) {
        console.log(this);
        console.error(e);
        itemMonitoramentoController._atualizaMensagem("Erro ao processar requisição... Veja mais detalhes no log do console (Ctrl + Shift + J)", 4);
    }

    atualizarItens(event) {
        var that = this;

        let ajax = new XMLHttpRequest();
        ajax.onload = functionName;
        ajax.onerror = this._errorCallBackFunction;
        ajax.open("GET", URL_WEBSERVICE + "/itensMonitoramento", true); //Habilitar Corss no navegador
        ajax.send();
        
        this._atualizaMensagem('Pesquisando itens ...', 2);

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
                that._atualizaMensagem(`Erro do servidor: (${this.status}) ${this.statusText}`, 4);
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
        ajax.open("POST", URL_WEBSERVICE + "/documentos/despachoInstauracao", true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send(params);

        this._atualizaMensagem('Gerando despacho ...', 2);

        function functionName() {
            
            if (this.status == 200) { 
                
                let json = JSON.parse(this.responseText);
                console.log(json);

                that._atualizaDocumentoView(json, "despachoView" + idItem);

                that._atualizaMensagem('Despacho de Instauração gerado. Clique em download para visualizá-lo!', 1);
            } else {
                console.log(this.responseText);
                console.log("Resultado: statusCode = " + this.status);
                that._atualizaMensagem(`Erro do servidor: (${this.status}) ${this.statusText}. ${this.responseText}`, 4);
            }
        }       
    }

    gerarOficioDefesa(idItem) {
        var that = this;

        let params = "id=" + idItem;
        console.log(params);
        let ajax = new XMLHttpRequest();
        ajax.onload = functionName;
        ajax.onerror = that._errorCallBackFunction;
        ajax.open("POST", URL_WEBSERVICE + "/documentos/oficioDefesa", true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send(params);

        this._atualizaMensagem('Gerando ofício de defesa ...', 2);

        function functionName() {
            
            if (this.status == 200) {
                
                let json = JSON.parse(this.responseText);
                console.log(json);

                that._atualizaDocumentoView(json, "oficioDefesaView" + idItem);

                that._atualizaMensagem('Ofício de Defesa gerado. Clique em download para visualizá-lo!', 1);
            } else {
                console.log("Resultado: statusCode = " + this.status);
                that._atualizaMensagem(`Erro do servidor: (${this.status}) ${this.statusText}. ${this.responseText}`, 4);
            }
        }      
    }
    
    gerarRelatorioRegularidade(idItem) {
        var that = this;

        let params = "id=" + idItem;
        console.log(params);
        let ajax = new XMLHttpRequest();
        ajax.onload = functionName;
        ajax.onerror = that._errorCallBackFunction;
        ajax.open("POST", URL_WEBSERVICE + "/documentos/relatorioRegularidade", true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send(params);

        this._atualizaMensagem('Gerando relatório de regularidade ...', 2);

        function functionName() {
            
            if (this.status == 200) {
                
                let json = JSON.parse(this.responseText);
                console.log(json);

                that._atualizaDocumentoView(json, "relatorioRegularidadeView" + idItem);

                that._atualizaMensagem('Relatório de Regularidade gerado. Clique em download para visualizá-lo!', 1);
            } else {
                console.log("Resultado: statusCode = " + this.status);
                that._atualizaMensagem(`Erro do servidor: (${this.status}) ${this.statusText}. ${this.responseText}`, 4);
            }
        }      
    }    
    
    gerarOficioRegularidade(idItem) {
        var that = this;

        let params = "id=" + idItem;
        console.log(params);
        let ajax = new XMLHttpRequest();
        ajax.onload = functionName;
        ajax.onerror = that._errorCallBackFunction;
        ajax.open("POST", URL_WEBSERVICE + "/documentos/oficioRegularidade", true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send(params);

        this._atualizaMensagem('Gerando ofício de regularidade ...', 2);

        function functionName() {
            
            if (this.status == 200) {
                
                let json = JSON.parse(this.responseText);
                console.log(json);

                that._atualizaDocumentoView(json, "oficioRegularidadeView" + idItem);

                that._atualizaMensagem('Ofício de Regularidade gerado. Clique em download para visualizá-lo!', 1);
            } else {
                console.log("Resultado: statusCode = " + this.status);
                that._atualizaMensagem(`Erro do servidor: (${this.status}) ${this.statusText}. ${this.responseText}`, 4);
            }
        }      
    }    
}