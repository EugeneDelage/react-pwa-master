// mateialUI et UI
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import PersonIcon from '@mui/icons-material/Person';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import "./RequeteCitoyenne.css";

// API
import { RequeteCitoyenneApiService } from '@/api/RequeteCitoyenneService';
import { IRequeteCitoyenneActivite } from '@/models/RequeteCitoyenneActivite';
import { RequeteCitoyenneActivitesApiService } from '@/api/RequeteCitoyenneActivitesService';

// queries
import { useCallback, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { DataGrid, frFR, GridColDef } from '@mui/x-data-grid';
import RequeteCitoyenneCaracteristique from './RequeteCitoyenneCaracteristique';

function RequeteCitoyenne() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const noteColumns: GridColDef[] = [
    {
      field: 'noteDate',
      headerName: 'Date',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'note',
      headerName: 'Note',
      width: 250,
      editable: false,
    },
    {
      field: 'eluName',
      headerName: 'Nom élu',
      width: 150,
      editable: false,
    },
  ];
  const [openAddNoteDlg, setOpenAddNoteDlg] = useState(false);

  const noteElusRows = [
    { id: 1, noteDate: '2023-04-05', note: 'note un', eluName:'Jean Beaupré' },
    { id: 2, noteDate: '2023-04-06', note: 'note deux', eluName:'Paul Bérubé' },
    { id: 3, noteDate: '2023-04-07', note: 'note trois', eluName:'Jacynthe Girard' },
    
  ];
  const navigate = useNavigate(); 
  const openDemande = useCallback(
    (id: number) => () => {
      setTimeout(() => {
        navigate(`/demandeelu/${id}`);
      });
    },
    [],
  );
  const creeDemande = useCallback(
    () => () => {
      setTimeout(() => {
        navigate(`/demandeeluiss/`);
      });
    },
    [],
  );
  const openAddNoteDialog = () => {
    setOpenAddNoteDlg(true);
  };
  const handleCloseAddNoteDlg = () => {
    console.log('Close button');
    setOpenAddNoteDlg(false);
  };

  const demandeEluColumns: GridColDef[] = [
    {
      field: 'sujet',
      headerName: 'Sujet de la demande',
      type: 'string',
      width: 150,
      editable: false,
    },
    {
      field: 'statut',
      headerName: 'Statut',
      width: 100,
      editable: false,
    },
    {
      field: 'suiviPlanifieDgDate',
      headerName: 'Date suivi planifié DG',
      width: 160,
      editable: false,
    },
    {
      field: 'actions'    , type: 'actions', headerName: 'Actions', width: 120,
      renderCell:(params)=><Box>
        <Tooltip title="Consulter la demande">
          <OpenInNewIcon onClick={openDemande(params.id)} />
        </Tooltip>
      </Box>,
    },
  ];

  const demandesDgrows = [
    { id: 1, suiviPlanifieDgDate: '2023-04-05', sujet: 'sujet un', statut:'Assignation' },
    { id: 2, notsuiviPlanifieDgDateeDate: '2023-04-06', sujet: 'sujet deux', statut:'Création' },
    { id: 3, suiviPlanifieDgDate: '2023-04-07', sujet: 'sujet trois', statut:'Résolution' },
    
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  
    const fetchRequeteCitoyenne = async () =>{
        if (id){
          console.log("fetching Requete");
          const response = await RequeteCitoyenneApiService.getRequeteCitoyenneById(Number(id));
          const requeteCitoyenne=response.data;
          console.log("fetchRequeteCitoyenne response.data",requeteCitoyenne);
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
        console.log("fetchRequeteCitoyenneActivites response.data",requeteCitoyenneActivites);
        // reset(response.data);
        return requeteCitoyenneActivites;
      }
      return null;
    }  

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

    // const onSubmit=(data:IRequeteCitoyenne)=> {
    //    console.log(data);
    // }

    return(
        <>
         <Box component="div" sx={{ display: 'block' }}>              
            <Typography align="center" variant="h5">
               Requête Citoyenne
            </Typography>
         </Box>
         <FullSizeCenteredFlexBox>
           <Box sx={{ Width: '100%', marginTop:'10px', marginRight:'15px'}}>
             <Card  sx={{ Width: '100%'}}>
              <CardHeader  
                 title={requeteCitoyenneQuery.data.requerant}
                 avatar= {<Avatar><PersonIcon color="primary" /></Avatar>}>
              </CardHeader>
              <CardContent>
              <Typography variant="body2" color="text.secondary">
                {requeteCitoyenneQuery.data.adresse} <br />
                {requeteCitoyenneQuery.data.telephone1} <br />              
                {requeteCitoyenneQuery.data.telephone2} <br />                            
                {requeteCitoyenneQuery.data.langue} <br />                            
                {requeteCitoyenneQuery.data.district} <br /> 
              </Typography>                           
              </CardContent>
            </Card>
           </Box>
           <Box sx={{ border: 2, borderRadius: 5,marginTop:1,maxHeight:550,minWidth: 650 }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Caractéristiques" value="1" />
                <Tab label="Activités" value="2" />
                <Tab label="Notes et suivis DG" value="3" />
                <Tab label="Emplacement" value="4" />
              </TabList>
              </Box>
              <TabPanel sx={{  height:`calc(100vh - 182px)`,width: 650}} value="1">  
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
              <TabPanel sx={{  height:`calc(100vh - 182px)`,width: 650}} value="2">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 600 }} aria-label="simple table">
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
                            <TableCell> {row.createdDate} </TableCell>
                            <TableCell> {row.typeActivite} </TableCell>
                            <TableCell>{row.sujet}</TableCell>
                            <TableCell>{row.fichiers}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
              </TabPanel>
              <TabPanel sx={{  height:`calc(100vh - 182px)`,width: 650}} value="3">
                <Box sx={{height:200, width:'100%'}}>
                  <DataGrid
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    sx={{ borderColor: 'red'}}
                    columns={noteColumns}
                    rows={noteElusRows}
                    hideFooter={true}
                    hideFooterPagination={true}
                    hideFooterSelectedRowCount={true}
                    rowHeight={25}
                  />
                </Box>

                <Box sx={{height:200, width:'100%'}}>
                  <DataGrid
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    columns={demandeEluColumns}
                    rows={demandesDgrows}
                    hideFooter={true}
                    hideFooterPagination={true}
                    hideFooterSelectedRowCount={true}                   
                    rowHeight={30}
                  />
                </Box>
                <Box 
                 component="span"
                 m={1}
                 display="flex"
                 justifyContent="space-around"
                 alignItems="center"
                 sx={{height:25}}>                
                  <Button onClick={creeDemande()} variant="contained" >Créer une demande à la DG</Button>
                  <Button onClick={openAddNoteDialog} variant="contained" >Ajouter une note</Button>
                </Box>
              </TabPanel>
              <TabPanel sx={{  height:`calc(100vh - 182px)`,width: 650}} value="4">
                    <MapContainer
                    // center={[51.505,-0.09]}
                    center={requeteCitoyenneQuery.data.emplacement.split(',').map(Number)}
                    scrollWheelZoom={false}
                    zoom={13}
                    style={{ height: "100vh" ,maxHeight:"350px"}}
                    >
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={requeteCitoyenneQuery.data.emplacement.split(',').map(Number)}>
                      <Popup>
                        {requeteCitoyenneQuery.data.adresse}
                      </Popup>
                    </Marker>
                    </MapContainer>
              </TabPanel>
            </TabContext>
           </Box>
           <Dialog
            fullScreen={fullScreen}
            open={openAddNoteDlg}
            onClose={handleCloseAddNoteDlg}
            aria-labelledby="responsive-dialog-title"
          >
          <DialogTitle id="responsive-dialog-title">
            {"Ajout d'une note"}
          </DialogTitle>
          <DialogContent sx={{ minWidth:500}} 
          >
          <Grid container spacing={1}>
             <Grid item xs={12} sm={12}>
             <TextField  multiline variant="filled" 
                 fullWidth
                 defaultValue="Description" />
             </Grid>
          </Grid>
          <DialogContentText>
            Inscrivez une note.
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseAddNoteDlg}>
              Annuler
            </Button>
            <Button onClick={handleCloseAddNoteDlg} autoFocus>
              Sauvegarder
            </Button>
          </DialogActions>
           </Dialog>
         </FullSizeCenteredFlexBox>
        </>
    );
}

export default RequeteCitoyenne;
