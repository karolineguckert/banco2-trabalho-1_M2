import { MongoClient} from "mongodb";

const MONGO_DATABASE_IP = process.env.MONGO_DATABASE_IP;
const MONGO_DATABASE_PORT = process.env.MONGO_DATABASE_PORT;

class MongoDataBaseConnection {
    async start(){
        const uri = `mongodb://localhost:27023`;
        const client = new MongoClient(uri);
        return  client.connect()
    }
}


export default MongoDataBaseConnection;