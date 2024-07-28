import express from "express"
import dotenv from "dotenv"
import db from "./config/dbConnect.js"
import postRoutes from "./routes/postRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cors from "cors"


const app = express()

dotenv.config()
db()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/posts', postRoutes)
app.use('/api/auth', userRoutes)

const port = process.env.PORT || 3001


app.listen(port, () => {
    console.log(`Server is started on ${port} port`);
})