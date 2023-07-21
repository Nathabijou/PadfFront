import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function AddProgram() {


    let navigate=useNavigate( )

    const [programs, setPrograms]=useState({
        name:"",
        description:"",
        indicator:"",
        donor:"",
        partner:"",
        operator:""

    });


    const{name,description,indicator,donor,partner,operator}=programs
    const onInputChange=(e)=>{

        setPrograms({...programs,[e.target.name]: e.target.value});

    };

    //creer fonction submit , pour cannecter avec base de donnee

    const onSubmit=async(e)=>{

        e.preventDefault();
        await axios.post("http://localhost:8080/program", programs)

        navigate("/")
    }

    return (

        <div className="Container">
            <div className="row p-4 mt-4 mx-3">
                <div className=" offset border rounded p-5  pt-4 m-5  shadow">
                      <h2 className="text-center m-4 ">Enregister un Programme</h2>
                       
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
                        <label htmlFor="Indicator" className="form-label">Indicator</label>
                        <input
                         type="text" 
                         className="form-control"
                         placeholder="indicator "
                         name="indicator"
                         value={indicator}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="Donor" className="form-label">Donor</label>
                        <input
                         type="text"  
                         className="form-control"
                         placeholder="Donor "
                         name="donor"
                         value={donor}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="Partner" className="form-label">Partner</label>
                        <input
                         type={"Text"} 
                         className="form-control"
                         placeholder="Partener"
                         name="partner"
                         value={partner}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="Operator" className="form-label">Operator</label>
                        <input
                         type={"Text"} 
                         className="form-control"
                         placeholder="Operator"
                         name="operator"
                         value={operator}
                         onChange={(e)=>onInputChange(e)}
                         />
                      </div>

                      <button type="submit" className="btn btn-outline-success"> Submit</button>
                      <Link className="btn btn-outline-danger mx-5" to="/"> Cancel</Link>
                      </form>
                </div>
            </div>
        </div>
    )
}


