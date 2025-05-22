import ModelBase from "../../shared/model-base.js";

class Zombie extends ModelBase {
    constructor(
        id = null,
        nombre,
        descripcion = null,
        origenId,
        velocidad = 0,
        fuerza = 0,
        resistencia = 0,
        humanidad = 0,
    ) {
        super();
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.origenId = origenId;
        this.velocidad = velocidad;
        this.fuerza = fuerza;
        this.resistencia = resistencia;
        this.humanidad = humanidad;
    }

    static async getById(conexion, id) {
        const [result] = await conexion.query(
            "SELECT * FROM VIEW_ZOMBIES_WITH_ORIGIN WHERE ID = ? AND deleted_at IS NULL",
            [id]
        );
        return result[0];
    }

    static async getAll(conexion) {
        const [result] = await conexion.query(
            "SELECT * FROM VIEW_ZOMBIES_WITH_ORIGIN WHERE deleted_at IS NULL"
        );
        return result;
    }

    async create(conexion) {
        const now = new Date();
        this.created_at = now;
        this.updated_at = now;

        const [result] = await conexion.query(
            `INSERT INTO ZOMBIES 
             (NOMBRE, DESCRIPCION, ORIGEN_ID, VELOCIDAD, FUERZA, RESISTENCIA, HUMANIDAD, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                this.nombre,
                this.descripcion,
                this.origenId,
                this.velocidad,
                this.fuerza,
                this.resistencia,
                this.humanidad,
                this.created_at,
                this.updated_at
            ]
        );
        this.id = result.insertId;
        return result;
    }

    async update(conexion) {
        this.updated_at = new Date();

        const [result] = await conexion.query(
            `UPDATE ZOMBIES
             SET NOMBRE = ?, DESCRIPCION = ?, ORIGEN_ID = ?, VELOCIDAD = ?, FUERZA = ?, RESISTENCIA = ?, HUMANIDAD = ?, updated_at = ?
             WHERE ID = ? AND deleted_at IS NULL`,
            [
                this.nombre,
                this.descripcion,
                this.origenId,
                this.velocidad,
                this.fuerza,
                this.resistencia,
                this.humanidad,
                this.updated_at,
                this.id
            ]
        );
        return result;
    }

    static async softDelete(conexion, id) {
        const deleted_at = new Date();
        const [result] = await conexion.query(
            `UPDATE ZOMBIES SET deleted_at = ? WHERE ID = ? AND deleted_at IS NULL`,
            [deleted_at, id]
        );
        return result;
    }

    static async exists(conexion, nombre) {
        const [result] = await conexion.query(
            "SELECT COUNT(*) AS count FROM ZOMBIES WHERE NOMBRE = ? AND deleted_at IS NULL",
            [nombre]
        );
        return result[0].count > 0;
    }

    static async search(conexion, searchTerm) {
        try {
            const term = `%${searchTerm}%`;
            const [result] = await conexion.query(
                `SELECT * FROM VIEW_ZOMBIES_WITH_ORIGIN 
                 WHERE (NOMBRE LIKE ? OR ORIGEN_NOMBRE LIKE ?) AND deleted_at IS NULL`,
                [term, term]
            );
            return result;
        } catch (error) {
            throw new Error(`Error al realizar la búsqueda: ${error.message}`);
        }
    }
}

export default Zombie;