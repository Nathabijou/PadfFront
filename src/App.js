
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"; 
import Navbar from './Layout/Navbar';
import Home from './Pages/AppHeader';
import AddProgram from './Program/AddProgram';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import EditProgram from './Program/EditProgram';
import ViewProgram from './Program/ViewProgram';
import ProjectComponent from './ProjectComponent/ProjectComponent';
import AddProjectComponent from './ProjectComponent/AddProjectComponent';
import EditProjectComponent from './ProjectComponent/EditProjectComponent';
import ViewProjectComponent from './ProjectComponent/ViewProjectComponent';
import AddPetitProjet from './Projet/AddPetitProjet';
import PetitProjet from './Projet/PetitProjet';
import EditPetitProjet from './Projet/EditPetitProjet';
import ViewPettitProjet from './Projet/ViewPetitProjet';
import Navleft from './Navleft/Navleft';
import Program from './Program/Program';
import AppHeader from './Pages/AppHeader';
import { Space, Typography } from 'antd';
import Dashboard from './Pages/Dashboard/Dashboard';
import Project from './Pages/Project/Project';
import Beneficiaire from './Pages/Beneficiaire/Beneficiaire';
import AddBeneficiaire from './Pages/Beneficiaire/AddBeneficiaire';
import Analytics from './Analytics';




function App() {
  return (
    
    <div  className=''> 
    <div>
        
    <Router>
    
    <Navbar/>

    <Space className='NavleftContent' >
      
      <Navleft/>
      
      <Typography/>
      

          <Routes>

                 <Route exact path="/" element={<Program/>}/>
                 <Route exact path="/" element={<Dashboard/>}/>
                 <Route exact path="/" element={<Project/>}/>

                 <Route exact path="/addprogram" element={<AddProgram />}  />          
                 <Route exact path="/addprojectcomponent" element={<AddProjectComponent/>} />
                 <Route path='/AddPetitProjet' element={<AddPetitProjet/>}/>
                 <Route path='/AddBeneficiaire' element={<AddBeneficiaire/>}/>
                 <Route path='/Typography' element={<Typography/>}/>
                 <Route path='Dashboard' element={<Dashboard/>}/>

                 <Route exact path="/editprogram/:id"     element={<EditProgram/>}/>
                 <Route exact path="/projectcomponent/editprojectcomponent/:id" element={<EditProjectComponent/>}/>
                 <Route exact path="/petitprojet/editpetitprojet/:id" element={<EditPetitProjet/>}/>

                 <Route path="/viewprogram/:id"          element={<ViewProgram />} />
                 <Route path="/viewprojectcomponent/:id" element={<ViewProjectComponent/>}/>   
                 <Route path="/petitprojet/viewpetitprojet/:id"      element={<ViewPettitProjet/>}/>  
          
                 <Route path="/PetitProjet" element={<PetitProjet/>}/> 
                 <Route path="/projectcomponent/petitprojet/beneficiaire/:id" element={<Beneficiaire/>}/>
                 <Route path='/projet/petitprojet/' element={<PetitProjet/>}/>
                 <Route path="/program/:programId/projectcomponent/:componentId" element={<ProjectComponent />} />
                     
                 <Route path='/program/:programId/projectComponent/:projectComponentId' element={<ProjectComponent/>}/>
                 <Route path="/program/:programId/projectcomponent/:componentId" component={ProjectComponent} />

              </Routes> 
         </Space> 
    </Router>

    </div>
    </div>

    
  );
}

export default App;
