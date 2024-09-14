import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const drawerWidth = 260;
const primaryColor = '#09092c'; // Black for the primary background
const hoverColor = '#5c0e34'; // Dark red for hover
const activeColor = '#651f41'; // Red for the active link
const textColor = '#FFFFFF'; // White text color

function Navbar() {
  const location = useLocation(); // Get the current route

  const isActive = (path) => location.pathname === path; // Check if the link is active

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: primaryColor, // Black background
          color: textColor, // White text
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar sx={{ justifyContent: 'center', padding: '20px 0' }}>
        <Typography variant="h5" noWrap component="div" sx={{ color: textColor, fontWeight: 'bold' }}>
          Manawa Institute
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: '#4A6572' }} /> {/* Optional Divider color */}

      <List>
        <ListItem
          button
          component={Link}
          to="/"
          sx={{
            backgroundColor: isActive('/') ? activeColor : primaryColor,
            '&:hover': { backgroundColor: hoverColor }, // Dark red on hover
            padding: '16px',
            color: isActive('/') ? textColor : textColor, // White text
          }}
        >
          <ListItemIcon sx={{ color: isActive('/') ? textColor : textColor }}> {/* White icon */}
            <HomeIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/register"
          sx={{
            backgroundColor: isActive('/register') ? activeColor : primaryColor,
            '&:hover': { backgroundColor: hoverColor },
            padding: '16px',
            color: isActive('/register') ? textColor : textColor,
          }}
        >
          <ListItemIcon sx={{ color: isActive('/register') ? textColor : textColor }}>
            <PersonAddIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Student" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/subjects"
          sx={{
            backgroundColor: isActive('/subjects') ? activeColor : primaryColor,
            '&:hover': { backgroundColor: hoverColor },
            padding: '16px',
            color: isActive('/subjects') ? textColor : textColor,
          }}
        >
          <ListItemIcon sx={{ color: isActive('/subjects') ? textColor : textColor }}>
            <BookIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Subjects" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/teachers"
          sx={{
            backgroundColor: isActive('/teachers') ? activeColor : primaryColor,
            '&:hover': { backgroundColor: hoverColor },
            padding: '16px',
            color: isActive('/teachers') ? textColor : textColor,
          }}
        >
          <ListItemIcon sx={{ color: isActive('/teachers') ? textColor : textColor }}>
            <PeopleIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Teachers" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/attendance"
          sx={{
            backgroundColor: isActive('/attendance') ? activeColor : primaryColor,
            '&:hover': { backgroundColor: hoverColor },
            padding: '16px',
            color: isActive('/attendance') ? textColor : textColor,
          }}
        >
          <ListItemIcon sx={{ color: isActive('/attendance') ? textColor : textColor }}>
            <CheckCircleIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Mark Attendance" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/fees"
          sx={{
            backgroundColor: isActive('/fees') ? activeColor : primaryColor,
            '&:hover': { backgroundColor: hoverColor },
            padding: '16px',
            color: isActive('/fees') ? textColor : textColor,
          }}
        >
          <ListItemIcon sx={{ color: isActive('/fees') ? textColor : textColor }}>
            <AttachMoneyIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Manage Fees" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Navbar;
