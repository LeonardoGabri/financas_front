import { FiltroDisclaimerModel } from "src/app/shared/model/FiltroDisclaimer.model"

export interface FiltroParcelaParametroModel {
  mesReferencia: string
  anoReferencia: string
  responsavelId: string
  pesquisar: string
}

export interface FiltroParcelaDisclaimerModel {
  [k: string]: FiltroDisclaimerModel
  mesReferencia: FiltroDisclaimerModel
  anoReferencia: FiltroDisclaimerModel
  responsavelId: FiltroDisclaimerModel
}

export interface ParcelaModel{
  id?: string
  mesReferencia?: string
  anoReferencia?: string
  compraId?: string
  responsavelId?: string
  valorParcelado?: number
  parcelaAtual?: number
}

export interface ItemParcelaModel {
  id: string
  nome: string
  nomeFormatado: string
  ativo: boolean
}

export const listaColunasParcela = [
  {
    property: 'responsavelNome',
    label: 'Responsável',
  },
  {
    property: 'mesReferencia',
    label: 'Mês Referência',
  },
  {
    property: 'anoReferencia',
    label: 'Ano Referência',
  },
  {
    property: 'parcelaAtual',
    label: 'Parcela Atual',
  },
  {
    property: 'quantidadeParcelas',
    label: 'Quant. Parcelas',
  },
  {
    property: 'valorParcelado',
    label: 'Valor Parcelado',
    type: 'currency',
    format: 'BRL'
  }
]

