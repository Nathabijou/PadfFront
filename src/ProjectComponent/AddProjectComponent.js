import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function AddProjectComponent() {
    const { programId } = useParams(); // Récupérer l'ID du programme à partir de l'URL

    let navigate = useNavigate();

    const [projectcomponent, setProjectComponent] = useState({
        name: "",
        description: "",
        statut: "",
        type:"",
        programId: programId, // Ajouter l'ID du programme dans l'état du composant
    });

    const { name, description, statut,type } = projectcomponent;

    const onInputChange = (e) => {
        setProjectComponent({ ...projectcomponent, [e.target.name]: e.target.value });
    };

   


    const onSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:8080/projectcomponent", projectcomponent);
          navigate('/');
        } catch (error) {
          console.log(error);
        }
      };
      
    
    // Le reste du code reste inchangé



    return (
        <div className="Container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                      <h2 className="text-center m-4 ">Enregister un Composant</h2>
                       
                      <form onSubmit={(e)=>onSubmit(e)}>
                      
                      <div className="mb-3">
                        <label htmlFor="Name" className="form-label">Name</label>
                        <input 
                         type="text" 
                         className="form-control"
                         placeholder="Entrer le nom du Programme"
                         name="name"
                         value={name}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="Description" className="form-label">Description</label>
                        <input
                         type="text"  
                         className="form-control"
                         placeholder="Entrer la déscription"
                         name="description"
                         value={description}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="Statut" className="form-label">Statut</label>
                        <input
                         type="text" 
                         className="form-control"
                         placeholder="statut "
                         name="statut"
                         value={statut}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="Type" className="form-label">Type</label>
                        <input
                         type="text" 
                         className="form-control"
                         placeholder="Type "
                         name="type"
                         value={type}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <button type="submit" className="btn btn-outline-success" to={`/program/${programId}/projectcomponent/${projectcomponent.id}`}> Submit</button>


                      
                      <Link className="btn btn-outline-danger mx-5" to={"/"}> Cancel</Link>
                      </form>
                </div>
            </div>
        </div>
    )
}








