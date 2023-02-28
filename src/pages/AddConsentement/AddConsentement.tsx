// Material stuff
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { DataGrid, frFR, GridColDef } from '@mui/x-data-grid';
import { Alert, AlertTitle, Button, Card, CardActions, CardContent, Checkbox, FormControlLabel, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, TextField} from '@mui/material';

import { FullSizeCenteredFlexBox } from '@/components/styled';

// import DatePicker  from @mui/x-date-pickers;
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

// data related
import { Consentement } from '@/models/Consentement';

// validation
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//react et react-hook-form
import { useForm ,Controller } from 'react-hook-form';
import { useQueries } from '@tanstack/react-query'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EquipesEluApiService } from '@/api/EquipeEluService';
import { ConsentementApiService } from '@/api/ConsentementService';
import useNotifications from '@/store/notifications';
import UUID from 'uuid-int';
import { RequerantsApiService } from '@/api/RequerantService';
import { Requerant } from '@/models/Requerant';

function AddConsentement() {

  const blablaJuridique="Je certifie..lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.";
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    requerant: Yup.string()
              .required("Le nom du requérant est obligatoire"),
    messageperso: Yup.string()
              .required("Le message personnalisé est obligatoire"),
    equipeelu: Yup.string()
              .required("Le nom de l'équipe est obligatoire"),
    juridiqueLu:Yup.boolean()
              .oneOf([true],"Vous devez confirmer le texte légal."),   
  })

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nom', width: 80 },
    { field: 'firstName', headerName: 'Prénom', width: 130 },
    { field: 'telephone', headerName: 'Téléphone', width: 130 },
    { field: 'email',    headerName: 'Courriel',   width: 190},
  ];
  const [, notificationsActions] = useNotifications();

  const { handleSubmit, control, formState ,setValue } = useForm<Consentement>({
    mode:"all",
    defaultValues:{ id:undefined,
                    requerant: "", 
                    idRequerant:undefined,
                    equipeelu: "", 
                    idEquipeelu:undefined,
                    demandeDate:new Date(),
                    relanceDate:undefined,
                    messageperso: "",
                    juridiqueLu:false},
    resolver:yupResolver(validationSchema)
  });
  const handleCancel =()=>
  {
    navigate(-1);
  }

  const [selectedRequerant,setSelectedRequerant]=useState("");

  const onSubmit=(data:Consentement)=> {
    data.id = generator.uuid();
    data.demandeDate=new Date();
    data.requerant=selectedRequerant;
    ConsentementApiService.createConsentement(data);
    notificationsActions.push({
      options: {
        content: (
          <Alert severity="info">
            <AlertTitle>Notification</AlertTitle>
               Demande de consentement envoyée.
          </Alert>
        ),
      },
    });
    navigate(-1);
  }
  const showClearIcon="none";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
  };
  const [equipe, setEquipe] = useState('');
  const handleChangeEquipe = (event: SelectChangeEvent<string>) => {
    setEquipe(event.target.value as string);
    //setValue("equipeelu",event.target.name);
    setValue("idEquipeelu",+event.target.value);
  };      

  const fetchEquipesElu = async () =>{
    const response = await EquipesEluApiService.getAllEquipesElu();
    return response.data;
  } 
  const fetchRequerants = async () =>{
    const response = await RequerantsApiService.getAllRequerants();
    return response.data;
  } 

  // Queries
  const [EquipesEluQuery, requerantsQuery] = useQueries({
    queries: [
      {
        queryKey: ['equipeselu'],
        queryFn: fetchEquipesElu
      },
      {
        queryKey: ['requerantsQuery'],
        queryFn: fetchRequerants,
      },
    ],
  });

  if (EquipesEluQuery.isLoading) return 'Chargement équipes élus...';
  if (requerantsQuery.isLoading) return 'Chargement requérants...';
  if (EquipesEluQuery.error)
    return 'Erreur: ' + EquipesEluQuery.error.message;
  if (requerantsQuery.error)
    return 'Erreur: ' + requerantsQuery.error.message;



  const handleRowClick = (param) => {
    console.log(`${param.row.firstName} ${param.row.name}`);
    console.log(`formState.isValid=${formState.isValid} errors=${JSON.stringify(formState.errors)}`);
    setValue("requerant",`${param.row.firstName} ${param.row.name}`);
    setValue("idRequerant",param.row.id);
    setSelectedRequerant(`${param.row.firstName} ${param.row.name}`);
  };
  const generator = UUID(1);

  return (
    <>
      <FullSizeCenteredFlexBox>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{marginTop:2,minWidth: 400,maxWidth:800,maxHeight:700}}>
          
          <CardContent>
            <Typography variant="h4" align="center">Consentement</Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                 <Typography variant="h6" align="left">{blablaJuridique} </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  control={control}
                  name="juridiqueLu"
                  defaultValue={false}
                  render={({ field: {value, onChange,...field}})=>(
                    <FormControlLabel
                      label="J'ai lu"
                      control={
                        <Checkbox onChange={onChange} checked={value} {...field}/>
                      }
                    />
                   )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
              <TextField
                size="small"
                label="Courriel"
                fullWidth                
                variant="outlined"
                onChange={handleChange}
                InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ display: showClearIcon }}
                  >
                  <ClearIcon />
                  </InputAdornment>
                )
              }}
              />
              </Grid>
              <Grid item xs={12} sm={12}>
                <div style={{height:200, width:'100%'}}>
                <DataGrid
                   localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                   rows={requerantsQuery?.data}
                   columns={columns}                
                   pageSize={3}
                  //  hideFooter={true}
                   onRowClick={handleRowClick}
                />
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6" align="center">{selectedRequerant}</Typography>       
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel id="ilequipe">Équipe</InputLabel>
                <Controller
                    control={control}
                    name="equipeelu"
                    render={()=>(
                       <Select
                          fullWidth
                          labelId="ilequipe"
                          id="demo-simple-select"
                          value={equipe}
                          label="Équipe"
                          onChange={handleChangeEquipe}
                        >
                        { 
                           EquipesEluQuery?.data?.map((data) => (
                           <MenuItem data={data.nom} value={data.id}>{data.nom}</MenuItem>
                           ))
                        }
                       </Select>
                    )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  control={control}
                  name="messageperso"
                  defaultValue=''
                  render={({field,fieldState:{error}})=>(
                    <TextField 
                      {...field}
                      multiline
                      label="Message personnalisé dans le courriel"
                      error={error !== undefined}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
           </Grid>
          </CardContent>
          <CardActions disableSpacing sx={{ alignSelf: "stretch", display: "flex", justifyContent: "flex-end" }}>
             <Button 
                     color="secondary" 
                     onClick={handleCancel}>
                     Annuler
             </Button>
             <Button 
            //  disabled={!formState.isValid}
                     type="submit"
                     >
                     Envoyer
             </Button>          
          </CardActions>
        
         </Card>
         {formState.errors?.requerant && formState.errors.requerant.message}
         {formState.errors?.messageperso && formState.errors.messageperso.message}
         {formState.errors?.equipeelu && formState.errors.equipeelu.message}
         {formState.errors?.juridiqueLu && formState.errors.juridiqueLu.message}
         </form>
      </LocalizationProvider>                        
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default AddConsentement;

