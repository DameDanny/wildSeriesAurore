// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import Program from "./pages/Program/Program";
import ProgramDetail from "./pages/Program/ProgramDetails";
import ProgramEdit from "./pages/Program/ProgramEdit";
import ProgramNew from "./pages/Program/ProgramNew";
import CategoryEdit from "./pages/Category/CategoryEdit";
import CategoryNew from "./pages/Category/CategoryNew";
import CategoryIndex from "./pages/Category/CategoryIndex";
import CategoryDetail from "./pages/Category/CategoryDetail";
import PageNotFound from "./pages/PageNotFound";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
	{
		path: "/", // The root path
		element: <App />, // Renders the App component for the home page
		children: [
			{
				path: "/",
				element: <Program />,
				loader: () => fetch(`${import.meta.env.VITE_API_URL}/api/programs`),
			},
			{
				path: "/programs/:id",
				element: <ProgramDetail />,
			},
			{
				path: "/programs/:id/edit",
				element: <ProgramEdit />,
			},
			{
				path: "/programs/new",
				element: <ProgramNew />,
			},
			{ path: "/categories", element: <CategoryIndex /> },
			{
				path: "/categories/new",
				element: <CategoryNew />,
			},
			{
				path: "/categories/:id",
				element: <CategoryDetail />,
			},
			{
				path: "/categories/:id/edit",
				element: <CategoryEdit />,
			},
			{
				path: "*",
				element: <PageNotFound />,
			},
		],
	},
	// Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
	throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
