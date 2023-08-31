import { deliveryEmployee } from "../model/deliveryEmployee";



const axios = require('axios');



module.exports.createDeliveryEmployee = async function (product: deliveryEmployee) : Promise<number> {
    try {
        const response = await axios.post('http://localhost:8080/employees/add-delivery-employee' , product )
        return response.data
    } catch(e) {
        throw new Error('Could not create employee')
    }
}

