import express from 'express';
import db from './config/mysql/mysql.js';
import OriginRouter from './modules/origin/routes/origin.route.js';
import ZombieRouter from './modules/zombie/routes/zombie.route.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.origin_path = '/api/v1/origin';
        this.zombie_path = '/api/v1/zombie';

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`👾 I'M ALIVE => PORT: ${this.port}`);
        });
    }

    async connectDB() {
        await db.testConnection();
    }

    middlewares() {
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.origin_path, OriginRouter);
        this.app.use(this.zombie_path, ZombieRouter);
    }
}

export default Server;