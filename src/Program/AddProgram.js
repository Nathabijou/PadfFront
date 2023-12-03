import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddProgram() {
  let navigate = useNavigate();

  const [programs, setPrograms] = useState({
    nom: '',
    description: '',
    bailleur: '',
    partenaire: '',
    mdod: '',
    mo: '',
  });

  const { nom, description, bailleur, partenaire, mdod, mo } = programs;

  const onInputChange = (e) => {
    setPrograms({ ...programs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/program', programs);
      navigate('/App'); // Rediriger vers la liste des programmes après l'ajout
    } catch (error) {
      console.error('Erreur lors de l\'ajout du programme :', error);
    }
  };

  return (
    <div className="Container">


      <div className='hero'>

        
      </div>

      <div className="row p-4 mt-4 mx-3">
        <div className="offset border rounded p-5 pt-4 m-5 shadow">
          <h2 className="text-center m-4">Enregistrer un Programme</h2>

          <form onSubmit={(e) => onSubmit(e)}><button type="submit" className="btn btn-outline-success">
              Enregistrer
            </button>
            <Link className="btn btn-outline-danger mx-5" to="/App">
              Annuler
            </Link>
            <div className="mb-3">
              <label htmlFor="Nom" className="form-label">
                Nom
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Entrer le nom du Programme"
                name="nom"
                value={nom}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Entrer la description"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Bailleur" className="form-label">
                Bailleur
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Bailleur"
                name="bailleur"
                value={bailleur}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="mo" className="form-label">
                M.O
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="M.O"
                name="mo"
                value={mo}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="mdod" className="form-label">
                MDOD
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="MDOD"
                name="mdod"
                value={mdod}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Partenaire" className="form-label">
                Partenaire
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Partenaire"
                name="partenaire"
                value={partenaire}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            
          </form>
        </div>
      </div>
    </div>
  );
}
