import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

import sayAction from "./modules/item/say/sayAction";

router.get("/", sayAction.sayWelcome);

/* ************************************************************************* */

import programActions from "./modules/item/program/programActions";

router.get("/api/programs", programActions.browse);
router.get("/api/programs/:id", programActions.read);

/* ************************************************************************* */

import categoryActions from "./modules/category/categoryActions";

router.get("/api/categories", categoryActions.browseCategory);
router.get("/api/categories/:id", categoryActions.readCategory);
router.get("/api/categories/:id", categoryActions.edit);
router.post("/api/categories", categoryActions.add);
router.delete("/api/categories/:id", categoryActions.destroy);

/* ************************************************************************* */

export default router;
