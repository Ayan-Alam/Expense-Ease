const express = require('express');
const cors = require('cors');

const userRouter = require('./Routes/userRouter');
const expenseRouter = require('./Routes/expenseRouter');
const sequelize = require('./utils/database');
const user = require('./models/userModel');
const expense = require('./models/expenseModel');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

app.use('/login',userRouter);
app.use('/post',userRouter);

app.use('/expense',expenseRouter);

user.hasMany(expense);
expense.belongsTo(user);

sequelize.sync().then(()=>{
    app.listen(3000);
}).catch((err)=>{console.log(err)})