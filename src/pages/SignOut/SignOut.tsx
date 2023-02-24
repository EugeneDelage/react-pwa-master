import Typography from "@mui/material/Typography";
import { FullSizeCenteredFlexBox } from '@/components/styled';
import Meta from '@/components/Meta';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import LockIcon from '@mui/icons-material/Lock';
import Avatar from "@mui/material/Avatar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/store/redux/users/userSlice";
import { Alert, AlertTitle, Divider } from "@mui/material";
import useNotifications from '@/store/notifications';

function SignOut() {
    const userDispatch = useDispatch();
    const navigate = useNavigate(); 
    const [, notificationsActions] = useNotifications();
    const cancelDialog= () => {
      navigate(`/`);
    }
    const deconnect= () => {
        userDispatch( logoutUser());
        notificationsActions.push({
            options: {
              content: (
                <Alert severity="info">
                  <AlertTitle>Notification</AlertTitle>
                     Vous êtes maintenant déconnecté.
                </Alert>
              ),
            },
          });
        navigate(`/`);
      }
  
    return (
    <>
    <Meta title="Déconnexion" />
    <FullSizeCenteredFlexBox>
      <Card sx={{ minWidth: 500 , maxHeight: 400, marginTop:10}}>
        <CardContent>
         <Avatar>
           <LockIcon />
         </Avatar>
         <Typography variant="h3" align="center" lineHeight={4}>Déconnexion</Typography>
         <Divider variant="middle" />
         <CardActions>
           <Button 
              color="primary" 
              variant="contained" 
              onClick={deconnect}
              fullWidth 
            >
            Se déconnecter
           </Button>
           <Button 
              color="secondary" 
              variant="contained" 
              onClick={(cancelDialog)}
              fullWidth 
            >
            Annuler
           </Button>

         </CardActions>
      </CardContent>
      </Card>
    </FullSizeCenteredFlexBox>
  </>
  )
  }
  
export default SignOut;