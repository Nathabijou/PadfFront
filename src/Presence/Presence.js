import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useBaseUrl } from '../BaseUrl';

export default function Presence() {
  const baseUrl = useBaseUrl();
  const { presenceId, nomProjet } = useParams();
  const [presences, setPresences] = useState([]);
  const { beneficiaireId } = useParams();

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    loadPresences();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [beneficiaireId]);

  const loadPresences = async () => {
    try {
      const response = await axios.get(`${baseUrl}/beneficiaire/${beneficiaireId}/presence`);
      setPresences(response.data);
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
    presence && presence.nomDuChampCorrespondant && presence.nomDuChampCorrespondant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Change breakpoint as needed
  };

  return (
    <div className="container">
      <div className="text-center titretext">Presence</div>
      <h3 className='titre-title'>Beneficiaire :  {decodeURIComponent(nomProjet)}</h3>
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
              + Nouvelle Presence
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

        {isMobile ? (
          <div className="row">
            {filteredPresences.map((presence) => (
              <div className="col-md-4 mb-4" key={presence.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={`/viewprogram/${presence.id}`}>
                        {presence.date}
                      </Link>
                    </h5>
                    <p className="card-text">Heure d'Entrée: {presence.heurein}</p>
                    <p className="card-text">Heure de Sortie: {presence.heureout}</p>
                    <p className="card-text">Nombre d'Heures de Travail: {presence.heuresTravail}</p>
                    <div className="d-flex justify-content-between">
                      <Link to={`/viewprogram/${presence.id}`} className="btn btn-primary">
                        Voir
                      </Link>
                      <Link to={`/editprogram/${presence.id}`} className="btn btn-primary">
                        Éditer
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped ">
              <thead className="table-success">
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
                      <Link to={`/viewprogram/${presence.id}`}>
                        {presence.date}
                      </Link>
                    </td>
                    <td>{presence.heurein}</td>
                    <td>{presence.heureout}</td>
                    <td>{presence.heuresTravail}</td>
                    <td>
                      <Link to={`/viewprogram/${presence.id}`} className="btn btn-primary">
                        Voir
                      </Link>
                      <Link to={`/editprogram/${presence.id}`} className="btn btn-primary">
                        Éditer
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
