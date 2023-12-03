import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ViewProgram() {
  const { id } = useParams();
  const [program, setProgram] = useState({
    code: "",
    nom: "",
    description: "",
    bailleur: "",
    partenaire: "",
    mdod: "",
    mo: ""
  });

  useEffect(() => {
    loadProgram();
  }, []);

  const loadProgram = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/program/${id}`, program);
      const programData = response.data;
      setProgram(programData);
    } catch (error) {
      console.error('Erreur lors du chargement du programme :', error);
    }
  };

  return (
    <div className='container'>
      <div className="container">
        <div className="imviews">
          <img src={require('./entete.png')} alt="entete" />
        </div>

        <div className="row">
          <div className="offset border rounded shadow views-table">
            <div className="card">
              <div className="card-header">
                Détails du programme 
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Code :</b> {program.code}
                  </li>
                  <li className="list-group-item">
                    <b>Nom :</b> {program.nom}
                  </li>
                  <li className="list-group-item">
                    <b>Déscription :</b> {program.description}
                  </li>
                  <li className="list-group-item">
                    <b>Bailleur :</b> {program.bailleur}
                  </li>
                  <li className="list-group-item">
                    <b>M.O :</b> {program.mo}
                  </li>
                  <li className="list-group-item">
                    <b>MDOD :</b> {program.mdod}
                  </li>
                  <li className="list-group-item">
                    <b>Partenaire :</b> {program.partenaire}
                  </li>
                </ul>
              </div>
            </div>
            <Link className="btn btn-primary my-2" to={"/App"}>Retour</Link>
          </div>
        </div>
      </div>

      <div className="imageresponsable">
        <img
          className="person-photo"
          src={require('./natha.jpg')}
          alt="Photo de la personne"
        />
      </div>
    </div>
  );
}
