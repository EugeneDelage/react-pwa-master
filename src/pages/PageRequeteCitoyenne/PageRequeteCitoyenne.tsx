import { RequeteCitoyenneApiService } from '@/api/RequeteCitoyenneService';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { IRequeteCitoyenne } from '@/models/RequetesCitoyennes';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, CardContent, CardHeader, Divider, Grid, makeStyles, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "./PageRequeteCitoyenne.css";

function PageRequeteCitoyenne() {

    const {id} = useParams();
    const [value, setValue] = useState('1');
  
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
  
    const fetchRequeteCitoyenne = async () =>{
        if (id){
          console.log("fetching Requete");
          const response = await RequeteCitoyenneApiService.getRequeteCitoyenneById(Number(id));
          const requeteCitoyenne=response.data;
          console.log("fetch response.data",requeteCitoyenne);
          reset(response.data);
          return requeteCitoyenne;
        }
        return null;
      }  
    const {isError, isLoading, data, error} = useQuery(
        'requetecitoyenne',
        fetchRequeteCitoyenne,
        {staleTime:60000}
      );   

    const { handleSubmit, control, reset, formState: { errors } } = useForm<IRequeteCitoyenne>({
      defaultValues:{...data},
    });

    if (isLoading){
        console.log("Loading...",data);
        return <div>Chargement...</div>
      }
      if (isError){
        console.log("Erreur...",error);
        return <div>Erreur...</div>
      }

     const onSubmit=(data:IRequeteCitoyenne)=> {
    console.log(data);
  }


    return(
        <>
        <FullSizeCenteredFlexBox>
           <Box sx={{ Width: '100%', marginTop:'10px', marginRight:'15px'}}>
             <Card  sx={{ Width: '100%'}}>
              <CardHeader  title={data.requerant}>
                 
              </CardHeader>
              <CardContent>
              {data.emplacement}
              </CardContent>
            </Card>
           </Box>
          <Box>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
             <TabList onChange={handleChange} aria-label="lab API tabs example">
               <Tab label="Caractéristiques" value="1" />
               <Tab label="Activités" value="2" />
               <Tab label="Notes et suivis" value="3" />
               <Tab label="Emplacement" value="4" />
             </TabList>
            </Box>
             <TabPanel sx={{  height:`calc(100vh - 182px)`}} value="1">              
             <Grid  sx={{border: 1}} container spacing={0}>
                <Grid sx={{border: 1}} item xs={4}>
                  Contenant fourni par la ville
                </Grid>
                <Grid sx={{border: 1}} item xs={8}>
                  Bac noir (Ordure)
                </Grid>
                <Divider></Divider>
                <Grid sx={{border: 1}} item xs={4}>
                  Description 2
                </Grid>
                <Grid sx={{border: 1}} item xs={8}>
                  Valeur 2
                </Grid>
                <Divider></Divider>
              </Grid>             
             </TabPanel>
             <TabPanel sx={{  height:`calc(100vh - 182px)`}} value="2">
             </TabPanel>
             <TabPanel sx={{  height:`calc(100vh - 182px)`}} value="3">
             </TabPanel>
             <TabPanel sx={{  height:`calc(100vh - 182px)`}} value="4">
                  <MapContainer
                  center={[51.505,-0.09]}
                  scrollWheelZoom={false}
                  zoom={13}
                  style={{ height: "100vh" }}
                  >
                  <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[51.505,-0.09]}>
                    <Popup>
                      S pretty CSS3 popup. <br /> Easily customizable
                    </Popup>
                  </Marker>
                  </MapContainer>
             </TabPanel>
          </TabContext>
          </Box>

       </FullSizeCenteredFlexBox>
    </>
    );
}

export default PageRequeteCitoyenne;
