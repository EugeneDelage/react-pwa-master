import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';
import { Button, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
  // const isPortrait = useOrientation();
  const user= useSelector((state)=>state.user);

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
            
            {user.value!=null &&
              <div>
              <Button sx={{ p:1, m:1}} variant="contained" size="large">
                Requêtes citoyennes
              </Button>
              <Button sx={{ p:1, m:1}} variant="contained" size="large">
                Demandes élus
              </Button>
              <Button sx={{ p:1, m:1}} variant="contained" size="large">
                Consentements
              </Button>
              <Button sx={{ p:1, m:1}} variant="contained" size="large">
                Créer une demande (ISS)
              </Button>
              </div>
            }
            {!user.value &&
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
