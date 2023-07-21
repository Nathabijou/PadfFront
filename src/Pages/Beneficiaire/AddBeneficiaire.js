import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function AddBeneficiaire() {


    let navigate=useNavigate( )

    const [beneficiaire, setBeneficiaire]=useState({
        nom:"",
        prenom:"",
        datenaissance:"",     
        sexe:"",
        qualification:"",
        lieudenaissance:"",
        identification:"",
        telephonepaiement:"",
        telephonecontact:"",
        operateurpaiement:""

    });


    const{nom,prenom,datenaissance,sexe,qualification,lieudenaissance,identification,telephonepaiement, telephonecontact
      ,operateurpaiement}=beneficiaire
    const onInputChange=(e)=>{

        setBeneficiaire({...beneficiaire,[e.target.name]: e.target.value});

    };

    //creer fonction submit , pour cannecter avec base de donnee

    const onSubmit=async(e)=>{

        e.preventDefault();
        await axios.post("http://localhost:8080/beneficiaire", beneficiaire)

        navigate("/")
    }

    return (

        <div className="Container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                      <h2 className="text-center m-4 ">Enregister un nouveau Beneficiaire</h2>
                       
                      <form onSubmit={(e)=>onSubmit(e)}>
                      
                      <div className="mb-3">
                        <label htmlFor="Nom" className="form-label">Nom</label>
                        <input 
                         type="text" 
                         className="form-control"
                         placeholder="Entrer le nom du Programme"
                         name="nom"
                         value={nom}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="Prenom" className="form-label">Prenom</label>
                        <input
                         type="text"  
                         className="form-control"
                         placeholder="Entrer le prenom"
                         name="prenom"
                         value={prenom}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="Date de Naissance" className="form-label">Date de Naissance</label>
                        <input
                         type="date" 
                         className="form-control"
                         placeholder="Entrer la date de naissance"
                         name="datenaissance"
                         value={datenaissance}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="Rangdepriorisation" className="form-label">sexe</label>                       
                        <select className="form-control" aria-label="Default select example">
                             <option selected>None</option>
                             <option value="1">Rang 1</option>
                             <option value="2">Rang 2</option>
                             <option value="3">Rang 3</option>
                             <option value="3">Rang 4</option>
                             <option value="3">Rang 5</option>
                             <option value="3">Rang 6</option>
                             <option value="3">Rang 7</option>
                             <option value="3">Rang 8</option>
                             <option value="3">Rang 9</option>
                              value={sexe}
                             onChange={(e)=>onInputChange(e)}
                        </select>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="Qualification" className="form-label">Qualification</label>
                        <input
                         type={"date"} 
                         className="form-control"
                         placeholder="Partener"
                         name="datedebut"
                         value={qualification}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="datefin" className="form-label">Identification</label>
                        <input
                         type={"date"} 
                         className="form-control"
                         placeholder="datefin"
                         name="datefin"
                         value={qualification}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="Telephone pour paiement" className="form-label">Telephone pour paiement</label>
                        <input
                         type={"number"} 
                         className="form-control"
                         placeholder="Telephone pour paiement"
                         name="nmbreFilledirect"
                         value={telephonepaiement}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>
                      
                      <div className="mb-3">
                        <label htmlFor="nmbreGarcondirect" className="form-label">Telephone pour contact</label>
                        <input
                         type={"number"} 
                         className="form-control"
                         placeholder="nombre de beneficiaire Garcon direct"
                         name="nmbreGarcondirect"
                         value={telephonecontact}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="nmbreBeneficiaireIndirect" className="form-label">operateur paiement</label>
                        <input
                         type={"number"} 
                         className="form-control"
                         placeholder="Nombre de Beneficiaire indirect"
                         name="nmbreBeneficiaireIndirect"
                         value={operateurpaiement}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>             
                      
                      

                      <div className="mb-3">
                        <label htmlFor="GPS" className="form-label">GPS</label>
                        
                      </div>

                      <button type="submit" className="btn btn-outline-success"> Submit</button>
                      
                      <Link className="btn btn-outline-danger mx-5" to={"/petitprojet"}> Cancel</Link>
                      </form>
                </div>
            </div>
        </div>
    )
}


