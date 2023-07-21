/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppHeader from '../Pages/AppHeader'


export default function(){

  return (

    <div className=''>

<nav className="navbar navbar-expand navbar-dark bg-secondary">
  <div className="container-fluid">
      <AppHeader/>
                <Link className="navbar-brand" to="/" > 
                    <a href="#" className="nav-link text-white fs-5 mx-4" aria-current="page">
                      <i className='bi bi-house-fill'></i>
                    </a>   
               </Link> 
   

    <button className="navbar-toggler"
     type="button" data-bs-toggle="collapse" 
     data-bs-target="#navbarSupportedContent" 
     aria-controls="navbarSupportedContent" 
     aria-expanded="false" 
     aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/program">Programmes</a>
        </li>
        
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="www.algoleaders.com">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="www.algoleaders.com">Home</a>
        </li>
       
           
      </ul>  
    </div>

    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="https://www.algoleaders.com/">Contact</a>
       </li>
    </ul>

    


    <Link className='' >  
                    <a href="#" className="nav-link text-white fs-5 mx-4" aria-current="page">
                      <i className='bi bi-gear'></i>
                    </a>   
    </Link> 
    


    
    </div>
  </nav>
</div>
)
}
