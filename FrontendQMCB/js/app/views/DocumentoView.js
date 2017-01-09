class DocumentoView extends View {
    
    constructor(elemento) {
       super(elemento);
    }
    
   template(model) {
       
       return `<a href='http://localhost:8080/ServicesQMCB/documentos/${model.id}'>Download</a>`;
   }
}