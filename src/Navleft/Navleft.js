import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import './Navleft.css';
import { Menu, Button } from 'antd';
import { MenuOutlined, CloseOutlined, AppstoreAddOutlined, AppstoreOutlined, PaperClipOutlined, ProjectOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { SubMenu } = Menu;

function Navleft() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`Navleft ${collapsed ? 'collapsed' : ''}`}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          position: 'absolute',
          top: '7%',
          maxHeight: '100px',
          maxWidth: '100px',
          left: collapsed ? '3.18%' : '11.3%', // Ajustez cette valeur pour l'emplacement souhaité
          zIndex: 1,
          backgroundColor: 'FDC782',
          color: collapsed ? '#001529' : 'FDC782',
        }}
        icon={collapsed ? <MenuOutlined /> : <CloseOutlined />}
      />
      <Menu
        onClick={(item) => {
          navigate(item.key);
        }}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        className="responsive-menu" // Ajoutez une classe pour le style responsive
        style={{ backgroundColor: 'white', height: '100vh' }} // Ajoutez le fond blanc et 100% de la hauteur de la vue
      >
        <Menu.Item key="/App" icon={<AppstoreAddOutlined />} style={{ color: '#001529' }}>
          Program
        </Menu.Item>

        <SubMenu key="Dashboard" icon={<AppstoreAddOutlined />} title="Dashboard" style={{ color: '#1890ff' }}>
          <Menu.Item key="/App/dashboard">Dashboard</Menu.Item>
          <Menu.Item key="/App/Report">Report</Menu.Item>
        </SubMenu>

        
        <Menu.Item key="/projectcomponent/petitprojet/beneficiaire/${petitprojet.id}" icon={<UserOutlined />} style={{ color: '#001529' }}>
          Bénéficiaire
        </Menu.Item>
        <Menu.Item key="/Dasboard" icon={<PaperClipOutlined />} style={{ color: '#001529' }}>
          Etat d'avancement
        </Menu.Item>
        <Menu.Item key="/App/payrolls" icon={<PaperClipOutlined />} style={{ color: '#001529' }}>
          Payroll
        </Menu.Item>
        <Menu.Item key="/petitprojet" icon={<ProjectOutlined />} style={{ color: '#001529' }}>
          Petit Projet
        </Menu.Item>
        <Menu.Item key="/Dasboard" icon={<PaperClipOutlined />} style={{ color: '#001529' }}>
          Etat d'avancement
        </Menu.Item>
        <Menu.Item key="/App/payrolls" icon={<PaperClipOutlined />} style={{ color: '#001529' }}>
          Payroll
        </Menu.Item>
        <Menu.Item key="/petitprojet" icon={<ProjectOutlined />} style={{ color: '#001529' }}>
          Petit Projet
        </Menu.Item>
        <Menu.Item key="/Dasboard" icon={<PaperClipOutlined />} style={{ color: '#001529' }}>
          Etat d'avancement
        </Menu.Item>
        <Menu.Item key="/App/payrolls" icon={<PaperClipOutlined />} style={{ color: '#001529' }}>
          Payroll
        </Menu.Item>
        <Menu.Item key="/petitprojet" icon={<ProjectOutlined />} style={{ color: '#001529' }}>
          Petit Projet
        </Menu.Item>
        <Menu.Item key="/projectcomponent/petitprojet/beneficiaire/${petitprojet.id}" icon={<UserOutlined />} style={{ color: '#001529' }}>
          Bénéficiaire
        </Menu.Item>
        <SubMenu key="finance" icon={<AppstoreAddOutlined />} title="Finance" style={{ color: '#1890ff' }}>
          <Menu.Item key="/Dasboard">Dashboard</Menu.Item>
          <Menu.Item key="/Dasboard">Activité</Menu.Item>
          <Menu.Item key="/Dasboard">Dashboard</Menu.Item>
          <Menu.Item key="/Dasboard">Dashboard</Menu.Item>
        </SubMenu>
        <Menu.Item key="/Bénéficiaire" icon={<UserOutlined />} style={{ color: '#001529' }}>
          Bénéficiaire
        </Menu.Item>
        <Menu.Item key="/" icon={<UserOutlined />} style={{ color: '#001529' }}>
          Log Out
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Navleft;
