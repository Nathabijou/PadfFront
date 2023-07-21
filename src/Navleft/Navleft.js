import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/js/dist/dropdown'
import './Navleft.css'
import { Menu } from 'antd'
import { AppstoreAddOutlined,ProjectOutlined, AppstoreOutlined, PaperClipOutlined, ShopOutlined, ShoppingFilled, UserOutlined } from '@ant-design/icons'
import { icons } from 'antd/es/image/PreviewGroup'
import { Link, useNavigate } from 'react-router-dom'


function Navleft() {

  const navigate =useNavigate()  
  
  
  return (

        <div className='Navleft' >

<Menu 

onClick={(item)=>{
  //item.key
  
  navigate(item.key);
}}

items={[



{
  label:" Program",
  icon: <AppstoreAddOutlined/>,
  key:"/Dasboard"
},

{
  label:" Project",
  icon: <ShopOutlined/>,
  key:"/Dasboard"
},
{
  label: " Dasboard",
  icon: <AppstoreOutlined />,
  key:"/dashboard"
},

{
  label:" Etat d'avan",
  icon:<PaperClipOutlined/>,
  key:"/Dasboard"
},

{
  label:" Petit Projet",
  icon: <ProjectOutlined/>,
  key:"/petitprojet"
},

{
  label:"Bénéficiaire",
  icon: <UserOutlined/>,
  key:"/projectcomponent/petitprojet/beneficiaire/${petitprojet.id}"
  
},

{
  label:" Dasboard",
  icon: <ShoppingFilled/>,
  key:"/Dasboard"
}, 
{
  label: " Dasboard",
  icon: <AppstoreAddOutlined/>,
  key:"/Dasboard",
},

{
  label:" Dasboard",
  icon: <ShopOutlined/>,
  key:"/Dasboard"
},

{
  label:" Dasboard",
  icon: <AppstoreOutlined/>,
  key:"/Dasboard"
},

{
  label:" Dasboard",
  icon:<PaperClipOutlined/>,
  key:"/Dasboard"
},

{
  label:" Dasboard",
  icon: <ShopOutlined/>,
  key:"/Dasboard"
},

{
  label:"Bénéficiaire",
  icon: <UserOutlined/>,
  key:"/Bénéficiaire"
},

{
  label:" Dasboard",
  icon: <ShoppingFilled/>,
  key:"/Dasboard"
},




]}

>
  
  </Menu> 
      </div>
      
    )
}
export default Navleft
