"use strict";(self.webpackChunkfront_financas=self.webpackChunkfront_financas||[]).push([[143],{5143:(C,d,n)=>{n.r(d),n.d(d,{CadastroModule:()=>y});var e=n(6895),i=n(8654),l=n(4229),r=n(1886),h=n(727),u=n(2740),v=n(1028),o=n(4650),m=n(1481);const f=["menuCadastro"],g=[{path:"",component:(()=>{class t{constructor(s,a,c){this.titleService=s,this.router=a,this.changeDetectorRef=c,this.menus=r.Pq,this.menu$=new h.w0}ngOnDestroy(){this.menu$.unsubscribe()}ngOnInit(){this.titleService.setTitle(u.hE.label+" - Finan\xe7as"),this.selecionaLinkMenu(),this.menu$=v.Z.subscribe(()=>{this.selecionaLinkMenu()})}selecionaLinkMenu(){let s=this.router.url;s&&r.Pq.every(a=>!a.link||!s.includes(a.link)||(this.changeDetectorRef.detectChanges(),this.menuCadastro.checkActiveMenuByUrl(a.link),!1))}static#n=this.\u0275fac=function(a){return new(a||t)(o.Y36(m.Dx),o.Y36(l.F0),o.Y36(o.sBO))};static#t=this.\u0275cmp=o.Xpm({type:t,selectors:[["app-cadastro"]],viewQuery:function(a,c){if(1&a&&o.Gf(f,7),2&a){let p;o.iGM(p=o.CRH())&&(c.menuCadastro=p.first)}},decls:4,vars:1,consts:[[3,"p-menus"],["menuCadastro",""],[1,"po-wrapper"]],template:function(a,c){1&a&&(o._UZ(0,"po-menu",0,1),o.TgZ(2,"div",2),o._UZ(3,"router-outlet"),o.qZA()),2&a&&o.Q6J("p-menus",c.menus)},dependencies:[i.Nu_,l.lC],encapsulation:2})}return t})(),children:[{path:"banco",loadChildren:()=>n.e(405).then(n.bind(n,6405)).then(t=>t.BancoModule)},{path:"responsavel",loadChildren:()=>n.e(232).then(n.bind(n,1232)).then(t=>t.ResponsavelModule)},{path:"fornecedor",loadChildren:()=>n.e(730).then(n.bind(n,2730)).then(t=>t.FornecedorModule)},{path:"grupo",loadChildren:()=>n.e(149).then(n.bind(n,149)).then(t=>t.GrupoModule)},{path:"subgrupo",loadChildren:()=>n.e(561).then(n.bind(n,3561)).then(t=>t.SubgrupoModule)},{path:"",redirectTo:"banco",pathMatch:"full"}]}];let M=(()=>{class t{static#n=this.\u0275fac=function(a){return new(a||t)};static#t=this.\u0275mod=o.oAB({type:t});static#o=this.\u0275inj=o.cJS({imports:[l.Bz.forChild(g),l.Bz]})}return t})(),y=(()=>{class t{static#n=this.\u0275fac=function(a){return new(a||t)};static#t=this.\u0275mod=o.oAB({type:t});static#o=this.\u0275inj=o.cJS({imports:[e.ez,i.JBz,M]})}return t})()},1886:(C,d,n)=>{n.d(d,{Pq:()=>v,UW:()=>r,c2:()=>i,f8:()=>l,sP:()=>u,yj:()=>h});var e=n(2740);const i={label:"Bancos",link:`${e.hE.link}/banco`},l={label:"Respons\xe1vel",link:`${e.hE.link}/responsavel`},r={label:"Fornecedor",link:`${e.hE.link}/fornecedor`},h={label:"Subgrupo",link:`${e.hE.link}/subgrupo`},u={label:"Grupo",link:`${e.hE.link}/grupo`},v=[i,l,r,u,h]}}]);