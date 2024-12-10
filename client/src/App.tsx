import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
	return (
		<>
			<header>
				<Header />
			</header>

			<main>
				<Outlet />
			</main>

			<footer>
				Développé par la&nbsp;
				<a
					href="https://www.wildcodeschool.com/"
					className="wcs"
					target="_blank"
					rel="noopener noreferrer"
				>
					Wild Code School
				</a>
			</footer>
		</>
	);
}

export default App;
