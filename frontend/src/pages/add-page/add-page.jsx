import React, { useState } from 'react';
import  '../add-page/add-page.css';
import axios from 'axios';
import { Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';

const AddPage = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        gender: "",
        date: "",
        time: "",
    });

    const [selectedGender, setSelectedGender] = useState('');
    const [otherGenderValue, setOtherGenderValue] = useState('');

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleGenderChange = (e) => {
        setSelectedGender(e.target.value);

        if (e.target.value === 'other') {
            setUser((prev) => ({
                ...prev,
                gender: '',
            }));
        } else {
            setUser((prev) => ({
                ...prev,
                gender: e.target.value,
            }));
        }
    };
    const handleOtherGenderChange = (e) => {
        setOtherGenderValue(e.target.value);
    };

    const handleDateChange = (date) => {
        setUser((prev) => ({
            ...prev,
            date: date.format('YYYY-MM-DD'),
        }));
    };

    const handleTimeChange = (time) => {
        
        // Check if the selected period is 'PM' (post meridiem)
        const isPM = time.format('a') === 'pm';

        // Get the hours and add 12 if it's 'PM'
        let hours = parseInt(time.format('hh'), 10);
        if (isPM) {
            hours += 12;
        }

        // Convert the hours to a two-digit string (e.g., 01, 02, ..., 12)
        const formattedHours = hours.toString().padStart(2, '0');

        // Update the state with the adjusted time
        setUser((prev) => ({
            ...prev,
            time: `${formattedHours}:${time.format('mm')}:00`,
        }));

    };

    const handleClick = async (e) =>{
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/users", user);
        } catch (err) {
            console.log(err);
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
            <FormGroup>
                <FormControlLabel control={<Checkbox/>} label="Whatsapp"/>
                <FormControlLabel control={<Checkbox/>} label="Twitter"/>
                <FormControlLabel control={<Checkbox/>} label="WeChat"/>
            </FormGroup>

            <div className='add-page-subtitle'>Radio Button Input</div>
            <FormGroup>
                <RadioGroup
                    name="gender"
                    value={selectedGender}
                    onChange={handleGenderChange}
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </FormGroup>

            {selectedGender === 'other' && (
                <div>
                    <TextField
                        label="Other Gender"
                        name="gender"
                        value={otherGenderValue || user.gender}
                        onChange={handleChange || handleOtherGenderChange}
                    />
                </div>
            )}
            
            <div className='add-page-subtitle'>Date Time Picker Input</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker format='DD/MM/YYYY' value={user.date} onChange={handleDateChange} name='date' />
                <TimePicker format='HH:mm a' value={user.time} onChange={handleTimeChange} name='time' />
            </LocalizationProvider>

            <div className='add-page-subtitle'>Image Input</div>

            <div className='add-page-subtitle'>Select Input</div>
            <FormControl fullWidth>
                <InputLabel sx={{backgroundColor: 'white'}}>Roles</InputLabel>
                <Select>
                    <MenuItem >Student</MenuItem>
                    <MenuItem >Teacher</MenuItem>
                </Select>
            </FormControl>

            <button onClick={handleClick}>Submit</button>
        </div>
    );
}

export default AddPage;