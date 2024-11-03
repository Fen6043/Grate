const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); //use promise based fs for async file handling. Caused error without it.
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

//get all games details
app.get("/api/gameslist", async (req,res) => {
    try {
        const result = await sql.query("SELECT * FROM Games");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error);
    }
});

//get all tags
app.get("/api/taglist",async (req,res) => {
    try{
        const result = await sql.query("SELECT * FROM Tags");
        res.json(result.recordset);
    }
    catch(error){
        res.status(500).send(error);
    }
});

//add new games
app.post("/api/addgames", upload.single("imagefile") ,async (req,res) =>{
    let imagefile = "";
    if(req.file){
        imagefile = req.file.path;
    }
    const { GName, Genre, ReleaseDate, AvgRating, StorePage } = req.body;
    try{ 
        console.log("path - " + imagefile)
        const result = await sql.query`Insert into Games (GName,Genre,ReleaseDate,AvgRating,StorePage,ImgFilePath) values (${GName},${Genre},${ReleaseDate},${AvgRating},${StorePage},${imagefile})`
        res.status(201).send('Game record added successfully');
    }
    catch(error){
        res.status(500).send(`an error occured ${error}`);
        console.log(error);
    }
});

//delete a game
app.delete("/api/deletegame/:id",async(req,res) =>{
    const id = req.params.id;
    console.log("To delete : ",id)
    try {
        const filepathResults = await sql.query `Select ImgFilePath from Games where GameID = ${id}`
        const filepath = filepathResults.recordset[0].ImgFilePath
        const result = await sql.query `Delete from Games where GameID = ${id}`;
        console.log(result.rowsAffected,__dirname,filepath)

        //remove image file from uploads dir
        const resolvedPath = path.resolve(__dirname,filepath)
        console.log("resolved - ",resolvedPath)
        await fs.promises.unlink(resolvedPath); //async file handling using promises
        //..

        if (result.rowsAffected[0]>0)
            res.status(201).send("Game Deleted");
        else
            res.status(404).send("Game not present");
    } catch (error) {
        res.status(500).send("error occured");
        console.log(error);
    }
    
});

app.put("/api/updaterating",async(req,res) => {
    const {id,rating} = req.body
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});