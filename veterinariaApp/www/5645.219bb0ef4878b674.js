"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5645],{5645:(E,g,s)=>{s.r(g),s.d(g,{MascotaFormPageModule:()=>R});var u=s(8434),d=s(4341),r=s(7125),M=s(33),p=s(467),o=s(1360),f=s(7291),h=s(3923);function b(a,i){1&a&&(o.j41(0,"ion-text",12),o.EFF(1," El nombre es obligatorio. "),o.k0s())}function j(a,i){1&a&&(o.j41(0,"ion-text",12),o.EFF(1," El tipo de mascota es obligatorio. "),o.k0s())}function P(a,i){1&a&&(o.j41(0,"ion-text",12),o.EFF(1," La edad debe ser un n\xfamero mayor a 0. "),o.k0s())}const v=[{path:"",component:(()=>{var a;class i{constructor(e,t){this.storageService=e,this.router=t,this.mascota={nombre:"",tipo:"",edad:null}}ngOnInit(){}guardarMascota(){var e=this;return(0,p.A)(function*(){const t=yield e.storageService.get("usuario_actual");t?(yield e.storageService.saveOrUpdateMascota(t,e.mascota),e.router.navigate(["/historial-medico"])):alert("No se ha encontrado el usuario actual")})()}}return(a=i).\u0275fac=function(e){return new(e||a)(o.rXU(f.n),o.rXU(h.Ix))},a.\u0275cmp=o.VBU({type:a,selectors:[["app-mascota-form"]],standalone:!1,decls:27,vars:7,consts:[["form","ngForm"],["nombre","ngModel"],["tipo","ngModel"],["edad","ngModel"],[1,"ion-padding"],[3,"ngSubmit"],["position","floating"],["name","nombre","required","",3,"ngModelChange","ngModel"],["color","danger",4,"ngIf"],["name","tipo","required","",3,"ngModelChange","ngModel"],["type","number","name","edad","required","","min","1",3,"ngModelChange","ngModel"],["expand","full","type","submit",3,"disabled"],["color","danger"]],template:function(e,t){if(1&e){const l=o.RV6();o.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),o.EFF(3,"Registrar Mascota"),o.k0s()()(),o.j41(4,"ion-content",4)(5,"form",5,0),o.bIt("ngSubmit",function(){return o.eBV(l),o.Njj(t.guardarMascota())}),o.j41(7,"ion-item")(8,"ion-label",6),o.EFF(9,"Nombre de la Mascota"),o.k0s(),o.j41(10,"ion-input",7,1),o.mxI("ngModelChange",function(n){return o.eBV(l),o.DH7(t.mascota.nombre,n)||(t.mascota.nombre=n),o.Njj(n)}),o.k0s()(),o.DNE(12,b,2,0,"ion-text",8),o.j41(13,"ion-item")(14,"ion-label",6),o.EFF(15,"Tipo de Mascota"),o.k0s(),o.j41(16,"ion-input",9,2),o.mxI("ngModelChange",function(n){return o.eBV(l),o.DH7(t.mascota.tipo,n)||(t.mascota.tipo=n),o.Njj(n)}),o.k0s()(),o.DNE(18,j,2,0,"ion-text",8),o.j41(19,"ion-item")(20,"ion-label",6),o.EFF(21,"Edad"),o.k0s(),o.j41(22,"ion-input",10,3),o.mxI("ngModelChange",function(n){return o.eBV(l),o.DH7(t.mascota.edad,n)||(t.mascota.edad=n),o.Njj(n)}),o.k0s()(),o.DNE(24,P,2,0,"ion-text",8),o.j41(25,"ion-button",11),o.EFF(26," Registrar Mascota "),o.k0s()()()}if(2&e){const l=o.sdS(6),c=o.sdS(11),n=o.sdS(17),F=o.sdS(23);o.R7$(10),o.R50("ngModel",t.mascota.nombre),o.R7$(2),o.Y8G("ngIf",c.invalid&&c.touched),o.R7$(4),o.R50("ngModel",t.mascota.tipo),o.R7$(2),o.Y8G("ngIf",n.invalid&&n.touched),o.R7$(4),o.R50("ngModel",t.mascota.edad),o.R7$(2),o.Y8G("ngIf",F.invalid&&F.touched),o.R7$(),o.Y8G("disabled",l.invalid)}},dependencies:[u.bT,d.qT,d.BC,d.cb,d.YS,d.vS,d.cV,r.Jm,r.W9,r.eU,r.$w,r.uz,r.he,r.IO,r.BC,r.ai,r.su,r.Gw,r.T6],encapsulation:2}),i})()}];let C=(()=>{var a;class i{}return(a=i).\u0275fac=function(e){return new(e||a)},a.\u0275mod=o.$C({type:a}),a.\u0275inj=o.G2t({imports:[M.iI.forChild(v),M.iI]}),i})(),R=(()=>{var a;class i{}return(a=i).\u0275fac=function(e){return new(e||a)},a.\u0275mod=o.$C({type:a}),a.\u0275inj=o.G2t({imports:[u.MD,d.YN,r.bv,C]}),i})()}}]);