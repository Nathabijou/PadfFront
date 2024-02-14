import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Program from '../Program/Program';

export default function TypeProjet() {
  const [typeProjets, setTypeProjets] = useState([]);
  const { composanteId,programId, typeProjetId } = useParams();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTypeProjets();
  }, []);

  const loadTypeProjets = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/Composante/${composanteId}/typeprojet`);
      setTypeProjets(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error loading TypeProjets:", error);
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredTypeProjets = typeProjets.filter((typeProjet) =>
  typeProjet.name && typeProjet.description.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="container">
      <div className="text-center titretext">Types de Projet</div>

      <div className="py-1 mt-4 mx-1  beneficiaire-list">
        <div className="sticky-buttons d-flex justify-content-between">
          <Link to="/App/program/1/composante/2">
          <svg width="50" height="40" fill="currentColor" className="bi bi-arrow-left" viewBox="3 0 5 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
          </svg>
            <Link className='createreports' to="/App/program/:programId/composante/:composanteId/addtypeProjet" 
            style={{ fontSize: '12px', padding: '3px 5 px', color: 'white', marginLeft: "5rem", }}> + Nouveau Type de projet </Link>
          </Link>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Project type"
              className="form-control form-control-sm search-input"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
        <table className="table table-bordered table-striped ">
            <thead className="table-success">
            <tr>
                <th scope="col" style= {{ position: "sticky-top",  }}>Code</th>
                <th scope="col" style= {{ position: "sticky-top",  }}>Nom</th>
                <th scope="col" style= {{ position: "sticky-top",  }}>Description</th>
                <th scope="col" style= {{ position: "sticky-top",  }}>Type</th>
                <th scope="col" style= {{ position: "sticky-top",  }}></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {filteredTypeProjets.map((typeProjet) => (
              <tr key={typeProjet.id}>
                <th scope="row">{typeProjet.id}</th>
                <td>
                  <Link
                   
                    to={`/App/program/${programId}/composante/${composanteId}/typeprojet/${typeProjet.id}/petitprojet/${typeProjet.id}`}
                    
                    style={{
                      /*
                      fontSize: '14px',
                      padding: '0px 10px',                      
                    */
                    }}
                  >
                    {typeProjet.name}
                  </Link>
                </td>
                <td>{typeProjet.description}</td>
                <td>{typeProjet.type}</td>
                <td>
                  <Link to={`/viewprogram/${typeProjet.id}`}>
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
                  <Link to={`/editprogram/${typeProjet.id}`}>
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
    </div>
  );
}
