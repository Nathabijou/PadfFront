import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"; 
import Navbar from './Layout/Navbar';
import Home from './Pages/AppHeader';
import AddProgram from './Program/AddProgram';
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import EditProgram from './Program/EditProgram';
import ViewProgram from './Program/ViewProgram';
import AddPetitProjet from './Projet/AddPetitProjet';
import PetitProjet from './Projet/PetitProjet';
import EditPetitProjet from './Projet/EditPetitProjet';
import ViewPetitProjet from './Projet/ViewPetitProjet';
import Navleft from './Navleft/Navleft';
import Program from './Program/Program';
import { Space, Typography } from 'antd';
import Dashboard from './Pages/Dashboard/Dashboard';
import Report from './Pages/Report/Report';
import CreateReport from './Pages/Report/CreateReport';  // Assurez-vous que le nom du fichier est correct
import Beneficiaire from './Pages/Beneficiaire/Beneficiaire';
import AddBeneficiaire from './Pages/Beneficiaire/AddBeneficiaire';
import Login1 from './Register/Login1';
import Register from './Register/Register';
import AddComposante from './Composante/AddComposante';
import Composante from './Composante/Composante';
import EditComposante from './Composante/EditComposante';
import ViewComposante from './Composante/ViewComposante';
import TypeProjet from './TypeProjet/TypeProjet';
import AddTypeProjet from './TypeProjet/AddTypeProjet';
import Zone from './Projet/Geographie/zone';
import Departement from './Projet/Geographie/Departement';
import Commune from './Projet/Geographie/Commune';
import SectionCommuale from './Projet/Geographie/SectionCommunale';
import Quartier from './Projet/Geographie/Quartier';
import Presence from './Presence/Presence';
import AddPresence from './Presence/AddPresence';
import EditBeneficiaire from './Pages/Beneficiaire/EditBeneficiaire';
import Payrolls from './Payrolls/Payrolls';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';








function App() {
  return (
    <div className=''> 
      <Navbar />
      <Space className='NavleftContent' >
        <Navleft/>
        <Typography/>
        <Outlet /> 
        <Routes>
  <Route path="/home" element={<Home />} />
  <Route path="/login1" element={<Login1 />} />
  <Route path="/login" element={<Login1 />} />
  <Route path='/navleft' element={<Navleft/>}/>

  <Route path='/zone' element={<Zone/>}/>
  <Route path='/departement' element={<Departement/>}/>
  <Route path="/Zone/:zoneId/Departement" element={<Departement />} />
  

  <Route path='/commune' element={<Commune/>}/>
  <Route path='/sectioncommunale' element={<SectionCommuale/>}/>
  <Route path='/quartier' element={<Quartier/>}/>
  <Route path='/payrolls' element={<Payrolls/>}/>
  

  <Route path="/Register" element={<Register />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path='/report'  element={<Report/>}/>
  <Route path='/report/CreateReport' element={<CreateReport/>}/>
 
  <Route path="/addprogram" element={<AddProgram />} />
  
  <Route path="/composante/addComposante" element={<AddComposante />} />

  <Route path="/program/:programId/addcomposante" element={<AddComposante />} />
  <Route path="/program/:programId/composante/:composanteId/addtypeProjet" element={<AddTypeProjet/>}/>

  <Route path="/AddBeneficiaire" element={<AddBeneficiaire />} />

  <Route path="/editprogram/:id" element={<EditProgram />} />
  <Route path="/composante/editcomposante/:id" element={<EditComposante />} />
  <Route path="/petitprojet/editpetitprojet/:id" element={<EditPetitProjet />} />
  <Route path="/viewprogram/:id" element={<ViewProgram />} />
  <Route path="/composante/viewcomposante/:id" element={<ViewComposante />} />
  <Route path="/petitprojet/viewpetitprojet/:id" element={<ViewPetitProjet />} />



 
  <Route path="/program/:programId/composante/:composanteId/typeprojet/:typeprojetId/petitprojet/:petitprojetId/addpetitprojet" element={<AddPetitProjet />} />
  <Route path="/program/:programId/composante/:composanteId/typeprojet/:typeprojetId/petitprojet/:petitprojetId/Beneficiaire/:BeneficiaireId/Addbeneficiaire" element={<AddBeneficiaire />} />



  <Route path="/program/:programId/composante/:composanteId/typeprojet/:typeprojetId/petitprojet/:petitprojetId/Beneficiaire/:beneficiaireId/EditBeneficiaire" element={<EditBeneficiaire/>} />
  <Route path="/typeprojet/:typeprojetId/petitprojet/:petitprojetId//Beneficiaire/:beneficiaireId/EditBeneficiaire" element={<EditBeneficiaire/>} />
  <Route path='/beneficiaire/:beneficiaireId/presence' element={<Presence/>}/>
  <Route path='/App/beneficiaire/:beneficiaireId/presence/payrolls' element={<Payrolls/>}/>

  <Route path='/beneficiaire/:beneficiaireId/presence/Addpresence' element={<AddPresence/>}/>
  <Route path="/beneficiaire/:BeneficiaireId/presence" element={<AddPresence />} />
  <Route path="/App/program/:programId/composante/:composanteId/beneficiaire/:BeneficiaireId/addpresence" element={<AddPresence />} />


  
  
 
  <Route path="/" element={<Program />} /> {/* Page d'accueil */}
  <Route path="/program/:programId/composante/:composanteId" element={<Composante />} />
  <Route path="/program/:programId/composante/:composanteId/typeprojet/:typeprojetId" element={<TypeProjet/>} />
 
  <Route path="/program/:programId/composante/:composanteId/typeprojet/:typeprojetId/petitprojet/:petitprojetId" element={<PetitProjet />} />
  <Route path="/typeprojet/:typeprojetId/petitprojet/:petitprojetId/beneficiaire" element={<Beneficiaire/>}/>

</Routes>

      </Space> 
    </div>
  );
}

export default App;
