import { PoMenuItem } from "@po-ui/ng-components";
import { navegacaAppDespesas } from "src/app/service/navegacao-app.service";

const navegacaoDespesasCompra = {
  label: "Compra",
  link: `${navegacaAppDespesas.link}/compra`
}

const navegacaoDespesasParcela = {
  label: "Parcela",
  link: `${navegacaAppDespesas.link}/parcela`
}

const menuDespesaArray = [
  navegacaoDespesasCompra,
  navegacaoDespesasParcela
] as PoMenuItem[]

export {
  navegacaoDespesasCompra,
  navegacaoDespesasParcela,
  menuDespesaArray
}
