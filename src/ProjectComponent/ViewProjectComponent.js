import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewProjectComponent() {

    const[projectcomponent, setProjectComponent]= useState({
        name:"",
        description:"",
        statut:"",  
    });

    const {id}=useParams();

    useEffect(()=>{

        loadProjectComponent()

    },[])

    const loadProjectComponent=async ()=>{
        const result=await axios.get(`http://localhost:8080/projectcomponent/${id}`)
        setProjectComponent(result.data)
    }

    return (
        
<       div className="Container">
            <div className="row">
                <div className="offset border rounded p-5  pt-4 m-5  shadow">
                      <h2 className="text-center m-4 ">Détails du Composant</h2>
        <div className="card">
            <div className="card-header">
                details du Composant id: {projectcomponent.id}

                <ul className="list-group list-group-flush">

                    <li className="list-groupe-item">
                        <b>name:</b>
                        {projectcomponent.name}
                    </li>
                    <li className="list-groupe-item">
                        <b>description:</b>
                        {projectcomponent.description}
                    </li>
                    <li className="list-groupe-item">
                        <b>statut:</b>
                        {projectcomponent.statut}
                    </li>

                </ul>
            </div>
        </div>
        <Link className="btn btn-primary my-2" to={"/projectcomponent"}>Back</Link>
        </div>
        </div>
        </div>
    )
}


