import Employee from "../mysql/entity/Employee.js";
import Salary from "../mysql/entity/Salary.js";
import Title from "../mysql/entity/Title.js";
import DepartmentEmployee from "../mysql/entity/DepartmentEmployee.js";
import DepartmentManager from "../mysql/entity/DepartmentManager.js";
import MongoDataBaseConnection from "../helper/MongoDataBaseConnection.js";

class UseCase {

    async getAllEmployees(offset) {
        const employeeEntity = new Employee();
        return employeeEntity.getAllEmployees(offset);
    }

    async insertFirstsEmployeesFromMYSQLToMongo(){
        let offset = 0;
        let hasNext = true;

        while(hasNext) {
            const resultOfEmployeesInMySQL = await this.getAllEmployees(offset);
            await this.insertFirstRegisters(resultOfEmployeesInMySQL);
            offset += 100
            if (resultOfEmployeesInMySQL.length < 100) {
                hasNext = false;
            }
        }
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
        let finalList = [];
        for (let i = 0; i < resultOfEmployeesInMySQL.length; i++) {
            const employee = resultOfEmployeesInMySQL[i];
            const employeeNumber = employee.emp_no;

            const employeeAdapted = await this.adaptEmployeeDocumentToMongo(employeeNumber, employee);
            finalList.push(employeeAdapted);
        }
        await this.insertManyEmployeesToMongo(finalList);
    }

    async adaptEmployeeDocumentToMongo(employeeNumber, employee){
        const salaryEntity = new Salary();
        const titleEntity = new Title();
        const departmentEmployeeEntity = new DepartmentEmployee();
        const departmentEmployeeManagerEntity = new DepartmentManager();

        const resultOfSalaries= await salaryEntity.getAllSalariesByEmployeeNumber(employeeNumber);
        const resultOfTitles = await titleEntity.getAllTitlesByEmployeeNumber(employeeNumber);
        const resultOfDepartmentEmployees = await departmentEmployeeEntity.getAllDepartmentsEmployeesByEmployeeNumber(employeeNumber);

        const auxDepartmentManagers = [];

        for (let i = 0; i < resultOfDepartmentEmployees.length; i++) {
            const resultOfDepartmentManagers = await departmentEmployeeManagerEntity.getAllDepartmentsManagersByDepartmentNumber(resultOfDepartmentEmployees[i].dataValues.dept_no);

            for (let j = 0; j < resultOfDepartmentManagers.length; j++) {
                auxDepartmentManagers.push(resultOfDepartmentManagers[j])
            }
        }

        employee.dataValues.salaries = this.transformListToFormatted(resultOfSalaries);
        employee.dataValues.titles = this.transformListToFormatted(resultOfTitles);
        employee.dataValues.dept_emp = this.transformListToFormattedWithDepartment(resultOfDepartmentEmployees);
        employee.dataValues.dept_manager = this.transformListToFormattedWithDepartmentAndEmployee(auxDepartmentManagers);
        return employee.dataValues;
    }

    async insertManyEmployeesToMongo(finalList){
        const mongoDataBaseConnection = new MongoDataBaseConnection();
        await mongoDataBaseConnection.includeManyEmployees(finalList);
    }

    async insertOneEmployeeInMongo(employeeNumber, employee){
        const mongoDataBaseConnection = new MongoDataBaseConnection();
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

    transformListToFormattedWithDepartmentAndEmployee(resultList){
        let newList = [];
        for (let i = 0; i < resultList.length; i++) {
            const element = resultList[i].dataValues;

            element.department = element.department.dept_name;
            element.employee = element.employee.dataValues.first_name;
            newList.push(element)
        }
        return newList;
    }
}
export default UseCase;