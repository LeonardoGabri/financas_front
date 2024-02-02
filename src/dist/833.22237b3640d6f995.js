"use strict";(self.webpackChunkfront_financas=self.webpackChunkfront_financas||[]).push([[833],{7833:(C,u,r)=>{r.r(u),r.d(u,{FornecedorFormModule:()=>S});var f=r(6895),n=r(433),l=r(8654),m=r(4229),p=r(1886),h=r(1147),d=r(6364),e=r(4650),v=r(1481),g=r(3671);const F=[{path:"",component:(()=>{class i{constructor(o,t,a,s,c,P,A){this.formBuilder=o,this.route=t,this.router=a,this.poDialogService=s,this.poNotification=c,this.titleService=P,this.fornecedorApiService=A,this.nomePrincipal=p.UW.label,this.navegacao={items:[{label:this.nomePrincipal,action:this.verificarFormulario.bind(this)}]}}ngOnInit(){this.criarFormulario(),this.route.params.subscribe(o=>{o&&o.id?(this.nomePagina=(0,d.M7)(o.id).label,this.fornecedorApiService.buscarFornecedorPorId(o.id).subscribe({next:t=>{t&&(this.nomePagina=(0,d.M7)(o.id).label,this.formulario.patchValue(t))},error:({error:t})=>{this.poNotification.error(t?.title?t.title:"Erro no servidor"),console.error(t)},complete:()=>{this.navegacao.items.push({label:this.nomePagina}),this.titleService.setTitle(`${this.nomePagina} - Motor Fiscal`)}})):(this.nomePagina=d.q3.label,this.navegacao.items.push({label:this.nomePagina}),this.titleService.setTitle(`${this.nomePagina} - Motor Fiscal`))})}criarFormulario(o){this.formulario=this.formBuilder.group({id:[o?.id],ativo:[null==o?.ativo||o?.ativo],nome:[o?.nome],descricao:[o?.descricao]})}verificarFormulario(o,t=[p.UW.link],a=this.formulario){(0,h.TR)(t,a,this.router,this.poDialogService)}cancelar(){this.verificarFormulario()}salvar(){if(this.formulario.markAsPristine(),this.formulario.valid){let o=this.formulario.getRawValue(),t=o.id;delete o.id,(t?this.fornecedorApiService.editarFornecedor(t,o):this.fornecedorApiService.salvarFornecedor(o)).subscribe({next:s=>{s&&(this.poNotification.success("Salvo com sucesso"),this.router.navigate([p.UW.link]))},error:({error:s})=>{let c={message:s?.title?s.title:"Erro no servidor",action:()=>{},actionLabel:""};s?.detail&&(c.action=()=>{this.poDialogService.alert({title:s?.title,message:s?.detail,ok:()=>!0})},c.actionLabel="Detalhes"),this.poNotification.error(c),console.error(s)}})}else(0,h.DD)(this.formulario),this.poNotification.error("Erro no formul\xe1rio")}static#e=this.\u0275fac=function(t){return new(t||i)(e.Y36(n.qu),e.Y36(m.gz),e.Y36(m.F0),e.Y36(l.Aw7),e.Y36(l.fRI),e.Y36(v.Dx),e.Y36(g.M))};static#o=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-fornecedor-form"]],decls:12,vars:3,consts:[[3,"p-title","p-breadcrumb","p-cancel","p-save"],[3,"formGroup"],[1,"po-row"],["formControlName","nome","p-label","Nome","p-clean","true","p-required","true",1,"po-md-10"],[1,"po-md-2",2,"display","flex","flex-direction","row-reverse"],["formControlName","ativo","p-label","Situa\xe7\xe3o","p-label-on","Ativo","p-label-off","Inativo","p-required","true",2,"width","155px"],["formControlName","descricao","p-label","Descri\xe7\xe3o",1,"po-md-12"]],template:function(t,a){1&t&&(e.TgZ(0,"po-page-edit",0),e.NdJ("p-cancel",function(){return a.cancelar()})("p-save",function(){return a.salvar()}),e.TgZ(1,"po-container")(2,"form",1)(3,"div",2),e._UZ(4,"po-input",3),e.TgZ(5,"div",4),e._UZ(6,"po-switch",5),e.qZA()(),e.TgZ(7,"div",2),e._UZ(8,"po-textarea",6),e.qZA()(),e._UZ(9,"br")(10,"br")(11,"br"),e.qZA()()),2&t&&(e.Q6J("p-title",a.nomePagina)("p-breadcrumb",a.navegacao),e.xp6(2),e.Q6J("formGroup",a.formulario))},dependencies:[l.PJf,l.xxV,l.gJm,l.nrg,l.k4n,n._Y,n.JJ,n.JL,n.sg,n.u],encapsulation:2})}return i})()}];let b=(()=>{class i{static#e=this.\u0275fac=function(t){return new(t||i)};static#o=this.\u0275mod=e.oAB({type:i});static#t=this.\u0275inj=e.cJS({imports:[m.Bz.forChild(F),m.Bz]})}return i})(),S=(()=>{class i{static#e=this.\u0275fac=function(t){return new(t||i)};static#o=this.\u0275mod=e.oAB({type:i});static#t=this.\u0275inj=e.cJS({imports:[f.ez,l.JBz,n.UX,n.u5,b]})}return i})()}}]);