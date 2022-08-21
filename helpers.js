"use strict";
exports.__esModule = true;
exports.getFullName = exports.getRandomBirthDate = exports.getRandomValueFromArray = void 0;
function getRandomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
exports.getRandomValueFromArray = getRandomValueFromArray;
function getRandomBirthDate() {
    // Fixed calculating: + operator changed to *
    var year = 2011 - (Math.floor(Math.random() * 3));
    var month = Math.floor(Math.random() * 12);
    var day = Math.floor(Math.random() * 29);
    return new Date(year, month, day);
}
exports.getRandomBirthDate = getRandomBirthDate;
// Task 4
function getFullName(firstName, lastName) {
    return "".concat(firstName, " ").concat(lastName);
}
exports.getFullName = getFullName;
