import { Router } from "express";
import zombieController from "../controllers/zombie.controller.js";

const ZombieRouter = Router();

ZombieRouter.get("/", (req, res) => zombieController.getAll(req, res));

ZombieRouter.get("/:id", (req, res) => zombieController.getById(req, res));

ZombieRouter.post("/", (req, res) => zombieController.create(req, res));

ZombieRouter.patch("/:id", (req, res) => zombieController.update(req, res));

ZombieRouter.delete("/:id", (req, res) => zombieController.deleteById(req, res));

ZombieRouter.get("/search", (req, res) => zombieController.search(req, res));

export default ZombieRouter;