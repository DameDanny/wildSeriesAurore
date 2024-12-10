import { useNavigate } from "react-router-dom";

import ProgramForm from "../../components/ProgramForm";

function ProgramNew() {
	const navigate = useNavigate();

	const newProgram = {
		title: "",
		synopsis: "",
	};

	return (
		<ProgramForm
			defaultValue={newProgram}
			onSubmit={(ProgramData) => {
				fetch(`${import.meta.env.VITE_API_URL}/api/programs`, {
					method: "post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(ProgramData),
				})
					.then((response) => response.json())
					.then((data) => {
						navigate(`/programs/${data.insertId}`);
					});
			}}
		>
			Ajouter
		</ProgramForm>
	);
}

export default ProgramNew;
