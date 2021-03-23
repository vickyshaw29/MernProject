const express = require("express")
const mongoose=require('mongoose')
const morgan = require("morgan")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const expressValidator=require('express-validator')
const passport = require("passport")
const passportUtil = require("./Passport")
const cors = require("cors")
const path = require("path")

// const mongooseConnect = require("./utils/mongooseConnect") //Connecting the mongodDB to the app
// const errorController = require("./controller/errorController") //ErrorController

const authRoute = require("./routes/authRoutes")

const protectedRoute = require("./routes/protectedRoutes")

dotenv.config()

const app = express()

// if (process.env.MODE === "DEVELOPMENT") {
// 	app.use(morgan("dev"))
// }

app.use(express.json())//body parser for json
// app.use(cors()) //CORS for development
// app.use(expressValidator())

passportUtil(passport)
app.use(passport.initialize())

app.use("/api", authRoute)
app.use("/api", protectedRoute)


// app.use(errorController)

const PORT = process.env.PORT || 5000 //Port to listen on

const dirname = path.resolve()

// if (process.env.NODE_ENV === "PRODUCTION") {
// 	app.use(express.static(path.join(dirname, "/frontend/build")))
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
// 	})
// }
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'dist/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'dist', 'build','index.html'))
    }) 
}else{
    app.get('/',(req,res)=>{
        res.send('API is running')
    })
}

mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(process.env.PORT,()=>console.log('running on port 8000')))
.catch(err=>console.log(err))