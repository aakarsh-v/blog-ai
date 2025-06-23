import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';
import router from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Backend is working");
})

app.use('/api/admin', router);
app.use('/api/blog', blogRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})

export default app;