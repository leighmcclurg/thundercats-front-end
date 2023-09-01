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

            res.redirect('/deliveryemployees/' + id)
        } catch (e) {

            console.error(e)
        
            res.locals.errormessage = e.message

        res.render('add-delivery-employee', req.body)
        }
    })

    app.get('/view-delivery-employee/:id', async(req: Request, res: Response) => {
        let data: deliveryEmployee ={}
    
        try {
            data = await deliveryEmployeeService.getDeliveryEmployeeById(req.params.id)
        }catch (e) {
            console.error(e);
        }
        res.render('view-delivery-employee', { employee: data } )
    })

    app.get('/list-delivery-employees', async(req: Request, res: Response) => {
        let data : deliveryEmployee[] =[];

        try {
            data = await deliveryEmployeeService.getDeliveryEmployees()
        }catch (e) {
            console.error(e);
        }
        res.render('list-delivery-employees', { deliveryEmployees: data } )
    } )
}