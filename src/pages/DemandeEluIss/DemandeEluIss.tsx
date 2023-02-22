// Material
import Meta from "@/components/Meta";
import { FullSizeCenteredFlexBox } from "@/components/styled";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Alert, AlertTitle, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery } from "@mui/material";
import { borderRight, Box, useTheme } from "@mui/system";
import AttachFileIcon from '@mui/icons-material/AttachFile';
// react
import { ChangeEvent, useCallback, useState } from "react";
import { DataGrid, frFR, GridColDef } from "@mui/x-data-grid";
import { useParams } from "react-router";
import { EquipesEluApiService } from "@/api/EquipeEluService";
import { useQuery } from "@tanstack/react-query";
import { DemandeEluApiService } from "@/api/RequeteDemandeEluService";
import { IDemandeElu } from "@/models/DemandeElu";
import { Controller, useForm } from "react-hook-form";

import { v4 as uuid } from 'uuid';
import UUID from "uuid-int";
import useNotifications from '@/store/notifications';
import { useNavigate } from "react-router-dom";

function DemandeEluIss() {
  const {id} = useParams();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [, notificationsActions] = useNotifications();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  // files upload
  const [files, setFiles] = useState('');
  //state for checking file size
  const [fileSize, setFileSize] = useState(true);
   // for file upload progress message
  const [fileUploadProgress, setFileUploadProgress] = useState(false);
   //for displaying response message
  const [fileUploadResponse, setFileUploadResponse] = useState(null);
   //base end point url
  const FILE_UPLOAD_BASE_ENDPOINT = "http://localhost:3000";


  const [equipe, setEquipe] = useState('');
  const [typeAction, setTypeAction] = useState('');
  const [typeDemande,setTypeDemande] = useState('');
  const navigate = useNavigate();
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
  const uploadFileHandler = (event) => {
    setFiles(event.target.files);
  };    
  const fileSubmitHandler = (event) => {
      event.preventDefault();
      setFileSize(true);
      setFileUploadProgress(true);
      setFileUploadResponse(null);

      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
         if (files[i].size > 1024){
             setFileSize(false);
             setFileUploadProgress(false);
             setFileUploadResponse(null);
             return;
         }
         formData.append(`files${i}`, files[i])
         console.log("fileinfo=",files[i])
       }
      // const requestOptions = {
      //   method: 'POST',
      //   body: formData
      // };
      // fetch(FILE_UPLOAD_BASE_ENDPOINT+'/upload', requestOptions)
      //   .then(async response => {
      //       const isJson = response.headers.get('content-type')?.includes('application/json');
      //       const data = isJson && await response.json();

      //       // check for error response
      //       if (!response.ok) {
      //           // get error message
      //           const error = (data && data.message) || response.status;
      //           setFileUploadResponse(data.message);
      //           return Promise.reject(error);
      //       }
      //      console.log(data.message);
      //      setFileUploadResponse(data.message);
      //   })
      //   .catch(error => {
      //       console.error('Error while uploading file!', error);
      //   });
        setFileUploadProgress(false);
  };

    const addMessage= () => {
      setTimeout(() => {
        setOpen(true);
        console.log("addMessage");
      });
    };
    
    const sendForValidation= () => {
      setTimeout(() => {
        console.log("sendForValidation");
      });
    };
    const { handleSubmit, reset, control } = useForm();
    const generator = UUID(1);

    const saveDemande= (data) => {
      setTimeout(() => {
        const demandeElu = {} as IDemandeElu;
        demandeElu.id = generator.uuid();
        demandeElu.noDemande=`ISS-${demandeElu.id}`;
        demandeElu.typeDemande="Initiative sujet spécifique";
        demandeElu.requeteId=0;
        demandeElu.eluId=1;
        demandeElu.sujet= data.sujet;
        demandeElu.adresse= data.adresse;
        demandeElu.description= data.description;
        demandeElu.statut= 'Brouillon';
        //demandeElu.suiviPlanifieDgDate=null;
        DemandeEluApiService.createDemandeElu(demandeElu) ;
        console.log("saveDemande");
        notificationsActions.push({
          options: {
            content: (
              <Alert severity="info">
                <AlertTitle>Notification</AlertTitle>
                   Demande ajoutée
              </Alert>
            ),
          },
        });
      });
    };
    const cancelDemande= () => {
      setTimeout(() => {
        console.log("cancelDemande");
      });
    };

    const exitDemande= () => {
      setTimeout(() => {
        navigate(-1);
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
    const fetchEquipesElu = async () =>{
      console.log("fetching EquipesElu");
      const response = await EquipesEluApiService.getAllEquipesElu();
      console.log("fetch response.data",response.data);
      return response.data;
    } 
    const EquipesEluQuery = useQuery({queryKey:['equipeselu'], queryFn:fetchEquipesElu});
    return (
      <>
        <Meta title="Demande Elu" />
        <FullSizeCenteredFlexBox>
        <Box sx={{ height:'100%',width:'100%' }}>
          <Card style={{height:'100%',width:'100%'}}>
            {id
            ? <CardHeader title="Demande élu - Initiative sujet spécifique- modification"></CardHeader>
            : <CardHeader title="Demande élu - Initiative sujet spécifique- ajout"></CardHeader>
            }
            <CardContent>
              <Box sx={{ border: 2, borderRadius: 5,marginTop:1 }}>
                <TabContext value={tabValue}>
                  <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="Demande" value="1" />
                      <Tab label="Communications DG" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel sx={{ minHeight: 500,minWidth:80}} value="1"> 
                  <form>
                     <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                          <Controller
                            name={"adresse"}
                            control={control}
                            render={({field:{onChange,value}})=>(
                           <TextField  
                             InputProps={{ sx: { height: 120 } }}
                             multiline variant="filled" 
                             fullWidth
                             onChange={onChange}
                             value={value}
                             label="Adresse"
                           />)}
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
                              {EquipesEluQuery?.data?.map((data) => (
                                 <MenuItem key={data.id} value={data.id}>{data.nom}</MenuItem>
                              ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              aria-disabled
                              id="demo-simple-select"
                              value="Initiative sujet spécifique"
                              label="Type de demande"
                             />
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
                          <Controller
                            name={"sujet"}
                            control={control}
                            render={({field:{onChange,value}})=>(
                             <TextField  
                               InputProps={{ sx: { height: 120 } }}
                               multiline variant="filled" 
                               fullWidth
                               onChange={onChange}
                               value={value}
                               label="Sujet"
                             />)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                        <Controller
                            name={"description"}
                            control={control}
                            render={({field:{onChange,value}})=>(
                             <TextField  
                               InputProps={{ sx: { height: 120 } }}
                               multiline variant="filled" 
                               fullWidth
                               onChange={onChange}
                               value={value}
                               label="Description"
                             />)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                           <TextField variant="filled" 
                             fullWidth
                             label="Fichier(s) joint(s):"
                             value=""
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
                  </form> 
                  </TabPanel>
                  <TabPanel sx={{ minHeight: 500,minWidth:80}} value="2">
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
                      localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
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

             {!fileSize && <p style={{color:'red'}}>Taille de fichier dépassée!!</p>}
             {fileUploadProgress && <p style={{color:'red'}}>Téléchargement des fichier(s)</p>}
             {fileUploadResponse!=null && <p style={{color:'green'}}>{fileUploadResponse}</p>}

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
             <Box sx={{marginRight:1}}>
                <Button
                   variant='contained'
                   component="label"
                   startIcon={<AttachFileIcon />}
                   onClick={fileSubmitHandler}
                 >
                 Joindre un fichier
                 <input type="file" multiple hidden onChange={uploadFileHandler} />
                </Button>

            </Box>
            <Button variant='contained' onClick={sendForValidation} >
              Transmettre pour validation
            </Button>
            <Button variant='contained' onClick={handleSubmit(saveDemande)} >
              Sauvegarder
            </Button>
            <Button variant='contained' onClick={cancelDemande} >
              Annuler la demande
            </Button>
            <Button variant='contained' onClick={exitDemande} >
              Fermer
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
  
  export default DemandeEluIss;
  