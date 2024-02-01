import { PoTableColumnLabel } from "@po-ui/ng-components"
import { FiltroDisclaimerModel } from "src/app/shared/model/FiltroDisclaimer.model"

export interface FiltroBancoParametroModel {
  nome?: string
  ativo: boolean
  pesquisar?: string
}

export interface FiltroBancoDisclaimerModel {
  nome?: FiltroDisclaimerModel
}

export interface BancoModel{
  id?: string
  nome: string
  descricao: string
  responsavel: string
  responsavelNome: string
  ativo: boolean
}

export interface ItemBancoModel {
  id: string
  nome: string
  nomeFormatado: string
  ativo: boolean
}

export const listaColunasBanco = [
  {
    property: 'nomeFormatado',
    label: 'Banco'
  },
  {
    property: 'responsavelNome',
    label: 'Responsável',
  },
  {
    property: 'ativo',
    label: 'Status',
    type: 'cellTemplate'
  }
]
