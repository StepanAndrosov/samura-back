

export interface Course {
    id: number
    title: string
    studentsCount: number
}

export interface Product {
    id: number
    title: string
}

export interface UsersCourseBinding {
    studentId: number,
    courseId: number,
    date: string
}