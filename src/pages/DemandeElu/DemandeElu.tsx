// Material
import Meta from "@/components/Meta";
import { FullSizeCenteredFlexBox } from "@/components/styled";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import AttachFileIcon from '@mui/icons-material/AttachFile';
// react
import { useCallback, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useParams } from "react-router";

function DemandeElu() {
  const {id} = useParams();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    console.log('Close button');
    setOpen(false);
  };

  const [equipe, setEquipe] = useState('');
  const [typeAction, setTypeAction] = useState('');
  const [typeDemande,setTypeDemande] = useState('');

    const [tabValue, setTabValue] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
      };

    const handleChangeEquipe = (event: SelectChangeEvent) => {
        setEquipe(event.target.value as string);
    };      
    const handleChangeTypeAction= (event: SelectChangeEvent) => {
      setEquipe(event.target.value as string);
    }
    const handleChangeTypeDemande= (event: SelectChangeEvent) => {
        setTypeDemande(event.target.value as string);
    };      
    const addMessage= () => {
      setTimeout(() => {
        setOpen(true);
        console.log("addMessage");
      });
    };
    
    const joinFile= () => {
      setTimeout(() => {
        console.log("joinFile");
      });
    };
    const sendForValidation= () => {
      setTimeout(() => {
        console.log("sendForValidation");
      });
    };

    const saveDemande= () => {
      setTimeout(() => {
        console.log("saveDemande");
      });
    };
    const cancelDemande= () => {
      setTimeout(() => {
        console.log("cancelDemande");
      });
    };

    const messageElusColumns: GridColDef[] = [
      {
        field: 'typeAction',
        headerName: "Type d''action",
        type: 'number',
        width: 110,
        editable: false,
      },
      {
        field: 'statut',
        headerName: 'Statut',
        width: 250,
        editable: false,
      },
      {
        field: 'dateSuiviPlanifie',
        headerName: 'Date suivi planifié',
        width: 150,
        editable: false,
      },
    ];
  
    const messageElusRows = [
      { id: 1, dateSuiviPlanifie: '2023-04-05', statut: 'statut 1', typeAction:'action 1' },
      { id: 2, dateSuiviPlanifie: '2023-04-05', statut: 'statut 2', typeAction:'action 2' },
      { id: 3, dateSuiviPlanifie: '2023-04-05', statut: 'statut 3', typeAction:'action 3' },
      
    ];
  
    return (
      <>
        <Meta title="Demande Elu" />
        <FullSizeCenteredFlexBox>
        <Box sx={{ height:'100%',width:'100%' }}>
          <Card style={{height:'100%',width:'100%'}}>
            {id
            ? <CardHeader title="Demande élu -modification"></CardHeader>
            : <CardHeader title="Demande élu -ajout"></CardHeader>
            }
            <CardContent>
              <Box sx={{ border: 2, borderRadius: 5,marginTop:1,maxHeight:550,minWidth: 650 }}>
                <TabContext value={tabValue}>
                  <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="Demande" value="1" />
                      <Tab label="Communications DG" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel sx={{  height:`calc(100vh - 182px)`,width: 650}} value="1">  
                     <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                           <TextField  multiline variant="filled" 
                             fullWidth
                            defaultValue="Tremblay, Mathieu
                            123, rue abc
                            Localisation de la problématique: 3, Terrasse Debien"
                           />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           <TextField  multiline variant="filled" 
                             fullWidth
                             defaultValue="Requête: RC-528-130 -Y2TB
                             Type: INT bac brisé
                             No Requête:"
                           />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputLabel id="ilequipe">Équipe</InputLabel>
                          <Select
                              fullWidth
                              labelId="ilequipe"
                              id="demo-simple-select"
                              value={equipe}
                              label="Équipe"
                              onChange={handleChangeEquipe}
                              >
                              <MenuItem value={1}>Équipe 1</MenuItem>
                              <MenuItem value={2}>Équipe 2</MenuItem>
                              <MenuItem value={3}>Équipe 3</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="iltypedemande">Type de demandes</InputLabel>
                            <Select
                              fullWidth
                              labelId="iltypedemande"
                              id="demo-simple-select"
                              value={typeDemande}
                              label="Type de demande"
                              onChange={handleChangeTypeDemande}
                              >
                              <MenuItem value={1}>Type demande 1</MenuItem>
                              <MenuItem value={2}>Type demande 2</MenuItem>
                              <MenuItem value={3}>Type demande 3</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           <TextField  variant="filled" 
                             fullWidth
                             label="Statut"
                             disabled
                            defaultValue="Brouillon"
                           />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           <TextField variant="filled" 
                             fullWidth
                             label="Raison"
                             disabled
                             defaultValue="En cours"
                           />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                           <TextField multiline variant="filled" 
                             fullWidth
                             label="Sujet"
                             defaultValue="..."
                           />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                           <TextField multiline variant="filled" 
                             fullWidth
                             label="Description"
                             defaultValue=""
                           />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                           <TextField variant="filled" 
                             fullWidth
                             label="Fichier(s) joint(s):"
                             defaultValue=""
                             InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <AttachFileIcon />
                                </InputAdornment>
                              ),
                            }}
                           />
                        </Grid>
                    </Grid>
              </TabPanel>
              <TabPanel sx={{  height:`calc(100vh - 182px)`,width: 650}} value="2">
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                      <TextField  variant="filled" 
                        fullWidth
                      defaultValue="2023-01-02"
                      disabled
                      label="Date de transmission"
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField variant="filled" 
                        fullWidth
                        disabled
                        defaultValue="2022-12-12"
                        label="Date prise en charge ou retour à l'élu"
                        />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField  variant="filled" 
                        fullWidth
                      defaultValue="2023-01-02"
                      disabled
                      label="Date suivi planifiée DG"
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField variant="filled" 
                        fullWidth
                        disabled
                        defaultValue="2022-12-12"
                        label="DDate répondue"
                        />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <div style={{ height: 150,flexGrow: 1 }}>
                    <DataGrid
                      columns={messageElusColumns}
                      rows={messageElusRows}
                      hideFooter={true}
                      rowHeight={25}
                    />
                    </div>
                  </Grid>
                </Grid>

              </TabPanel>
             </TabContext>
             </Box>      
            </CardContent>
            <CardActions sx={{
             alignSelf: "stretch",
             display: "flex",
             justifyContent: "center",
             }}>
             { tabValue==='2' ? 
               <Button variant='contained' onClick={addMessage} >
                 Ajouter un message
               </Button> : null}
  
            <Button variant='contained' onClick={joinFile} >
              Joindre un fichier
            </Button>
            <Button variant='contained' onClick={sendForValidation} >
              Transmettre pour validation
            </Button>
            <Button variant='contained' onClick={saveDemande} >
              Sauvegarder
            </Button>
            <Button variant='contained' onClick={cancelDemande} >
              Annuler la demande
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
          {"Ajout d'un message"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
                <InputLabel id="ilequipe">Type Action</InputLabel>
                    <Select
                       fullWidth
                       labelId="iltypeaction"
                       id="demo-simple-select"
                       value={equipe}
                       label="Type Action"
                       onChange={handleChangeTypeAction}
                      >
                       <MenuItem value={1}>Type action 1</MenuItem>
                       <MenuItem value={2}>Type action 2</MenuItem>
                       <MenuItem value={3}>Type action 3</MenuItem>
                   </Select> 
             </Grid>
             <Grid item xs={12} sm={12}>
             <TextField  multiline variant="filled" 
                 fullWidth
                 defaultValue="Description" />
             </Grid>
          </Grid>
          <DialogContentText>
            Inscrivez une description.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Annuler
          </Button>
          <Button onClick={handleClose} autoFocus>
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
  
        </FullSizeCenteredFlexBox>
      </>
    );
  }
  
  export default DemandeElu;
  