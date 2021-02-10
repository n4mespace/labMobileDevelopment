import { Dict } from './types';

// Частина 1

// Дано рядок у форматі "Student1 - Group1; Student2 - Group2; ..."

const studentsStr: string =
    'Дмитренко Олександр - ІП-84; Матвійчук Андрій - ІВ-83; Лесик Сергій - ІО-82; Ткаченко Ярослав - ІВ-83; Аверкова Анастасія - ІО-83; Соловйов Даніїл - ІО-83; Рахуба Вероніка - ІО-81; Кочерук Давид - ІВ-83; Лихацька Юлія - ІВ-82; Головенець Руслан - ІВ-83; Ющенко Андрій - ІО-82; Мінченко Володимир - ІП-83; Мартинюк Назар - ІО-82; Базова Лідія - ІВ-81; Снігурець Олег - ІВ-81; Роман Олександр - ІО-82; Дудка Максим - ІО-81; Кулініч Віталій - ІВ-81; Жуков Михайло - ІП-83; Грабко Михайло - ІВ-81; Іванов Володимир - ІО-81; Востриков Нікіта - ІО-82; Бондаренко Максим - ІВ-83; Скрипченко Володимир - ІВ-82; Кобук Назар - ІО-81; Дровнін Павло - ІВ-83; Тарасенко Юлія - ІО-82; Дрозд Світлана - ІВ-81; Фещенко Кирил - ІО-82; Крамар Віктор - ІО-83; Іванов Дмитро - ІВ-82';

// Завдання 1
// Заповніть словник, де:
// - ключ – назва групи
// - значення – відсортований масив студентів, які відносяться до відповідної групи

const studentGroups: Dict<Array<string>> = {};

// Ваш код починається тут
studentsStr.split(';').forEach((studentInfo) => {
    const [student, groupKey] = studentInfo.split(' - ');

    studentGroups[groupKey] =
        typeof studentGroups[groupKey] !== 'undefined'
            ? studentGroups[groupKey]
            : [];

    studentGroups[groupKey].push(student.trim());
});

Object.keys(studentGroups).forEach((group) => {
    studentGroups[group].sort();
});

// Ваш код закінчується тут

console.log('Завдання 1');
console.log(studentGroups);
console.log();

// Дано масив з максимально можливими оцінками

const points: Array<number> = [12, 12, 12, 12, 12, 12, 12, 16];

// Завдання 2
// Заповніть словник, де:
// - ключ – назва групи
// - значення – словник, де:
//   - ключ – студент, який відносяться до відповідної групи
//   - значення – масив з оцінками студента (заповніть масив випадковими значеннями, використовуючи функцію `randomValue(maxValue: Int) -> Int`)

const randomUniform = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min) + min);

const randomValue = (maxValue: number): number => {
    switch (randomUniform(0, 6)) {
        case 1:
            return Math.ceil(maxValue * 0.7);
        case 2:
            return Math.ceil(maxValue * 0.9);
        case 3:
        case 4:
        case 5:
            return maxValue;
        default:
            return 0;
    }
};

const studentPoints: Dict<Dict<Array<number>>> = {};

// Ваш код починається тут
Object.keys(studentGroups).forEach((groupKey) => {
    const students = studentGroups[groupKey];

    students.forEach((student) => {
        studentPoints[groupKey] =
            typeof studentPoints[groupKey] !== 'undefined'
                ? studentPoints[groupKey]
                : {};
        studentPoints[groupKey][student] = points.map(randomValue);
    });
});

// Ваш код закінчується тут

console.log('Завдання 2');
console.log(studentPoints);
console.log();

// Завдання 3
// Заповніть словник, де:
// - ключ – назва групи
// - значення – словник, де:
//   - ключ – студент, який відносяться до відповідної групи
//   - значення – сума оцінок студента

const sumPoints: Dict<Dict<number>> = {};

// Ваш код починається тут
Object.keys(studentGroups).forEach((groupKey) => {
    const students = studentGroups[groupKey];

    students.forEach((student) => {
        sumPoints[groupKey] =
            typeof sumPoints[groupKey] !== 'undefined'
                ? sumPoints[groupKey]
                : {};
        sumPoints[groupKey][student] = studentPoints[groupKey][student].reduce(
            (a, b) => a + b,
            0
        );
    });
});

// Ваш код закінчується тут

console.log('Завдання 3');
console.log(sumPoints);
console.log();

// Завдання 4
// Заповніть словник, де:
// - ключ – назва групи
// - значення – середня оцінка всіх студентів групи

const groupAvg: Dict<number> = {};

