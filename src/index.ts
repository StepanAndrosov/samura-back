import express, { Request, Response } from 'express'
import { db } from './db/db'
import { Course, Product, RequestWithBody, RequestWithParams } from './types'
import { CourseCreateModel } from './models/CourseCreateModel'
import { CourseViewModel } from './models/CourseViewModel'
import { ProductViewModel } from './models/ProductViewModel'
import { CourseIdParamsModel } from './models/CourseIdParamsModel'

export const app = express()
const port = process.env.PORT || 3000

const jsonBody = express.json()
app.use(jsonBody)

const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTEND_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
}

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.get('/products', (req: Request, res: Response<ProductViewModel[]>) => {

    res.json(db.products)
    res.sendStatus(HTTP_STATUSES.OK_200)
})
app.post('/products', (req: Request, res: Response<ProductViewModel>) => {
    const product = {
        title: req.body.title,
        id: +new Date()
    }
    db.products.push(product)
    res.json(product)
    res.sendStatus(HTTP_STATUSES.CREATED_201)
})

app.get('/products/:productTitle', (req: RequestWithParams<{ productTitle: string }>, res: Response) => {
    const title = req.params.productTitle
    const product = db.products.find(p => p.title === title)
    if (product) {
        res.json(product)
        res.sendStatus(HTTP_STATUSES.OK_200)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})

app.delete('/products/:id', (req: RequestWithParams<{ productTitle: string }>, res: Response<Product>) => {
    const title = req.params.productTitle
    let product = db.products.find(p => p.title === title)
    if (product) {
        const findId = db.products.indexOf(product)
        if (findId > -1) {
            db.products.splice(findId, 1)
            res.sendStatus(HTTP_STATUSES.NO_CONTEND_204)
        } else res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }

})

app.get('/courses', (req: Request, res: Response<CourseViewModel[]>) => {
    res.json(db.courses.map((c) => ({ id: c.id, title: c.title })))
    res.sendStatus(HTTP_STATUSES.OK_200)
})

app.get('/courses:id', (req: RequestWithParams<CourseIdParamsModel>, res: Response<CourseViewModel>) => {
    const foundCourse = db.courses.find(c => c.id === + req.params.id)

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.json({ id: foundCourse.id, title: foundCourse.title })
    res.sendStatus(HTTP_STATUSES.OK_200)
})

app.post('/courses', (req: RequestWithBody<CourseCreateModel>, res: Response<CourseViewModel>) => {
    const createdCourse = {
        id: +(new Date),
        title: req.body.title,
        studentsCount: 0
    }
    db.courses.push(createdCourse)
    res.json({ id: createdCourse.id, title: createdCourse.title })
    res.sendStatus(HTTP_STATUSES.OK_200)
})

app.delete('/courses:id', (req: RequestWithParams<CourseIdParamsModel>, res: Response) => {
    const foundCourse = db.courses.find(c => c.id === + req.params.id)

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTEND_204)
})

app.delete('/__test__/', (req: any, res: any) => {
    db.courses = []
    res.sendStatus(HTTP_STATUSES.NO_CONTEND_204)
})

app.listen(port, () => {
    console.log(`Exsample app litsening on port ${port}`)
})