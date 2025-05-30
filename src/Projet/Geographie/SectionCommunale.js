import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function SectionCommuale() {
  let navigate = useNavigate();
  const {communeId } = useParams();

  const [sectionCommunale, setSectionCommunale] = useState({
    nom: '',
    commune: '', // L'ID de la zone associée au département
  });

  const [sectionCommuales, setCommunes] = useState([]); // Liste des zones existantes

  const { nom, commune } = sectionCommunale;

  useEffect(() => {
    // Chargez la liste des zones existantes depuis votre API
    async function fetchCommunes() {
      try {
        const response = await axios.get(`http://localhost:8080/commune`);
        setCommunes(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des zones :', error);
      }
    }

    fetchCommunes();
  }, []);

  const onInputChange = (e) => {
    setSectionCommunale({ ...sectionCommunale, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/commune', sectionCommunale);
      navigate('/App'); // Rediriger vers la liste des programmes après l'ajout
    } catch (error) {
      console.error('Erreur lors de l\'ajout du département :', error);
    }
  };

  return (
    <div className="Container">
      <div className='hero'>
      </div>
      <div className="row p-4 mt-4 mx-3">
        <div className="offset border rounded p-5 pt-4 m-5 shadow">
          <h2 className="text-center m-4">Ajouter une Section-Commuale</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Nom" className="form-label">
                Nom de la section-communale
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Entrer le nom de la Section-Communnale"
                name="nom"
                value={nom}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Commune" className="form-label">
                Sélectionner une Commune
              </label>
              <select
                className="form-control"
                name="commune"
                value={commune}
                onChange={(e) => onInputChange(e)}
              >
                 <Link className="btn btn-outline-success">
                    Enregistrer
                </Link>
                <option value="">-- Sélectionner une Commune --</option>
                
                {sectionCommuales.map((sectionCommuales) => (
                  <option key={sectionCommuales.id} value={sectionCommuales.id}>
                    {sectionCommuales.nom}
                   
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-outline-success">
              Enregistrer
            </button>
            <Link className="btn btn-outline-danger mx-5" to="/App/quartier">
              Annuler
            </Link>
            <Link className="btn btn-success mx-5" to="/App/commune">
             Ajouter une Commune
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
