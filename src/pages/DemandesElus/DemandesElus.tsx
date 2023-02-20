// Material
import Typography from '@mui/material/Typography';
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Tab, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { DataGrid, GridColumns, GridRowId } from '@mui/x-data-grid';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// API
import { DemandeEluApiService } from '@/api/RequeteDemandeEluService';
import { IDemandeElu } from '@/models/DemandeElu';

// react
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function DemandesElus() {
  const [tabValue, setTabValue] = useState('1');
  const [demandeselus, setDemandesElus] = useState<IDemandeElu>([]);
  type Row = typeof demandeselus[number];

  useEffect(() => {
    getDemandesElus();
  }, []);

  const getDemandesElus = async () =>{
    const response = await DemandeEluApiService.getAllDemandesElus(1); // TODO: utiliser locStorage.userId
    console.log(`reponse=${response}`);
    setDemandesElus(response.data);
  }
  const navigate = useNavigate(); 
  const openDemandeElu = useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        navigate(`/demandeelu/${id}`);
      });
    },
    [],
  );
  const [pageSize, setPageSize] = useState<number>(5);

  const colIssOuverte= useMemo<GridColumns<Row>>(
    ()=>[
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'noDemande',
      headerName: 'No Demande',
      width: 50,
      editable: false,
    },
    {
      field: 'typeDemande',
      headerName: 'Type de la demande',
      width: 150,
      editable: false,
    },
    {
      field: 'emplacementDetail',
      headerName: 'Emplacement',
      type: 'string',
      width: 150,
      editable: false,
    },
    {
      field: 'statut',
      headerName: 'Statut',
      type: 'string',
      width: 180,
      editable: false,
    },
    {
      field: 'suiviPlanifieDgDate',
      headerName: 'Date suivi planifié',
      type: 'string',
      width: 150,
      editable: false,
    },
    {
      field: 'actions'    , type: 'actions', headerName: 'Actions'        , width: 120,
      renderCell:(params)=><Box>
        <Tooltip title="Consulter la demande">
          <OpenInNewIcon onClick={openDemandeElu(params.id)} />
        </Tooltip>
      </Box>,
    },  
  ],[openDemandeElu],
  );
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  const createDemandeElu= useCallback(
    () => {
      setTimeout(() => {
        navigate(`/demandeelu/`);
      });
    }
  );
  return (
    <>
      <Meta title="Demandes Elus" />
      <FullSizeCenteredFlexBox>
      <Box sx={{ height:'100%',width:'100%' }}>
        <Card style={{height:'100%',width:'100%'}}>
          <CardHeader 
          title={
            <Typography variant="h4" align='center'>
               Demandes élus
            </Typography>
          }>
          </CardHeader>
          <CardContent>
            <Container sx={{  height:`calc(100vh - 300px)`}}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
               <TabList onChange={handleChange} aria-label="lab API tabs example">
                 <Tab label="ISS ouverte" value="1" />
                 <Tab label="ISS et RC ouverte" value="2" />
                 <Tab label="Toutes demandes" value="3" />
               </TabList>
              </Box>
            <TabPanel sx={{  height:`calc(100vh - 320px)`}} value="1">              
             <DataGrid
                rows={demandeselus}
                columns={colIssOuverte}                
                pagination
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
             />
            </TabPanel>
            <TabPanel sx={{  height:`calc(100vh - 320px)`}} value="2">
              <DataGrid
                 rows={demandeselus}
                 columns={colIssOuverte}                
                 pagination
                 pageSize={pageSize}
                 onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                 rowsPerPageOptions={[5, 10, 20]}
               />
            </TabPanel>
            <TabPanel sx={{  height:`calc(100vh - 320px)`}} value="3">
              <DataGrid
                 rows={demandeselus}
                 columns={colIssOuverte}                
                 pagination                 
                 pageSize={pageSize}
                 onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                 rowsPerPageOptions={[5, 10, 20]}
               />
            </TabPanel>
            </TabContext>
            </Container>
          </CardContent>
          <CardActions sx={{
             alignSelf: "stretch",
             display: "flex",
             justifyContent: "center",
             }}>
            <Button variant='contained' onClick={createDemandeElu} >
              Créer une demande
            </Button>
          </CardActions>
        </Card> 
      </Box>       
 
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default DemandesElus;
