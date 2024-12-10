import { Link } from "react-router-dom";

function Header() {
	return (
		<>
			<Link to="/categories">Catégorie</Link>
			<Link to="/">Séries</Link>
		</>
	);
}

export default Header;
