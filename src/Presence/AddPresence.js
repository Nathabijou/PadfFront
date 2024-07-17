import axios from 'axios';
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useBaseUrl } from '../BaseUrl';

export default function AddPresence() {
  const { beneficiaireId, composanteId, programId } = useParams();
 

  const navigate = useNavigate();
  const baseUrl = useBaseUrl();

  const initialPresence = {
    date: '',
    heureIn: '',
    heureOut: '',
  };

  const [addpresence, setPresence] = useState(initialPresence);

  const { date, heureIn, heureOut } = addpresence;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPresence({ ...addpresence, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${baseUrl}/beneficiaire/${beneficiaireId}/presence`,  addpresence);
      navigate('/'); // Redirection après l'ajout
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };
  return (
    <div className="Container addbene">
      <h2 className="text-center m-4 title">Enregistrer une nouvelle presence</h2>
      <div className="row sec">
        <div className="shadow sec">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                <h2 className="nomchamp">Date</h2>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Entrer date"
                name="date"
                value={date}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="heureIn" className="form-label">
                <h2 className="nomchamp">Heure d'arrivée</h2>
              </label>
              <input
                type="time"
                className="form-control"
                placeholder="Entrer l'heure"
                name="heureIn"
                value={heureIn}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="heureOut" className="form-label">
                <h2 className="nomchamp">Heure de départ</h2>
              </label>
              <input
                type="time"
                className="form-control"
                placeholder="Entrer"
                name="heureOut"
                value={heureOut}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="boutonaddpresence">
              <button type="submit" className="btn btn-outline-success">
                Enregistrer
              </button>

              <Link
                className="btn btn-outline-danger mx-5"
                to={`/App/program/${programId}/composante/${composanteId}/beneficiaire/${beneficiaireId}`}
              >
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
