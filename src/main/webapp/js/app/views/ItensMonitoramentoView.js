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
                    <th>Oficio Regularidade</th>
                    <th>Relatório Regularidade</th>
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
                        <td>
                            <button disabled class="btn btn-secondary text-center" onclick="itemMonitoramentoController.gerarOficioRegularidade(${n.id})">
                                Gerar
                            </button>
                            <div id="oficioRegularidadeView${n.id}"></div>
                        </td>
                        <td>
                            <button class="btn btn-secondary text-center" onclick="itemMonitoramentoController.gerarRelatorioRegularidade(${n.id})">
                                Gerar
                            </button>
                            <div id="relatorioRegularidadeView${n.id}"></div>
                        </td>                                                
                    </tr>
                    
                `).join('')}                
            </tbody>
                  
            <tfoot>
                <td colspan="7" align="center">
                    ${model.itensMonitoramento.reduce((total, n) => total + 1, 0.0)} itens
                </td>
            </tfoot>
            
        </table>
        `;
    }
}
