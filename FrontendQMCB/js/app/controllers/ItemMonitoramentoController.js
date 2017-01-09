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
        let params = "id=" + idItem;
        let ajax = new XMLHttpRequest();
        ajax.onload = functionName;
        ajax.onerror = errorFunctionName;
        ajax.open("POST", "http://localhost:8080/ServicesQMCB/documentos/despachoInstauracao", true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send(params);

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
                console.log(this.responseText);
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
        //TODO Browser deve ter instalado uma extensão que permita cross-domain, senao n funciona
        let ajax = new XMLHttpRequest();
        ajax.onload = functionName;
        ajax.onerror = errorFunctionName;
        ajax.open("GET", "http://localhost:8080/ServicesQMCB/documentos/despachoInstauracao/" + id, true);
        ajax.send();

        this._atualizaMensagem('Download ...');

        var that = this;
        function functionName() {
            
            if (this.status == 200) {
                //console.log(this.responseText);
                
                that._downloadArquivo(this.responseText, 'documento.pdf')

                that._atualizaMensagem('');
            } else {
                console.log("Resultado: statusCode = " + this.status);
            }
        }

        function errorFunctionName(e) {          
            console.log(this);
            console.error(e);
        }               
    }

    _downloadArquivo(content, filename) {
        let a = document.createElement('a');
        let blob = new Blob([content], {'type':'application/octet-stream'});
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.click();   
    }    
}