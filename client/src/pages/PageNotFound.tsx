import { Link } from "react-router-dom";

function PageNotFound() {
	return (
		<>
			<p>Nothing to see here</p>
			<Link to="/">Retour à la maison</Link>
		</>
	);
}

export default PageNotFound;
