import express from 'express'
import 'dotenv/config'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Backend is working");
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})

export default app;