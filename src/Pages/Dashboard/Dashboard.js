import { Card, Space, Statistic, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { AppstoreAddOutlined,ProjectOutlined, DollarCircleOutlined, AppstoreOutlined, PaperClipOutlined, ShopOutlined, ShoppingFilled, UserOutlined } from '@ant-design/icons'
import { getBeneficiaire, getBeneficiaireAge } from '../../Layout/API'




import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
 } 
 from 'chart.js';
 import { Bar } from 'react-chartjs-2';

 ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
 );


function Dashboard() {
    return (
        <div>
         <Space size={20} direction='vertical'>
                <Typography.Title level={4}><strong>Dashboard</strong></Typography.Title>
                <Space direction='horizontal'>
                    <Dasboardpp icon={<UserOutlined
                    
                    style={{color:"purple",
                         backgroundColor:'rgba(0,255,0,0.25)',
                         borderRadius: 20,
                         fontSize:20,
                         padding:8,
                      }}
                    />} title={"Beneficiaire"} value={12345}/>
                    <Dasboardpp icon={<UserOutlined 
                    
                    style={{color:"green",
                         backgroundColor:'rgba(0,260,0,0.20)',
                         borderRadius: 20,
                         fontSize:15,
                         padding:8,
                      }}
                    />} title={"Beneficiaire Fille"} value={12345}/>
                    <Dasboardpp icon={<UserOutlined 
                    
                    style={{color:"green",
                         backgroundColor:'rgba(0,260,0,0.20)',
                         borderRadius: 20,
                         fontSize:15,
                         padding:8,
                      }}
                    />} title={"Beneficiaire Garcon"} value={12345}/>
                    <Dasboardpp icon={<UserOutlined

                        style={{color:"green",
                        backgroundColor:'rgba(0,260,0,0.20)',
                        borderRadius: 20,
                        fontSize:15,
                        padding:8,
                     }}
                    
                    />} title={"Facilitateur"} value={12345}/>
                    <Dasboardpp icon={<ProjectOutlined
                    
                    style={{color:"red",
                         backgroundColor:'rgba(255,0,0,0.20)',
                         borderRadius: 20,
                         fontSize:15,
                         padding:8,
                      }}
                    
                    />} title={" Petit projet"} value={12345}/>
                    <Dasboardpp icon={<UserOutlined

                        style={{color:"green",
                        backgroundColor:'rgba(0,260,0,0.20)',
                        borderRadius: 20,
                        fontSize:15,
                        padding:8,
                         }}
                    
                    />} title={"Quartier"} value={12345}/>
                    <Dasboardpp icon={<DollarCircleOutlined  
                        style={{color:"green",
                        backgroundColor:'rgba(0,260,0,0.20)',
                        borderRadius: 20,
                        fontSize:15,
                        padding:8,
                      }}/>} title={"Salaire Total Beneficiaire"} value={12345}/>

                       </Space>
                        <Space>
                           <RecentBeneficiaire/>
                           <DashboardChart/>
                        </Space>
                       </Space>
                       </div>
                      )
            }
   function Dasboardpp({title,value, icon}){
             return(
                    <Card>
                        <Space direction='horizontal'>
                            {icon}
                            <Statistic title={title} value={value}/>
                        </Space>
                    </Card>
    )
 }
 function RecentBeneficiaire(){

   const [dataSource, setDatasource] = useState([])  
   const [loading, setLoading] = useState(false)

      useEffect(() =>{
      setLoading(true)
      getBeneficiaire().then(res=>{
      setDatasource(res.products.splice(0, 7));
      setLoading(false);
   });    
   }, []);   

   return (
   <>

   <Typography.Text>Recent Beneficiaire</Typography.Text>
   <Table
      columns={[
         {
         title:"title",
         dataIndex:"title",
         },
         {
         title: "price",
         dataIndex:"price",
         },
         {
         title: "quantity",
         dataIndex:'quantity',
         }, 
         {
         title: "quantity",
         dataIndex:'quantity',
         }, 
         {
         title: "quantity",
         dataIndex:'quantity',
               }, 

         ]}
         loading={loading}
         dataSource={dataSource}
         pagination={false}
         ></Table></>
         )}

function DashboardChart() {
      const [ageData, setAgeData] = useState({
         labels:[],
         datasets:[]
         })


        useEffect(() => {
        getBeneficiaireAge().then(res=>{
        const labels=res.carts.map(cart=>{
         return `User-${cart.userId }`
         });

      const data=res.carts.map(cart=>{
         return cart.discountedTotal ;
        });

      const dataSource  = {
         labels,
         datasets: [
         {
         label: 'Beneficiaire Age',
         data: data,
         backgroundColor: 'rgba(10, 120, 255, 1)',
         },
           
         ],
         };
   
setAgeData(dataSource)

          });
        
          }, [])
   
    const options = {
          responsive: true,
          plugins: {
          legend: {
          position: 'bottom',
          },
          title: {
          display: true,
          text: 'Beneficiaire Age',
          },
          },
          };

   

         return (
         <Card style={{width:600, height:350}}> 
            <Bar options={options} data={ageData} />
         </Card>
         );
      }

export default Dashboard
