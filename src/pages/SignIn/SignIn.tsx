
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FullSizeCenteredFlexBox } from '@/components/styled';
import Meta from '@/components/Meta';
import * as Yup from 'yup';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import LockIcon from '@mui/icons-material/Lock';
import Avatar from "@mui/material/Avatar";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@/models/Login";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/redux/users/userSlice";
import { useNavigate } from "react-router-dom";


function SignIn() {
    const userDispatch = useDispatch();
    const navigate = useNavigate(); 
    const validationSchema = Yup.object().shape({
      email: Yup.string()
                .required("L'adresse courriel est obligatoire")
                .email('Spécifiez une adresse courriel valide'),
      password: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères')
                .required('Mot de passe obligatoire'),
     })
    const initialValues = {
      email:"",
      password:""
    } 

    const { register, control, handleSubmit, formState:{errors, isDirty, isValid}, reset} = useForm<ILogin>({
      resolver:yupResolver(validationSchema),
    });
    const submitForm= (values:ILogin) => {
      userDispatch(loginUser(values.email));
      console.log({values});
      reset();
      navigate(`/`);
    }

    return (
    <>
    <Meta title="Connexion" />
    <FullSizeCenteredFlexBox>
      <Card sx={{ minWidth: 500 , maxHeight: 400, marginTop:10}}>
        <CardContent>
         <Avatar>
           <LockIcon />
         </Avatar>
         <Typography variant="h2" align="center">Connexion</Typography>
        <form onSubmit={handleSubmit(submitForm)}>
           <TextField
             id="email"
             name="email"
             label="Courriel"
             fullWidth
             {...register("email")}
             error={errors.email ? true : false}
           />
          <Typography variant="inherit" color="red">
             {errors.email?.message}
          </Typography>
          <Box height={16}/>
          <TextField
             id="password"
             name="password"
             label="Mot de passe"
             fullWidth
             {...register("password")}
             error={errors.password ? true : false}             
          />
          <Typography variant="inherit" color="red">
             {errors.password?.message}
          </Typography>

          <Box height={16}/>

         <CardActions>
           <Button 
              color="primary" 
              variant="contained" 
              onClick={handleSubmit(submitForm)}
              fullWidth 
              type="submit" 
            >
            Se connecter
           </Button>

         </CardActions>

      </form>
      </CardContent>

      </Card>
    </FullSizeCenteredFlexBox>
  </>
  )
  }
  
export default SignIn;