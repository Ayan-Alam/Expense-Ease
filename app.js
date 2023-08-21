const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");


const userRouter = require('./Routes/userRouter');
const expenseRouter = require('./Routes/expenseRouter');
const PremiumRouter = require('./Routes/PremiumRouter');
const sequelize = require('./utils/database');
const user = require('./models/userModel');
const Order = require('./models/OrderModel');
const expense = require('./models/expenseModel');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());
dotenv.config();

app.use('/login',userRouter);
app.use('/post',userRouter);

app.use('/expense',expenseRouter);
app.use('/premium',PremiumRouter);

user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(Order);
Order.belongsTo(user);

sequelize.sync().then(()=>{
    app.listen(3000);
}).catch((err)=>{console.log(err)})