import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


export default function Beneficiaire() {
  const { programId, composanteId, typeprojetId, petitprojetId, beneficiaireId } = useParams();

  const [beneficiaires, setBeneficiaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectInfo, setProjectInfo] = useState({});
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    loadBeneficiaires();
    loadBeneficiairess();
  }, [petitprojetId]);

  const loadBeneficiairess = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/petitprojet/${petitprojetId}/beneficiaire-with-project`);
      setBeneficiaires(response.data);
      setProjectName(response.data.length > 0 ? response.data[0].nomDuProjet : '');  // Mettez à jour avec le nom réel de la propriété
      setLoading(false);
    } catch (error) {
      handleAxiosError(error);
    }
  };
  
  

  const loadBeneficiaires = async () => {
    try {
      // Récupérer les bénéficiaires avec les détails du projet inclus
      const response = await axios.get(`http://localhost:8080/petitprojet/${petitprojetId}/beneficiaire`);
      setBeneficiaires(response.data);
  
      // Vérifier si les détails du projet sont disponibles dans la réponse
      if ('projectInfo' in response.data) {
        setProjectInfo(response.data.projectInfo);
      } else {
        setProjectInfo({});
      }
  
      setLoading(false);
    } catch (error) {
      handleAxiosError(error);
    }
  };
  
  

  const handleAxiosError = (error) => {
    if (error.response) {
      console.error('Erreur de réponse du serveur :', error.response.data);
    } else if (error.request) {
      console.error('Aucune réponse du serveur');
    } else {
      console.error('Erreur lors de la requête Axios :', error.message);
    }
    setLoading(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredBeneficiaires = beneficiaires.filter((beneficiaire) =>
  `${beneficiaire.nom} ${beneficiaire.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
);


  const filterBeneficiaires = (beneficiaire) => {
    const isMatchingSexe = beneficiaire.sexe.toLowerCase().includes(searchTerm.toLowerCase());
    const isMatchingQualification = beneficiaire.qualification.toLowerCase().includes(searchTerm.toLowerCase());
    return isMatchingSexe || isMatchingQualification;
  };

  return (
    <div className="container">
      <div className="titretext">Bénéficiaires du Projet</div>


      <div className="project-infos">
        <div>Nom du Projet: {projectInfo.nom}</div>
        </div>



      <div className="py-1 mt-4 mx-1  beneficiaire-list">
        <div className=" d-flex justify-content-between">
          <Link to={`/App/program/${programId}/composante/${composanteId}/typeprojet/${typeprojetId}/petitprojet/${typeprojetId}`}>
            <svg width="40" height="40" fill="currentColor" className="bi bi-arrow-left" viewBox="3 0 5 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
            <Link
              className='createreports'
              to={`/App/program/${programId}/composante/${composanteId}/typeprojet/${typeprojetId}/petitprojet/${petitprojetId}/Beneficiaire/${beneficiaireId}/Addbeneficiaire`}
              style={{ fontSize: '13px', padding: '3px 5px', color: 'white', marginLeft: "30px" }}
            >
              + Nouveau Beneficiaire
            </Link>
          </Link>


          
          
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Beneficiaries"
              className="form-control form-control-sm search-input"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="table-responsive">
        <table className="table table-bordered table-striped ">
            <thead className="table-success">
            <tr>
              <th scope="col" style= {{ position: "sticky-top",  }}>Numero°</th>
              <th scope="col" style= {{ position: "sticky-top",  }}>Nom</th>
              <th scope="col" style ={{ position: "sticky-top",  }}>Prénom</th>
              <th scope="col" style ={{ position: "sticky-top",  }}>Qualification</th>
              <th scope="col" style= {{ position: "sticky-top",  }}>Sexe</th>
              <th scope="col" style= {{ position: "sticky-top",  }}>Identification</th>
              <th scope="col" style= {{ position: "sticky-top",  }}>telephone</th>
              <th scope="col" style= {{ position: "sticky-top",  }}>Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {filteredBeneficiaires.map((beneficiaire, index) => (
              <tr key={beneficiaire.id}>
                <th scope="row">{index + 1}</th>
                <td>
                    <Link to={`/App/beneficiaire/${beneficiaire.id}/presence`}>{beneficiaire.nom}</Link>
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

                  <Link to={`/App/program/${programId}/composante/${composanteId}/typeprojet/${typeprojetId}/petitprojet/${petitprojetId}/beneficiaire/${beneficiaireId}/EditBeneficiaire`}>

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
     


      
    </div>
    <div className="project-info">
  <div className="titres">Total des Bénéficiaires:</div><div className='chifre'> {filteredBeneficiaires.length}</div>
  <div className="titres">Nombre de Filles:</div><div className='chifre'> {filteredBeneficiaires.filter(b => b.sexe === 'F').length}</div>
  <div className="titres">Nombre de Garçons:</div><div className='chifre'> {filteredBeneficiaires.filter(b => b.sexe === 'M').length}</div>
  <div className="titres">Qualifier: </div><div className='chifre'>{filteredBeneficiaires.filter(b => b.qualification === 'Q').length}</div>
  <div className="titres">Non Qualifier:</div><div className='chifre'> {filteredBeneficiaires.filter(b => b.qualification === 'NQ').length}</div>
  <div className="titres">Fille Qualifier:</div><div className='chifre'> {filteredBeneficiaires.filter(b => b.sexe === 'F' && b.qualification === 'Q').length}</div>
  <div className="titres">Fille Non Qualifier:</div><div className='chifre'> {filteredBeneficiaires.filter(b => b.sexe === 'F' && b.qualification === 'NQ').length}</div>
  <div className="titres">Garçon Qualifier:</div><div className='chifre'> {filteredBeneficiaires.filter(b => b.sexe === 'M' && b.qualification === 'Q').length}</div>
  <div className="titres">Garçon Non Qualifier:</div><div className='chifre'> {filteredBeneficiaires.filter(b => b.sexe === 'M' && b.qualification === 'NQ').length}</div>
</div>
  </div>
);
}
