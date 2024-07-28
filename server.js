import express from "express"
import dotenv from "dotenv"
import db from "./config/dbConnect.js"
import postRoutes from "./routes/postRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cors from "cors"
import path from "path"

const app = express()

dotenv.config()
db()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/posts', postRoutes)
app.use('/api/auth', userRoutes)

const port = process.env.PORT || 3001


if(process.env.NODE_ENV === "production") {
    const dirPath = path.resolve()
    app.use(express.static(path.join("client/dist")))
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(dirPath,"client","dist","index.html"))
    })
}


app.listen(port, () => {
    console.log(`Server is started on ${port} port`);
})