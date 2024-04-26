import express, { Request, Response } from 'express'
import { db } from './db/db'
import { Course, Product } from './types'

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

app.get('/products', (req: Request, res: Response<Product[]>) => {

    res.json(db.products)
    res.sendStatus(HTTP_STATUSES.OK_200)
})
app.post('/products', (req: Request, res: Response<Product>) => {
    const product = {
        title: req.body.title,
        id: +new Date()
    }
    db.products.push(product)
    res.json(product)
    res.sendStatus(HTTP_STATUSES.CREATED_201)
})

app.get('/products/:productTitle', (req: Request, res: Response) => {
    const title = req.params.productTitle
    const product = db.products.find(p => p.title === title)
    if (product) {
        res.json(product)
        res.sendStatus(HTTP_STATUSES.OK_200)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})

app.delete('/products/:id', (req: Request, res: Response<Product>) => {
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

app.get('/courses', (req: Request, res: Response<Course[]>) => {
    res.json(db.courses)
    res.sendStatus(HTTP_STATUSES.OK_200)
})

app.post('/courses', (req: Request<{}, {}, { title: string }>, res: Response<Course>) => {
    const createdCourse = {
        id: +(new Date),
        title: req.body.title,
        studentsCount: 0
    }
    db.courses.push(createdCourse)
    res.json(createdCourse)
    res.sendStatus(HTTP_STATUSES.OK_200)
})

app.delete('/__test__/', (req: any, res: any) => {
    db.courses = []
    res.sendStatus(HTTP_STATUSES.NO_CONTEND_204)
})

app.listen(port, () => {
    console.log(`Exsample app litsening on port ${port}`)
})