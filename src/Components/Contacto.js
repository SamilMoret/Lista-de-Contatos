import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhoneVolume, faTrashAlt, faUser,faPen} from '@fortawesome/free-solid-svg-icons'

import './Contacto.css'
export default function Contacto(props) {
  
       return(

<div className="mx-2">
    <div className="container componente-contacto my-4">
        <div className="row">
            <div className="col p-2">
                <h5>
                    <FontAwesomeIcon icon={faUser} className='me-3'/>
                    {props.nome}
                </h5>
            </div>
            <div className="col p-2">
                <h5>
                    <FontAwesomeIcon icon={faPhoneVolume}className='me-3'/>
                    {props.telefone}
                </h5>
            </div>
                
            <div className="col p-2">
                <h5>
                    <FontAwesomeIcon icon={faEnvelope} className='me-3'/>
                    {props.email}
                </h5>
            </div>
            
            <div className="col p-2 tex-end">
                <h5>
                <li>
                  <button className="editar" 
                  onClick={() =>props.onUpdate({nome:props.nome, telefone:props.telefone, email:props.email, id:props.id})}>
                  <FontAwesomeIcon icon={faPen}className='me-3'/>Editar</button>

                  <button className="excluir" 
                  onClick={() => props.onDelete(props.id)}>
                  <FontAwesomeIcon icon={faTrashAlt}className='me-3'/>Excluir</button>
                  
                </li>
                </h5>
            </div>
        </div>      
    </div>
</div>
       );

}
