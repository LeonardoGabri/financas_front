import { navegacaoCadastroGrupo } from "src/app/cadastros/servico/navegacao-cadastro-data.service";

const navegacaoCadastroGrupoLista = {
  label: navegacaoCadastroGrupo.label,
  link: `${navegacaoCadastroGrupo.link}/lista`
}

const navegacaoCadastroGrupoCadastro = {
  label: undefined,
  link: `${navegacaoCadastroGrupo.link}/cadastro`
}

const navegacaoCadastroGrupoNovo = {
  label: 'Novo Grupo',
  link: `${navegacaoCadastroGrupoCadastro.link}/novo`
}

const navegacaoCadastroGrupoEditar = (id: string) => {
  return {
    label: 'Editar Grupo',
    link: `${navegacaoCadastroGrupoCadastro.link}/editar/${id}`
  }
}

export {
  navegacaoCadastroGrupoLista,
  navegacaoCadastroGrupoCadastro,
  navegacaoCadastroGrupoNovo,
  navegacaoCadastroGrupoEditar
}
