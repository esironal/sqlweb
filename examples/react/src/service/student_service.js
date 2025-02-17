import {
    BaseService
} from "./base_service";
import {
    Query
} from "sqlweb";

export class StudentService extends BaseService {

    constructor() {
        super();
        this.tableName = "students";
    }

    getStudents() {
        return this.connection.runSql(`select from ${this.tableName}`);
    }

    addStudent(student) {
        const qry = new Query(`insert into ${this.tableName} 
        values ({name:@name,gender:@gender,country:@country,city:@city}) return
        `);
        qry.map("@name", student.name);
        qry.map("@gender", student.gender);
        qry.map("@country", student.country);
        qry.map("@city", student.city);

        // below code is equaivalent of above - another way of using insert
        // const qry = new Query(`insert into ${this.tableName} values=@values return`);
        // qry.map('@values', [student]);

        return this.connection.runSql(qry);
    }

    getStudentById(id) {
        return this.connection.runSql(`select from ${this.tableName} where id= ${id}`);
    }

    removeStudent(id) {
        return this.connection.runSql(`remove from ${this.tableName} where id= ${id}`);
    }

    updateStudentById(id, updateData) {
        const qry = `update ${this.tableName} set 
        name=${updateData.name},
        gender=${updateData.gender},
        country=${updateData.country},
        city=${updateData.city} 
        where id=${id}`;

        return this.connection.runSql(qry);
    }
}