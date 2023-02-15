/* eslint-disable react/jsx-key */
// material
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { DataGrid , GridColumns, GridRowId,GridActionsCellItem, useGridApiRef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

// react
import { useState,useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import * as React from 'react';

// data
import { ConsentementApiService } from '@/api/ConsentementService';
import { IConsentement } from '@/models/Consentement';
import { Card, CardActions, CardContent, CardHeader, Container, Tooltip } from '@mui/material';


function PageConsentements() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [consentements, setConsentements] = useState<IConsentement>([]);
  const [open, setOpen] = useState(false);

  type Row = typeof consentements[number];

  const handleRelance = (params) => {
    console.log('Before setOpen(true)',open);
    console.log('params',params);
    setOpen(true);
  };

  const handleClose = () => {
    console.log('Close button');
    setOpen(false);
  };
  
  useEffect(() => {
    getConsentements();
  }, [])

  const getConsentements = async () =>{
      const response = await ConsentementApiService.getAllConsentements();
      console.log(`reponse=${response}`);
      setConsentements(response.data);
  }

  const navigate = useNavigate(); 
  const openConsentement = useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        navigate(`/consentement/${id}`);
      });
    },
    [],
  );
 const createConsentement= useCallback(
  () => {
    setTimeout(() => {
      navigate(`/consentementadd/`);
    });
  }
);
  const columns = useMemo<GridColumns<Row>>(
    () => [
      { field: 'id'         , type: 'number' , headerName: 'Id'             ,width: 60 },
      { field: 'requerant'  , type: 'string' , headerName: 'Requérant'      ,width: 200},
      { field: 'equipeelu'  , type: 'string' , headerName: 'Équipe Élu'     ,width: 200},
      { field: 'demandeDate', type: 'date'   , headerName: 'Date demande'   ,width: 150},
      { field: 'relanceDate', type: 'date'   , headerName: 'Date de relance',width: 150},
      {
        field: 'actions'    , type: 'actions', headerName: 'Actions'        , width: 120,
        renderCell:(params)=><Box>
          <Tooltip title="Consulter consentement">
            <OpenInNewIcon onClick={openConsentement(params.id)} />
          </Tooltip>
          <Tooltip title="Relancer">
            <HowToRegIcon onClick={()=>handleRelance(params)}/>
          </Tooltip>
        </Box>,
      },
    ],
    [openConsentement],
  );
  

  return (
    <>
      <Meta title="Consentements" />
      <FullSizeCenteredFlexBox>
        <Box sx={{ height:'100%',width:'100%' }}>

        <Card style={{height:'100%',width:'100%'}}>
          <CardHeader 
            title={
              <Typography variant="h4" align='center'>
                 Consentements
              </Typography>
            }>
          </CardHeader>
          <CardContent>  
            <Container sx={{  height:`calc(100vh - 250px)`}}>
              <DataGrid
                columns={columns}
                rows={consentements}
              />
            </Container>
          </CardContent>
          <CardActions sx={{
             alignSelf: "stretch",
             display: "flex",
             justifyContent: "center",
             }}>
            <Button variant='contained' onClick={createConsentement} >
              Demander un consentement
            </Button>
          </CardActions>
        </Card>
        </Box>        
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title">
          {"Relance de consentement?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            La demande initiale de consentement a été effectuée le {}. 
            Souhaitez vous relancer le citoyen pour cette demande?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Annuler
          </Button>
          <Button onClick={handleClose} autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default PageConsentements;