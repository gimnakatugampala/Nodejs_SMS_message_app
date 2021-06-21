const express = require('express')
const Vonage = require('@vonage/server-sdk')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const socketio = require('socket.io')

// Init vonage
const vonage = new Vonage({
  apiKey: "49ae7bc5",
  apiSecret: "Hw7IbV6JN3SiWfCu"
},{debug:true})

const app = express()

// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// EJS
app.set("view engine", "html");
app.engine("html", ejs.renderFile);

// Static folder
app.use(express.static(__dirname+'/public'))


app.get('/',(req,res) =>{
    res.render('index')
})

app.post('/',(req,res) =>{
    // res.send(req.body)
    // console.log(req.body)
    // const from = 'Gimna'
    // const number = req.body.number
    // const text = req.body.text

    const from = "From Gimna"
    const to = req.body.number
    const text = req.body.text
    
    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
                
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
})
const port = 3000 || process.env.PORT 

app.listen(port,() => console.log(`Server Connected at ${port}`))