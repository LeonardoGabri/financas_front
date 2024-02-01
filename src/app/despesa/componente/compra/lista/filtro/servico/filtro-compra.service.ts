import { FiltroCompraDisclaimerModel } from "../../../modelo/compra.model";

const filtroCompraDisclaimer = {
  bancoId: {
    label: 'Banco',
    value: undefined,
    object: undefined,
    property: 'filtroCompras',
    fLabel: (item: any) => {
      return `${item.label}: ${item.value}`
    },
  },
  fornecedorId: {
    label: 'Fornecedor',
    value: undefined,
    object: undefined,
    property: 'filtroCompras',
    fLabel: (item: any) => {
      return `${item.label}: ${item.value}`
    },
  },
  subgrupoId: {
    label: 'SubGrupo',
    value: undefined,
    object: undefined,
    property: 'filtroCompras',
    fLabel: (item: any) => {
      return `${item.label}: ${item.object}`
    },
  },
  dataInicio: {
    label: 'Data Início',
    value: undefined,
    object: undefined,
    property: 'filtroCompras',
    fLabel: (item: any) => {
      return `${item.label}: ${item.object}`
    },
  },
  dataFim: {
    label: 'Data Fim',
    value: undefined,
    object: undefined,
    property: 'filtroCompras',
    fLabel: (item: any) => {
      return `${item.label}: ${item.object}`
    },
  },
} as FiltroCompraDisclaimerModel

export {filtroCompraDisclaimer}
