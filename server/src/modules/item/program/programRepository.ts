import databaseClient from "../../../../database/client";

import type { Result, Rows } from "../../../../database/client";

type Program = {
	id: number;
	title: string;
	synopsis: string;
};

class ProgramRepository {
	async readAll() {
		const [rows] = await databaseClient.query<Rows>("select * from program");

		return rows as Program[];
	}
	async readById(req: number) {
		const row = await databaseClient.query<Rows>(
			"select * from program where id = ?",
			[req],
		);

		return row;
	}
	async update(programs: Program) {
		const [result] = await databaseClient.query<Result>(
			"update program set title = ?, synopsis = ? where id = ?",
			[programs.title, programs.synopsis, programs.id],
		);

		return result.affectedRows;
	}

	async delete(id: number) {
		const [result] = await databaseClient.query<Result>(
			"delete from program where id = ?",
			[id],
		);

		return result.affectedRows;
	}
	async create(program: Omit<Program, "id">) {
		const [result] = await databaseClient.query<Result>(
			"insert into program (title, synopsis) values (?, ?)",
			[program.title, program.synopsis],
		);

		return result.insertId;
	}
}

export default new ProgramRepository();
