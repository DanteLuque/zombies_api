import ModelBase from "../../shared/model-base.js";

class Origin extends ModelBase {
    constructor(
        id = null,
        origen
    ) {
        super();
        this.id = id;
        this.origen = origen;
    }

    static async getById(conexion, id) {
        const [result] = await conexion.query(
            "SELECT * FROM ORIGENES WHERE ID = ? AND deleted_at IS NULL",
            [id]
        );
        return result[0];
    }

    static async getAll(conexion) {
        const [result] = await conexion.query(
            "SELECT * FROM ORIGENES WHERE deleted_at IS NULL"
        );
        return result;
    }

    async create(conexion) {
        const now = new Date();
        this.created_at = now;
        this.updated_at = now;

        const [result] = await conexion.query(
            `INSERT INTO ORIGENES (ORIGEN, created_at, updated_at)
             VALUES (?, ?, ?)`,
            [
                this.origen,
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
            `UPDATE ORIGENES
             SET ORIGEN = ?, updated_at = ?
             WHERE ID = ? AND deleted_at IS NULL`,
            [
                this.origen,
                this.updated_at,
                this.id
            ]
        );
        return result;
    }

    static async softDelete(conexion, id) {
        const deleted_at = new Date();
        const [result] = await conexion.query(
            `UPDATE ORIGENES SET deleted_at = ? WHERE ID = ? AND deleted_at IS NULL`,
            [deleted_at, id]
        );
        return result;
    }

    static async exists(conexion, origen) {
        const [result] = await conexion.query(
            "SELECT COUNT(*) AS count FROM ORIGENES WHERE ORIGEN = ? AND deleted_at IS NULL",
            [origen]
        );
        return result[0].count > 0;
    }
    
}

export default Origin;
