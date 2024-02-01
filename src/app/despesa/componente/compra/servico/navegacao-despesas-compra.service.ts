import { navegacaoDespesasCompra } from "src/app/despesa/servico/navegacao-despesas-data.service"

const navegacaoDespesaCompraLista = {
  label: navegacaoDespesasCompra.label,
  link: `${navegacaoDespesasCompra.link}/lista`
}

const navegacaoDespesaCompraCadastro = {
  label: undefined,
  link: `${navegacaoDespesasCompra.link}/cadastro`
}

const navegacaoDespesaCompraNovo = {
  label: 'Nova Compra',
  link: `${navegacaoDespesaCompraCadastro.link}/novo`
}

const navegacaoDespesaCompraVisualizar = (id: string) => {
  return {
    label: 'Visualizar Compra',
    link: `${navegacaoDespesaCompraCadastro.link}/visualizar/${id}`
  }
}

const navegacaoDespesaCompraEditar = (id: string) => {
  return {
    label: 'Editar Compra',
    link: `${navegacaoDespesaCompraCadastro.link}/editar/${id}`
  }
}

export {
  navegacaoDespesaCompraLista,
  navegacaoDespesaCompraCadastro,
  navegacaoDespesaCompraNovo,
  navegacaoDespesaCompraEditar,
  navegacaoDespesaCompraVisualizar
}
