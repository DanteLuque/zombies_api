import { Router } from "express";
import originController from "../controllers/origin.controller.js";

const OriginRouter = Router();

OriginRouter.get("/", (req, res) => originController.getAll(req, res));

OriginRouter.get("/:id", (req, res) => originController.getById(req, res));

OriginRouter.post("/", (req, res) => originController.create(req, res));

OriginRouter.patch("/:id", (req, res) => originController.update(req, res));

OriginRouter.delete("/:id", (req, res) => originController.deleteById(req, res));

export default OriginRouter;