// Ваш код починається тут
Object.keys(sumPoints).forEach((groupKey) => {
    const students = sumPoints[groupKey];
    const studentMarks = Object.values(students);

    groupAvg[groupKey] = studentMarks.reduce((a, b) => a + b, 0);
    groupAvg[groupKey] /= studentMarks.length;
});

// Ваш код закінчується тут

console.log('Завдання 4');
console.log(groupAvg);
console.log();

// Завдання 5
// Заповніть словник, де:
// - ключ – назва групи
// - значення – масив студентів, які мають >= 60 балів

const passedPerGroup: Dict<Array<string>> = {};

// Ваш код починається тут
Object.keys(sumPoints).forEach((groupKey) => {
    const students = sumPoints[groupKey];

    Object.keys(students).forEach((student) => {
        if (sumPoints[groupKey][student] >= 60) {
            passedPerGroup[groupKey] =
                typeof passedPerGroup[groupKey] !== 'undefined'
                    ? passedPerGroup[groupKey]
                    : [];
            passedPerGroup[groupKey].push(student);
        }
    });
});

// Ваш код закінчується тут

console.log('Завдання 5');
console.log(passedPerGroup);

// Приклад виведення. Ваш результат буде відрізнятися від прикладу через використання функції random для заповнення масиву оцінок та через інші вхідні дані.
//
// Завдання 1
// ["ІВ-73": ["Гончар Юрій", "Давиденко Костянтин", "Капінус Артем", "Науменко Павло", "Чередніченко Владислав"], "ІВ-72": ["Бортнік Василь", "Киба Олег", "Овчарова Юстіна", "Тимко Андрій"], "ІВ-71": ["Андрющенко Данило", "Гуменюк Олександр", "Корнійчук Ольга", "Музика Олександр", "Трудов Антон", "Феофанов Іван"]]
//
// Завдання 2
// ["ІВ-73": ["Давиденко Костянтин": [5, 8, 9, 12, 11, 12, 0, 0, 14], "Капінус Артем": [5, 8, 12, 12, 0, 12, 12, 12, 11], "Науменко Павло": [4, 8, 0, 12, 12, 11, 12, 12, 15], "Чередніченко Владислав": [5, 8, 12, 12, 11, 12, 12, 12, 15], "Гончар Юрій": [5, 6, 0, 12, 0, 11, 12, 11, 14]], "ІВ-71": ["Корнійчук Ольга": [0, 0, 12, 9, 11, 11, 9, 12, 15], "Музика Олександр": [5, 8, 12, 0, 11, 12, 0, 9, 15], "Гуменюк Олександр": [5, 8, 12, 9, 12, 12, 11, 12, 15], "Трудов Антон": [5, 0, 0, 11, 11, 0, 12, 12, 15], "Андрющенко Данило": [5, 6, 0, 12, 12, 12, 0, 9, 15], "Феофанов Іван": [5, 8, 12, 9, 12, 9, 11, 12, 14]], "ІВ-72": ["Киба Олег": [5, 8, 12, 12, 11, 12, 0, 0, 11], "Овчарова Юстіна": [5, 8, 12, 0, 11, 12, 12, 12, 15], "Бортнік Василь": [4, 8, 12, 12, 0, 12, 9, 12, 15], "Тимко Андрій": [0, 8, 11, 0, 12, 12, 9, 12, 15]]]
//
// Завдання 3
// ["ІВ-72": ["Бортнік Василь": 84, "Тимко Андрій": 79, "Овчарова Юстіна": 87, "Киба Олег": 71], "ІВ-73": ["Капінус Артем": 84, "Науменко Павло": 86, "Чередніченко Владислав": 99, "Гончар Юрій": 71, "Давиденко Костянтин": 71], "ІВ-71": ["Корнійчук Ольга": 79, "Трудов Антон": 66, "Андрющенко Данило": 71, "Гуменюк Олександр": 96, "Феофанов Іван": 92, "Музика Олександр": 72]]
//
// Завдання 4
// ["ІВ-71": 79.333336, "ІВ-72": 80.25, "ІВ-73": 82.2]
//
// Завдання 5
// ["ІВ-72": ["Бортнік Василь", "Киба Олег", "Овчарова Юстіна", "Тимко Андрій"], "ІВ-73": ["Давиденко Костянтин", "Капінус Артем", "Чередніченко Владислав", "Гончар Юрій", "Науменко Павло"], "ІВ-71": ["Музика Олександр", "Трудов Антон", "Гуменюк Олександр", "Феофанов Іван", "Андрющенко Данило", "Корнійчук Ольга"]]
