import dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
import { sequelize, connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import User from "./models/user.js";
import Task from "./models/task.js";


const app=express();

User.hasMany(Task,{
foreignKey:"userId",
//if a user is deleted, all their tasks will be deleted too
onDelete:"CASCADE"
});

Task.belongsTo(User,{
    foreignKey:'userId'
});

app.use(json());
connectDB();
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT=process.env.PORT || 5000;

app.listen(PORT,async ()=>{
console.log(`Server running on port ${PORT}`);
//sync all models with the database
await sequelize.sync({alter:true});
console.log("All models were synchronized successfully");
});
