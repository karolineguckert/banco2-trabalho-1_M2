import Employee from "./mysql/entity/Employee.js";
import Department from "./mysql/entity/Department.js";
import DepartmentEmployee from "./mysql/entity/DepartmentEmployee.js";
import DepartmentManager from "./mysql/entity/DepartmentManager.js";
import Salary from "./mysql/entity/Salary.js";
import Title from "./mysql/entity/Title.js";


class Main {
    async main() {
        const employee = new Employee();
        const department = new Department();
        const departmentsEmployees = new DepartmentEmployee();
        const departmentsManagers = new DepartmentManager();
        const salaries = new Salary();
        const title = new Title();

        console.log(await title.getAllTitles())
    }

}

new Main().main()





