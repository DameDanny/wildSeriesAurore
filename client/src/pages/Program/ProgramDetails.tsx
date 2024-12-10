import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ProgramDeleteForm from "../../components/ProgramDeleteForm";

type Program = ProgramProps[];

interface ProgramProps {
	id: number;
	title: string;
}

function ProgramDetail() {
	const { id } = useParams();
	const [program, setProgram] = useState(null as null | Program);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
			.then((response) => response.json())
			.then((data: Program[]) => {
				setProgram(data[0]);
			});
	}, [id]);

	return (
		program && (
			<>
				<h1>{program[0].title}</h1>
				<Link to={`/programs/${program[0].id}/edit`}>Modifier</Link>
				<ProgramDeleteForm id={program[0].id}>Supprimer</ProgramDeleteForm>
			</>
		)
	);
}

export default ProgramDetail;
