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

        
        
    }

    _atualizaMensagem(texto) {
        this._mensagem.texto = texto;
        this._mensagemView.update(this._mensagem);           
    }
    
    _criaItemMonitoramento(itemArray) {
        
        return new ItemMonitoramento(itemArray.id,
            DateHelper.textoParaData(itemArray.data),
            itemArray.numero,
            itemArray.idUoInss);    
    }

    atualizarItens(event) {
        let ajax = new XMLHttpRequest();
        ajax.onload = functionName;
        ajax.onerror = errorFunctionName;
        ajax.open("GET", "http://demo7424473.mockable.io/ServicesQMCB/itensMonitoramento", true);
        ajax.send();

        this._atualizaMensagem('Pesquisando itens ...');

        var that = this;
        function functionName() {
            
            if (this.status == 200) { // request succeeded
                
                let json = JSON.parse(this.responseText);
                console.log(json);

                json.itensMonitoramento.forEach(itemArray => {
                    that._listaItensMonitoramento.adiciona(that._criaItemMonitoramento(itemArray));
                }, that);
                that._itensMonitoramentoView.update(that._listaItensMonitoramento);
                that._listaItensMonitoramento = new ListaItensMonitoramento();

                that._atualizaMensagem('');
            } else {
                // handle more HTTP response codes here;
                console.log("Resultado: statusCode = " + this.status);
            }
        }

        function errorFunctionName(e) {
        
            console.log(this);
            console.error(e);
            // do something with this.status, this.statusText
        }        
    }

    gerarDespacho(idItem) {
        let ajax = new XMLHttpRequest();
        ajax.onload = functionName;
        ajax.onerror = errorFunctionName;
        ajax.open("POST", "http://demo7424473.mockable.io/ServicesQMCB/documentos/despachoInstauracao", true);
        ajax.send();

        this._atualizaMensagem('Gerando despacho ...');

        var that = this;
        function functionName() {
            
            if (this.status == 200) { // request succeeded
                
                let json = JSON.parse(this.responseText);
                console.log(json);

                // TODO

                that._atualizaMensagem('');
            } else {
                // handle more HTTP response codes here;
                console.log("Resultado: statusCode = " + this.status);
            }
        }

        function errorFunctionName(e) {
        
            console.log(this);
            console.error(e);
            // do something with this.status, this.statusText
        }        
    }

    gerarOficioDefesa(idItem) {
        let ajax = new XMLHttpRequest();
        ajax.onload = functionName;
        ajax.onerror = errorFunctionName;
        ajax.open("POST", "http://demo7424473.mockable.io/ServicesQMCB/documentos/oficioDefesa", true);
        ajax.send();

        this._atualizaMensagem('Gerando ofício de defesa ...');

        var that = this;
        function functionName() {
            
            if (this.status == 200) { // request succeeded
                
                let json = JSON.parse(this.responseText);
                console.log(json);

                // TODO 

                that._atualizaMensagem('');
            } else {
                // handle more HTTP response codes here;
                console.log("Resultado: statusCode = " + this.status);
            }
        }

        function errorFunctionName(e) {
        
            console.log(this);
            console.error(e);
            // do something with this.status, this.statusText
        }        
    }

    downloadDocumento(id) {
         let ajax = new XMLHttpRequest();
        ajax.onload = functionName;
        ajax.onerror = errorFunctionName;
        ajax.open("GET", "http://demo7424473.mockable.io/ServicesQMCB/documentos/" + id, true);
        ajax.send();

        this._atualizaMensagem('Download ...');

        var that = this;
        function functionName() {
            
            if (this.status == 200) { // request succeeded
                
                let json = JSON.parse(this.responseText);
                console.log(json);

                // TODO 

                that._atualizaMensagem('');
            } else {
                // handle more HTTP response codes here;
                console.log("Resultado: statusCode = " + this.status);
            }
        }

        function errorFunctionName(e) {
            
            console.log(this);
            console.error(e);
            // do something with this.status, this.statusText
        }               
    }
}