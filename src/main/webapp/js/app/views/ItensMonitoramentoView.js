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
                    <th>Despacho</th>
                    <th>Oficio Defesa</th>
                </tr>
            </thead>
        
            <tbody>
                ${model.itensMonitoramento.map(n => `
                    
                    <tr>
                        <td>${n.numero}</td>
                        <td>${n.idUoInss}</td>
                        <td>${DateHelper.dataParaTexto(n.data)}</td>
                        <td>
                            <button class="btn btn-secondary text-center" onclick="itemMonitoramentoController.gerarDespacho(${n.id})">
                                Gerar
                            </button>
                            <div id="despachoView${n.id}"></div>
                        </td>
                        <td>
                            <button class="btn btn-secondary text-center" onclick="itemMonitoramentoController.gerarOficioDefesa(${n.id})">
                                Gerar
                            </button>
                            <div id="oficioDefesaView${n.id}"></div>
                        </td>
                    </tr>
                    
                `).join('')}                
            </tbody>
                  
            <tfoot>
                <td colspan="5" align="center">
                    ${model.itensMonitoramento.reduce((total, n) => total + 1, 0.0)} itens
                </td>
            </tfoot>
            
        </table>
        `;
    }
}
