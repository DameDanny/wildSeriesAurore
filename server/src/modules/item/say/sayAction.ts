import type { RequestHandler } from "express";

const sayWelcome: RequestHandler = (req, res) => {
  res.send(`Welcome to Wild Series, ${req.query.name} !`);
};

export default { sayWelcome };
