import  React,{useState} from 'react';
import {useDispatch, useSelector} from "react-redux"
import {signInWithGoogle,signOut} from "../../firebase/firebase-auth"
import {setAuthUser} from "../../store/UserActions"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Alert from "@mui/material/Alert"
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Google } from '@mui/icons-material';


import Snackbar from '@mui/material/Snackbar';
import { User } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { AppUser } from '../../store/UserReducer';
import { Divider } from '@mui/material';

interface NormalRouteLink {
    routeLink:string
    uiName:string
}


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const normalRouteLinks:NormalRouteLink[] = [

    { 
    routeLink:"/products",
    uiName:"Products"
    },

    {
      uiName:'Services',
      routeLink:'/services'
    }

    ,

    {
      routeLink:'/contact-us',
      uiName:'Contact Us'
    }
]

const authUserUrls:NormalRouteLink[] = [
  {
    routeLink:'/shopping-cart',
    uiName:'Shopping Cart'
  }
]


const adminUrls:NormalRouteLink[] = 
[ 
  {
    routeLink:'/admin/products',
    uiName:'Products'
  },

  {
    routeLink:'/admin/brands',
    uiName:'Brands'
  }
]




const Navbar = () => {



  // MUI Library data

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Redux 
  const dispatch = useDispatch()



  // Show the user a message when he logs in and logs out
  const [isSnackBarOpen,setSnackBarOpen] = useState(false)
  const [isLastLoggedInOrOutSuccess,setLastLoggedInOrOut] = useState(true)
  const [authStateChangeMessage,setAuthChangeStateMessage] = useState('')

  const onSignInWithGoogle = () => {
      
    signInWithGoogle().then(e => {
        setAuthChangeStateMessage('You have successfully logged in')
          setLastLoggedInOrOut(true)
      }).catch(e => {
        setAuthChangeStateMessage('You may canceled it or a problem ocurred')
          setLastLoggedInOrOut(false)
      }).finally(() => {
        handleCloseUserMenu()
        setSnackBarOpen(true);
      })

  }


  // Sign  out user

  const onSignOut = () => {
      signOut().then(e => {
        setLastLoggedInOrOut(true);
        setAuthChangeStateMessage('You have logged out')
        dispatch(setAuthUser({isAdmin:false,user:null}))
      }).catch(e => {
        setLastLoggedInOrOut(false);
        setAuthChangeStateMessage('Problem ocurred.')
      }).finally(() => {
        setSnackBarOpen(true);
      })

   }

  const closeSnackBar = () => {
    setSnackBarOpen(false)
  }


  const navigate = useNavigate()

  const createNavigationAction = (path:string) => {
    return () => {
      console.log(path)
      navigate(path);
    }
  }




 


  const isAdmin = useSelector( (store:any) => store.user?.isAdmin)
  const user = useSelector( (store:any) => store.user?.user)



  const currentUserAvatarURL = () => {
    return (user && user.photoURL ) || "/static/images/avatar/2.jpg";
  }

  return (
    <AppBar>


      <Container maxWidth="xl">


          
        <Toolbar disableGutters>

            {/* Logo Start */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} onClick={createNavigationAction('/')} />

          <Typography
          onClick={createNavigationAction('/')}
            variant="h6"
            noWrap
            component="p"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >

            PM
          </Typography>

          {/* Logo End */}



          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {normalRouteLinks.map((page) => (

            <MenuItem  key={page.routeLink}  onClick={createNavigationAction(page.routeLink)}>
            
                  <Typography textAlign="center">{page.uiName}</Typography>
                
          </MenuItem>
               
                
              ))}


              {user && authUserUrls.map(e => (<MenuItem key={e.uiName} onClick={createNavigationAction(e.routeLink)}>
                  <Typography textAlign="center">{e.uiName}</Typography>
              </MenuItem>))}

            </Menu>
          </Box>

          {/* Pc Version Version */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}  onClick={createNavigationAction('/')}/>
          <Typography
            variant="h5"
            noWrap
            onClick={createNavigationAction('/')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PK
          </Typography>

          {/* Pc End */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {normalRouteLinks.map((page) => (
              <MenuItem key={page.routeLink} onClick={createNavigationAction(page.routeLink)}>
                  <Typography textAlign="center">{page.uiName}</Typography>
              </MenuItem>
              
              
            ))}

            {user && authUserUrls.map(e => (<MenuItem key={e.uiName} onClick={createNavigationAction(e.routeLink)}>
                  <Typography textAlign="center">{e.uiName}</Typography>
              </MenuItem>))}
          </Box>



          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" src={currentUserAvatarURL()} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              {/* Login or SignOut */}

              {isAdmin && adminUrls.map(e => (
    <MenuItem onClick={createNavigationAction(e.routeLink)} key={e.uiName}>
    <Typography textAlign="center" >{e.uiName}</Typography>
</MenuItem>
              )
          )}

            {
              isAdmin && <Divider />
            }

              {


            !user

            ?

              <MenuItem onClick={onSignInWithGoogle}>
                  <Typography textAlign="center">Sign In</Typography>
                </MenuItem>

            :


            <MenuItem onClick={onSignOut}>
            <Typography textAlign="center" >Sign Out</Typography>
            </MenuItem>

              }

              
            </Menu>
          </Box>
        </Toolbar>


      </Container>


      {/*  User login success or fail */}

      <Snackbar open={isSnackBarOpen} autoHideDuration={6000} onClose={closeSnackBar}>
        {
            isLastLoggedInOrOutSuccess ?
            <Alert  severity="success" sx={{ width: '100%' }}>
                {authStateChangeMessage}
            </Alert>

            :
            
            <Alert  severity="error" sx={{ width: '100%' }}>
              {authStateChangeMessage}
            </Alert>


        }
      </Snackbar>

    </AppBar>
  );
};
export default Navbar;
function e(e: any, arg1: (string: any) => { routerLink: string; uiName: any; }): NormalRouteLink[] {
  throw new Error('Function not implemented.');
}

