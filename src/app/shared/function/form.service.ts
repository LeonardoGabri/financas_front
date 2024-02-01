import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { PoDialogService } from "@po-ui/ng-components";

const marcarFormularioAlterado = (form: FormGroup) => {
  Object.values(form.controls).forEach((control) => {
    control.markAsTouched();
    control.markAsDirty();

    if((control as any).controls){
      marcarFormularioAlterado(control as FormGroup);
    }
  })
}

const verificarFormularioAlterado = async (
  navegacao: string[],
  formulario: FormGroup,
  router: Router,
  poDialog: PoDialogService
) => {
  if (formulario?.pristine) {
    router.navigate(navegacao);
  } else {
    poDialog.confirm({
      title: 'Atenção',
      message: 'Tem certeza que deseja sair? Todas as alterações serão perdidas.',
      confirm: () => router.navigate(navegacao),
    });
  }
};

const promiseFormularioAlterado = (
  formulario: FormGroup,
  poDialog: PoDialogService
) => {
  if (formulario?.pristine) {
    return true;
  }
  return new Promise<boolean>((resolve) => {
    poDialog.confirm({
      title: 'Atenção',
      message: 'Tem certeza que deseja sair? Todas as alterações serão perdidas.',
      confirm: function () {
        resolve(true);
      },
      cancel: function () {
        resolve(false);
      },
    });
  });
};

export {
  marcarFormularioAlterado,
  verificarFormularioAlterado,
  promiseFormularioAlterado
}
