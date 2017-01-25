class MensagemView extends View {
    
    constructor(elemento) {
       super(elemento);
    }
    
   template(model) {
       
       let alertClass = "";

       if (model.tipo == 1) {
           alertClass = "alert-success"
       } else if (model.tipo == 2) {
           alertClass = "alert-info"
       } else if (model.tipo == 3) {
           alertClass = "alert-warning"
       } else if (model.tipo == 4) {
           alertClass = "alert-danger"
       }     
       
       return model.texto ? `<p class="alert ${alertClass}">${model.texto}</p>` : '<p></p>';
   }
}