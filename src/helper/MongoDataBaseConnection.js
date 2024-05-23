import { MongoClient} from "mongodb";

const MONGO_DATABASE_IP = process.env.MONGO_DATABASE_IP;
const MONGO_DATABASE_PORT = process.env.MONGO_DATABASE_PORT;

class MongoDataBaseConnection {
    async start(){
        const uri = `mongodb://192.168.3.21:27023`;
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

    async includeManyEmployees(listOfEmployees){
        this.start().then((client) =>{
            const db = client.db("db");
            const collection = db.collection("employees");
            collection.insertMany(listOfEmployees)
        })
    }

    async findOneByEmployeeNumber(employeeNumber){
        this.start().then((client) =>{
            const db = client.db("db");
            const collection = db.collection("employees");
            collection.findOne({emp_no: employeeNumber}).then(result => {return result});
        })
    }
}


export default MongoDataBaseConnection;