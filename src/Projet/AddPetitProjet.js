import React, { useState, useEffect, useRef  } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jsxDEV } from 'react/jsx-dev-runtime';
import { jsx as _jsx } from 'react/jsx-runtime';




export default function AddPetitProjet() {
  const navigate = useNavigate();
  const { typeprojetId, quartierId, petitprojetId, programId, composanteId } = useParams();

  const [petitprojet, setPetitProjet] = useState({
    nom:'',
    description:'',
    type:'',
    rangdepriorisation:'',
    datedebut:'',
    datefin:'',
    nmbreFilledirect:'',
    nmbreGarcondirect:'',
    nmbreBeneficiaireIndirect:'',
    secteurdintervention:'',
    montantmoqualifier:'',
    montantmoNonqualifier:'',
    montantAssurance:'',
    montantMateriaux:'',
    gps1:'',
    gps2:'',
    quartier: '',
    quartierId:quartierId,
  });

  const [quartiers, setQuartiers] = useState([]);

  const {nom,  quartier } = petitprojet;


    useEffect(() => {
      async function fetchQuartiers() {
        try {
          const response = await axios.get(`http://localhost:8080/quartier`);
          setQuartiers(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des zones :', error);
        }
      }

    if (petitprojetId) {
      fetchQuartiers();
    }
  }, [petitprojetId]);

  const {
    
    description,
    type,
    rangdepriorisation,
    datedebut,
    datefin,
    nmbreFilledirect,
    nmbreGarcondirect,
    nmbreBeneficiaireIndirect,
    secteurdintervention,
    montantmoqualifier,
    montantmoNonqualifier,
    montantAssurance,
    montantMateriaux,
    gps1,
    gps2,
  } = petitprojet;

  const onInputChange = (e) => {
    setPetitProjet({ ...petitprojet, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const total =
      parseInt(nmbreFilledirect) +
      parseInt(nmbreGarcondirect) +
      parseInt(nmbreBeneficiaireIndirect);

    setPetitProjet({ ...petitprojet, totalbeneficiaire: total });

    await axios.post(`http://localhost:8080/petitprojet/typeprojet/${typeprojetId}/quartier/${quartierId}`);

    navigate(`/App/typeprojet/${typeprojetId}/petitprojet/add`);
  };

  return (
    <div className="container ">
      <h2 className="text-center m-4 title">Enregistrer un  Projet</h2>
    <div className="row  frontcol" >
      <div className="col  ">
      <h2 className="information">Information</h2> 
        <form onSubmit={(e) => onSubmit(e)} >
          
          <div className="row addprojet ">
            <div className="col ">
              <label htmlFor="nom" className="form-label">
                <h2 className='nomchamp'>Nom / Titre</h2>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Entrer le nom du Projet"
                name="nom"
                value={nom}
                onChange={(e) => onInputChange(e)}
              />
            </div>
  
            <div className="col addprojet">
              <label htmlFor="description" className="form-label">
               <h2 className='nomchamp'>Description</h2> 
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Entrer la description du Projet"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>

          <div className="row gps"> 
            <div className="row mb-3">
            <div className="col">
              <label htmlFor="type" className="form-label">
                <h2 className='nomchamp'>Type</h2>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Type"
                name="type"
                value={type}
                onChange={(e) => onInputChange(e)}
              />
            </div>
  
            <div className="col">
              <label htmlFor="rangdepriorisation" className="form-label">
               <h2 className='nomchamp'>Rang de priorisation</h2> 
              </label>
              <select
                className="form-control"
                name="rangdepriorisation"
                value={rangdepriorisation}
                onChange={(e) => onInputChange(e)}
              >
                <option value="">--None--</option>
                <option value="Rang 1">Rang 1</option>
                <option value="Rang 2">Rang 2</option>
                <option value="Rang 3">Rang 3</option>
                <option value="Rang 4">Rang 4</option>
                <option value="Rang 5">Rang 5</option>
                <option value="Rang 6">Rang 6</option>
                <option value="Rang 7">Rang 7</option>
                <option value="Rang 8">Rang 8</option>
                <option value="Rang 9">Rang 9</option>
                
                 </select>
                 </div>
             </div>
           </div>

           <div className="col date">
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="datedebut" className="form-label">
               <h2 className='nomchamp'>Date de Début</h2> 
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Date de Début"
                name="datedebut"
                value={datedebut}
                onChange={(e) => onInputChange(e)}
              />
            </div>
  
            <div className="col">
              <label htmlFor="datefin" className="form-label">
                <h2 className='nomchamp'>Date de Fin</h2>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Date de Fin"
                name="datefin"
                value={datefin}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
  </div>
      
  <div className="row gps">
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="nmbreFilledirect" className="form-label">
                <h2 className='nomchamp'>Nombre de Fille Direct</h2>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Nombre de Bénéficiaire Fille Direct"
                name="nmbreFilledirect"
                value={nmbreFilledirect}
                onChange={(e) => onInputChange(e)}
              />
            </div>
  
            <div className="col">
              <label htmlFor="nmbreGarcondirect" className="form-label">
                <h2 className='nomchamp'>Nombre de Garçon Direct</h2>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Nombre de Bénéficiaire Garçon Direct"
                name="nmbreGarcondirect"
                value={nmbreGarcondirect}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          </div>
  

          <div className="col beneficiaireind">
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="nmbreBeneficiaireIndirect" className="form-label">
                <h2 className='nomchamp' >Nombre de Bénéficiaire Indirect</h2>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Nombre de Bénéficiaire Indirect"
                name="nmbreBeneficiaireIndirect"
                value={nmbreBeneficiaireIndirect}
                onChange={(e) => onInputChange(e)}
              />
            </div>
  
            <div className="col">
              <label htmlFor="secteurdintervention" className="form-label">
                <h2 className='nomchamp'>Secteur/ Domaine d'Intervention</h2>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Secteur/ Domaine d'Intervention"
                name="secteurdintervention"
                value={secteurdintervention}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
  </div>

  <div className="row gps">
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="gps1" className="form-label">
               <h2 className='nomchamp'>GPS Longitude</h2> 
              </label>
              <input
                type="number"
                name="gps1"
                value={gps1}
                onChange={(e) => onInputChange(e)}
                className="form-control"
                placeholder="Longitude"
              />
            </div>
  
            <div className="col">
              <label htmlFor="gps2" className="form-label">
               <h2 className='nomchamp'>GPS Latitude</h2> 
              </label>
              <input
                type="number"
                name="gps2"
                value={gps2}
                onChange={(e) => onInputChange(e)}
                className="form-control"
                placeholder="Latitude"
              />
            </div>
            
          </div>
          
          </div>
          {/*
          <div className="col quartier">
              <label htmlFor="secteurdintervention" className="form-label">
               <h2 className='nomchamp'><Link to="/App/quartier">quartier</Link></h2> 
              
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="quartier"
                name="secteurdintervention"
                value={secteurdintervention}
                onChange={(e) => onInputChange(e)}
              />
            </div>
  */}

            <div className="col quartier">
              <label htmlFor="Quartier" className="form-label">
                Ajouter un Qualifier
              </label>
              <select
  className="form-control"
  name="quartier"
  value={quartier}
  onChange={(e) => onInputChange(e)}
>
                <option value="">-- Sélectionner le quartier --</option>
                {quartiers.map((quartier) => (
                  <option key={quartier.id} value={quartier.id}>
                    {quartier.nom}
                  </option>
                ))}
              </select>
            </div>

           <h2 className="budget">Budget</h2> 


           <div className="row gps">
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="mainOeuvreQ" className="form-label">
               <h2 className='nomchamp'>Montant Main oeuvre Qualifier</h2> 
              </label>
              <input
                type="curency"
                className="form-control"
                placeholder="Montant Main d'oeuvre Qualifier"
                name="mainOeuvreQ"
                value={montantmoqualifier}
                onChange={(e) => onInputChange(e)}
              />
            </div>
  
            <div className="col">
              <label htmlFor="mainOeuvreNQ" className="form-label">
              <h2 className='nomchamp'>Montant Main oeuvre Non Qualifier</h2>
              </label>
              <input
                type="curency"
                className="form-control"
                placeholder="Montant Main d'oeuvre Non Qualifier"
                name="mainOeuvreNQ"
                value={montantmoNonqualifier}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          </div>
         
          <div className="col beneficiaireind">
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="montantAssurance" className="form-label">
             <h2  className='nomchamp'>Montant Assurance</h2> 
              </label>
              <input
                type="curency"
                className="form-control"
                placeholder=" Montant Assurance"
                name="montantAssurance"
                value={montantAssurance}
                onChange={(e) => onInputChange(e)}
              />
            </div>
  
            <div className="col">
              <label htmlFor="montantMateriaux" className="form-label">

               <h2 className='nomchamp'>Montant Materiaux</h2> 

              </label>
              <input
                type="curency"
                className="form-control"
                placeholder=" Montant Materiaux"
                name="montantMateriaux"
                value={montantMateriaux}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
  </div>
  <div className='bouton'>
          <button type="submit" className="btn btn-outline-success">
          Enregistrer
          </button>
  
          <Link
            className="btn btn-outline-danger mx-5"
            to={`/App/program/${programId}/composante/${composanteId}/typeprojet/${typeprojetId}/petitprojet/${petitprojetId}`}
            
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
