import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Program() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/programs");

      const updatedPrograms = response.data.map((program) => {
        return {
          ...program,
          projectComponents: [],
        };
      });

      setPrograms(updatedPrograms);
    } catch (error) {
      console.log(error);
    }
  };

  const addProjectComponent = async (programId) => {
    try {
      const response = await axios.post(`http://localhost:8080/programs/${programId}/projectComponents`,
        {
          // Données du composant de projet à envoyer
        }
      );

      const updatedPrograms = programs.map((program) => {
        if (program.id === programId) {
          return {
            ...program,
            projectComponents: [...program.projectComponents, response.data],
          };
        }
        return program;
      });

      setPrograms(updatedPrograms);
    } catch (error) {
      console.log(error);
    }
  };

  
  return (


    <div className="container">          
      <h2 className="text-center offset border rounded  shadow mx-3 my-2 ms-2 s-3"> Programmes</h2>

       <div className="py-9 mt-4 mx-4 dx-3">
         <table className="table offset border rounded  shadow mt-3 mx-5 my-1 mx-5">
           <thead className="table-light">

          <Link className='btn btn-success mx-8'  to="/addprogram"> Nouveau Composant</Link>
          
            <tr>
              <th scope="col">Code</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Donor</th>
              <th scope="col">Indicator</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {programs.map((program) => (
              <tr key={program.id}>
                <th scope="row">{program.id}</th>
                <td><Link to={`/program/${program.id}/projectcomponent/${program.id}`}>  {program.name}</Link></td>
                <td>{program.description}</td>
                <td>{program.donor}</td>
                <td>{program.indicator}</td>
                <td>           

                  <Link to={`/viewprogram/${program.id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye"
                      viewBox="0 0 16 16">                    
                      <path
                        fillRule="evenodd"
                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                      />
                    </svg>
                  </Link>

                  <Link to={`/editprogram/${program.id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pen"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
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
    
  ); 
}

