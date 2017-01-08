class ItensMonitoramentoView extends View {
    
    constructor(elemento) {
        super(elemento);
    }
    
    template(model) {
        
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>Número</th>
                    <th>UO</th>
                    <th>Data</th>
                </tr>
            </thead>
        
            <tbody>
                ${model.itensMonitoramento.map(n => `
                    
                    <tr>
                        <td>${n.numero}</td>
                        <td>${n.idUoInss}</td>
                        <td>${DateHelper.dataParaTexto(n.data)}</td>
                    </tr>
                    
                `).join('')}                
            </tbody>
                  
            <tfoot>
                <td colspan="3"></td>
                <td>
                    ${model.itensMonitoramento.reduce((total, n) => total + 1, 0.0)}
                </td>
            </tfoot>
            
        </table>
        `;
    }
}
