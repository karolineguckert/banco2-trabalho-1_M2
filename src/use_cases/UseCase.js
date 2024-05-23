import Employee from "../mysql/entity/Employee.js";
import Salary from "../mysql/entity/Salary.js";
import Title from "../mysql/entity/Title.js";
import DepartmentEmployee from "../mysql/entity/DepartmentEmployee.js";
import DepartmentManager from "../mysql/entity/DepartmentManager.js";
import {MongoClient} from "mongodb";
import MongoDataBaseConnection from "../helper/MongoDataBaseConnection.js";

class UseCase {

    async getAllEmployees() {
        const employeeEntity = new Employee();
        return employeeEntity.getAllEmployees();
    }

    async insertFirstsEmployeesFromMYSQLToMongo(){
        this.getAllEmployees().then((resultOfEmployeesInMySQL)=> {
            this.insertFirstRegisters(resultOfEmployeesInMySQL);
        });
    }

    async insertEmployeesFromMYSQLToMongo(){
        this.getAllEmployees().then((resultOfEmployeesInMySQL) => {
            this.insertRegisters(resultOfEmployeesInMySQL);
        });
    }

    async insertRegisters(resultOfEmployeesInMySQL){
        const mongoDataBaseConnection = new MongoDataBaseConnection();

        for (let i = 0; i < resultOfEmployeesInMySQL.length; i++) {
            const employee = resultOfEmployeesInMySQL[i];
            const employeeNumber = employee.emp_no;

            mongoDataBaseConnection.findOneByEmployeeNumber(employeeNumber).then(result => {
                if(result){
                    this.insertOneEmployeeInMongo(employeeNumber, employee)
                }
            });
        }
    }

    async insertFirstRegisters(resultOfEmployeesInMySQL){
        for (let i = 0; i < resultOfEmployeesInMySQL.length; i++) {
            const employee = resultOfEmployeesInMySQL[i];
            const employeeNumber = employee.emp_no;

            await this.insertOneEmployeeInMongo(employeeNumber, employee);
        }
    }

    async insertOneEmployeeInMongo(employeeNumber, employee){
        const salaryEntity = new Salary();
        const titleEntity = new Title();
        const mongoDataBaseConnection = new MongoDataBaseConnection();
        const departmentEmployeeEntity = new DepartmentEmployee();
        const departmentEmployeeManagerEntity = new DepartmentManager();

        const resultOfSalaries= await salaryEntity.getAllSalariesByEmployeeNumber(employeeNumber);
        const resultOfTitles = await titleEntity.getAllTitlesByEmployeeNumber(employeeNumber);
        const resultOfDepartmentEmployees = await departmentEmployeeEntity.getAllDepartmentsEmployeesByEmployeeNumber(employeeNumber);
        const resultOfDepartmentManagers = await departmentEmployeeManagerEntity.getAllDepartmentsManagersByEmployeeNumber(employeeNumber);

        employee.dataValues.salaries = this.transformListToFormatted(resultOfSalaries);
        employee.dataValues.titles = this.transformListToFormatted(resultOfTitles);
        employee.dataValues.dept_emp = this.transformListToFormattedWithDepartment(resultOfDepartmentEmployees);
        employee.dataValues.dept_manager = this.transformListToFormattedWithDepartment(resultOfDepartmentManagers);

        await mongoDataBaseConnection.includeOneEmployee(employee.dataValues);
    }

    transformListToFormatted(resultList){
        let newList = [];
        for (let i = 0; i < resultList.length; i++) {
            newList.push(resultList[i].dataValues)
        }
        return newList;
    }

    transformListToFormattedWithDepartment(resultList){
        let newList = [];
        for (let i = 0; i < resultList.length; i++) {
            const element = resultList[i].dataValues;

            element.department = element.department.dept_name;
            newList.push(element)
        }
        return newList;
    }
}
export default UseCase;