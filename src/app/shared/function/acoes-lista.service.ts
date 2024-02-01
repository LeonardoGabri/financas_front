const acaoEditarRemover = (
  editar: Function,
  remover: Function
) => {
  return [
    {
      action: editar,
      icon: 'po-icon po-icon-edit',
      label: 'Editar'
    },
    {
      action: remover,
      icon: 'po-icon po-icon-delete',
      label: 'Remover'
    },
  ]
}

const acaoVisualizarEditarRemover = (
  visualizar: Function,
  editar: Function,
  remover: Function
) => {
  return [
    {
      action: visualizar,
      icon: 'po-icon po-icon-eye',
      label: 'Visualizar'
    },
    {
      action: editar,
      icon: 'po-icon po-icon-edit',
      label: 'Editar'
    },
    {
      action: remover,
      icon: 'po-icon po-icon-delete',
      label: 'Remover'
    },
  ]
}

export {acaoEditarRemover, acaoVisualizarEditarRemover}
