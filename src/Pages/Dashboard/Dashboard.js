import React, { useEffect, useState, useRef, } from 'react';
import { Card, Space, Statistic, Table, Typography } from 'antd';
import { UserOutlined, ProjectOutlined } from '@ant-design/icons';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, DoughnutController, ArcElement } from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { getBeneficiaire, getBeneficiaireAge, getRecentProject } from '../../Layout/API';
import { Row, Col } from 'antd';
import { ResponsiveContainer } from 'recharts';
import { auto } from '@popperjs/core';

function DashboardppItem({ title, value, icon }) {
  return (
    <Card>
      <Space direction='horizontal'>
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, DoughnutController, ArcElement);
ChartJS.register(DoughnutController, ArcElement);

function RecentProject() {
  const [dataSource, setDatasource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getRecentProject();
        setDatasource(res.slice());
      } catch (error) {
        console.error('Erreur lors de la récupération des données du serveur', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const columns = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
      ellipsis: true,
      width: '90%', // Utilisez des pourcentages pour la largeur
      render: (text) => <div className="ellipsis-texts">{text}</div>,
    },
    {
      title: 'Latitude',
      dataIndex: 'latitude',
      key: 'latitude',
      ellipsis: true,
      width: '25%',
      render: (text) => <div className="ellipsis-texts">{text}</div>,
    },
    {
      title: 'Longitude',
      dataIndex: 'longitude',
      key: 'longitude',
      ellipsis: true,
      width: '25%',
      render: (text) => <div className="ellipsis-texts">{text}</div>,
    },

    {
      title: 'Status',
      dataIndex: 'statut',
      key: 'statut',
      ellipsis: true,
      width: '25%',
      render: (text) => <div className="ellipsis-texts">{text}</div>,
    },
    
    {
      title: 'Quartier',
      dataIndex: 'quartierNom',
      key: 'quartierNom',
      ellipsis: true,
      width: '20%',
      render: (text) => <div className="ellipsis-texts">{text}</div>,
    },
    {
      title: 'Zone',
      dataIndex: 'zoneNom',
      key: 'zoneNom',
      ellipsis: true,
      width: '20%',
      render: (text) => <div className="ellipsis-texts">{text}</div>,
    },
  ];
  
  return (
    <>
      <Typography.Text>
        <div className='recent'>
          <strong> </strong>
        </div>
      </Typography.Text>
      <div style={{ maxHeight: '680px', overflowY: 'auto', overflowX: 'auto' }}>
        <Table
          columns={columns}
          loading={loading}
          dataSource={dataSource}
          pagination={false}
          size="small"
          bordered
          className="responsive-table"
        />
      </div>
    </>
  );
}

function RecentBeneficiaire() {
  const [dataSource, setDatasource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getBeneficiaire();
        setDatasource(res.slice());
      } catch (error) {
        console.error('Erreur lors de la récupération des données du serveur', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const columns = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
      ellipsis: true,
      width: '25%', // Utilisez des pourcentages pour la largeur
      render: (text) => <div className="ellipsis-text">{text}</div>,
    },
    {
      title: 'Prenom',
      dataIndex: 'prenom',
      key: 'prenom',
      ellipsis: true,
      width: '25%',
      render: (text) => <div className="ellipsis-text">{text}</div>,
    },
    {
      title: 'Sexe',
      dataIndex: 'sexe',
      key: 'sexe',
      ellipsis: true,
      width: '20%',
      render: (text) => <div className="ellipsis-text">{text}</div>,
    },
    {
      title: 'Qualification',
      dataIndex: 'qualification',
      key: 'qualification',
      ellipsis: true,
      width: '20%',
      render: (text) => <div className="ellipsis-text">{text}</div>,
    },
  ];
  

  return (
    <>
      <Typography.Text>
        <div className='recent'>
          <strong>Recent Beneficiairies </strong>
        </div>
      </Typography.Text>
      <div style={{ maxHeight: '680px', overflowY: 'auto', overflowX: 'auto' }}>
        <Table
          columns={columns}
          loading={loading}
          dataSource={dataSource}
          pagination={false}
          size="small"
          bordered
          className="responsive-table"
        />
      </div>
    </>
  );
}





function calculateFilles(beneficiaires) {
  return beneficiaires.filter((b) => b.sexe === 'F').length;
}

function calculateGarcons(beneficiaires) {
  return beneficiaires.filter((b) => b.sexe === 'M').length;
}

function qualificatier(beneficiaires) {
  return beneficiaires.filter((b) => b.qualification === 'Q').length;
}

function nonqualificatier(beneficiaires) {
  return beneficiaires.filter((b) => b.qualification === 'NQ').length;
}

function DashboardChart({ beneficiaires }) {
  const [ageData, setAgeData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBeneficiaireAge();
        const labels = res.carts.map((cart) => `User-${cart.userId}`);
        const data = res.carts.map((cart) => cart.discountedTotal);

        const dataSource = {
          labels,
          datasets: [
            {
              label: 'Beneficiaire Age',
              data,
              backgroundColor: ['#B96182', '#05DBF8'],
            },
          ],
        };

        setAgeData(dataSource);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du serveur', error);
      }
    };

    fetchData();
  }, []);

  function VotreComponent() {
    const [payrolls, setPayrolls] = useState([]);
    useEffect(() => {
      const fetchPayrolls = async () => {
        try {
          const response = await axios.get('http://localhost:8080/payrolls');
          setPayrolls(response.data);
          console.log('Payrolls', response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des données du serveur', error);
        }
      };
  
      fetchPayrolls();
    }, []);
    return (
      <div>
        {payrolls.map((payrolls) => (
          <div key={payrolls.id}>{/* Affichez les détails de chaque payroll ici */}</div>
        ))}
      </div>
    );
  }


function getCombinedData(beneficiaires, peyroll) {
    const filles = calculateFilles(beneficiaires);
    const garcons = calculateGarcons(beneficiaires);
    const totalSexe = filles + garcons;
  
    const qualifie = beneficiaires.filter((b) => b.qualification === 'Q').length;
    const nonQualifie = beneficiaires.filter((b) => b.qualification === 'NQ').length;
    const totalQualification = qualifie + nonQualifie;

    const monCashPayments = peyroll ? peyroll.filter((p) => p.methode_paiement === 'monCash') : [];
    const lajanCashPayments = peyroll ? peyroll.filter((p) => p.methode_paiement === 'lajanCash') : [];

    const monCashTotal = monCashPayments.reduce((acc, curr) => acc + curr.montant_paye, 0);
    const lajanCashTotal = lajanCashPayments.reduce((acc, curr) => acc + curr.montant_paye, 0);
    const totalPayroll = monCashTotal + lajanCashTotal;

    const percentageFilles = ((filles / totalSexe) * 100).toFixed(2);
    const percentageGarcons = ((garcons / totalSexe) * 100).toFixed(2);
    const percentageQualifie = ((qualifie / totalQualification) * 100).toFixed(2);
    const percentageNonQualifie = ((nonQualifie / totalQualification) * 100).toFixed(2);
    const percentageMonCash = ((monCashTotal / totalPayroll) * 100).toFixed(2);
    const percentageLajanCash = ((lajanCashTotal / totalPayroll) * 100).toFixed(2);
  
    return {
      labels: [
        `${percentageFilles}% Filles`,
        `${percentageGarcons}% Garçons`,
        `${percentageQualifie}% Qualifiés`,
        `${percentageNonQualifie}% Non Qualifiés`,
        `MonCash (${percentageMonCash}%)`,
        `LajanCash (${percentageLajanCash}%)`,
      ],
      datasets: [
        {
          data: [filles, garcons, qualifie, nonQualifie, monCashTotal, lajanCashTotal],
          backgroundColor: ['#29C3FC', '#7F3A7F', '#F1C40F', '#A93226', '#3498DB', '#E74C3C'],
        },
      ],
      percentageSalaires: {
        MonCash: percentageMonCash,
        LajanCash: percentageLajanCash,
      },
      totalPayroll: totalPayroll,
    };
}

const data = getCombinedData(beneficiaires);
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Combinaison des données',
            height: 218,
        },
    },
};

  return (
    <ResponsiveContainer width="700px" height={670}>    
       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        <Card className="slds-card" style={{ width: '800px', maxWidth: '100%', height: '340px',  bordered:'100px', top:'6px' }}>
            <Bar options={options} data={ageData} />
        </Card>
  
      <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
      <Card className="slds-card" style={{ width: '700px', top:'0px', maxWidth: 'auto', height: '340px',  marginLeft:'0px', position: 'relative' }}>
        <Pie data={getCombinedData(beneficiaires)} style={{ width: 'auto', height: '80%', maxWidth: 'auto', maxHeight: '300px' }} />                 
      </Card> 
      </Col>    
      </div>
    </ResponsiveContainer>
  );
  }
 

  function Dashboardpp() {
    const [beneficiaires, setBeneficiaires] = useState([]);
    const [payrolls, setPayrolls] = useState([]);
    const [petitProjetData, setPetitProjetData] = useState([]);
    const [petitprojets, setPetitProjet] = useState([]);
    const [formationProfessionnelle, setFormationProfessionnelle] = useState([]);
    const [infrastructure, setInfrastructure] = useState([]);
    const [zone, setZone] = useState([]);
    const [zoneBeneficiaryCounts, setZoneBeneficiaryCounts] = useState([]);
    const [projectsCountByType, setProjectsCountByType] = useState({});
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Récupérer les données de la zone
          const responseZone = await fetch('http://localhost:8080/zone');
          const dataZone = await responseZone.json();
          console.log('zone:', dataZone);
          setZone(dataZone);
  
          // Récupérer les données des bénéficiaires
          const responseBeneficiaires = await fetch('http://localhost:8080/beneficiaire');
          const dataBeneficiaires = await responseBeneficiaires.json();
          console.log('Beneficiaires:', dataBeneficiaires);
          setBeneficiaires(dataBeneficiaires);
  
          const responsePetitProjet = await fetch('http://localhost:8080/petitprojet');
          const dataPetitProjet = await responsePetitProjet.json();
          console.log('petitprojets:', dataPetitProjet);
          setPetitProjetData(dataPetitProjet);
  
          // Filtrer les petits projets par type 'Infrastructure'
          const responseProjectsCountByType = await fetch('http://localhost:8080/petitprojet/count-by-type');
          const dataProjectsCountByType = await responseProjectsCountByType.json();
          console.log('Projects Count By Type:', dataProjectsCountByType);
          setProjectsCountByType(dataProjectsCountByType);
  
          // Mettre à jour l'état petitprojets avec les données des petits projets
          setPetitProjet(dataPetitProjet);
  
        } catch (error) {
          console.error('Erreur lors de la récupération des données', error);
          // Ajoutez ici la gestion de l'erreur, par exemple, affichage d'un message d'erreur à l'utilisateur.
        }
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
      console.log('Beneficiaires state:', beneficiaires);
      console.log('PetitProjet state:', petitProjetData);
      console.log('PetitProjet state:', petitprojets);
      console.log('Formation Professionnelle state:', formationProfessionnelle);
      console.log('Infrastructure state:', infrastructure);
      console.log('Zone state:', zone);
      console.log('Projects Count By Type:', projectsCountByType);
    }, [beneficiaires, petitProjetData, formationProfessionnelle, zone, infrastructure, petitprojets, projectsCountByType]);
   
   useEffect(() => {
    const fetchData = async () => {
      try { 
        const responseZoneBeneficiaryCounts = await fetch('http://localhost:8080/zoneBeneficiaryCounts');
        const dataZoneBeneficiaryCounts = await responseZoneBeneficiaryCounts.json();
        console.log('Comptages de bénéficiaires par zone:', dataZoneBeneficiaryCounts);
        setZoneBeneficiaryCounts(dataZoneBeneficiaryCounts);
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        const response = await axios.get('http://localhost:8080/payrolls');
        setPayrolls(response.data);
        console.log('Payrolls', response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du serveur', error);
      }
    };
    fetchPayrolls();
  }, []);

  return (
    <div className='inetrface'>    
      <Space size={5} direction='vertical'>
        <Typography.Title level={5}>
            <div>
              <strong style={{ color: '#885266', fontSize: 'auto', textDecoration: 'underline' }}>Dashboard</strong>
              <div className='titrereports slideFromRight'> PADF....&lt;&lt; Filet de Sécurité Sociale Temporaire et Compétence pour les Jeunes &gt;&gt;</div>
            </div>
        </Typography.Title>

        
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
            <Card className='slds-card'>
            <DashboardppItem
              icon={<UserOutlined className="slds-card" style={{ color: '#151402', backgroundColor: '#F4F706 ', borderRadius: 20,  fontSize: 25, padding: 10 }} />}
              title={<span className="bold-title">Total Beneficiaires</span>}
              value={beneficiaires.length}
              className="responsive-items"
             />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
           <Card className='slds-card'>
              <DashboardppItem
                icon={<UserOutlined className="slds-card" style={{ color: '#151402', backgroundColor: '#E83F7F', borderRadius: 20, fontSize: 25, padding: 10 }} />}
                title={<span className="bold-title">Filles</span>}
                value={calculateFilles(beneficiaires)}
                className="responsive-items"
              />
           </Card>
          </Col>

          <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <Card className='slds-card'>
              <DashboardppItem
                icon={<UserOutlined className="slds-card" style={{ color: '#151402', backgroundColor: '#4CA5EF', borderRadius: 20, fontSize: 25, padding: 10 }} />}
                title={<span className="bold-title">Garcons</span>}
                value={calculateGarcons(beneficiaires)}
                className="responsive-items"
              />
             </Card>
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
            <Card className='slds-card'>
              <DashboardppItem
                icon={<ProjectOutlined className="slds-card" style={{ color: '#151402', backgroundColor: '#ED840D', borderRadius: 20, fontSize: 25, padding: 10 }} />}
                title={<span className="bold-title">Petit-Projets</span>}
                value={projectsCountByType['Infrastructure'] || 0} // Utilisez la clé correcte pour le type de projet
                className="responsive-items"
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <Card className='slds-card'>
                <DashboardppItem
                  icon={<ProjectOutlined className="slds-card" style={{ color: '#151402', backgroundColor: '#0F9C7B', borderRadius: 20, fontSize: 25, padding: 10 }} />}
                  title={<span className="bold-title">Centre-Formation</span>}
                  value={projectsCountByType['Formation Professionnelle'] || 0}
                  className="responsive-items"
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <Card className='slds-card'>
                <DashboardppItem
                  icon={<ProjectOutlined className="slds-card" style={{ color: '#151402', backgroundColor: '#ED250D', borderRadius: 20, fontSize: 25, padding: 10, position: 'relative', flexDirection: 'column' }} />}
                  title={<span className="bold-title">Zone d'interv </span>}
                  value={zone.length}
                  className="responsive-items"
                />
              </Card>
            </Col>
        </Row>

          <Space style={{ width: '100%', justifyContent: 'center' }}>
            <RecentBeneficiaire style={{ flex: '0 1 100%' }} />
            <DashboardChart beneficiaires={beneficiaires} />       
          </Space>

      </Space>

    
        <div className='dashboard-title'>
            <h1 className='dashboard-title-heading'>
              La liste des Projets 
            </h1>
        </div> 

        <p className='dashboard-subtitle titrereports slideFromRight'>
          PADF....&lt;&lt; Filet de Sécurité Sociale Temporaire et Compétence pour les Jeunes &gt;&gt;
        </p>

        <Space style={{ width: '100%', justifyContent: 'center' }}>
           <RecentProject style={{ flex: '0 1 100%' }} />
        </Space> 
    
  </div>
  
);
}

export default Dashboardpp;