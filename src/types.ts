import type { Request } from "express"


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

export type RequestWithBody<T> = Request<{}, {}, T>
export type RequestWithParams<T> = Request<T>
export type RequestWithQuery<T> = Request<{}, {}, {}, T>