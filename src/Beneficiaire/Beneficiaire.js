import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function PetitProjet() {
  const [beneficiaire, setBeneficiaire] = useState([]);

  useEffect(() => {
    loadBeneficiaire();
  }, []);

  const loadBeneficiaire = async () => {
    const result = await axios.get('http://localhost:8080/beneficiaire');
    setBeneficiaire(result.data);
  };

  return (
    <div className="container">
      <h2 className="text-center">Liste des Projets</h2>
        <div className="py-4">
          <table className="table border shadow">
        
          <thead className="table-light">
            <Link   to={"/projectcomponent"}>
              <svg  width="50" height="40" fill="currentColor" class="bi bi-arrow-left" viewBox="3 0 5 16 ">
                  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
            </Link>

            <Link className='btn btn-success mx--8'  to="/addpetitprojet"> Nouveau Projet</Link>
                  <tr>
                    <th scope="col">Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Zone</th>
                    <th scope="col">Action</th>
                  </tr>

          </thead>
          <tbody className="table-group-divider">
                   {beneficiaire.map((beneficiaire, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{beneficiaire.nom}</td>
                    <td>{beneficiaire.description}</td>
                    <td>{beneficiaire.statut}</td>
                  <td>
             
               <Link  
                          to={`/beneficiaire`}> 
                          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="16" fill="currentColor" className="bi bi-outline-plus-lg" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                          </svg> 
                        </Link>
            <Link
                  to={`/petitprojet/viewpetitprojet/${beneficiaire.id}`} > 
                  <svg  width="16" height="30" fill="currentColor" className="bi bi-eye"  viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                  </svg>
            </Link>

            <Link  
                  to={`/editpetitprojet/${beneficiaire.id}`}>
                  <svg  width="46" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                  </svg>
            </Link>

           
                </td>
               </tr>

            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
}
