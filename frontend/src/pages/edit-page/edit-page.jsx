import React, { useEffect, useState } from "react";
import "../edit-page/edit-page.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";

const EditPage = () =>{
    const { id } = useParams();
    const [userValue, setUser] = useState({
        name: "",
        email: "",
    });

    useEffect(() =>{
        const fetchUser = async () => {
            try {
              const res = await axios.get(`http://localhost:8800/users/${id}`);
              const userData = res.data;
              setUser({
                name: userData.name|| "",
                email: userData.email|| "",
              });
              console.log(res.data);
            } catch (err) {
              console.log(err);
            }
          };
          fetchUser();
    }, [id]);

    const handleChange = (e) => {
        setUser((prev)=>(
          { ...prev,
            [e.target.name]: e.target.value 
          }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.put(`http://localhost:8800/users/${id}`, userValue );
        } catch (err) {
          console.log(err);
        }
    }
    
    return (
        <div className='EditPageUI'>
          Edit Page

          <TextField
            onChange={handleChange}
            name="name"
            value={userValue.name}
            label="Name"
          />

          <TextField
            onChange={handleChange}
            name="email"
            value={userValue.email}
            label="Email"
          />
           
           
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default EditPage;