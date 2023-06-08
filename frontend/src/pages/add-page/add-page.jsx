import React, { useState } from 'react';
import  '../add-page/add-page.css';
import axios from 'axios';

const AddPage = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        checkbox: "",
    });

    const handleChange = (e) =>{
        setUser((prev) => (
            { ...prev, [e.target.name]: e.target.value }
        ));
    };

    const handleClick = async e =>{
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/users", user)
        } catch (err) {
            console.log(err)
        }
    }

    console.log(user);
    return (
        <div className="AddPageUI">
            AddPage
            <form>
                <div className="insertFormWrapper">
                    <div className="formRow">
                        <div className="label">Name</div>
                        <input type="text" onChange={handleChange} name="name"></input>
                    </div>
                    <div className="formRow">
                        <div className="label">Email</div>
                        <input type="text" onChange={handleChange} name="email"></input>
                    </div>
                    <div>
                        <label><input type="checkbox" onChange={handleChange} name="checkbox" value="checkbox 01" />&emsp;I agree</label>
                    </div>
                </div>
            </form>
            <button onClick={handleClick}>Submit</button>
        </div>
    );
}

export default AddPage;