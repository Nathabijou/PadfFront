import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import PetitProjet from '../Projet/PetitProjet';

export default function Presence() {
  const [presences, setPresences] = useState([]);
  const { beneficiaireId } = useParams();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPresences();
  }, [beneficiaireId]);

  const loadPresences = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/beneficiaire/${beneficiaireId}/presence`);
      setPresences(response.data); // Assurez-vous que les noms de propriétés correspondent aux données réelles
      setLoading(false);
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
      console.error("Réponse du serveur :", error.response.data);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredPresences = presences.filter((presence) =>
    presence && presence.nomDuChampCorrespondant && presence.nomDuChampCorrespondant.toLowerCase().includes(searchTerm.toLowerCase()) // Assurez-vous de remplacer 'nomDuChampCorrespondant' par le vrai nom de la propriété
  );

  return (
    <div className="container">
      <div className="text-center titretext">Presence</div>
      <div className="py-4 mt-4 mx-4 dx-3 beneficiaire-list">
        <div className="sticky-buttons d-flex justify-content-between">
          <Link to={`/App/typeprojet/1/petitprojet/1/beneficiaire`}>
            <svg width="50" height="40" fill="currentColor" className="bi bi-arrow-left" viewBox="3 0 5 16">
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            <Link
              className='btn btn-success mx-3'
              to={`/App/beneficiaire/${beneficiaireId}/presence/AddPresence`}
              style={{ fontSize: '12px', padding: '3px 5px', color: 'white', marginLeft: "5rem" }}
            >
              + Nouveau Presence
            </Link>
            <Link
              className='btn btn-success mx-3'
              to={`/App/beneficiaire/${beneficiaireId}/payroll`}
              style={{ fontSize: '12px', padding: '3px 5px', color: 'white', marginLeft: "5rem" }}
            >
              Payroll
            </Link>
          </Link>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Presence"
              className="form-control form-control-sm search-input"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <table className="table offset border rounded shadow mt mx-5 beneficiaire-table">
          <thead className="table-light">
            <tr>
              <th scope="col" style={{ position: "sticky", top: "0" }}>Code</th>
              <th scope="col" style={{ position: "sticky", top: "0" }}>Date</th>
              <th scope="col" style={{ position: "sticky", top: "0" }}>Heure Entree</th>
              <th scope="col" style={{ position: "sticky", top: "0" }}>Heure Sortie</th>
              <th scope="col" style={{ position: "sticky", top: "0" }}>Nombre d'Heure</th>
              <th scope="col" style={{ position: "sticky", top: "0" }}>Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {filteredPresences.map((presence) => (
              <tr key={presence.id}>
                <th scope="row">{presence.id}</th>
                <td>
                  {/* Ajoutez le lien vers la vue de détail de la présence ici */}
                  <Link to={`/viewprogram/${presence.id}`}>
                    {presence.date}
                  </Link>
                </td>
                <td>{presence.heurein}</td>
                <td>{presence.heureout}</td>
                <td>{presence.heuresTravail}</td>
                <td>
                  {/* Ajoutez les liens pour afficher et éditer la présence ici */}
                  <Link to={`/viewprogram/${presence.id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      {/* Les chemins SVG */}
                    </svg>
                  </Link>
                  <Link to={`/editprogram/${presence.id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pen"
                      viewBox="0 0 16 16"
                    >
                      {/* Les chemins SVG */}
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



//zone 6 , Zone 1 (Fact sheet) pour completer chaque moi , 