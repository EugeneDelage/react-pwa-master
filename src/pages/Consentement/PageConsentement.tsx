// Material stuff
import Typography from '@mui/material/Typography';

// import DatePicker  from @mui/x-date-pickers;
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Button, Card, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, TextField, TextFieldProps} from '@mui/material';
import { Box } from '@mui/system';
import { FullSizeCenteredFlexBox } from '@/components/styled';

// data related
import { ConsentementApiService } from '@/api/ConsentementService';
import { IConsentement } from '@/models/Consentement';

// validation
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//react et react-hook-form
import { useParams } from 'react-router-dom';
import { useForm ,Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query'

function Consentement() {

  const {id} = useParams();
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
    {name:'Beef',firstname:'Joe' ,telephone: '345-345-5554',email: 'joe.beef@gMale.com'},
    {name:'Benard',firstname:'Joe' ,telephone: '222-735-1221',email: 'joe.benard@hotmail.com'},
  ];  

  const fetchConsentement = async () =>{
    if (id){
      console.log("fetching Consentement");
      const response = await ConsentementApiService.getConsentementById(Number(id));
      const consentement=response.data;
      console.log("fetch response.data",consentement);
      reset(response.data);
      return consentement;
    }
    return null;
  }   
 
  // const [data, setData] = useState<IConsentement>();
  const {isError, isLoading, data, error} = useQuery(
    'consentement',
    fetchConsentement,
    {staleTime:60000}
  );

  const { handleSubmit, control, reset, formState: { errors } } = useForm<IConsentement>({
    defaultValues:{...data},
    resolver:yupResolver(validationSchema)
  });


  if (isLoading){
    console.log("Loading...",data);
    return <div>Chargement...</div>
  }
  if (isError){
    console.log("Erreur...",error);
    return <div>Erreur...</div>
  }

  const onSubmit=(data:IConsentement)=> {
    console.log(data);
  }
  const showClearIcon="none";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
            <Box height={16}/>    
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>Prénom</TableCell>
                    <TableCell>Téléphone</TableCell>
                    <TableCell>Courriel</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchRows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.firstname}</TableCell>
                      <TableCell align="left">{row.telephone}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>   
            <Box height={16}/>          
            <Controller 
               name="requerant"
               control={control}
               render={({field})=> (
                 <TextField {...field} 
                  fullWidth
                  error={!!errors.requerant}
                  helperText={errors.requerant ? errors.requerant?.message:''}
                  label="Requérant"
                 />
               )}
            />
            <Box height={16}/>
            <Controller 
               name="equipeelu"
               control={control}
               render={({field})=> (
                 <TextField {...field} 
                  error={!!errors.equipeelu}
                  helperText={errors.equipeelu ? errors.equipeelu?.message:''}
                  label="Équipe élu"
                 />
               )}
            />
            <Box height={16}/>

            <Controller 
               name="demandeDate"
               control={control}
               render={({field})=> (
                 <TextField {...field} 
                  error={!!errors.demandeDate}
                  helperText={errors.demandeDate ? errors.demandeDate?.message:''}
                  label="Date de la demande"
                 />
               )}
            />

            <Box height={16}/>  

            <Controller 
             control={control}            
             name="relanceDate"
             render={({ field: { ref, onBlur, name,...field} }) => (
              
              <DatePicker 
                {...field}
                inputRef={ref}
                label="Date relance" 
                renderInput={(inputProps) => (
                  <TextField
                    {...inputProps}
                    onBlur={onBlur}
                    name={name}
                    error={!!errors.relanceDate}
                    helperText={errors.relanceDate ? errors.relanceDate?.message:''}                
                  />
                )}
                format="YYYY-MM-DD"
                KeyboardButtonProps={{"aria-label": "change date"}}
                error={!!errors.relanceDate}
                helperText={errors.relanceDate ? errors.relanceDate?.message:''}                
              />
             )}
            />

            <Box height={16}/>   
        </CardContent>
        <CardActions>
          <Button size="small">Annuler</Button>
          <Button type="submit" variant="contained" color="primary">Envoyer</Button>          
        </CardActions>
      </Card>
      </form>
          </LocalizationProvider>                        
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Consentement;

