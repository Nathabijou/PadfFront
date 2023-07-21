import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewProgram() {

    const[programs, setPrograms]= useState({
        name:"",
        description:"",
        indicator:"",
        donor:"",
        partner:"",
        executor:""  
    });

    const {id}=useParams();

    useEffect(()=>{

        loadProgram()

    },[])

    const loadProgram=async ()=>{
        const result=await axios.get(`http://localhost:8080/program/${id}`)
        setPrograms(result.data)
    }

    return (
        
<       div className="Container">
            <div className="row ">
                <div className="offset border rounded p-5  pt-4 m-5  shadow">
                      <h2 className="text-center m-4 ">Information du Programme</h2>
        <div className="card">
            <div className="card-header">
                Details du programme id: {programs.id}

                <ul className="list-group list-group-flush">

                    <li className="list-groupe-item">
                        <b>Name:</b>
                        {programs.name}
                    </li>
                    <li className="list-groupe-item">
                        <b>Description:</b>
                        {programs.description}
                    </li>
                    <li className="list-groupe-item">
                        <b>Indicator:</b>
                        {programs.indicator}
                    </li>
                    <li className="list-groupe-item">
                        <b>Donor:</b>
                        {programs.donor}
                    </li>
                    <li className="list-groupe-item">
                        <b>Partner:</b>
                        {programs.partner}
                    </li>
                    <li className="list-groupe-item">
                        <b>Operator:</b>
                        {programs.executor}
                    </li>

                </ul>
            </div>
        </div>
        <Link className="btn btn-primary my-2" to={"/"}>Back</Link>
        </div>
        </div>
        </div>
    )
}


