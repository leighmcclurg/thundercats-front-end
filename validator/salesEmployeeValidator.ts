import { SalesEmployee } from "../model/salesEmployee";

module.exports.validateSalesEmployee = function (salesEmployee: SalesEmployee): string {
    if (salesEmployee.name && salesEmployee.name.length > 120 ) {
        return "Name greater than 120 characters"
    }
    if (salesEmployee.salary && salesEmployee.salary < 10) {
        return "Salary is less than £10"

    }
    if (salesEmployee.bankAccNum && salesEmployee.bankAccNum.length > 16) {
        return "Bank account number can not be over 16 characters"
    }
    if (salesEmployee.nationalInsuranceNum && salesEmployee.nationalInsuranceNum.length > 9){
    return "National Insurance number can not be greater than 9 characters"
    }
    if (salesEmployee.commissionRate && salesEmployee.commissionRate < 0.2) {
        return "Commission Rate must be higher than 0.2"
    }

    return null
}