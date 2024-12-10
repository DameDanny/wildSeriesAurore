import { log } from "node:console";
import programRepository from "./programRepository";

const programs = [
	{
		id: 1,
		title: "The Good Place",
		synopsis:
			"À sa mort, Eleanor Shellstrop est envoyée au Bon Endroit, un paradis fantaisiste réservé aux individus exceptionnellement bienveillants. Or Eleanor n'est pas exactement une « bonne personne » et comprend vite qu'il y a eu erreur sur la personne. Avec l'aide de Chidi, sa prétendue âme sœur dans l'au-delà, la jeune femme est bien décidée à se redécouvrir.",
		poster:
			"https://img.betaseries.com/JwRqyGD3f9KvO_OlfIXHZUA3Ypw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2F94857341d71c795c69b9e5b23c4bf3e7.jpg",
		country: "USA",
		year: 2016,
		program_id: 1,
	},
	{
		id: 2,
		title: "Dark",
		synopsis:
			"Quatre familles affolées par la disparition d'un enfant cherchent des réponses et tombent sur un mystère impliquant trois générations qui finit de les déstabiliser.",
		poster:
			"https://img.betaseries.com/zDxfeFudy3HWjxa6J8QIED9iaVw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2Fc47135385da176a87d0dd9177c5f6a41.jpg",
		country: "Allemagne",
		year: 2017,
		program_id: 2,
	},
];

// Declare the action

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res, next) => {
	try {
		// Fetch all Programs
		const Programs = await programRepository.readAll();

		// Respond with the Programs in JSON format
		res.json(Programs);
	} catch (err) {
		// Pass any errors to the error-handling middleware
		next(err);
	}
};

const read: RequestHandler = async (req, res) => {
	const parsedId = Number.parseInt(req.params.id);

	const program = await programRepository.readById(parsedId);

	if (program != null) {
		res.json(program);
	} else {
		res.sendStatus(404);
	}
};

const edit: RequestHandler = async (req, res, next) => {
	try {
		// Update a specific Program based on the provided ID
		const Program = {
			id: Number(req.params.id),
			title: req.body.title,
			synopsis: req.body.synopsis,
		};

		const affectedRows = await programRepository.update(Program);

		// If the Program is not found, respond with HTTP 404 (Not Found)
		// Otherwise, respond with the Program in JSON format
		if (affectedRows === 0) {
			res.sendStatus(404);
		} else {
			res.sendStatus(204);
		}
	} catch (err) {
		// Pass any errors to the error-handling middleware
		next(err);
	}
};

const add: RequestHandler = async (req, res, next) => {
	try {
		// Extract the Program data from the request body
		const newProgram = {
			title: req.body.title,
			synopsis: req.body.synopsis,
		};

		// Create the Program
		const insertId = await programRepository.create(newProgram);

		// Respond with HTTP 201 (Created) and the ID of the newly inserted item
		res.status(201).json({ insertId });
	} catch (err) {
		// Pass any errors to the error-handling middleware
		next(err);
	}
};

const destroy: RequestHandler = async (req, res, next) => {
	try {
		// Delete a specific Program based on the provided ID
		const ProgramId = Number(req.params.id);
		console.log(ProgramId);

		await programRepository.delete(ProgramId);

		// Respond with HTTP 204 (No Content) anyway
		res.sendStatus(204);
	} catch (err) {
		// Pass any errors to the error-handling middleware
		next(err);
	}
};

const validate: RequestHandler = async (req, res, next) => {
	type ValidationError = {
		field: string;
		message: string;
	};

	const errors: ValidationError[] = [];
	const { title } = req.body.title;
	const { synopsis } = req.body.synopsis;

	// put your validation rules here
	if (title == null) {
		errors.push({ field: "title", message: "The field is required" });
	} else if (title.length > 255) {
		errors.push({
			field: "title",
			message: "Should contain less than 255 characters",
		});
	}
	if (synopsis == null) {
		errors.push({ field: "synopsis", message: "The field is required" });
	} else if (synopsis.length > 255) {
		errors.push({
			field: "synopsis",
			message: "Should contain less than 255 characters",
		});
	}

	if (errors.length === 0) {
		next();
	} else {
		res.status(400).json({ validationErrors: errors });
	}
};

// Export it to import it somewhere else

export default { browse, read, edit, add, destroy, validate };
