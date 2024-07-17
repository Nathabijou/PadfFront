import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useBaseUrl } from '../../BaseUrl';
import ims from './close.png';

export default function Beneficiaire() {
  const { programId, composanteId, typeprojetId, petitprojetId, beneficiaireId } = useParams();
  const baseUrl = useBaseUrl();
  const { composante, nomProjet } = useParams();
  const { petitprojet, setPetitProjet } = useParams();
  const [beneficiaires, setBeneficiaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showDetails, setShowDetails] = useState(false); // Ajoutez un état pour suivre si les détails doivent être affichés ou non
  const [selectedBeneficiaire, setSelectedBeneficiaire] = useState(null);
  const [showProjectInfo, setShowProjectInfo] = useState(true);

  // Fonction pour gérer la fermeture du petit tableau
  const handleCloseButtonClick = () => {
    setShowProjectInfo(false);
  };
  
  const handleIconClick = () => {
    setShowDetails(!showDetails);
  };
  useEffect(() => {
    loadBeneficiaires();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [petitprojetId]);

  const loadBeneficiaires = async () => {
    try {
      const response = await axios.get(`${baseUrl}/petitprojet/${petitprojetId}/beneficiaire`);
      setBeneficiaires(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des bénéficiaires :', error);
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleViewDetails = (beneficiaire) => {
    setSelectedBeneficiaire(beneficiaire);
    setShowDetails(true);
  };
  const filteredBeneficiaires = beneficiaires.filter((beneficiaire) =>
    `${beneficiaire.nom} ${beneficiaire.prenom} ${beneficiaire.sexe} ${beneficiaire.qualification}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Change breakpoint as needed
  };

  return (
    <div className="container">
      <div className="titretext">Bénéficiaires du Projet</div>
      <h3 className="titre-title">Nom du Projet : {decodeURIComponent(nomProjet)}</h3>
      <div className="py-1 mt-4 mx-1  beneficiaire-list">
        <div className="d-flex justify-content-between">
          <Link to={`/App/program/${programId}/composante/${composanteId}/typeprojet/${typeprojetId}/petitprojet/${typeprojetId}`}>
            <svg width="40" height="40" fill="currentColor" className="bi bi-arrow-left" viewBox="3 0 5 16">
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            
            <Link
              className="createreports"
              to={`/App/program/${programId}/composante/${composanteId}/typeprojet/${typeprojetId}/petitprojet/${petitprojetId}/Beneficiaire/${beneficiaireId}/Addbeneficiaire`}
              style={{ fontSize: '13px', padding: '3px 5px', color: 'white', marginLeft: '30px' }}
            >
              + Nouveau Beneficiaire
            </Link>
          </Link>
          <Link onClick={handleIconClick}>
        <i className="bi bi-person-bounding-box"></i> {/* L'icône pour afficher le tableau */}
      </Link>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Beneficiaires"
              className="form-control form-control-sm search-input"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        {isMobile ? (
          <div className="row">
            {filteredBeneficiaires.map((beneficiaire) => (
              <div className="col-md-4 mb-4" key={beneficiaire.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link
                        to={`/App/beneficiaire/${beneficiaire.id}/presence/${encodeURIComponent(
                          `${beneficiaire.nom} ${beneficiaire.prenom}`
                        )}`}
                      >
                        {beneficiaire.nom} {beneficiaire.prenom}
                      </Link>
                    </h5>
                    <p className="card-text">Qualification: {beneficiaire.qualification}</p>
                    <p className="card-text">Sexe: {beneficiaire.sexe}</p>
                    <p className="card-text">Identification: {beneficiaire.identification}</p>
                    <p className="card-text">Téléphone: {beneficiaire.telephonecontact}</p>
                    <div className="d-flex justify-content-between">
                      <Link to={`/viewbeneficiaire/${beneficiaire.id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                          />
                          <path
                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                          />
                        </svg>
                      </Link>
                      <Link
                        to={`/App/beneficiaire/${beneficiaire.id}/photobeneficiaire/${beneficiaire.id}/ ${encodeURIComponent(
                          `${beneficiaire.nom} ${beneficiaire.prenom}`
                        )}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        ></svg>
                        <i className="bi bi-image"></i>
                      </Link>
                      <Link
                        to={`/App/program/${programId}/composante/${composanteId}/typeprojet/${typeprojetId}/petitprojet/${petitprojetId}/beneficiaire/${beneficiaireId}/EditBeneficiaire`}
                      >
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
                    </div>
                  </div>

                  {/*Mobile*/}
                  {showDetails && (
        
        <div className="project-infos">
          
          <div className="titress"> Bénéficiaires</div>
          <div className="chifres">{filteredBeneficiaires.length}</div>
          <div className="titress"> Filles</div>
          <div className="chifres">{filteredBeneficiaires.filter((b) => b.sexe === 'F').length}</div>
          <div className="titress"> Garçons</div>
          <div className="chifres">{filteredBeneficiaires.filter((b) => b.sexe === 'M').length}</div>
          <div className="titress">Q</div>
          <div className="chifres">{filteredBeneficiaires.filter((b) => b.qualification === 'Q').length}</div>
          <div className="titress">N Q</div>
          <div className="chifres">{filteredBeneficiaires.filter((b) => b.qualification === 'NQ').length}</div>
          <div className="titress">Filles Q</div>
          <div className="chifres">{filteredBeneficiaires.filter((b) => b.sexe === 'F' && b.qualification === 'Q').length}</div>
          <div className="titress">Filles N Q</div>
          <div className="chifres">{filteredBeneficiaires.filter((b) => b.sexe === 'F' && b.qualification === 'NQ').length}</div>
          <div className="titress">Garçons Q</div>
          <div className="chifres">{filteredBeneficiaires.filter((b) => b.sexe === 'M' && b.qualification === 'Q').length}</div>
          <div className="titress">Garçons N Q</div>
          <div className="chifres">{filteredBeneficiaires.filter((b) => b.sexe === 'M' && b.qualification === 'NQ').length}</div>
          
          <div className="close-buttons">
          <button onClick={handleIconClick}>Fermer</button>
        </div>
     
        </div>
      )}
                </div>
              </div>
            ))}
          </div>
        ) : (


          <div className="table-responsive">
            <table className="table table-bordered table-striped ">
              <thead className="table-success">
                <tr>
                  <th scope="col" style={{ position: 'sticky', top: 0 }}>
                    Numero°
                  </th>
                  <th scope="col" style={{ position: 'sticky', top: 0 }}>
                    Nom
                  </th>
                  <th scope="col" style={{ position: 'sticky', top: 0 }}>
                    Prénom
                  </th>
                  <th scope="col" style={{ position: 'sticky', top: 0 }}>
                    Qualification
                  </th>
                  <th scope="col" style={{ position: 'sticky', top: 0 }}>
                    Sexe
                  </th>
                  <th scope="col" style={{ position: 'sticky', top: 0 }}>
                    Identification
                  </th>
                  <th scope="col" style={{ position: 'sticky', top: 0 }}>
                    Téléphone
                  </th>
                  <th scope="col" style={{ position: 'sticky', top: 0 }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {filteredBeneficiaires.map((beneficiaire, index) => (
                  <tr key={beneficiaire.id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <Link
                        to={`/App/beneficiaire/${beneficiaire.id}/presence/${encodeURIComponent(
                          `${beneficiaire.nom} ${beneficiaire.prenom}`
                        )}`}
                      >
                        {beneficiaire.nom}
                      </Link>
                    </td>
                    <td>{beneficiaire.prenom}</td>
                    <td>{beneficiaire.qualification}</td>
                    <td>{beneficiaire.sexe}</td>
                    <td>{beneficiaire.identification}</td>
                    <td>{beneficiaire.telephonecontact}</td>
                    <td>
                      <Link to={`/viewbeneficiaire/${beneficiaire.id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                          />
                          <path
                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                          />
                        </svg>
                      </Link>
                      <Link
                        to={`/App/beneficiaire/${beneficiaire.id}/photobeneficiaire/${beneficiaire.id}/ ${encodeURIComponent(
                          `${beneficiaire.nom} ${beneficiaire.prenom}`
                        )}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        ></svg>
                        <i className="bi bi-image"></i>
                      </Link>
                      <Link
                        to={`/App/program/${programId}/composante/${composanteId}/typeprojet/${typeprojetId}/petitprojet/${petitprojetId}/beneficiaire/${beneficiaireId}/EditBeneficiaire`}
                      >
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

        
                       

               
      {showDetails && (
        
        <div className="project-info">
          
          <div className="titres"> Bénéficiaires:</div>
          <div className="chifre">{filteredBeneficiaires.length}</div>
          <div className="titres">Nombre de Filles:</div>
          <div className="chifre">{filteredBeneficiaires.filter((b) => b.sexe === 'F').length}</div>
          <div className="titres">Nombre de Garçons:</div>
          <div className="chifre">{filteredBeneficiaires.filter((b) => b.sexe === 'M').length}</div>
          <div className="titres">Qualifier: </div>
          <div className="chifre">{filteredBeneficiaires.filter((b) => b.qualification === 'Q').length}</div>
          <div className="titres">Non Qualifier:</div>
          <div className="chifre">{filteredBeneficiaires.filter((b) => b.qualification === 'NQ').length}</div>
          <div className="titres">Fille Qualifier:</div>
          <div className="chifre">{filteredBeneficiaires.filter((b) => b.sexe === 'F' && b.qualification === 'Q').length}</div>
          <div className="titres">Fille Non Qualifier:</div>
          <div className="chifre">{filteredBeneficiaires.filter((b) => b.sexe === 'F' && b.qualification === 'NQ').length}</div>
          <div className="titres">Garçon Qualifier:</div>
          <div className="chifre">{filteredBeneficiaires.filter((b) => b.sexe === 'M' && b.qualification === 'Q').length}</div>
          <div className="titres">Garçon Non Qualifier:</div>
          <div className="chifre">{filteredBeneficiaires.filter((b) => b.sexe === 'M' && b.qualification === 'NQ').length}</div>
       
          
           <div className='close'>
          <Link  onClick={handleIconClick}><img width={150} src={ims} /></Link>
          </div>
     </div>
        
      )}
                       
          </div>
          
        )}
      </div>
    </div>
  );
}
