// Material stuff
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { DataGrid, frFR, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Button, Card, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, TextField, TextFieldProps} from '@mui/material';

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

function AddConsentement() {

  const blabla="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.";
  
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
    { field: 'name', headerName: 'Nom', width: 70 },
    { field: 'firstname', headerName: 'Prénom', width: 130 },
    { field: 'telephone', headerName: 'Téléphone', width: 130 },
    { field: 'email',    headerName: 'Courriel',   width: 90},
  ];

  const { handleSubmit, control, reset, formState: { errors } } = useForm<IConsentement>({
    defaultValues:{},
    resolver:yupResolver(validationSchema)
  });

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

  const handleRowClick = (param, event) => {
    console.log(`${param.row.firstname} ${param.row.name}`);
    setSelectedRequerant(`${param.row.firstname} ${param.row.name}`);
  };
  return (
    <>
      <FullSizeCenteredFlexBox>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ minWidth: 400 }}>
        <CardContent>
          <Typography variant="h4" align="center">Consentement</Typography>
            <Box height={16}/>
             <Card sx={{ width: '100%', maxWidth: 600 }}>
              <CardContent>
                <Typography variant="h7" align="left">{blabla} </Typography>
              </CardContent>
             </Card>
              <FormControlLabel control={<Checkbox />}
              label="J'ai lu" />
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

            <Box height={16}/>    
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
            <Box height={16}/>   
            <Typography variant="h7" align="center">{selectedRequerant}</Typography>       
            <Box height={16}/>
            <FormControl fullWidth>
              <InputLabel id="equipeelu">Équipe Élu</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={equipeelu}
                label="Équipe élu"
              >
                <MenuItem>District-01 A. Beauséjour</MenuItem>
                <MenuItem>District-02 G. Maraut</MenuItem>
                <MenuItem>District-02 H. Beauchamp</MenuItem>
              </Select>
            </FormControl>
            <Box height={16}/>   
            <TextareaAutosize
              aria-label="minimum height"
              minRows={4}
              placeholder="Message personnalisé dans le courriel"
              style={{ width: 600}}
            />
        </CardContent>
        <CardActions disableSpacing
           sx={{
             alignSelf: "stretch",
             display: "flex",
             justifyContent: "flex-end",
             }}>
          <Button size="small">Annuler</Button>
          <Button type="submit" variant="contained" color="primary" disabled={selectedRequerant===""}>Envoyer</Button>          
        </CardActions>
      </Card>
      </form>
      </LocalizationProvider>                        
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default AddConsentement;

