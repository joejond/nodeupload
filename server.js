//https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088
//ref lain https://pagep.net/2018/03/31/how-to-handle-large-file-upload-with-nodejs-express-server/


const express       = require('express');
const bodyPraser    = require('body-parser');
const multer        = require('multer');

const app = express();

app.use(bodyPraser.urlencoded({extended: true}));

app.get('/',function(req,res){
    // res.json({message: "WELCOME"});
    res.sendFile(__dirname + '/index.html');

});

//SET STORAGE
var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'upload')
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now())
    }

});

var upload = multer({storage: storage});

app.post('/uploadfile',upload.single('myFile'),(req,res,next)=>{
    const file = req.file
    if(!file){
        const error = new Error('Please upload file')
        error.httpStatusCode = 400
        return next(error);
    }
    res.send(file)
});


app.listen(3000,()=> console.log("server start on port 3000"));


