import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main/index02";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Users from "./components/Users";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/users" exact element={<Users />} />
		</Routes>
	);
}

export default App;
