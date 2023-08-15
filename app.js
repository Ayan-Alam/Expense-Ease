const express = require('express');

const expenseRouter = require('./Routes/expenseRouter');
const sequelize = require('./utils/database');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/login',expenseRouter);
app.use('/post',expenseRouter);

sequelize.sync().then(()=>{
    app.listen(3000);
}).catch((err)=>{console.log(err)})