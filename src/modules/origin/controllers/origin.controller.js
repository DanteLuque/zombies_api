import { BaseController } from "../../shared/controller-base.js";
import Origin from "../models/origin.model.js";
import { createOriginSchema } from "../validators/origin.create-validator.js";
import { updateOriginSchema } from "../validators/origin.update-validator.js";

class OriginController extends BaseController {
    async getAll(_, res) {
        try {
            const origins = await Origin.getAll(this.getDbPool());
            res.json(origins);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener los orígenes");
        }
    }

    async getById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const origin = await Origin.getById(this.getDbPool(), id);

            if (!origin) return res.status(404).json({ message: "Origen no encontrado" });
            res.json(origin);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener el origen");
        }
    }

    async create(req, res) {
        try {
            const { error: validationError, value } = createOriginSchema.validate(req.body, { abortEarly: false });
            if (validationError) {
                return res.status(400).json({
                    message: "Validación fallida",
                    details: validationError.details.map(d => d.message)
                });
            }

            const exists = await Origin.exists(this.getDbPool(), value.origen);
            if (exists) {
                return res.status(400).json({ message: "Ya existe un origen con este nombre" });
            }

            const origin = new Origin(null, value.origen);
            const result = await origin.create(this.getDbPool());

            res.status(201).json({ message: "Origen creado", id: result.insertId });
        } catch (error) {
            this.handleError(res, 500, error, "Error al crear el origen");
        }
    }

    async update(req, res) {
        try {
            const id = parseInt(req.params.id);

            const existingOrigin = await Origin.getById(this.getDbPool(), id);
            if (!existingOrigin) return res.status(404).json({ message: "Origen no encontrado" });

            const { error } = updateOriginSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({
                    message: "Validación fallida",
                    details: error.details.map(d => d.message)
                });
            }
            const exists = await Origin.exists(this.getDbPool(), id, req.body.origen);
            if (exists) return res.status(400).json({ message: "Ya existe un origen con este nombre" });
            
            const updatedOrigin = new Origin(id, req.body.origen);
            const result = await updatedOrigin.update(this.getDbPool());

            if (result.affectedRows === 0) return res.sendStatus(204);

            res.json({ message: "Origen actualizado" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al actualizar el origen");
        }
    }

    async deleteById(req, res) {
        try {
            const id = parseInt(req.params.id);

            const origin = await Origin.getById(this.getDbPool(), id);
            if (!origin) return res.status(404).json({ message: "Origen no encontrado" });

            const result = await Origin.softDelete(this.getDbPool(), id);
            if (result.affectedRows === 0) {
                return res.status(400).json({ message: "No se puede eliminar el origen" });
            }

            res.json({ message: "Origen eliminado" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al eliminar el origen");
        }
    }
}

export default new OriginController();