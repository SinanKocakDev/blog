import express from "express"
import dotenv from "dotenv"
import db from "./config/dbConnect.js"
import postRoutes from "./routes/postRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cors from "cors"
import helmet from "helmet"
import path from "path"
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

dotenv.config()
db()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/posts', postRoutes)
app.use('/api/auth', userRoutes)

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/client/dist/index.html"))
  );

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Server is started on ${port} port`);
})