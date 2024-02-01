import { FiltroDisclaimerModel } from "src/app/shared/model/FiltroDisclaimer.model"

export interface FiltroCompraParametroModel {
  bancoId?: string
  fornecedorId?: string
  subgrupoId?: string
  pesquisar?: string
  dataInicio?: string;
  dataFim?: string;
}

export interface FiltroCompraDisclaimerModel {
  [k: string]: FiltroDisclaimerModel
  bancoId: FiltroDisclaimerModel
  fornecedorId: FiltroDisclaimerModel
  subgrupoId: FiltroDisclaimerModel
  dataInicio: FiltroDisclaimerModel;
  dataFim: FiltroDisclaimerModel;
}

export interface CompraModel{
  id?: string
  banco: string
  bancoNome: string
  fornecedor: string
  fornecedorNome: string
  descricao: string
  dataCompra: string
  subgrupo: string
  subgrupoNome: string
  parcelas: number
  valor: number
  mesInicioCobranca: number
  anoInicioCobranca: number
  tipoCompra: string
  responsaveis: ResponsavelCompraModel[]

  aliquotaImposta: number;
  valorImposto: number;
}

export interface ResponsavelCompraModel{
  indTabela?: number;
  id: string;
  responsavel: string;
  responsavelNome: string;
  percentual: number;
}

export interface ItemCompraModel {
  id: string
  nome: string
  nomeFormatado: string
  ativo: boolean
  tipoCompra: string
  status: string
}

export const listaColunasCompra = [
  {
    property: 'bancoNome',
    label: 'Banco'
  },
  {
    property: 'fornecedorNome',
    label: 'Fornecedor',
  },
  {
    property: 'dataCompra',
    label: 'Data da compra',
    type: 'date'
  },
  {
    property: 'subgrupoNome',
    label: 'Sub-Grupo',
  },
  {
    property: 'grupoNome',
    label: 'Grupo',
  },
  {
    property: 'valor',
    label: 'Valor',
    type: 'currency',
    format: 'BRL'
  },
  {
    property: 'tipoCompra',
    label: 'Tipo',
    type: 'cellTemplate'
  },
]

export const listaColunasResposavelCompra = [
  {
    property: 'responsavel',
    label: 'Responsável'
  },
  {
    property: 'percentual',
    label: 'Porcentagem',
  }
]
