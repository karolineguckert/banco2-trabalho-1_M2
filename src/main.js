import Employee from "./mysql/entity/Employee.js";
import Department from "./mysql/entity/Department.js";


class Main {
    async main() {
        const employee = new Employee();
        const department = new Department();

        console.log(await department.getAllDepartments())
    }

}

new Main().main()





