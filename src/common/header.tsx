import "../styles/header.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
	const { logout, isAuthenticated, isLoading, user } = useAuth0();

	return (
		<header>
			<nav className="NavbarContainer">
				<h1 className="NavbarTitle">Passion Project</h1>
				{isAuthenticated && !isLoading && user && (
					<div className="ButtonSection">
						<h1>Welcome, {user.nickname}!</h1>
						<button className="NavButton" type="button" onKeyDown={() => logout()} onClick={() => logout()}>
							Logout
						</button>
					</div>
				)}
			</nav>
		</header>
	);
}
