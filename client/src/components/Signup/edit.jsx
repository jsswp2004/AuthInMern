import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns'
import '../../App.css';



function UpdateUserInfo(props) {
    
  const dateUpdated = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    password: '',
    addedDate: dateUpdated,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/users/${id}`)
      .then((res) => {
        setUser({
          firstName: res.data.firstName,
            lastName: res.data.lastName,
            role: res.data.role,
            email: res.data.email,
            password: res.data.password,
            addedDate: res.data.addedDate,
        });
      })
      .catch((err) => {
        console.log('Error from UpdateBookInfo');
      });
  }, [id]);

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

    axios
      .put(`http://localhost:8081/api/users/${id}`, data)
      .then((res) => {
        navigate('/userList');
      })
      .catch((err) => {
        console.log('Error in Updating user information!');
      });
  };

    return (
        <div className="UpdateUserInfo">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <br />
                        <Link to="/userList" className="btn btn-outline-warning float-left">
                            Show User List
                        </Link>
                    </div>
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Edit User</h1>
                        <p className="lead text-center">Update User's Info</p>
                        </div>
                        </div>

                        <div className="col-md-8 m-auto">
                            <form noValidate onSubmit={onSubmit}>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='First Name'
                                        name='firstName'
                                        className='form-control'
                                        value={user.firstName}
                                        onChange={onChange}
                                    />
                                </div>
                                <br />

                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Last Name'
                                        name='lastName'
                                        className='form-control'
                                        value={user.lastName}
                                        onChange={onChange}
                                    />
                                </div>
                                <br />

                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Role'
                                        name='role'
                                        className='form-control'
                                        value={user.role}
                                        onChange={onChange}
                                    />
                                </div>
                                <br />

                                <div className='form-group'>
                                    <input 
                                        type='email'
                                        placeholder='Email Address'
                                        name='email'
                                        className='form-control'
                                        value={user.email}
                                        onChange={onChange}
                                    />
                                </div>
                                <br />

                                <div className='form-group'>
                                    <input
                                        type='password'
                                        placeholder='Password'
                                        name='password'
                                        className='form-control'
                                        value={user.password}
                                        onChange={onChange}
                                    />
                                </div>
                                <br />

                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Added Date'
                                        name='addedDate'
                                        className='form-control'
                                        value={user.addedDate}
                                        onChange={onChange}
                                    />
                                </div>
                                <br />

                                <input
                                    type='submit'
                                    className='btn btn-outline-warning btn-block mt-4'
                                />
                            </form>
                        </div>
                    </div>
                </div>
            );
        }

export default UpdateUserInfo;




                    

