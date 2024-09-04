export function popup (titulo,horario,mensaje){
    let template = `<div class="modal " tabindex="-1" id="estemodal">
    <div class="modal-dialog bg-success">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${titulo} ${horario}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>${mensaje}.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">Aceptar</button>
        </div>
      </div>
    </div>
  </div>`;
  return template;

}

