"use strict";
// Ideas:
// Build dynamically created classmates: collection of first names, collection of lastnames, randomly pick birth date
exports.__esModule = true;
exports.transferStudent = exports.printSchool = exports.getClassYoungestStudent = exports.initializeDynamicSchool = exports.initializeSchool = void 0;
var constants_1 = require("./constants");
var helpers_1 = require("./helpers");
function initializeSchool() {
    var student1 = createStudent((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), (0, helpers_1.getRandomBirthDate)());
    var student2 = createStudent((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), (0, helpers_1.getRandomBirthDate)());
    var student3 = createStudent((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), (0, helpers_1.getRandomBirthDate)());
    var student4 = createStudent((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), (0, helpers_1.getRandomBirthDate)());
    var teacher1 = createTeacher((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), [constants_1.Mathematics]);
    var student5 = createStudent((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), (0, helpers_1.getRandomBirthDate)());
    var student6 = createStudent((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), (0, helpers_1.getRandomBirthDate)());
    var student7 = createStudent((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), (0, helpers_1.getRandomBirthDate)());
    var student8 = createStudent((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), (0, helpers_1.getRandomBirthDate)());
    var teacher2 = createTeacher((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), [constants_1.Geography]);
    var mathClass = createClassroom("Math", teacher1, [
        student1,
        student2,
        student3,
        student4,
    ]);
    // Teacher 1 changed to teacher 2
    var geographyClass = createClassroom("Geography", teacher2, [
        student5,
        student6,
        student7,
        student8,
    ]);
    return {
        name: "Big school",
        address: "Moscow",
        phone: "+7 (916) 000 12 21",
        classes: [mathClass, geographyClass]
    };
}
exports.initializeSchool = initializeSchool;
// Task 8
function initializeDynamicSchool() {
    // Get random number of classes from 2 to 10
    var numberOfClasses = Math.floor(Math.random() * 9 + 2);
    var classrooms = [];
    for (var i = 1; i < numberOfClasses; i++) {
        // Get random num of students for the class from 1 to 30
        var numberOfStudentsInTheClass = Math.floor(Math.random() * 30 + 1);
        // Create array of students
        var students = [];
        for (var j = 1; j < numberOfStudentsInTheClass; j++) {
            var student = createStudent((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), (0, helpers_1.getRandomBirthDate)());
            students.push(student);
        }
        ;
        // Get random subject for the school
        var nameOfTheClass = (0, helpers_1.getRandomValueFromArray)(constants_1.specialities);
        // Create teacher for the class
        var teacher = createTeacher((0, helpers_1.getRandomValueFromArray)(constants_1.firstNames), (0, helpers_1.getRandomValueFromArray)(constants_1.lastNames), [nameOfTheClass]);
        // Create classroom and add it to the list of all classes
        var classroom = createClassroom(nameOfTheClass, teacher, students);
        classrooms.push(classroom);
    }
    return {
        name: "Dynamic school",
        address: "Moscow",
        phone: "+7 (000) 000 00 00",
        classes: classrooms
    };
}
exports.initializeDynamicSchool = initializeDynamicSchool;
function createTeacher(firstName, lastName, professions) {
    return {
        firstName: firstName,
        lastName: lastName,
        professions: professions,
        fullName: function () {
            return (0, helpers_1.getFullName)(firstName, lastName);
        }
    };
}
function createStudent(firstName, lastName, birthDate) {
    return {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        age: function () {
            var ageDifferenceInMilliseconds = Date.now() - birthDate.getTime();
            var ageDate = new Date(ageDifferenceInMilliseconds);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        },
        fullName: function () {
            return (0, helpers_1.getFullName)(firstName, lastName);
        }
    };
}
function createClassroom(name, teacher, students) {
    return {
        name: name,
        teacher: teacher,
        students: students
    };
}
// Task 5
function getClassYoungestStudent(classroom) {
    var students = classroom.students;
    // Temporarily set first student in a list as the youngest
    var youngestStudent = students[0];
    for (var i = 0; i < students.length; i++) {
        var currentStudent = students[i];
        if (currentStudent.birthDate > youngestStudent.birthDate)
            youngestStudent = currentStudent;
    }
    return youngestStudent.fullName();
}
exports.getClassYoungestStudent = getClassYoungestStudent;
function printSchool(school) {
    var name = school.name, address = school.address, phone = school.phone, classes = school.classes;
    console.log("School data:");
    console.log("============");
    console.log(name);
    console.log(address);
    console.log(phone);
    // Task 1
    console.log('\n');
    console.log("Classes");
    console.log("=======");
    // Task 6.1 - sorting classes by name
    classes.sort(function (a, b) { return a.name > b.name ? 1 : -1; });
    for (var i in classes) {
        var _a = classes[i], name_1 = _a.name, teacher = _a.teacher, students = _a.students;
        console.log("Class ".concat(+i + 1, ": ").concat(name_1));
        // Task 4.2 - refactoring. At first the row below looked like: console.log(`Teacher: ${teacher.firstName} ${teacher.lastName} ${teacher.professions.join()}`); 
        console.log("Teacher: ".concat(teacher.fullName(), " ").concat(teacher.professions.join()));
        // Task 6.2 - sorting students by last name and if last name is the same sorting by first name
        students.sort(function (a, b) {
            if (a.lastName === b.lastName)
                return a.firstName > b.firstName ? 1 : -1;
            return a.lastName > b.lastName ? 1 : -1;
        });
        console.log("Students:");
        // Task 4.2 - refactoring the same as with teacher above
        for (var j in students)
            console.log("".concat(+j + 1, ": ").concat(students[j].fullName(), ": ").concat(students[j].age()));
        console.log('\n');
    }
}
exports.printSchool = printSchool;
// Task 7
function transferStudent(fullName, fromClassroom, toClassroom) {
    var classWithStudentToRemove = fromClassroom.students.filter(function (student) {
        // Leave in the first class only students whose names differ from fullName prop
        if (student.fullName() !== fullName)
            return student;
        // Add a student with name the same as fullName prop to the second class
        else
            toClassroom.students.push(student);
    });
    // Renew students arr in the first class
    fromClassroom.students = classWithStudentToRemove.slice();
}
exports.transferStudent = transferStudent;
