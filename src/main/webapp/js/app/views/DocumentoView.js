class DocumentoView extends View {
    
    constructor(elemento) {
       super(elemento);
    }
    
   template(model) {
       
       return `<a href='${URL_WEBSERVICE}/documentos/${model.id}/bytes'>Download</a>`;
   }
}