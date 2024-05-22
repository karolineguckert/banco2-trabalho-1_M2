import { DataTypes, Model, Op } from 'sequelize';
import sequelize from '../../helper/DataBaseConnection.js';
import Employee from "./Employee.js";
import Department from "./Department.js";
class DepartmentManager extends Model {
    getAllDepartmentsManagersByEmployeeNumber(emp_no) {
        try {
            return DepartmentManager.findAll({where: emp_no, include: [Department]});
        }
        catch(e){
            console.error("ERROR getAllDepartmentsManagersByEmployeeNumber---- ", e);
        }
    }
}

DepartmentManager.init({
    emp_no: {
        type: Employee,
        primaryKey: true
    },
    dept_no: {
        type: Department,
        primaryKey: true
    },
    from_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    to_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'dept_manager',
    timestamps: false,
    tableName: 'dept_manager'
});

DepartmentManager.belongsTo(Employee, { foreignKey: 'emp_no' });
Employee.hasOne(DepartmentManager, { foreignKey: 'emp_no'});

DepartmentManager.belongsTo(Department, { foreignKey: 'dept_no' });
Department.hasOne(DepartmentManager, { foreignKey: 'dept_no'});

export default DepartmentManager;