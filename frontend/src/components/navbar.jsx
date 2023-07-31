import React from 'react';
import { AppBar, Box, Button, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
        <AppBar position='static'>
            <Toolbar>
                <Link to={'/'}><Button sx={{color: 'white'}}>Home</Button></Link>
                <Box sx={{ flex: '1 1 auto'}}/>
                <Link to={'/add'}><Button variant='outlined' sx={{color: 'white', border: '1px solid white'}}>Add Data</Button></Link>
            </Toolbar>
        </AppBar>
    </div>
  )
}
