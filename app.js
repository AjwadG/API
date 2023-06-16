require('dotenv').config()
const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))


main().catch((err) => {console.log(err);})

async function main(){

 await mongoose.connect(process.env.CONECTION + "testDB")

    const testSchema = new mongoose.Schema({
        name : String,
        age: Number,
        description: String
    })

    const Test = new mongoose.model("Test", testSchema)

    const test1 = Test({
        name: "ayoub",
        age: 25,
        description: "asdasdasd"
    })

    // await test1.save()

app.route("/")
    .get(async (req , res) =>{
        await Test.find({}).then((result) => {
            if (result == null) 
            {
                res.send("not found")
            } else {
                res.send(result)
            }
        })
    })
    .post(async (req , res) => {
        const newTest = Test({
            name : req.body.name,
            age: req.body.age,
            description: req.body.des
        })
        await newTest.save().then(() => res.send("test save successfuly")).catch((err) => {
            res.send("something went wrong")
            console.log(err);
        })
    })
    .delete(async (req , res) => {
        await Test.deleteMany({}).then(() => res.send("Data deleted successfuly")).catch((err) => {
            res.send("something went wrong")
            console.log(err);
        })
    })



const port = process.env.PORT || 3000

app.listen( port , () => {
    console.log("server started at port" + port);
})

}