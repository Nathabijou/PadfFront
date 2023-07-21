import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditProgram() {
    let navigate=useNavigate( );

    const {id}=useParams()

    const [programs, setPrograms]=useState({
        name:"",
        description:"",
        indicator:"",
        donor:"",
        partner:"",
        executor:""
    })

    const{name,description,indicator,donor,partner,executor}=programs
    const onInputChange=(e)=>{

        setPrograms({...programs,[e.target.name]: e.target.value});

    };

    useEffect(()=>{

        loadProgram();
    },[]);


    //creer fonction submit , pour cannecter avec base de donnee

    const onSubmit=async(e)=>{

        e.preventDefault();
        await axios.put(`http://localhost:8080/program/${id}`, programs)

        navigate("/")
    };

    const loadProgram= async()=>{
        const result=await axios.get(`http://localhost:8080/program/${id}`)
        setPrograms(result.data)
    }

    return (
        <div className="Container">
            <div className="row">
                <div className="table border shadow mt-3 mx-5 my-1 mx-5">
                      <h2 className="text-center m-4 ">Editer le Programme</h2>

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
                        <label htmlFor="Executor" className="form-label">Executor</label>
                        <input
                         type={"Text"} 
                         className="form-control"
                         placeholder="Executor"
                         name="executor"
                         value={executor}
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


