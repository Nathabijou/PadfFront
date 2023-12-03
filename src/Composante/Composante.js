import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import TypeProjet from '../TypeProjet/TypeProjet';

export default function Composante() {
  const [composantes, setComposantes] = useState([]);
  const [program, setPrograms] = useState([]);
  const [programDetails, setProgramDetails] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const { programId } = useParams();

  useEffect(() => {
    loadComposantes(programId);
    loadProgramDetails(programId); // Chargez les détails du programme ici
  }, [programId]);

  const loadComposantes = async (programId) => {
    try {
      const response = await axios.get(`http://localhost:8080/program/${programId}/composante`);
      setComposantes(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des composantes :', error);
    }
  };

  const loadProgramDetails = async (programId) => {
    try {
      const response = await axios.get(`http://localhost:8080/program/${programId}`);
      setProgramDetails(response.data);
      console.log('Program Details:', response.data); // Ajoutez un console.log pour vérifier les détails du programme
    } catch (error) {
      console.error('Erreur lors du chargement des détails du programme :', error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Filtrer les composantes en fonction du terme de recherche
  const filteredComposantes = composantes.filter((composante) =>
    composante.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log('Filtered Composantes:', filteredComposantes); // Ajoutez un console.log pour vérifier les composantes filtrées

  return (
    <div className="container">
      <div className="text-center titretext">Les Composantes</div>

      <div className="py-9 mt-4 mx-4 dx-3 beneficiaire-list">
        <div className="sticky-buttons d-flex justify-content-between">
          <Link to="/App">
            <svg
              width="50"
              height="40"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="3 0 5 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            <Link
              className="btn btn-success mx-8"
              to={`/App/addcomposante/${programId}`}
              style={{
                fontSize: '12px',
                padding: '3px 5 px',
                color: 'white',
                marginLeft: '0px',
              }}
            >
              + Ajouter une Composante
            </Link>
          </Link>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Component"
              className="form-control form-control-sm search-input"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <table className="table table-bordered table-striped beneficiaire-table">
          <thead className="table-light">
            <tr>
              <th scope="col" style={{ position: 'sticky', top: '0' }}>
                Code
              </th>
              <th scope="col" style={{ position: 'sticky', top: '0' }}>
                Nom
              </th>
              <th scope="col" style={{ position: 'sticky', top: '0' }}>
                Description
              </th>
              <th scope="col" style={{ position: 'sticky', top: '0' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {filteredComposantes.map((composante) => (
              <tr key={composante.id}>
                <th scope="row">{composante.id}</th>
                <td>
                  <Link
                    to={`/App/program/${programId}/composante/${composante.id}/typeprojet/${composante.id}`}
                  >
                    {composante.nom}
                  </Link>
                </td>
                <td>{composante.description}</td>

                <td>
                  <Link to={`/viewprojectcomponent/${composante.id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  </Link>
                  <Link to={`/projectcomponent/editprojetcomponent/${composante.id}`}>
                    <svg
                      width="46"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pen"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
                      />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <table className="table offset border rounded shadow right-table  table-striped">
        <thead>
          <tr>
            <th colSpan="2">
             {/* <img src={require('./entete.png')} alt="entete" />*/}
              <h2>Programme Détails</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Code du programme :</th>
            <td>{programDetails.code}</td>
          </tr>

          <tr>
            <th>Bailleur :</th>
            <td>{programDetails.bailleur}</td>
          </tr>

          <tr>
            <th>Nom du programme :</th>
            <td>{programDetails.nom}</td>
          </tr>

          <tr>
            <th>Maitre d'ouvrage délégué :</th>
            <td>{programDetails.mdod}</td>
          </tr>
          <h></h>

          <Link className="btn btn-success bouton-plus" to={`/App/viewprogram/${program.id}`}>
            Voir plus de détails
          </Link>
          {/* Ajoutez d'autres détails du programme ici */}
        </tbody>
      </table>
    </div>
  );
}
