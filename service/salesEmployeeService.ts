import { promises } from "dns";
import { SalesEmployee } from "../model/salesEmployee";
const salesEmployeeValidator = require("../Validator/salesEmployeeValidator");

const axios = require('axios');

module.exports.getSalesEmployees = async function (): Promise<SalesEmployee[]> {
    try {
        const response = await axios.get('http://localhost:8080/employees/sales')

        return response.data
    } catch (e) {
        throw new Error('Could not get salesEmployees')
    }
}

module.exports.getSalesEmployeeById = async function (id: number): Promise<SalesEmployee> {
try {
    const response = await axios.get('http://localhost:8080/api/salesEmployees/' + id)

    return response.data
} catch (e) {
    throw new Error('Could not get salesEmployee')
}

}

module.exports.createSalesEmployee = async function (salesEmployee: SalesEmployee): Promise<number> {
    const error: string = salesEmployeeValidator.validateSalesEmployee(salesEmployee)
    
    if (error) {
        throw new Error(error)
    }
    
    
    try {
        const response = await axios.post('http://localhost:8080/employees/sales/', salesEmployee)

        return response.data
    } catch (e) {
        throw new Error('Could not create salesEmployee')
    }
    
}