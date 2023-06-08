import React, { useEffect, useState } from "react";
import "../edit-page/edit-page.css";
import axios from "axios";
import { useParams } from "react-router-dom";

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
        setUser((user)=>(
          { ...user, [e.target.name]: e.target.value }
        ));
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
           <form onSubmit={handleSubmit}>
                <div className="insertFormWrapper" key={id} >
                    <div className="formRow">
                        <div className="label">Name</div>
                        <input type="text" name="name" value={userValue.name}
                        onChange={handleChange} 
                         />
                    </div>
                    <div className="formRow">
                        <div className="label">Email</div>
                        <input type="text" name="email" onChange={handleChange} value={userValue.email} />
                    </div>
                </div>
                
            </form>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default EditPage;