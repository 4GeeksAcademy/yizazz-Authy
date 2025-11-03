import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light fixed-top">
			<div className="container">
				<Link to="/Welcome" className="text-decoration-none">
					<span className="navbar-brand mb-0 h1">Jesús App</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-primary">Login</button>
					</Link>
					<Link to="/private">
						<button className="btn btn-secondary ms-2">Private section</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};