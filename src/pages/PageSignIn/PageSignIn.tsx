
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { FullSizeCenteredFlexBox } from '@/components/styled';
import Meta from '@/components/Meta';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import LockIcon from '@mui/icons-material/Lock';
import Avatar from "@mui/material/Avatar";

const validationSchema = Yup.object().shape({
    email: Yup.string()
              .required("L'adresse courriel est obligatoire")
              .email('Spécifiez une adresse courriel valide'),
    password: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères')
              .required('Mot de passe obligatoire'),
})

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://laval.ca/">
          Ville de Laval.
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
}

function PageSignIn() {
    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2));
          // formikHelpers.resetForm();
        },
      });

    return (
    <>
    <Meta title="Connection" />
    <FullSizeCenteredFlexBox>
      <Card sx={{ minWidth: 400 }}>
        <CardContent>
         <Avatar>
           <LockIcon />
         </Avatar>
         <Typography variant="h2" align="center">Connection</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
          fullWidth
          id="email"
          name="email"
          label="Courriel"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Box height={16}/>
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Mot de passe"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
         <CardActions>
         <Button color="primary" variant="contained" fullWidth type="submit" disabled={!formik.dirty || !formik.isValid}>
          Se connecter
        </Button>

         </CardActions>

      </form>
      </CardContent>

      </Card>
    </FullSizeCenteredFlexBox>
    <Box mt={5}>
        <Copyright />
    </Box>

  </>
  )
  }
  
export default PageSignIn;