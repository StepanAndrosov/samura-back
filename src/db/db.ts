export const db = {
    products: [
        { id: 1, title: 'tomato' },
        { id: 2, title: 'orange' },
    ],
    courses: [
        {
            id: 1,
            title: 'front-end',
            studentsCount: 10
        },
        {
            id: 2,
            title: 'back-end',
            studentsCount: 10
        },
        {
            id: 3,
            title: 'automatization qa',
            studentsCount: 10
        },
        {
            id: 4,
            title: 'devops',
            studentsCount: 10
        },
    ],
    users: [
        { id: 1, userName: 'vasya' },
        { id: 2, userName: 'petya' }
    ],
    studentsCourseBinding: [
        { studentId: 1, courseId: 1, date: new Date(2024, 1, 1) },
        { studentId: 1, courseId: 2, date: new Date(2024, 1, 1) },
        { studentId: 2, courseId: 1, date: new Date(2024, 4, 1) }
    ]
}