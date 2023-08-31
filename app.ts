import { Request, Response } from "express";
import session = require("express-session");
import { SalesEmployee } from "./model/salesEmployee";


const express = require('express')
const path = require('path')
const nunjucks = require('nunjucks')

const app = express();

// this is for configuring nunjucks

const appViews = path.join(__dirname, '/views/')

const nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app

}



nunjucks.configure(appViews, nunjucksConfig)

// This will config express

app.set('view engine', 'html')

app.use('/public', express.static(path.join(__dirname, '/public')))

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: 'NOT HARDCODED SECRET', cookie: { maxAge: 60000}}));

declare module "express-session" {
    interface SessionData {
        salesEmployee: SalesEmployee;
    }
}

app.listen(3000, () => {
    console.log('Server started on port 3000')
})

// Routes for express


require('./controller/salesEmployeeController')(app);
require('./controller/deliveryEmployeeController')(app);