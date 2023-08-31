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

module.exports.getDeliveryEmployeeById = async function (id: number) : Promise<deliveryEmployee> {
    try {
        const response = await axios.get('http://localhost:8080/deliveryemployees/' + id)
        return response.data
    } catch(e) {
        throw new Error('Could not find employee')
    }
}

module.exports.getDeliveryEmployees = async function (): Promise<deliveryEmployee[]> {
    try {
        const response = await axios.get('http://localhost:8080/deliveryemployees/all')
        return response.data
    } catch(e) {
        throw new Error('Could not get delivery employees')
    }
}