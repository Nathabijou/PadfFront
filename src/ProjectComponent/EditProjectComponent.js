import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditProjectComponent() {
    let navigate=useNavigate( );

    const {id}=useParams()

    const [projectcomponent, setProjectComponent]=useState({
        name:"",
        description:"",
        statut:"",       
    })

    const{name,description,statut}=projectcomponent
    const onInputChange=(e)=>{

        setProjectComponent({...projectcomponent,[e.target.name]: e.target.value});
    };

    useEffect(()=>{

        loadProjectComponent();
    },[]);


    //creer fonction submit , pour cannecter avec base de donnee

    const onSubmit=async(e)=>{

        e.preventDefault();
        await axios.put(`http://localhost:8080/projectcomponent/${id}`, projectcomponent)

        navigate("/")
    };

    const loadProjectComponent= async()=>{
        const result=await axios.get(`http://localhost:8080/projectcomponent/${id}`)
        setProjectComponent(result.data)
    }

    return (
        <div className="Container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                      <h2 className="text-center m-4 ">Editer le Composant</h2>

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
                         placeholder="indicator "
                         name="statut"
                         value={statut}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                    
                      <button type="submit" className="btn btn-outline-success"> Submit</button>
                      <Link className="btn btn-outline-danger mx-5" to={"/projectcomponent"}> Cancel</Link>
                      </form>
                </div>
            </div>
        </div>
    )
}


