import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProgramForm from "../../components/ProgramForm";

type Program = ProgramProps[];

interface ProgramProps {
	id: number;
	title: string;
	synopsis: string;
}

function ProgramEdit() {
	const navigate = useNavigate();

	const { id } = useParams();
	const [Program, setProgram] = useState(null as null | Program);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
			.then((response) => response.json())
			.then((data: Program[]) => {
				setProgram(data[0]);
			});
	}, [id]);
	console.log(Program);

	return (
		Program && (
			<ProgramForm
				defaultValue={Program[0]}
				onSubmit={(ProgramData) => {
					fetch(
						`${import.meta.env.VITE_API_URL}/api/programs/${Program[0].id}`,
						{
							method: "put",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(ProgramData),
						},
					).then((response) => {
						if (response.status === 204) {
							navigate(`/programs/${Program[0].id}`);
						}
					});
				}}
			>
				Modifier
			</ProgramForm>
		)
	);
}

export default ProgramEdit;
