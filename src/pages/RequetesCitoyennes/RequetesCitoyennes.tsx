import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { DataGrid, frFR, GridColumns, GridRowId } from '@mui/x-data-grid';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, darken, lighten } from '@mui/system';
import { Card, CardContent, CardHeader, Tooltip, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { IRequeteCitoyenne } from '@/models/RequetesCitoyennes';
import { RequeteCitoyenneApiService } from '@/api/RequeteCitoyenneService';


function RequetesCitoyennes() {

  const getBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

  const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

  const [requetescitoyennes, setRequetescitoyennes] = useState<IRequeteCitoyenne>([]);
  type Row = typeof requetescitoyennes[number];


  useEffect(() => {
    getRequetesCitoyennes();
  }, [])

  const getRequetesCitoyennes = async () =>{
    const response = await RequeteCitoyenneApiService.getAllRequetesCitoyennes();
    console.log(`reponse=${response}`);
    setRequetescitoyennes(response.data);
  }

  const navigate = useNavigate(); 
  const openRequete = useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        navigate(`/requetecitoyenne/${id}`);
      });
    },
    [],
  );
  const [pageSize, setPageSize] = useState<number>(5);

  const colSansSuivi= useMemo<GridColumns<Row>>(
    ()=>[
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'lue',
      headerName: 'Lue',
      width: 50,
      editable: false,
      renderCell:(params)=> <Box>
                                {params.row.lue? 'Oui': 'Non'}
                            </Box>,

    },
    {
      field: 'noRequete',
      headerName: 'Num??ro requ??te',
      width: 110,
      editable: false,
    },
    {
      field: 'requerant',
      headerName: 'Requ??rant',
      type: 'string',
      width: 150,
      editable: false,
    },
    {
      field: 'emplacement',
      headerName: 'Emplacement',
      type: 'string',
      width: 180,
      editable: false,
    },
    {
      field: 'typerequete',
      headerName: 'Type requ??te',
      type: 'string',
      width: 150,
      editable: false,
    },
    {
      field: 'sommaire',
      headerName: 'Sommaire',
      type: 'string',
      width: 210,
      editable: false,
    },
    {
      field: 'statut',
      headerName: 'Statut',
      type: 'string',
      width: 110,
      editable: false,
    },
    {
      field: 'dateconsentement',
      headerName: 'Date consentement',
      type: 'string',
      width: 150,
      editable: false,
    },
    {
      field: 'actions'    , type: 'actions', headerName: 'Actions'        , width: 120,
      renderCell:(params)=><Box>
        <Tooltip title="Consulter la requ??te">
          <OpenInNewIcon onClick={openRequete(params.id)} />
        </Tooltip>
      </Box>,
    },  
  ],[openRequete],
  );
  const colAvecSuivi= useMemo<GridColumns<Row>>(
    ()=>[
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'noRequete',
      headerName: 'Num??ro requ??te',
      width: 150,
      editable: false,
    },
    {
      field: 'requerant',
      headerName: 'Requ??rant',
      type: 'string',
      width: 110,
      editable: false,
    },
    {
      field: 'emplacement',
      headerName: 'Emplacement',
      type: 'string',
      width: 110,
      editable: false,
    },
    {
      field: 'typerequete',
      headerName: 'Type requ??te',
      type: 'string',
      width: 110,
      editable: false,
    },
    {
      field: 'dateconsentement',
      headerName: 'Date consentement',
      type: 'string',
      width: 110,
      editable: false,
    },
    {
      field: 'nodemandeelu',
      headerName: 'No demande',
      type: 'string',
      width: 110,
      editable: false,
    },
    {
      field: 'sujet',
      headerName: 'Sujet',
      type: 'string',
      width: 110,
      editable: false,
    },
    {
      field: 'statut',
      headerName: 'Statut',
      type: 'string',
      width: 110,
      editable: false,
    },
    {
      field: 'datesuiviDG',
      headerName: 'Date suivi DG',
      type: 'string',
      width: 110,
      editable: false,
    },
    {
      field: 'actions'    , type: 'actions', headerName: 'Actions'        , width: 120,
      renderCell:(params)=><Box>
        <Tooltip title="Consulter la requ??te">
          <OpenInNewIcon onClick={openRequete(params.id)} />
        </Tooltip>
      </Box>,
    },  
  ],[openRequete],
  );
  const colToutes= useMemo<GridColumns<Row>>(
    ()=>[
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'noRequete',
      headerName: 'Num??ro requ??te',
      width: 150,
      editable: false,
    },
    {
      field: 'requerant',
      headerName: 'Requ??rant',
      type: 'string',
      width: 110,
      editable: false,
    },
    {
      field: 'emplacement',
      headerName: 'Emplacement',
      type: 'string',
      width: 110,
      editable: false,
    },
    {
      field: 'typerequete',
      headerName: 'Type requ??te',
      type: 'string',
      width: 110,
      editable: false,
    },
    {
      field: 'sommaire',
      headerName: 'Sommaire',
      type: 'string',
      width: 110,
      editable: false,
    },
    {
      field: 'statut',
      headerName: 'Statut',
      type: 'string',
      width: 110,
      editable: false,
    },
    {
      field: 'nodemandeelu',
      headerName: 'No Demande',
      type: 'string',
      width: 110,
      editable: false,
    },
    {
      field: 'sujet',
      headerName: 'Sujet',
      type: 'string',
      width: 110,
      editable: false,
    },
    {
      field: 'statutdemande',
      headerName: 'Statut demande',
      type: 'string',
      width: 110,
      editable: false,
    },
    {
      field: 'actions'    , type: 'actions', headerName: 'Actions'        , width: 120,
      renderCell:(params)=><Box>
        <Tooltip title="Consulter la requ??te">
          <OpenInNewIcon onClick={openRequete(params.id)} />
        </Tooltip>
      </Box>,
    },  
  ],[openRequete],
  );  

  const [value, setValue] = useState('1');
  
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Meta title="Requ??tes Citoyennes" />
      <FullSizeCenteredFlexBox>
      <Card style={{height:'100%',width:'100%'}}>
        <CardHeader 
          title={
            <Typography variant="h4" align='center'>
               Requ??tes citoyennes
            </Typography>
          }>
        </CardHeader>
        <CardContent>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
             <TabList onChange={handleChange} aria-label="lab API tabs example">
               <Tab label="Sans suivi" value="1" />
               <Tab label="Avec suivi" value="2" />
               <Tab label="Toutes" value="3" />
             </TabList>
            </Box>
             <TabPanel sx={{  height:`calc(100vh - 182px)`}} value="1">              
             <Box
              sx={{
                 height:`calc(100vh - 182px)`,
                 width: '100%',
                '& .dgrc-theme--Oui': {
                  bgcolor: (theme) =>
                    getBackgroundColor(theme.palette.background.default, theme.palette.mode),
                  '&:hover': {
                    bgcolor: (theme) =>
                      getHoverBackgroundColor(theme.palette.background.default, theme.palette.mode),
                  },
                },
                '& .dgrc-theme--Non': {
                  bgcolor: (theme) =>
                    getBackgroundColor(theme.palette.background.red, theme.palette.mode),
                  '&:hover': {
                    bgcolor: (theme) =>
                      getHoverBackgroundColor( theme.palette.background.red,theme.palette.mode,
                      ),
                  },
                },
              }}>

             <DataGrid
                localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                rows={requetescitoyennes}
                columns={colSansSuivi}                
                pagination
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                getRowClassName={(params) => `dgrc-theme--${params.row.lue?"Oui":"Non"}`}
             />
             </Box>
            </TabPanel>
          <TabPanel sx={{  height:`calc(100vh - 182px)`}} value="2">
              <DataGrid
                 localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                 rows={requetescitoyennes}
                 columns={colAvecSuivi}                
                 pagination
                 pageSize={pageSize}
                 onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                 rowsPerPageOptions={[5, 10, 20]}
               />
            </TabPanel>
          <TabPanel sx={{  height:`calc(100vh - 182px)`}} value="3">
              <DataGrid
                 localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                 rows={requetescitoyennes}
                 columns={colToutes}                
                 pagination                 
                 pageSize={pageSize}
                 onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                 rowsPerPageOptions={[5, 10, 20]}
               />
          </TabPanel>
        </TabContext>
        </CardContent>
      </Card>        
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default RequetesCitoyennes;


