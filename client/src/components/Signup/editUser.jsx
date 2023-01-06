import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams} from "react-router-dom";
// import styles from "./styles.module01.css";

const EditUser = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		axios
			.get(`http://localhost:8080/api/users/${id}`)
			.then((res) => setData(
				{
					firstName: res.data.firstName,
					lastName: res.data.lastName,
					email: res.data.email,
					password: res.data.password,
				}))
			.catch((err) => console.log('Update error'));
	}, [id]);

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};



	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			password: data.password,

		};
		axios
			.put(`http://localhost:8080/api/users/${id}`, data)
			.then((res) => {
				navigate('/login/${id}');
			})
			.catch((err) => { console.log('Update error')};
	};


	return (
		<div className="signup_container">
			<div className="signup_form_container">
				<div className="left">
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className="white_btn">
							Sign in
						</button>
					</Link>
				</div>
				<div className="right">
						<form className="form_container" onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className="input"
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className="input"
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="input"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="input"
						/>
						{error && <div className="error_msg">{error}</div>}
						<button type="submit" className="green_btn">
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditUser;
