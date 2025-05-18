import dotenv from 'dotenv';
import Server from './src/server.js';
dotenv.config();

try{
    const server = new Server();
    server.listen();
}catch(error){
    console.error(error);
}