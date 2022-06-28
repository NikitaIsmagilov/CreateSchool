// Ideas:
// Build dynamically created classmates: collection of first names, collection of lastnames, randomly pick birth date

import { firstNames, Geography, lastNames, Mathematics, specialities } from "./constants";
import { Classroom, School, Student, Teacher } from "./entities";
import { getRandomBirthDate, getRandomValueFromArray, getFullName } from "./helpers";

export function initializeSchool(): School {
    const student1: Student = createStudent(
        getRandomValueFromArray(firstNames),
        getRandomValueFromArray(lastNames),
        getRandomBirthDate()
    );
    const student2: Student = createStudent(
        getRandomValueFromArray(firstNames),
        getRandomValueFromArray(lastNames),
        getRandomBirthDate()
    );
    const student3: Student = createStudent(
        getRandomValueFromArray(firstNames),
        getRandomValueFromArray(lastNames),
        getRandomBirthDate()
    );
    const student4: Student = createStudent(
        getRandomValueFromArray(firstNames),
        getRandomValueFromArray(lastNames),
        getRandomBirthDate()
    );

    const teacher1: Teacher = createTeacher(
        getRandomValueFromArray(firstNames),
        getRandomValueFromArray(lastNames),
        [Mathematics]
    );

    const student5: Student = createStudent(
        getRandomValueFromArray(firstNames),
        getRandomValueFromArray(lastNames),
        getRandomBirthDate()
    );
    const student6: Student = createStudent(
        getRandomValueFromArray(firstNames),
        getRandomValueFromArray(lastNames),
        getRandomBirthDate()
    );
    const student7: Student = createStudent(
        getRandomValueFromArray(firstNames),
        getRandomValueFromArray(lastNames),
        getRandomBirthDate()
    );
    const student8: Student = createStudent(
        getRandomValueFromArray(firstNames),
        getRandomValueFromArray(lastNames),
        getRandomBirthDate()
    );

    const teacher2: Teacher = createTeacher(
        getRandomValueFromArray(firstNames),
        getRandomValueFromArray(lastNames),
        [Geography]
    );

    const mathClass: Classroom = createClassroom("Math", teacher1, [
        student1,
        student2,
        student3,
        student4,
    ]);
    // Teacher 1 changed to teacher 2
    const geographyClass: Classroom = createClassroom("Geography", teacher2, [
        student5,
        student6,
        student7,
        student8,
    ]);

    return {
        name: "Big school",
        address: "Moscow",
        phone: "+7 (916) 000 12 21",
        classes: [mathClass, geographyClass],
    };
}

// Task 8
export function initializeDynamicSchool(): School {
    // Get random number of classes from 2 to 10
    const numberOfClasses = Math.floor(Math.random() * 9 + 2);
    let classrooms: Classroom[] = [];

    for (let i = 1; i < numberOfClasses; i++) {
        // Get random num of students for the class from 1 to 30
        const numberOfStudentsInTheClass = Math.floor(Math.random() * 30 + 1);
        // Create array of students
        let students: Student[] = []
        for (let j = 1; j < numberOfStudentsInTheClass; j++) {
            let student: Student = createStudent(
                getRandomValueFromArray(firstNames),
                getRandomValueFromArray(lastNames),
                getRandomBirthDate()
            );
            students.push(student);
        };

        // Get random subject for the school
        const nameOfTheClass: string = getRandomValueFromArray(specialities);

        // Create teacher for the class
        const teacher: Teacher = createTeacher(
            getRandomValueFromArray(firstNames),
            getRandomValueFromArray(lastNames),
            [nameOfTheClass]
        );

        // Create classroom and add it to the list of all classes
        const classroom: Classroom = createClassroom(nameOfTheClass, teacher, students);
        classrooms.push(classroom);
    }

    return {
        name: "Dynamic school",
        address: "Moscow",
        phone: "+7 (000) 000 00 00",
        classes: classrooms,
    };
}

function createTeacher(
    firstName: string,
    lastName: string,
    professions: string[]
): Teacher {
    return {
        firstName: firstName,
        lastName: lastName,
        professions: professions,
        fullName: () => {
            return getFullName(firstName, lastName)
        },
    }
}

function createStudent(
    firstName: string,
    lastName: string,
    birthDate: Date
): Student {
    return {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        age: () => {
            const ageDifferenceInMilliseconds = Date.now() - birthDate.getTime();
            const ageDate = new Date(ageDifferenceInMilliseconds);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        },
        fullName: () => {
            return getFullName(firstName, lastName)
        },
    };
}

function createClassroom(
    name: string,
    teacher: Teacher,
    students: Student[]
): Classroom {
    return {
        name: name,
        teacher: teacher,
        students: students,
    };
}

// Task 5
export function getClassYoungestStudent(classroom: Classroom): string {
    const { students } = classroom;
    // Temporarily set first student in a list as the youngest
    let youngestStudent = students[0];
    for (let i = 0; i < students.length; i++) {
        const currentStudent = students[i];
        if (currentStudent.birthDate > youngestStudent.birthDate) youngestStudent = currentStudent;
    }
    return youngestStudent.fullName();
}

export function printSchool(school: School): void {
    const { name, address, phone, classes } = school;
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
    classes.sort((a, b) => a.name > b.name ? 1 : -1);
    for (let i in classes) {
        const { name, teacher, students } = classes[i];
        console.log(`Class ${+i + 1}: ${name}`);

        // Task 4.2 - refactoring. At first the row below looked like: console.log(`Teacher: ${teacher.firstName} ${teacher.lastName} ${teacher.professions.join()}`); 
        console.log(`Teacher: ${teacher.fullName()} ${teacher.professions.join()}`);
        // Task 6.2 - sorting students by last name and if last name is the same sorting by first name
        students.sort((a, b) => {
            if (a.lastName === b.lastName) return a.firstName > b.firstName ? 1 : -1;

            return a.lastName > b.lastName ? 1 : -1;
        });

        console.log("Students:");
        // Task 4.2 - refactoring the same as with teacher above
        for (let j in students) console.log(`${+j + 1}: ${students[j].fullName()}: ${students[j].age()}`)
        console.log('\n');
    }
}

// Task 7
export function transferStudent(fullName: string, fromClassroom: Classroom, toClassroom: Classroom): void {
    const classWithStudentToRemove = fromClassroom.students.filter(student => {
        // Leave in the first class only students whose names differ from fullName prop
        if (student.fullName() !== fullName) return student
        // Add a student with name the same as fullName prop to the second class
        else toClassroom.students.push(student)
    });
    // Renew students arr in the first class
    fromClassroom.students = classWithStudentToRemove.slice();
}