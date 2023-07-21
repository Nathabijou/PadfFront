import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Beneficiaire() {
  const [beneficiaire, setBeneficiaire] = useState([]);

  useEffect(() => {
    loadBeneficiaire();
  }, []);

  const loadBeneficiaire = async () => {
    try {
      const response = await axios.get("http://localhost:8080/beneficiaire");
      setBeneficiaire(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Beneficiaire</h2>
      <div className="py-4">
        <table className="table border shadow">
          <thead className="table-light">


          

          <Link  to={"/petitprojet"} > 

          <i class="bi bi-arrow-left-circle mp-4" ></i>

        </Link>

<Link className='btn btn-success mx-8'  to="/addbeneficiaire"> Nouveau Beneficiaire</Link>


            <tr>
              <th scope="col">Code</th>
              <th scope="col">Nom</th>
              <th scope="col">Prenom</th>
              <th scope="col">Sexe</th>
              <th scope="col">Age</th>
              <th scope="col">Quartier</th>
              <th scope='col'></th>
            </tr>
          </thead>

          <tbody className="table table-striped table-hover">
            {beneficiaire.map((beneficiaire) => (
              <tr key={beneficiaire.id}>
                <th scope="row">{beneficiaire.id}</th>
                <td>
                
                  <Link to={`/`}> {beneficiaire.nom}</Link></td>
                <td>{beneficiaire.prenom}</td>
                <td>{beneficiaire.statut}</td>
                <td>
                                
                  <Link to={`/viewbeneficiaire/${beneficiaire.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  </Link>

                  <Link  
                      to={`/projectcomponent/editbeneficiaire/${beneficiaire.id}`}>
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