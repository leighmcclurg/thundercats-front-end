import { Application, Request, Response } from "express";
import { SalesEmployee } from "../model/salesEmployee";

const salesEmployeeService = require('../service/salesEmployeeService')

module.exports = function(app: Application) {

    app.get('/salesEmployees', async (req: Request, res: Response) => {
        let data: SalesEmployee[];

        try {
            data = await salesEmployeeService.getSalesEmployees()

        } catch (e) {
            console.error(e);
        }
        res.render('list-salesEmployees', { SalesEmployees: data } )
    })
    
    app.get('/salesEmployees/:id', async (req: Request, res: Response) => {
let data: SalesEmployee;

try {
    data = await salesEmployeeService.getSalesEmployeeById(req.params.id)

    console.log(data)
} catch (e) {
    console.error(e);
}


res.render('view-salesEmployee', { salesEmployee: data} )

    })
app.get('/add-salesEmployee', async (req: Request, res: Response) => {
    res.render('add-salesEmployee')
})

app.post('/add-salesEmployee', async (req: Request, res: Response) => {
    let data: SalesEmployee = req.body
    let id: Number

    try {
        id = await salesEmployeeService.createSalesEmployee(data)

        res.redirect('/salesEmployees/' + id)
    } catch (e) {
        console.error(e);


        res.locals.errormessage = e.message

        res.render('add-salesEmployee', req.body)
    }
})

app.get('/add-salesEmployee-name', async (req: Request, res: Response) => {
    if (!req.session.salesEmployee) {
        req.session.salesEmployee = {}
    }

    res.render('add-salesEmployee-name')
})

app.post('/add-salesEmployee-name', async (req: Request, res: Response) =>{
    req.session.salesEmployee["name"] = req.body.name

    res.redirect('/add-salesEmployee-salary')
})

app.get('/add-salesEmployee-salary', async (req: Request, res: Response) => {
    res.render('add-salesEmployee-salary')
})

app.post('/add-salesEmployee-salary', async (req: Request, res: Response) =>{
    req.session.salesEmployee["salary"] = req.body.description

    res.redirect('/add-salesEmployee-bankAccountNumber')
})

app.get('/add-salesEmployee-bankAccountNumber', async (req: Request, res: Response) => {
    res.render('add-salesEmployee-bankAccountNumber')
})

app.post('/add-salesEmployee-bankAccountNumber', async (req: Request, res: Response) =>{
    req.session.salesEmployee["bankAccountNumber"] = req.body.price

    res.redirect('/add-salesEmployee-nationalInsuranceNumber')
})



app.get('/add-salesEmployee-nationalInsuranceNumber', async (req: Request, res: Response) => {
    res.render('add-salesEmployee-nationalInsuranceNumber')
})

app.post('/add-salesEmployee-nationalInsuranceNumber', async (req: Request, res: Response) =>{
    req.session.salesEmployee["nationalInsuranceNumber"] = req.body.description

    res.redirect('/add-salesEmployee-commissionRate')
})

app.get('/add-salesEmployee-commissionRate', async (req: Request, res: Response) => {
    res.render('add-salesEmployee-commissionRate')
})

app.post('/add-salesEmployee-commissionRate', async (req: Request, res: Response) =>{
    req.session.salesEmployee["commissionRate"] = req.body.description

    res.redirect('/add-salesEmployee-confirmation')
})

app.get('/add-salesEmployee-confirmation', async (req: Request, res: Response) => {
    res.render('add-salesEmployee-confirmation', req.session.salesEmployee)
})

app.post('/add-salesEmployee-confirmation', async (req: Request, res: Response) => {
    let data: SalesEmployee = req.session.salesEmployee
    let id: Number
    try {
        id = await salesEmployeeService.createSalesEmployee(data)

        req.session.salesEmployee = undefined

        res.redirect('/salesEmployees/' + id)
    } catch (e) {
        console.error(e);

        res.locals.errormessage = e.message

        res.render('add-salesEmployee-confirmation', req.session.salesEmployee)
    }
})

}