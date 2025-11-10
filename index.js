import dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
import { sequelize, connectDB } from './config/db.js';
import taskRoutes from './routes/tasks.js';


const app=express();

app.use(json());
connectDB();
app.use('/api/tasks', taskRoutes);

const PORT=process.env.PORT || 5000;

app.listen(PORT,async ()=>{
console.log(`Server running on port ${PORT}`);
//sync all models with the database
await sequelize.sync({alter:true});
console.log("All models were synchronized successfully");
});
