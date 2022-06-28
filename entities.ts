export type Teacher = {
    firstName: string;
    lastName: string;
    professions: string[];
    // Task 4.1
    fullName: () => string;
};

export type Student = {
    firstName: string;
    lastName: string;
    birthDate: Date;
    age: () => number;
    // Task 4.1
    fullName: () => string;
};

export type Classroom = {
    name: string;
    teacher: Teacher;
    students: Student[];
};

export type School = {
    name: string;
    address: string;
    phone: string;
    classes: Classroom[];
};