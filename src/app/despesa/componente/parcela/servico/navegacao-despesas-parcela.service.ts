import { navegacaoDespesasParcela } from "src/app/despesa/servico/navegacao-despesas-data.service"

const navegacaoDespesaParcelaLista = {
  label: navegacaoDespesasParcela.label,
  link: `${navegacaoDespesasParcela.link}/lista`
}

const navegacaoDespesaParcelaCadastro = {
  label: undefined,
  link: `${navegacaoDespesasParcela.link}/cadastro`
}

const navegacaoDespesaParcelaNovo = {
  label: 'Nova Parcela',
  link: `${navegacaoDespesaParcelaCadastro.link}/novo`
}

const navegacaoDespesaParcelaEditar = (id: string) => {
  return {
    label: 'Editar Parcela',
    link: `${navegacaoDespesaParcelaCadastro.link}/editar/${id}`
  }
}

export {
  navegacaoDespesaParcelaLista,
  navegacaoDespesaParcelaCadastro,
  navegacaoDespesaParcelaNovo,
  navegacaoDespesaParcelaEditar
}
