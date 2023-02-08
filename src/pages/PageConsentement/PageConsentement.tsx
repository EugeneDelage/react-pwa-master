import Typography from '@mui/material/Typography';

import { FullSizeCenteredFlexBox } from '@/components/styled';
import { useEffect, useState } from 'react';
import { ConsentementApiService } from '@/api/ConsentementService';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { IConsentement } from '@/models/Consentement';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Card, CardActions, CardContent, TextField, TextFieldProps } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
//import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import {useForm} from 'react-hook-form';


function PageConsentement() {

  const {id} = useParams();
  const { register, handleSubmit}= useForm();

  const [consentement, setConsentement] = useState({
    id:0,
    requerant: "test",
    equipeelu: "twst elu",
    demandeDate:new Date(),
    relanceDate:new Date()
  });

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
                  .when("demandeDate", (started, Yup) => started && Yup.min(started, "Date de relance ne peut être avant date de la demande"))
                  .required('End Date is required'), 
      
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit= async (values: any,actions: any)=>{
    console.log(values);
    console.log(actions);
    await new Promise((resolve)=> setTimeout(resolve,100));
    actions.resetForm();

  }

  const formik = useFormik({
    initialValues: {
      id:0,
      requerant: "test",
      equipeelu: "twst elu",
      demandeDate:new Date(),
      relanceDate:new Date(),
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit,
  });

  useEffect(() => {
    loadConsentement();
 },[]);      

  const loadConsentement = async () =>{
    const result = await ConsentementApiService.getConsentementById(Number(id));
    setConsentement(result.data);
    // formik.setFieldValue("requerant",consentement?.requerant,false);
    // formik.setValues(consentement as IConsentement,false);
    formik.setValues(consentement,false);
  }   

  //formik.setValues(consentement as IConsentement,false);

  return (
    <>
      <FullSizeCenteredFlexBox>
      <Card sx={{ minWidth: 400 }}>
        <CardContent>
          <Typography variant="h2" align="center">Consentement</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form onSubmit={formik.handleSubmit} >
            <Box height={16}/>
            <TextField
            fullWidth
            id="requerant"
            name="requerant"
            label="Requérant"
            value={formik.values.requerant}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.requerant && Boolean(formik.errors.requerant)}
            helperText={formik.touched.requerant && formik.errors.requerant}
            />
            <Box height={16}/>
            <TextField
            fullWidth
            id="equipeelu"
            name="equipeelu"
            label="Équipe Élus"
            value={formik.values.equipeelu}
            onChange={formik.handleChange}
            error={formik.touched.equipeelu && Boolean(formik.errors.equipeelu)}
            helperText={formik.touched.equipeelu && formik.errors.equipeelu}
            />
            <DesktopDatePicker
              label="Date de la demande"
              inputFormat='YYYY/MM/DD'
              showDaysOutsideCurrentMonth
              value={formik.values.demandeDate}
              onChange={formik.handleChange}
              renderInput={(params:TextFieldProps) => {return <TextField 
                error={formik.touched.demandeDate && Boolean(formik.errors.demandeDate)}
                helperText={formik.touched.demandeDate && formik.errors.demandeDate}
                {...params} />}}
            />
          </form>
          </LocalizationProvider>
          </CardContent>
          <CardActions>
            <Button color="primary" variant="contained" fullWidth type="submit" disabled={!formik.dirty || !formik.isValid}>
            Ok
            </Button>
          </CardActions>

      </Card>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default PageConsentement;

