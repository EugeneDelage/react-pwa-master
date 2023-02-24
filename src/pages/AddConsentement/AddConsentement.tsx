// Material stuff
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { DataGrid, frFR, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Button, Card, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, TextField, TextFieldProps} from '@mui/material';

import { FullSizeCenteredFlexBox } from '@/components/styled';

// import DatePicker  from @mui/x-date-pickers;
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

// data related
import { IConsentement } from '@/models/Consentement';

// validation
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//react et react-hook-form
import { useForm ,Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EquipesEluApiService } from '@/api/EquipeEluService';

function AddConsentement() {

  const blablaJuridique="Je certifie..lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.";
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    requerant: Yup.string()
              .required("Le nom du requérant est obligatoire"),
    equipeelu: Yup.string()
               .required("Le nom du personnel élu est obligatoire"),
    demandeDate: Yup.string()
                    .typeError("Erreur-Date requise")
                    .required("Date obligatoire"),   
    relanceDate: Yup.string()
                    .typeError("Erreur-Date requise")
                    // .when("demandeDate", (demandeDate, Yup) => 
                    //   demandeDate && Yup.min(demandeDate, "Date de relance ne peut être avant date de la demande"))
                    .required('End Date is required'), 
        
  })

  const searchRows = [
    {id:1,name:'Beef',firstname:'Joe' ,telephone: '345-345-5554',email: 'joe.beef@gMale.com'},
    {id:2,name:'Benard',firstname:'Joe' ,telephone: '222-735-1221',email: 'joe.benard@hotmail.com'},
  ];  

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nom', width: 80 },
    { field: 'firstname', headerName: 'Prénom', width: 130 },
    { field: 'telephone', headerName: 'Téléphone', width: 130 },
    { field: 'email',    headerName: 'Courriel',   width: 190},
  ];

  const { handleSubmit, control, reset, formState: { errors } } = useForm<IConsentement>({
    defaultValues:{},
    resolver:yupResolver(validationSchema)
  });
  const handleCancel =()=>
  {
    navigate(-1);
  }

  const [selectedRequerant,setSelectedRequerant]=useState("");

  // useEffect(() => {
  //   console.log("mounted.")
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[]);   
  
  const onSubmit=(data:IConsentement)=> {
    console.log(data);
  }
  const showClearIcon="none";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
  };
  const [equipe, setEquipe] = useState('');
  const handleChangeEquipe = (event: SelectChangeEvent) => {
    setEquipe(event.target.value as string);
  };      

  const fetchEquipesElu = async () =>{
    const response = await EquipesEluApiService.getAllEquipesElu();
    return response.data;
  } 
  const EquipesEluQuery = useQuery({queryKey:['equipeselu'], queryFn:fetchEquipesElu});

  const handleRowClick = (param, event) => {
    console.log(`${param.row.firstname} ${param.row.name}`);
    setSelectedRequerant(`${param.row.firstname} ${param.row.name}`);
  };
  return (
    <>
      <FullSizeCenteredFlexBox>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card sx={{marginTop:2,minWidth: 400,maxWidth:800,maxHeight:700}}>
          <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Typography variant="h4" align="center">Consentement</Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                 <Typography variant="h7" align="left">{blablaJuridique} </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControlLabel control={<Checkbox />}
                label="J'ai lu" />
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
                   rows={searchRows}
                   columns={columns}                
                   pageSize={3}
                   hideFooter={true}
                   onRowClick={handleRowClick}
                />
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h7" align="center">{selectedRequerant}</Typography>       
              </Grid>
              <Grid item xs={12} sm={12}>
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
              
              <Grid item xs={12} sm={12}>
                <TextField multiline
                  label="Message personnalisé dans le courriel"
                  fullWidth
                />
              </Grid>
           </Grid>
          </CardContent>
          <CardActions disableSpacing
             sx={{
               alignSelf: "stretch",
               display: "flex",
               justifyContent: "flex-end",
               }}>
             <Button size="small" onClick={handleCancel} >Annuler</Button>
             <Button type="submit" variant="contained" color="primary" disabled={selectedRequerant===""}>Envoyer</Button>          
          </CardActions>
          </form>
         </Card>
      
      </LocalizationProvider>                        
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default AddConsentement;

