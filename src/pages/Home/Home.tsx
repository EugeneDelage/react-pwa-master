import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';
import { currentUser } from '@/store/redux/users/userSlice';
import { Button, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  // const isPortrait = useOrientation();
  const navigate = useNavigate(); 
  const user= useSelector(currentUser);
  const gotoRC= () => {
    navigate(`/requetescitoyennes`);
  }
  const gotoDE= () => {
    navigate(`/demandeselus`);
  }
  const gotoCT= () => {
    navigate(`/consentements`);
  }
  const creeDemande= () => {
    navigate(`/demandeeluiss`);
  }

  return (
    <>
      <Meta title="Page principale" />
      {/* <FullSizeCenteredFlexBox flexDirection={isPortrait ? 'column' : 'row'}> */}
      <FullSizeCenteredFlexBox flexDirection='column'  alignItems='center'  justifyContent= 'center'>        
        <Typography variant="h2"  align="center">
          Portail des élus
        </Typography>
        <Paper sx={{display:'flex', 
                    flexDirection: 'row',
                    backgroundColor:"lightgray", 
                    height:250,
                    minWidth:340,
                    flexWrap: 'wrap',  
                    m:1,
                    p:2,
                    justifyContent: 'center' ,  
                    alignItems: 'center',
                    alignContent: 'center'
                    }} elevation={3}>
            
            {user?.loggedIn!=null &&
              <div>
              <Button sx={{ p:1, m:1}} variant="contained" size="large" onClick={gotoRC}>
                Requêtes citoyennes
              </Button>
              <Button sx={{ p:1, m:1}} variant="contained" size="large" onClick={gotoDE}>
                Demandes élus
              </Button>
              <Button sx={{ p:1, m:1}} variant="contained" size="large" onClick={gotoCT}>
                Consentements
              </Button>
              <Button sx={{ p:1, m:1}} variant="contained" size="large"onClick={creeDemande}>
                Créer une demande (ISS)
              </Button>
              </div>
            }
            {!user?.loggedIn &&
              <div>
               <Link to={'/SignIn'}>
                 <Button sx={{ p:1, m:1}} variant="contained" size="large">
                    Connexion
                 </Button>
               </Link>
             </div>
            }
          </Paper>

        
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Home;
