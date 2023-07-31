import React, { useState } from 'react';
import  '../add-page/add-page.css';
import axios from 'axios';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const AddPage = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        date: "",
    });

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setUser((prev) => ({
            ...prev,
            date: date.format('YYYY-MM-DD'),
        }));
    };

    const handleClick = async (e) =>{
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/users", user)
        } catch (err) {
            console.log(err)
        }
    }

    console.log(user);
    return (
        <div className="add-page-layout">
            <div className='add-page-title'>Add Page</div>

            <div className='add-page-subtitle'>Text Input</div>
            <TextField label='Name' value={user.name}  onChange={handleChange} name="name" fullWidth sx={{marginY: '10px'}}/>
            <TextField label='Email' value={user.email} onChange={handleChange} name='email' type='email' fullWidth sx={{marginY: '10px'}}/>
            
            <div className='add-page-subtitle'>Checkbox Input</div>

            <div className='add-page-subtitle'>Radio Button Input</div>

            <div className='add-page-subtitle'>Date Time Picker Input</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker format='DD/MM/YYYY' value={user.date} onChange={handleDateChange} name='date' />
                <TimePicker />
            </LocalizationProvider>

            <div className='add-page-subtitle'>Image Input</div>

            <div className='add-page-subtitle'>Text Input</div>

            <button onClick={handleClick}>Submit</button>
        </div>
    );
}

export default AddPage;