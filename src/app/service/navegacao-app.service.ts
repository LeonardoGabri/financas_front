import { PoMenuItem } from '@po-ui/ng-components';

const navegacaoCadastroBanco = {
  label: "Bancos",
  link: `/cadastros/banco`
}

const navegacaoCadastroResponsavel = {
  label: "Responsável",
  link: `/cadastros/responsavel`
}

const navegacaoCadastroFornecedor = {
  label: "Fornecedor",
  link: `/cadastros/fornecedor`
}

const navegacaoCadastroSubgrupo = {
  label: "Subgrupo",
  link: `/cadastros/subgrupo`
}

const navegacaoCadastroGrupo = {
  label: "Grupo",
  link: `/cadastros/grupo`
}

const navegacaoDespesasCompra = {
  label: "Compra",
  link: `/despesas/compra`
}

const navegacaoDespesasParcela = {
  label: "Parcela",
  link: `/despesas/parcela`
}

const navegacaAppInicio = {
  label: 'Início',
  link: 'inicio',
}

const navegacaAppCadastros = {
  label: 'Cadastros',
  link: '/cadastros',
  subItems: [
    navegacaoCadastroBanco,
    navegacaoCadastroResponsavel,
    navegacaoCadastroFornecedor,
    navegacaoCadastroSubgrupo,
    navegacaoCadastroGrupo
  ]
}

const navegacaAppDespesas = {
  label: 'Saídas',
  link: '/despesas',
  subItems: [
    navegacaoDespesasCompra,
    navegacaoDespesasParcela
  ]
}

const menuArrayFinancas = [
  navegacaAppCadastros,
  navegacaAppDespesas
] as PoMenuItem[]

export {navegacaAppInicio, navegacaAppCadastros, navegacaAppDespesas, menuArrayFinancas}
