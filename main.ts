import { School } from "./entities";
import {
    getClassYoungestStudent as getClassYoungestStudentFullName,
    initializeSchool,
    printSchool,
    transferStudent,
    initializeDynamicSchool
} from "./services";

const school: School = initializeSchool();
const newSchool = initializeDynamicSchool();

console.log('PRINT USUAL SCHOOL');
printSchool(school);
transferStudent(school.classes[0].students[1].fullName(), school.classes[0], school.classes[1]);
console.log('PRINT WITH TRANSFERRED STUDENT');
printSchool(school);
console.log(getClassYoungestStudentFullName(school.classes[0]) + ' is the youngest student');

console.log('PRINT DYNAMIC SCHOOL');
printSchool(newSchool);
transferStudent(newSchool.classes[0].students[0].fullName(), newSchool.classes[0], newSchool.classes[1]);
console.log('PRINT WITH TRANSFERRED STUDENT');
printSchool(newSchool);
console.log(getClassYoungestStudentFullName(newSchool.classes[0]) + ' is the youngest student');