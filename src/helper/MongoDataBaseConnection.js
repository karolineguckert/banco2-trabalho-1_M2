import { MongoClient} from "mongodb";

const MONGO_DATABASE_IP = process.env.MONGO_DATABASE_IP;
const MONGO_DATABASE_PORT = process.env.MONGO_DATABASE_PORT;

class MongoDataBaseConnection {
    async start(){
        const uri = `mongodb://localhost:27023`;
        const client = new MongoClient(uri);
        return  client.connect()
    }

    async includeOneEmployee(employee){
        this.start().then((client) =>{
            const db = client.db("db");
            const collection = db.collection("employees");
            collection.insertOne(employee)
        })
    }

    async findOneByEmployeeNumber(employeeNumber){
        this.start().then((client) =>{
            const db = client.db("db");
            const collection = db.collection("employees");
            collection.findOne({emp_no: employeeNumber}).then(result => {return result});
        })
        return null;
    }
}


export default MongoDataBaseConnection;