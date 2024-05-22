import Employee from "./mysql/entity/Employee.js";
import Department from "./mysql/entity/Department.js";
import DepartmentEmployee from "./mysql/entity/DepartmentEmployee.js";
import DepartmentManager from "./mysql/entity/DepartmentManager.js";
import Salary from "./mysql/entity/Salary.js";
import Title from "./mysql/entity/Title.js";
import UseCase from "./use_cases/UseCase.js";


class Main {
    async main() {
        // const employee = new Employee();
        // const department = new Department();
        // const departmentsEmployees = new DepartmentEmployee();
        // const departmentsManagers = new DepartmentManager();
        // const salaries = new Salary();
        // const title = new Title();
        const useCase = new UseCase();

        useCase.getAllEmployees()
    }

}

new Main().main()





