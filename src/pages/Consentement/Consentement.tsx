// Material stuff
import Typography from '@mui/material/Typography';

// import DatePicker  from @mui/x-date-pickers;
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Alert, AlertTitle, Button, Card, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, TextField, TextFieldProps} from '@mui/material';
import { Box } from '@mui/system';
import { FullSizeCenteredFlexBox } from '@/components/styled';

// data related
import { ConsentementApiService } from '@/api/ConsentementService';
import { IConsentement } from '@/models/Consentement';

// validation
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//react et react-hook-form
import { useNavigate, useParams } from 'react-router-dom';
import { useForm ,Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query'
import useNotifications from '@/store/notifications';

function Consentement() {
  const [, notificationsActions] = useNotifications();
  const navigate = useNavigate();
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
      console.log("fetch response.data",response.data);
      // reset(response.data);
      return response.data;// consentement;
    }
    return null;
  }   
  const { handleSubmit, control, formState: { errors } } = useForm<IConsentement>({
    resolver:yupResolver(validationSchema)
  });
  const handleCancel =()=>
  {
    navigate(-1);
  }
  const handleRelance=()=>
  {
    notificationsActions.push({
      options: {
        // Show fully customized notification
        // Usually, to show a notification, you'll use something like this:
        // notificationsActions.push({ message: ... })
        // `message` accepts string as well as ReactNode
        // But you also can use:
        // notificationsActions.push({ options: { content: ... } })
        // to show fully customized notification
        content: (
          <Alert severity="info">
            <AlertTitle>Notification</AlertTitle>
               Consentement relancé
          </Alert>
        ),
      },
    });
  }

  // const [data, setData] = useState<IConsentement>();
  const ConsentementQuery = useQuery({queryKey:['consentement'], queryFn:fetchConsentement});

  if (ConsentementQuery.isLoading){
    console.log("Chargement du consentement...");
    return <div>Chargement du consentement...</div>
  }
  if (ConsentementQuery.error){
    console.log("Erreur...",ConsentementQuery.error.message);
    return <div>Erreur...</div>

  }

  return (
    <>
      <FullSizeCenteredFlexBox>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card sx={{marginTop:2,maxHeight:500}}>
          <CardContent>
          <Typography variant="h4" align="center">Consentement</Typography>
          <Box height={16}/>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Controller 
                name="requerant"
                control={control}
                render={({field})=> (
                <TextField {...field} 
                 disabled
                 fullWidth
                 label="Requérant"
                 value={ConsentementQuery.data.requerant}
                />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller 
               name="equipeelu"
               control={control}
               render={({field})=> (
                 <TextField {...field} 
                  disabled
                  fullWidth
                  label="Équipe élu"
                  value={ConsentementQuery.data.equipeelu}
                 />
               )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <Controller 
               control={control}            
               name="demandeDate"
               render={({ field: { ref, onBlur, name,...field} }) => (
                <DatePicker 
                  {...field}
                  inputRef={ref}
                  label="Date relance" 
                  renderInput={(inputProps) => (
                    <TextField
                      {...inputProps}
                      disabled
                      fullWidth
                      name={name}
                      value={ConsentementQuery.data.demandeDate}
                    />
                )}
                format="YYYY-MM-DD"
                KeyboardButtonProps={{"aria-label": "change date"}}
                />
               )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                      disabled
                      fullWidth
                      name={name}
                      value={ConsentementQuery.data.relanceDate}
                    />
                )}
                format="YYYY-MM-DD"
                KeyboardButtonProps={{"aria-label": "change date"}}
                />
               )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller 
               name="messageperso"
               control={control}
               render={({field})=> (
                 <TextField {...field} 
                  multiline
                  disabled
                  fullWidth
                  label="Message personnalisé"
                  value={ConsentementQuery.data.messageperso}
                 />
               )}
              />
            </Grid>

           </Grid>

          </CardContent>
          <CardActions>
            <Button onClick={handleCancel} >Annuler</Button>
            <Button onClick={handleRelance} variant="contained" color="primary">Relancer</Button>          
          </CardActions>
        </Card>

      </LocalizationProvider>                        
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Consentement;

