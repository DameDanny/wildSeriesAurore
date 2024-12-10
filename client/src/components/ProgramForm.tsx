import type { ReactNode } from "react";

type ProgramData = {
	title: string;
	synopsis: string;
};

interface ProgramFormProps {
	children: ReactNode;
	defaultValue: ProgramData;
	onSubmit: (category: ProgramData) => void;
}

function ProgramForm({ children, defaultValue, onSubmit }: ProgramFormProps) {
	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();

				const formData = new FormData(event.currentTarget);

				const title = formData.get("title") as string;
				const synopsis = formData.get("synopsys") as string;

				onSubmit({
					title,
					synopsis,
				});
			}}
		>
			<input type="text" name="title" defaultValue={defaultValue.title} />
			<input type="text" name="synopsys" defaultValue={defaultValue.synopsis} />
			<button type="submit">{children}</button>
		</form>
	);
}

export default ProgramForm;
