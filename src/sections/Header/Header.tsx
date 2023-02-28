import ThemeIcon from '@mui/icons-material/InvertColors';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';

import { FlexBox } from '@/components/styled';
import useSidebar from '@/store/sidebar';
import useTheme from '@/store/theme';

// import { getRandomJoke } from './utils';
import { Link } from 'react-router-dom';
import { title } from '@/config';
import lavallogo from "../../pages/Home/logos/lavallogo.svg"
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { currentUser } from '@/store/redux/users/userSlice';

function Header() {
  const user= useSelector(currentUser);
  
  const [, sidebarActions] = useSidebar();
  const [, themeActions] = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" elevation={1} position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <FlexBox sx={{ alignItems: 'center' }}>
            <IconButton
              onClick={sidebarActions.toggle}
              size="large"
              edge="start"
              color="default"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <span><Typography variant="h6">Menu</Typography></span>
            <Divider orientation="vertical" flexItem />            
            <Box
              component="img"
              src={lavallogo}
            />                  
          </FlexBox>
          { user?.loggedIn!=null &&
            <div>
              <FlexBox>
                <Typography variant="h6">Portail des élus [ {user.email} ]</Typography>
                {/* <Typography variant="h4">{user}</Typography> */}
              </FlexBox>
              <Divider orientation="vertical" flexItem />
            </div>
          }
          <FlexBox>
            <Tooltip title="Changer thème de couleur" arrow>
              <IconButton color="info" edge="end" size="large" onClick={themeActions.toggle}>
                <ThemeIcon />
              </IconButton>
            </Tooltip>
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
