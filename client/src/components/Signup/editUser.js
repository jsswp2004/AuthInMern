import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'

function EditUser(props) {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        role: '',
        email: '',
        password: '',
        addedDate: '',
    });
    const { id } = useParams();
    const navigate = useNavigate();



    useEffect(() => {
        const url = `http://localhost:8081/api/users/${id}`;
        axios.get(url).then((res) => {
            setUser(res.data);
        })
            .catch((err) => {
                console.log('Error from UpdateUserInfo');
            });
    }, [id]);

    // useEffect((id) => {
    //     axios
    //         .get(`http://localhost:8081/api/users/${id}')
    //         .then((res) => {
    //             setUser({
    //                 res.data
    //             });
    //         })
    //     .catch((err) => {
    //         console.log('Error from UpdateUserInfo');
    //     });
    // }, [id])

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            email: user.email,
            password: user.password,
            addedDate: user.addedDate,
        };
        const url = `http://localhost:8081/api/users/${id}`;
        axios.put(url, data)
            .then((res) => {
            //setUser(res.data);
            navigate('/userList');
        })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <h1>Edit User</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={onChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={onChange}
                        className="form-control"
                    />  
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <input
                        type="text"
                        name="role"
                        value={user.role}
                        onChange={onChange}
                        className="form-control"
                    />  
                </div>
                <div className="form-group">    
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={user.email}
                        onChange={onChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        value={user.password}
                        onChange={onChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="addedDate">Added Date</label>
                    <input
                        type="text"
                        name="addedDate"
                        value={user.addedDate}
                        onChange={onChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update User
                </button>
            </form>
        </div>
    );


                    
            
}

export default EditUser;