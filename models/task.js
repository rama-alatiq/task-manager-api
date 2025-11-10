import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Task =sequelize.define('Task',{
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT
    },
    status:{
        type:DataTypes.STRING,
        defaultValue:'Pending'
    },
    priority:{
        type:DataTypes.STRING,
        defaultValue:"Normal"
    },
    dueDate:{
        type:DataTypes.DATE
    }
});

// Task.sync();
export default Task;