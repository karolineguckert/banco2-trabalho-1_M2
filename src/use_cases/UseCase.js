import Employee from "../mysql/entity/Employee.js";
import Salary from "../mysql/entity/Salary.js";
import Title from "../mysql/entity/Title.js";
import DepartmentEmployee from "../mysql/entity/DepartmentEmployee.js";
import DepartmentManager from "../mysql/entity/DepartmentManager.js";


class UseCase {

    async getAllEmployees() {
        const employeeEntity = new Employee();
        const salaryEntity = new Salary();
        const titleEntity = new Title();
        const departmentEmployeeEntity = new DepartmentEmployee();
        const departmentEmployeeManagerEntity = new DepartmentManager();

        const resultOfEmployeesInMySQL = await employeeEntity.getAllEmployees();

        for (let i = 0; i < resultOfEmployeesInMySQL; i++) {
            const employee = resultOfEmployeesInMySQL[i];
            const employeeNumber = employee.emp_no;

            const resultOfSalaries= await salaryEntity.getAllSalariesByEmployeeNumber(employeeNumber);
            const resultOfTitles = await titleEntity.getAllTitlesByEmployeeNumber(employeeNumber);
            const resultOfDepartmentEmployees = await departmentEmployeeEntity.getAllDepartmentsEmployeesByEmployeeNumber(employeeNumber);
            const resultOfDepartmentManagers = await departmentEmployeeManagerEntity.getAllDepartmentsManagersByEmployeeNumber(employeeNumber);

            employee.dataValues.salaries = this.transformListToFormatted(resultOfSalaries);
            employee.dataValues.titles = this.transformListToFormatted(resultOfTitles);
            employee.dataValues.dept_emp = this.transformListToFormattedWithDepartment(resultOfDepartmentEmployees);
            employee.dataValues.dept_manager = this.transformListToFormattedWithDepartment(resultOfDepartmentManagers);


        }

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