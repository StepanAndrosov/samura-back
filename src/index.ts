import express, { Request, Response } from 'express'

export const app = express()
const port = process.env.PORT || 3000

const jsonBody = express.json()
app.use(jsonBody)

interface Course {
    id: number
    title: string
}

const db = {
    courses: [
        {
            id: 1,
            title: 'front'
        },
        {
            id: 2,
            title: 'back'
        }
    ]
}

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.get('/courses', (req: Request, res: Response<Course[]>) => {
    res.json(db.courses)
    res.sendStatus(200)
})

app.post('/courses', (req: Request<{}, {}, { title: string }>, res: Response<Course>) => {
    const createdCourse = {
        id: +(new Date),
        title: req.body.title
    }
    db.courses.push(createdCourse)
    res.json(createdCourse)
    res.sendStatus(200)
})

app.delete('/__test__/', (req: any, res: any) => {
    db.courses = []
    res.sendStatus(204)
})

app.listen(port, () => {
    console.log(`Exsample app litsening on port ${port}`)
})