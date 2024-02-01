import { navegacaoCadastroBanco } from "src/app/cadastros/servico/navegacao-cadastro-data.service";

const navegacaoCadastroBancoLista = {
  label: navegacaoCadastroBanco.label,
  link: `${navegacaoCadastroBanco.link}/lista`
}

const navegacaoCadastroBancoCadastro = {
  label: undefined,
  link: `${navegacaoCadastroBanco.link}/cadastro`
}

const navegacaoCadastroBancoNovo = {
  label: 'Novo Banco',
  link: `${navegacaoCadastroBancoCadastro.link}/novo`
}

const navegacaoCadastroBancoEditar = (id: string) => {
  return {
    label: 'Editar Banco',
    link: `${navegacaoCadastroBancoCadastro.link}/editar/${id}`
  }
}

export {
  navegacaoCadastroBancoLista,
  navegacaoCadastroBancoCadastro,
  navegacaoCadastroBancoNovo,
  navegacaoCadastroBancoEditar
}
