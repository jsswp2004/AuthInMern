import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main/mainIndex";
import Signup from "./components/Signup/signupIndex";
import Login from "./components/Login/loginIndex";
import UserList from "./components/Signup/userlist";
import EditUser from "./components/Signup/editUser";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/userlist" exact element={<UserList />} />
			<Route path="/edituser" exact element={<EditUser />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;
