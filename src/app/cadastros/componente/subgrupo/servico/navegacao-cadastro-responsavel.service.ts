import { navegacaoCadastroSubgrupo } from "src/app/cadastros/servico/navegacao-cadastro-data.service";

const navegacaoCadastroSubgrupoLista = {
  label: navegacaoCadastroSubgrupo.label,
  link: `${navegacaoCadastroSubgrupo.link}/lista`
}

const navegacaoCadastroSubgrupoCadastro = {
  label: undefined,
  link: `${navegacaoCadastroSubgrupo.link}/cadastro`
}

const navegacaoCadastroSubgrupoNovo = {
  label: 'Novo Subgrupo',
  link: `${navegacaoCadastroSubgrupoCadastro.link}/novo`
}

const navegacaoCadastroSubgrupoEditar = (id: string) => {
  return {
    label: 'Editar Subgrupo',
    link: `${navegacaoCadastroSubgrupoCadastro.link}/editar/${id}`
  }
}

export {
  navegacaoCadastroSubgrupoLista,
  navegacaoCadastroSubgrupoCadastro,
  navegacaoCadastroSubgrupoNovo,
  navegacaoCadastroSubgrupoEditar
}
