import { Application, Response, Request } from "express";
import { deliveryEmployee } from "../model/deliveryEmployee";

const deliveryEmployeeService = require('../service/deliveryEmployeeService')

module.exports = function(app: Application){
    
    app.get('/add-delivery-employee', async(req: Request, res: Response) => {
        res.render('add-delivery-employee')
    })


    app.post('/add-delivery-employee', async(req: Request, res: Response) => {
        let data: deliveryEmployee = req.body
        let id : Number

        try{
            id = await deliveryEmployeeService.createDeliveryEmployee(data)

            res.redirect('/employees/' + id)
        } catch (e) {

            console.error(e)
        
            res.locals.errormessage = e.message

        res.render('add-delivery-employee', req.body)
        }
    })

}