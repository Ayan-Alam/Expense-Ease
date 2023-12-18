const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

const sequelize = require('./utils/database');
const userRouter = require('./routes/user');
const expenseRouter = require('./routes/expense');
const PremiumRouter = require('./routes/premium');
const passwordRouter = require('./routes/password');

const user = require('./models/userModel');
const Order = require('./models/OrderModel');
const expense = require('./models/expenseModel');
const ResetPassword = require('./models/passwordModel');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(expenseRouter);
app.use(PremiumRouter);
app.use(passwordRouter);

user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(Order);
Order.belongsTo(user);

ResetPassword.belongsTo(user);
user.hasMany(ResetPassword);

sequelize.sync().then(()=>{
    app.listen(3008);
}).catch((err)=>{console.log(err)})