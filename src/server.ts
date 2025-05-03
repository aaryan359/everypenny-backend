import  express  from "express";
import connectDB from "./config/db";



const app = express();




app.use(express.json());






// connnect to db
connectDB();





app.listen(2000,()=>{
    console.log("server is listing on  port 2000")
})
