const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const multer = require("multer");
const path = require("path")
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

const dbConfig = {
    user: process.env.DB_user,
    password: process.env.DB_password,
    server: process.env.DB_server,
    database: process.env.DB_database,
    options: {  
        trustServerCertificate: true
    }
};

sql.connect(dbConfig, (err) => {
    if(err)
        console.error(err);
    else
        console.log("Database connected");
});

//disk storage
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"uploads/")
    },
    filename: function(req, file, cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
});

const upload = multer({storage: storage});

app.get("/api/gameslist", async (req,res) => {
    try {
        const result = await sql.query("SELECT * FROM Games");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/api/taglist",async (req,res) => {
    try{
        const result = await sql.query("SELECT * FROM Tags");
        res.json(result.recordset);
    }
    catch(error){
        res.status(500).send(error);
    }
});

app.post("/api/addgames", upload.single("imagefile") ,async (req,res) =>{
    //console.log(req.body)
    const imagefile = "";
    if(req.file){
        imagefile = req.file.path;
    }
    const { GName, Genre, ReleaseDate, AvgRating, StorePage } = req.body;
    try{ 
        console.log("path - " + imagefile)
        const request =new sql.Request(); 
        request
        .input('GName',sql.NVarChar(50),GName)
        .input('Genre',sql.NVarChar(100),Genre)
        .input('ReleaseDate',sql.DateTime,ReleaseDate)
        .input('AvgRating',sql.Int,AvgRating)
        .input('StorePage',sql.VarChar(200),StorePage)
        .input('ImgFilePath',sql.VarChar(70),imagefile)

        await request.query("Insert into Games (GName,Genre,ReleaseDate,AvgRating,StorePage,ImgFilePath) values (@GName,@Genre,@ReleaseDate,@AvgRating,@StorePage,@ImgFilePath)")
        //console.log("after add")
        res.status(201).send('Game record added successfully');
    }
    catch(error){
        res.status(500).send(error);
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});