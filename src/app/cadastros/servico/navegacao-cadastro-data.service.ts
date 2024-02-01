import { PoMenuItem } from "@po-ui/ng-components";
import { navegacaAppCadastros } from "src/app/service/navegacao-app.service";

const navegacaoCadastroBanco = {
  label: "Bancos",
  link: `${navegacaAppCadastros.link}/banco`
}

const navegacaoCadastroResponsavel = {
  label: "Responsável",
  link: `${navegacaAppCadastros.link}/responsavel`
}

const navegacaoCadastroFornecedor = {
  label: "Fornecedor",
  link: `${navegacaAppCadastros.link}/fornecedor`
}

const navegacaoCadastroSubgrupo = {
  label: "Subgrupo",
  link: `${navegacaAppCadastros.link}/subgrupo`
}

const navegacaoCadastroGrupo = {
  label: "Grupo",
  link: `${navegacaAppCadastros.link}/grupo`
}

const menuCadastroArray = [
  navegacaoCadastroBanco,
  navegacaoCadastroResponsavel,
  navegacaoCadastroFornecedor,
  navegacaoCadastroGrupo,
  navegacaoCadastroSubgrupo
] as PoMenuItem[]

export {
  navegacaoCadastroBanco,
  navegacaoCadastroResponsavel,
  navegacaoCadastroFornecedor,
  navegacaoCadastroGrupo,
  navegacaoCadastroSubgrupo,
  menuCadastroArray
}
