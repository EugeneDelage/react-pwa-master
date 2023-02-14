// mateialUI et UI
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import PersonIcon from '@mui/icons-material/Person';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Card, CardContent, CardHeader, Divider, Grid, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import "./PageRequeteCitoyenne.css";

// API
import { RequeteCitoyenneApiService } from '@/api/RequeteCitoyenneService';
import { IRequeteCitoyenne } from '@/models/RequetesCitoyennes';
import { IRequeteCitoyenneActivite } from '@/models/RequeteCitoyenneActivite';
import { RequeteCitoyenneActivitesApiService } from '@/api/RequeteCitoyenneActivitesService';

// Form et queries
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function PageRequeteCitoyenne() {

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
  
    const fetchRequeteCitoyenne = async () =>{
        if (id){
          console.log("fetching Requete");
          const response = await RequeteCitoyenneApiService.getRequeteCitoyenneById(Number(id));
          const requeteCitoyenne=response.data;
          console.log("fetch response.data",requeteCitoyenne);
          // reset(response.data);
          return requeteCitoyenne;
        }
        return null;
    }  
    const fetchRequeteCitoyenneActivites = async () =>{
      if (id){
        console.log("fetching Activités");
        const response = await RequeteCitoyenneActivitesApiService.getAllRequeteCitoyenneActivites(Number(id));
        const requeteCitoyenneActivites=response.data;
        console.log("fetch response.data",requeteCitoyenneActivites);
        // reset(response.data);
        return requeteCitoyenneActivites;
      }
      return null;
    }  

    // const {isError, isLoading, data, error} = useQuery(
    //     'requetecitoyenne',
    //     fetchRequeteCitoyenne,
    //     {staleTime:60000}
    //   );   
    const {id} = useParams();
    const [value, setValue] = useState('1');

    const [requeteCitoyenneQuery, requeteCitoyenneActivitiesQuery] = useQueries({
      queries: [
        {
          queryKey: ['requetecitoyenne'],
          queryFn: fetchRequeteCitoyenne
        },
        {
          queryKey: ['requetecitoyenneactivities'],
          queryFn: fetchRequeteCitoyenneActivites,
        },
      ],
    });

    if (requeteCitoyenneQuery.isLoading) return 'Chargement requête...';
    if (requeteCitoyenneActivitiesQuery.isLoading) return 'Chargement activités...';
    if (requeteCitoyenneQuery.error)
      return 'Erreur: ' + requeteCitoyenneQuery.error.message;
    if (requeteCitoyenneActivitiesQuery.error)
      return 'Erreur: ' + requeteCitoyenneActivitiesQuery.error.message;

    const { handleSubmit, formState: { errors } } = useForm<IRequeteCitoyenne>({
      defaultValues:{...requeteCitoyenneQuery.data},
    });

    const onSubmit=(data:IRequeteCitoyenne)=> {
       console.log(data);
    }

    const { data } = requeteCitoyenneQuery;
    return(
        <>
        <FullSizeCenteredFlexBox>
           <Box sx={{ Width: '100%', marginTop:'10px', marginRight:'15px'}}>
             <Card  sx={{ Width: '100%'}}>
              <CardHeader  
                 title={requeteCitoyenne.requerant}
                 avatar= {<Avatar><PersonIcon color="primary" /></Avatar>}>
              </CardHeader>
              <CardContent>
              <Typography variant="body2" color="text.secondary">
                {requeteCitoyenne.emplacement} <br />
                {requeteCitoyenne.telephone1} <br />              
                {requeteCitoyenne.telephone2} <br />                            
                {requeteCitoyenne.langue} <br />                            
                {requeteCitoyenne.district} <br /> 
              </Typography>                           
              </CardContent>
            </Card>
           </Box>
          <Box sx={{ border: 2, borderRadius: 5,marginTop:1,maxHeight:450 }}>
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
             <Grid  sx={{border: 1, borderRadius: 2}} container spacing={1}>
                <Grid sx={{borderRight: 1,borderBottom:1}} item xs={4}>
                  Contenant fourni par la ville
                </Grid>
                <Grid sx={{borderBottom:1}} item xs={8}>
                  Bac noir (Ordure)
                </Grid>
                <Divider></Divider>
                <Grid sx={{borderRight: 1}} item xs={4}>
                  Description 2
                </Grid>
                <Grid  item xs={8}>
                  Valeur 2
                </Grid>
                <Divider></Divider>
              </Grid>             
             </TabPanel>
             <TabPanel sx={{  height:`calc(100vh - 182px)`}} value="2">
             <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Créé le</TableCell>
                    <TableCell>Type activité</TableCell>
                    <TableCell>Sujet</TableCell>
                    <TableCell>Fichier(s)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requeteCitoyenneActivitiesQuery.data.map((row:IRequeteCitoyenneActivite) => (
                    <TableRow  key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell>              {row.typeActivite} </TableCell>
                      <TableCell align="right">{row.sujet}</TableCell>
                      <TableCell align="right">{row.fichiers}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
             </TabPanel>
             <TabPanel sx={{  height:`calc(100vh - 182px)`}} value="3">
             </TabPanel>
             <TabPanel sx={{  height:`calc(100vh - 182px)`}} value="4">
                  <MapContainer
                  center={[51.505,-0.09]}
                  scrollWheelZoom={false}
                  zoom={13}
                  style={{ height: "100vh" ,maxHeight:"350px"}}
                  >
                  <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[51.505,-0.09]}>
                    <Popup>
                      {requeteCitoyenneQuery.data.emplacement}
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
