import { FiltroParcelaDisclaimerModel } from "../../../modelo/parcela.model";

const filtroParcelasDisclaimer = {
  mesReferencia: {
    label: 'Mês',
    value: undefined,
    object: undefined,
    property: 'filtroParcelas',
    fLabel: (item: any) => {
      return `${item.label}: ${item.value}`
    },
  },
  anoReferencia: {
    label: 'Ano',
    value: undefined,
    object: undefined,
    property: 'filtroParcelas',
    fLabel: (item: any) => {
      return `${item.label}: ${item.value}`
    },
  },
  responsavelId: {
    label: 'Responsável',
    value: undefined,
    object: undefined,
    property: 'filtroParcelas',
    fLabel: (item: any) => {
      return `${item.label}: ${item.object}`
    },
  },
} as FiltroParcelaDisclaimerModel

export {filtroParcelasDisclaimer}
