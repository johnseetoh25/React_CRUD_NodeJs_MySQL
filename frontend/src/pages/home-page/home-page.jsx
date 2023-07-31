import React, { useEffect, useState } from 'react';
import {Link} from'react-router-dom';
import axios from 'axios';

const HomePage = () => {
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        const fecthAllUsers = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/users");
                setUsers(res.data);
                console.log(res);
            }catch(err){
                console.log(err);
            }
        }
        fecthAllUsers();
    },[]);

    const handleDelete = async (id) =>{
        try {
            await axios.delete("http://localhost:8800/users/"+id);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className='HomePageUI'>
            {
                users.map((user)=>(
                    <div className='user' key={user.id}>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                        <p>{user.date}</p>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                        <button><Link variant="info" to={"/edit/" + user.id}>Edit</Link></button>
                    </div>
                ))
            }
        </div>
       
    );
}

export default HomePage;