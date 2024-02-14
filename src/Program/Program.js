import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navleft from '../Navleft/Navleft';

export default function Program() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [openProfiles, setOpenProfiles] = useState(false);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const response = await axios.get('http://localhost:8080/programs');
      console.log("Programs Data:", response.data); // Ajout du log pour déboguer
      setPrograms(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des programmes :', error);
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredPrograms = programs.filter((program) =>
    (program.nom ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayProgramDetails = (program) => {
    setSelectedProgram(program);
  };

  return (
    <div className="container">
      
      {openProfiles && <Navleft />}


      <div className="titretext">
        Programme 
      </div>

      <div className='titrereports slideFromRight'>
  &lt;&lt;   Filet de Sécurité Sociale Temporaire et Compétence pour les Jeunes    &gt;&gt;
</div>
      <div className="py mt-4 mx-md-4 dx-3 beneficiaire-list">
        
        <div className="sticky-buttons d-flex justify-content-between">
          <Link
            to="/App/addprogram"
            style={{
              fontSize: '12px',
              padding: '3px 5px',
              color: 'white',
              marginLeft: '50px',
            }}
          >
            {/*+ Nouveau Programme*/}
          </Link>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Program"
              className="form-control form-control-sm search-input"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div >
        <div className="table-responsive">
        <table className="table table-bordered table-striped ">
            <thead className="table-success">
              <tr>
                <th className="table-dark">#</th>
                <th>Code</th>
                <th>Nom</th>
                <th>Bailleur</th>
                <th>M.O</th>
                <th>MDOD</th>
                <th>Partenaire</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {filteredPrograms.map((program) => (
                <tr key={program.id}>
                  <td>{program.id}</td>
                  <td>{program.code}</td>
                  <td>
                    <Link
                      to={`program/${program.id}/composante/${program.id}`}
                      onClick={() => displayProgramDetails(program)}
                    >
                      {program.nom}
                    </Link>
                  </td>
                  <td>{program.bailleur}</td>
                  <td>{program.mo}</td>
                  <td>{program.mdod}</td>
                  <td>{program.partenaire}</td>
                  <td>
                    <Link to={`/App/viewprogram/${program.id}`}>
                      <i className="bi bi-eye"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedProgram && (
        <div className="program-details">
          <h2>Détails du programme</h2>
          <p>Nom : {selectedProgram.nom}</p>
          <p>Description : {selectedProgram.description}</p>
          {/* Ajoutez d'autres détails ici */}
        </div>
      )}
    </div>
    </div>
  );
}
