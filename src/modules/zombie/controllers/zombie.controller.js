import { BaseController } from "../../shared/controller-base.js";
import Zombie from "../models/zombie.model.js";
import { createZombieSchema } from "../validators/zombie.create-validator.js";
import { updateZombieSchema } from "../validators/zombie.update-validator.js";

class ZombieController extends BaseController {
    async getAll(_, res) {
        try {
            const zombies = await Zombie.getAll(this.getDbPool());
            res.json(zombies);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener los zombies");
        }
    }

    async getById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const zombie = await Zombie.getById(this.getDbPool(), id);

            if (!zombie) return res.status(404).json({ message: "Zombie no encontrado" });
            res.json(zombie);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener el zombie");
        }
    }

    async create(req, res) {
        try {
            // Validar los datos de entrada
            const { error: validationError, value } = createZombieSchema.validate(req.body, { abortEarly: false });
            if (validationError) {
                return res.status(400).json({
                    message: "Validación fallida",
                    details: validationError.details.map(d => d.message)
                });
            }

            // Verificar si el zombie ya existe
            const exists = await Zombie.exists(this.getDbPool(), value.nombre);
            if (exists) {
                return res.status(400).json({ message: "Ya existe un zombie con este nombre" });
            }

            // Crear el zombie
            const zombie = new Zombie(
                null,
                value.nombre,
                value.descripcion,
                value.origenId,
                value.velocidad,
                value.fuerza,
                value.resistencia,
                value.humanidad
            );
            const result = await zombie.create(this.getDbPool());

            res.status(201).json({ message: "Zombie creado", id: result.insertId });
        } catch (error) {
            this.handleError(res, 500, error, "Error al crear el zombie");
        }
    }

    async update(req, res) {
        try {
            const id = parseInt(req.params.id);

            // Obtener el zombie existente
            const existingZombie = await Zombie.getById(this.getDbPool(), id);
            if (!existingZombie) return res.status(404).json({ message: "Zombie no encontrado" });

            // Validar los datos de entrada
            const { error } = updateZombieSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({
                    message: "Validación fallida",
                    details: error.details.map(d => d.message)
                });
            }

            // Asignar valores por defecto basados en el zombie existente
            const current = existingZombie;
            const {
                nombre = current.NOMBRE,
                descripcion = current.DESCRIPCION,
                origenId = current.ORIGEN_ID,
                velocidad = current.VELOCIDAD,
                fuerza = current.FUERZA,
                resistencia = current.RESISTENCIA,
                humanidad = current.HUMANIDAD,
            } = req.body;

            // Si se proporciona un nuevo nombre, verificar que no exista otro con ese nombre
            if (nombre && nombre !== current.NOMBRE) {
                const exists = await Zombie.exists(this.getDbPool(), nombre);
                if (exists) {
                    return res.status(400).json({ message: "Ya existe un zombie con este nombre" });
                }
            }

            // Crear una instancia de Zombie con los datos actualizados
            const updatedZombie = new Zombie(
                id,
                nombre,
                descripcion,
                origenId,
                velocidad,
                fuerza,
                resistencia,
                humanidad
            );

            // Actualizar el zombie en la base de datos
            const result = await updatedZombie.update(this.getDbPool());

            // Verificar si la actualización tuvo éxito
            if (result.affectedRows === 0) return res.sendStatus(204); // No Content

            res.json({ message: "Zombie actualizado" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al actualizar el zombie");
        }
    }

    async deleteById(req, res) {
        try {
            const id = parseInt(req.params.id);

            // Verificar si el zombie existe
            const zombie = await Zombie.getById(this.getDbPool(), id);
            if (!zombie) return res.status(404).json({ message: "Zombie no encontrado" });

            // Eliminar lógicamente el zombie
            const result = await Zombie.softDelete(this.getDbPool(), id);
            if (result.affectedRows === 0) {
                return res.status(400).json({ message: "No se puede eliminar el zombie" });
            }

            res.json({ message: "Zombie eliminado" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al eliminar el zombie");
        }
    }

    async search(req, res) {
        try {
            const { searchTerm } = req.query;

            if (!searchTerm) {
                return res.status(400).json({ message: "El término de búsqueda es obligatorio" });
            }

            const results = await Zombie.search(this.getDbPool(), searchTerm);
            res.json(results);
        } catch (error) {
            this.handleError(res, 500, error, "Error al realizar la búsqueda");
        }
    }
}

export default new ZombieController();