import React, {useState, useRef, useEffect} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList} from '@fortawesome/free-solid-svg-icons'
import "./App.css"
import {Modal} from './Components/Modal/Modal';
import { v4 as senha } from 'uuid';
import Contacto from "./Components/Contacto";


export default function App() {
   

  // states
    
    const [contacto, setContacto] = useState({ id: '', nome: '', telefone: '', email: ''})
    const [listaContactos, setListaContactos] = useState([])
    const [busqueda, setBusqueda]= useState("")
    const[showModal,setShowModal] = useState(false);
    const [isUpadate, setIsUpdate] = useState();
  // useRef
  const inputNome = useRef()
  const inputTelefone = useRef()
  const inputEmail = useRef()
  
  const handleSubimit = async (evento) => {
      evento.preventDefault()
      setContacto({nome: '', telefone: '', email: ''});
      const data = {
         'nome': contacto.nome,
         'telefone': contacto.telefone,
         'email': contacto.email,

      }
   console.log("data", data);
   const response = await fetch('http://localhost:3000/contactos/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {"Content-type": "application/json; charset=UTF-8"}
   
  });

  if (response.ok){
     console.log("OKS", response.ok);
     fetchAll()}
  else
      console.log('ERRO');

}

function fetchAll() {
  fetch('http://localhost:3000/contactos')
    .then((response) => response.json())
    .then(data => setListaContactos(data));
    
};

useEffect(() => {
  fetchAll();
}, []);


const handleDelete = async ()=> {
  const response = await fetch(`http://localhost:3000/contactos/${contacto.id}`, {
    method: 'DELETE',
  } )

if (response.ok) {
  alert("Deletadeo con suceso");
  fetchAll();
}
  setShowModal(false);
}

const onDelete = (id) => {
   setContacto({...contacto, id});
   setShowModal(true);
}

const handleCancelar = () =>{
  setContacto({ id: '', nome: '', telefone: '', email: ''});
  setShowModal(false);
}

const onUpdate = (contacto) => {
  
    setIsUpdate(true)
    setContacto(contacto);

}


const handleUpdate = async (evento) => {
  evento.preventDefault()
 
  const response = await fetch(`http://localhost:3000/contactos/${contacto.id}`,{
    method:"PATCH",
    body: JSON.stringify({
      nome: contacto.nome,
      telefone: contacto.telefone,
      email: contacto.email
    }),
    headers: {"Content-type":  "application/json; charset=UTF-8"}
  });
   
    
  if (response.ok){
     console.log("OKS", response.ok);
     setIsUpdate(false);
     setContacto({ nome: '', telefone: '', email: ''});
     fetchAll();
  } 
  else{

  }

}

  // métodos
  function definirNome(event) {
       setContacto({...contacto, nome: event.target.value})
  }

  function definirTelefone(event) {
    setContacto({...contacto, telefone: event.target.value})
}
  function definirEmail(event) {
  setContacto({...contacto, email: event.target.value})
}

  function adicionarContacto(){

      // validação dos campos
      if (!contacto.nome || !contacto.telefone  || !contacto.email ) 
      return

      // Adicionar novo contacto a lista

      setListaContactos([...listaContactos, {...contacto, id: senha()}])

      // Limpar o contacto
      setContacto({nome:'', telefone:'', email:''})


     } 
     function enterAdicionarContacto(event){
        if(event.code === 'Enter') {
             adicionarContacto()

        }
     } 

     // carregar listaContactos do localStorage
     useEffect(()=>{
          if(localStorage.getItem('meus-contactos') !== null){
            
             setListaContactos(JSON.parse(localStorage.getItem('meus-contactos')))
          }
       }, [])
          
    // atualizar a lista de contactos no localStorage
    useEffect(() => {
        localStorage.setItem('meus-contactos', JSON.stringify(listaContactos) )
    }, [listaContactos])
    const listaContactosFiltrada = listaContactos.filter(contacto => contacto.nome.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase()))
        .sort(function(contactoA, contactoB){
        if(contactoA.nome.toLocaleLowerCase() < contactoB.nome.toLocaleLowerCase()) return -1
        if(contactoA.nome.toLocaleLowerCase() > contactoB.nome.toLocaleLowerCase()) return 1
        else return 0
        })

    // remover um contacto da lista
    function removerContacto(id){
         let temporal = listaContactos.filter(contacto => contacto.id !== id)
         setListaContactos(temporal)

    }

    return( 
    
    <>

        <div className="container-fluid nave">
          <div className="row">
            <div className="col text">
               <div className="text-center-end">
                <nav className="navbar navbar-dark">
                     <input placeholder="Buscar Contacto..." type="text" 
                     value={busqueda} 
                     onChange={(e)=>setBusqueda(e.target.value)} />
                 </nav>
               </div>      
            </div>
          </div>
        </div>
       
          
         <div className="container-fluid titulo">
              <div className="row">
                  <div className="col text-center">
                      <h4 className="text-center"><FontAwesomeIcon icon={faList} className="me-4" />LISTA DE CONTACTOS</h4>     
                      <h5 className="text-center">Turma 16</h5>
                  </div>
              </div> 
         </div>

  <form> 
    <div className="container-fluid formulario">
      <div className="row">
        <div className=" col p-3">
            <div className="row justify-content-center">
                 <div className="col-10 col-sm-8 col-md-6 col-lg-4">   
                    <div className="mb-3">
                        <label className="form-label">
                        Nome:</label><br/> <input 
                        type= 'text' ref={inputNome} 
                        onChange={definirNome} 
                        onKeyUp= {enterAdicionarContacto}  
                        value= {contacto.nome} 
                        className="form-control"/>
                     </div> 
        
                    <div className="mb-3">
                        <label className="form-label">
                        Telefone:</label><br/><input 
                        type= 'text' ref={inputTelefone} 
                        onChange={definirTelefone}
                        onKeyUp= {enterAdicionarContacto} 
                        value= {contacto.telefone} 
                        className="form-control" />
                    </div>
             
                    <div className="mb-3">
                        <label className="form-label" >
                        E-mail:</label><br/> <input 
                        type= 'text'ref={inputEmail} 
                        onChange={definirEmail}
                        onKeyUp= {enterAdicionarContacto} 
                        value= {contacto.email} 
                        className="form-control"/>
                    </div>

                    <div className="col text-end">
                      <button onClick={isUpadate? handleUpdate: handleSubimit} className= "btn btn-outline-secondary">
                        {isUpadate ? "Editar" : "Adicionar" }
                      </button>
                    </div>   
              </div>
            </div>
         </div>   
       </div>   
     </div>
     </form>  

       <div className="lista-contactos">
        <ul>
          
          {listaContactosFiltrada.map((contacto, index) => { 
            return <Contacto
            key={contacto.id} 
            id={contacto.id} 
            nome={contacto.nome} 
            telefone={contacto.telefone} 
            email={contacto.email} 
            remover= {removerContacto}
            setContacto ={setContacto}
            index={index} 
            onDelete={(id) => onDelete(id)}
            onUpdate={(body) => onUpdate(body)}/>
            
           
          })
          
          }
        </ul> 
        </div>
          <div>
          {
            showModal &&
            <Modal
            handleCancelar={handleCancelar}
            handleDelete={handleDelete} />
           
          }
        </div>
            
      </>
  
   )
  
}