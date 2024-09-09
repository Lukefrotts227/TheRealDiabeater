// client connection that does not use mongoose
import { MongoClient, ServerApiVersion } from "mongodb"; 

const CLIENT_URI = process.env.MONGO_URI || null;
if(!CLIENT_URI){
    throw new Error("Could not find MONGO_URI");
}
const primClient = new MongoClient(CLIENT_URI); 

const client: Promise<MongoClient> = primClient.connect(); 


export default client;
