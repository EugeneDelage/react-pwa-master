// Material stuff
import Typography from '@mui/material/Typography';

// import DatePicker  from @mui/x-date-pickers;
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Button, Card, CardContent, TextField, TextFieldProps} from '@mui/material';
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
import { useQuery } from 'react-query'

function PageConsentement() {

  const {id} = useParams();
  
  const validationSchema = Yup.object().shape({
    requerant: Yup.string()
              .required("Le nom du requérant est obligatoire"),
    equipeelu: Yup.string()
               .required("Le nom ddu personnel élu est obligatoire"),
    demandeDate: Yup.string()
                    .typeError("Erreur-Date requise")
                    .required("Date obligatoire"),   
    relanceDate: Yup.string()
                    .typeError("Erreur-Date requise")
                    // .when("demandeDate", (demandeDate, Yup) => 
                    //   demandeDate && Yup.min(demandeDate, "Date de relance ne peut être avant date de la demande"))
                    .required('End Date is required'), 
        
  })

  const fetchConsentement = async () =>{
     console.log("fetching Consentement");
     const response = await ConsentementApiService.getConsentementById(Number(id));
     const consentement=response.data;
     console.log("fetch response.data",consentement);
     reset(response.data);
     return consentement;
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


  // useEffect(() => {
  //   console.log("mounted.")
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[]);   
  
  if (isLoading){
    console.log("Loading...",data);
    return <div>Charchement...</div>
  }
  if (isError){
    console.log("Erreur...",error);
    return <div>Erreur...</div>
  }

  const onSubmit=(data:IConsentement)=> {
    console.log(data);
  }

  return (
    <>
      <FullSizeCenteredFlexBox>
      <Card sx={{ minWidth: 400 }}>
        <CardContent>
          <Typography variant="h2" align="center">Consentement</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box height={16}/>
            <Controller 
               name="requerant"
               control={control}
               render={({field})=> (
                 <TextField {...field} 
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
            {/* <Controller 
               name="relanceDate"
               control={control}
               render={({field})=> (
                 <TextField {...field} 
                  error={!!errors.relanceDate}
                  helperText={errors.relanceDate ? errors.relanceDate?.message:''}
                  label="Date de la relance"
                 />
               )}
            /> */}
            <Box height={16}/>            
            {errors.requerant && <p>{errors.requerant.message}</p>}
            {errors.requerant && <p>{errors.requerant.message}</p>}
            {errors.demandeDate && <p>{errors.demandeDate.message}</p>}            
            {errors.relanceDate && <p>{errors.relanceDate.message}</p>}                        
            {errors.id && <p>{errors.id.message}</p>}                                    
            <Button type="submit" variant="contained" color="primary">
               Enregistrer
            </Button>
          </form>
          </LocalizationProvider>                        
          </CardContent>
      </Card>

      </FullSizeCenteredFlexBox>
    </>
  );
}

export default PageConsentement;

