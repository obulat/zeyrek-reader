import { Link } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../use-auth';
import { Button, Menu, MenuItem } from '@material-ui/core';

function Navbar () {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement|null>(null);

  const handleClick = (event: React.MouseEvent) => {
    const el = event.currentTarget as HTMLAnchorElement
    setAnchorEl(el);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
  <header className="App-header">
    <nav className="navbar">
      <a className="logo" href="/">
        <svg className="logo-img" viewBox="0 0 96 82" fill="none" xmlns="http://www.w3.org/2000/svg" width={30} height={30}>
          <path d="M46.6972 25.3508H46.4086H25.7393L36.0909 7.4212H60.5168L70.8684 25.3508H50.0493H49.7606H46.6972ZM49.7606 81.5H50.0493H78.5376H78.8263L78.9706 81.25L94.8908 53.6754L95.0352 53.4254L94.8908 53.1754L80.7046 28.6041L80.7216 28.5746L80.5773 28.3246L64.6571 0.75L64.5127 0.5H64.224H32.3837H32.095L31.9506 0.75L17.7473 25.3508H17.6315L17.4872 25.6008L1.56699 53.1754L1.42265 53.4254L1.56699 53.6754L17.4872 81.25L17.6315 81.5H17.9202H46.4086H46.6972H49.7606ZM9.41457 53.4254L19.8242 35.3955L30.2167 53.3959L30.1997 53.4254L30.344 53.6754L42.4126 74.5788H21.6275L9.41457 53.4254ZM74.8304 74.5788H54.0452L64.3969 56.6492H64.5127L64.6571 56.3992L76.7086 35.5253L87.0433 53.4254L74.8304 74.5788ZM54.0452 32.272H70.5949L62.3201 46.6045L54.0452 32.272ZM26.0128 32.272H42.4126L34.2127 46.4747L26.0128 32.272ZM48.2289 70.8105L40.0528 56.6492H56.405L48.2289 70.8105ZM40.3263 49.728L48.2289 36.0403L56.1315 49.728H40.3263Z" fill="url(#paint0_linear)" stroke="#1BCB81"/>
          <defs>
            <linearGradient id="paint0_linear" x1="18.5" y1="11" x2="101" y2="64.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0DEDFC" stopOpacity="0.35"/>
              <stop offset="1" stopColor="#3E9EA4" stopOpacity="0.81"/>
              <stop offset="1" stopColor="#28A9B1" stopOpacity="0.96"/>
            </linearGradient>
          </defs>
        </svg>
        Zeyrek read
      </a>
      <div className="menu">
        { auth.user ? (
          <>
            <Button color="primary" variant="outlined"  component={Link} to="/new_text/">+ NEW TEXT</Button>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <img width={30} height={30} src={auth.user.photoURL ? auth.user.photoURL : undefined} alt="user avatar" className="user__avatar"/>
              <span className="user__name">{auth.user.displayName}</span>
            </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to='/Dashboard'>Profile</MenuItem>
            <MenuItem onClick={auth.logout}>Logout</MenuItem>
          </Menu>
          </>
        ) : (
          <>
            <Link to='/login' className="button login-button">Log In</Link>
            <Link to='/signup' className="button signup-button">Sign Up</Link>
          </>
          )}
      </div>
    </nav>
  </header>
  );
}

export default Navbar;
