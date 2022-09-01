import React from "react";
import './Modal.css';

const Modal= ({ handleCancelar,handleDelete}) => {
     return(
      
<div>
  <div className="modal-content">
    <div className="modal-background">
      <div className="modal-center">
          <h3>Vocé tem certeza de de excluir este Contacto?</h3>
          <label>Esta acção é irreversível, tem certeza mesmo?</label>
      <div className="modal-button">
        <button className="acep" onClick= {handleDelete}>Confirmar</button>
        <button className="cance" onClick= {handleCancelar}>Cancelar</button>
      </div>
      </div>
    </div>
  </div>
</div>     

     )

}
 export {Modal}


  