import { navegacaoCadastroResponsavel } from "src/app/cadastros/servico/navegacao-cadastro-data.service";

const navegacaoCadastroResponsavelLista = {
  label: navegacaoCadastroResponsavel.label,
  link: `${navegacaoCadastroResponsavel.link}/lista`
}

const navegacaoCadastroResponsavelCadastro = {
  label: undefined,
  link: `${navegacaoCadastroResponsavel.link}/cadastro`
}

const navegacaoCadastroResponsavelNovo = {
  label: 'Novo Responsável',
  link: `${navegacaoCadastroResponsavelCadastro.link}/novo`
}

const navegacaoCadastroResponsavelEditar = (id: string) => {
  return {
    label: 'Editar Responsável',
    link: `${navegacaoCadastroResponsavelCadastro.link}/editar/${id}`
  }
}

export {
  navegacaoCadastroResponsavelLista,
  navegacaoCadastroResponsavelCadastro,
  navegacaoCadastroResponsavelNovo,
  navegacaoCadastroResponsavelEditar
}
