import  express  from "express";




// initialized new app from express
const app = express();




app.use(express.json());





app.listen(2000,()=>{
    console.log("server is listing on  port 2000")
})
