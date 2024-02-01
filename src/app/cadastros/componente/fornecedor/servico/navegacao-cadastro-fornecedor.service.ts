import { navegacaoCadastroFornecedor } from "src/app/cadastros/servico/navegacao-cadastro-data.service";

const navegacaoCadastroFornecedorLista = {
  label: navegacaoCadastroFornecedor.label,
  link: `${navegacaoCadastroFornecedor.link}/lista`
}

const navegacaoCadastroFornecedorCadastro = {
  label: undefined,
  link: `${navegacaoCadastroFornecedor.link}/cadastro`
}

const navegacaoCadastroFornecedorNovo = {
  label: 'Novo Fornecedor',
  link: `${navegacaoCadastroFornecedorCadastro.link}/novo`
}

const navegacaoCadastroFornecedorEditar = (id: string) => {
  return {
    label: 'Editar Fornecedor',
    link: `${navegacaoCadastroFornecedorCadastro.link}/editar/${id}`
  }
}

export {
  navegacaoCadastroFornecedorLista,
  navegacaoCadastroFornecedorCadastro,
  navegacaoCadastroFornecedorNovo,
  navegacaoCadastroFornecedorEditar
}
