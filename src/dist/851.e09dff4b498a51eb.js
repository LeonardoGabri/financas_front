"use strict";(self.webpackChunkfront_financas=self.webpackChunkfront_financas||[]).push([[851],{3851:(A,h,r)=>{r.r(h),r.d(h,{GrupoFormModule:()=>P});var v=r(6895),n=r(433),l=r(8654),m=r(4229),p=r(1886),d=r(1147),u=r(5801),t=r(4650),f=r(1481),g=r(9809);const b=[{path:"",component:(()=>{class e{constructor(o,i,a,s,c,S,G){this.formBuilder=o,this.route=i,this.router=a,this.poDialogService=s,this.poNotification=c,this.titleService=S,this.grupoApiService=G,this.nomePrincipal=p.sP.label,this.navegacao={items:[{label:this.nomePrincipal,action:this.verificarFormulario.bind(this)}]}}ngOnInit(){this.criarFormulario(),this.route.params.subscribe(o=>{o&&o.id?(this.nomePagina=(0,u.km)(o.id).label,this.grupoApiService.buscarGrupoPorId(o.id).subscribe({next:i=>{i&&(this.nomePagina=(0,u.km)(o.id).label,this.formulario.patchValue(i))},error:({error:i})=>{this.poNotification.error(i?.title?i.title:"Erro no servidor"),console.error(i)},complete:()=>{this.navegacao.items.push({label:this.nomePagina}),this.titleService.setTitle(`${this.nomePagina} - Motor Fiscal`)}})):(this.nomePagina=u.Nl.label,this.navegacao.items.push({label:this.nomePagina}),this.titleService.setTitle(`${this.nomePagina} - Motor Fiscal`))})}criarFormulario(o){this.formulario=this.formBuilder.group({id:[o?.id],nome:[o?.nome],descricao:[o?.descricao]})}verificarFormulario(o,i=[p.sP.link],a=this.formulario){(0,d.TR)(i,a,this.router,this.poDialogService)}cancelar(){this.verificarFormulario()}salvar(){if(this.formulario.markAsPristine(),this.formulario.valid){let o=this.formulario.getRawValue(),i=o.id;delete o.id,(i?this.grupoApiService.editarGrupo(i,o):this.grupoApiService.salvarGrupo(o)).subscribe({next:s=>{s&&(this.poNotification.success("Salvo com sucesso"),this.router.navigate([p.sP.link]))},error:({error:s})=>{let c={message:s?.title?s.title:"Erro no servidor",action:()=>{},actionLabel:""};s?.detail&&(c.action=()=>{this.poDialogService.alert({title:s?.title,message:s?.detail,ok:()=>!0})},c.actionLabel="Detalhes"),this.poNotification.error(c),console.error(s)}})}else(0,d.DD)(this.formulario),this.poNotification.error("Erro no formul\xe1rio")}static#t=this.\u0275fac=function(i){return new(i||e)(t.Y36(n.qu),t.Y36(m.gz),t.Y36(m.F0),t.Y36(l.Aw7),t.Y36(l.fRI),t.Y36(f.Dx),t.Y36(g.h))};static#i=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-grupo-form"]],decls:10,vars:3,consts:[[3,"p-title","p-breadcrumb","p-cancel","p-save"],[3,"formGroup"],[1,"po-row"],["formControlName","nome","p-label","Nome","p-clean","true","p-required","true",1,"po-md-12"],["formControlName","descricao","p-label","Descri\xe7\xe3o",1,"po-md-12"]],template:function(i,a){1&i&&(t.TgZ(0,"po-page-edit",0),t.NdJ("p-cancel",function(){return a.cancelar()})("p-save",function(){return a.salvar()}),t.TgZ(1,"po-container")(2,"form",1)(3,"div",2),t._UZ(4,"po-input",3),t.qZA(),t.TgZ(5,"div",2),t._UZ(6,"po-textarea",4),t.qZA()(),t._UZ(7,"br")(8,"br")(9,"br"),t.qZA()()),2&i&&(t.Q6J("p-title",a.nomePagina)("p-breadcrumb",a.navegacao),t.xp6(2),t.Q6J("formGroup",a.formulario))},dependencies:[l.PJf,l.xxV,l.gJm,l.k4n,n._Y,n.JJ,n.JL,n.sg,n.u],encapsulation:2})}return e})()}];let F=(()=>{class e{static#t=this.\u0275fac=function(i){return new(i||e)};static#i=this.\u0275mod=t.oAB({type:e});static#o=this.\u0275inj=t.cJS({imports:[m.Bz.forChild(b),m.Bz]})}return e})(),P=(()=>{class e{static#t=this.\u0275fac=function(i){return new(i||e)};static#i=this.\u0275mod=t.oAB({type:e});static#o=this.\u0275inj=t.cJS({imports:[v.ez,l.JBz,n.UX,n.u5,F]})}return e})()}}]);