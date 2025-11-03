import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();

	const handleLogout = () => {
		localStorage.removeItem("token");
		dispatch({ type: "LOGOUT" });
		navigate("/login");
	};
	return (
		<nav className="navbar navbar-light bg-light fixed-top">
			<div className="container">
				<Link to="/" className="text-decoration-none">
					<span className="navbar-brand mb-0 h1">Jesús App</span>
				</Link>

				<div className="ml-auto d-flex align-items-center">
					<Link to="/private">
						<button className={`btn me-2 ${store.isAuthenticated ? "btn-primary" : "btn-secondary"}`}>Private Section</button>
					</Link>
					{store.isAuthenticated ? (
						<button className="btn btn-danger" onClick={handleLogout}>
							Logout
						</button>
					) : (
						<Link to="/login">
							<button className="btn btn-primary">Login</button>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};