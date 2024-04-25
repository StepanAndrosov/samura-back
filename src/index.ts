import express, { Request, Response } from 'express'
import { title } from 'process'

export const app = express()
const port = process.env.PORT || 3000

const jsonBody = express.json()
app.use(jsonBody)

interface Course {
    id: number
    title: string
}

interface Product {
    title: string
}

const db = {
    products: [
        { id: 1, title: 'tomato' },
        { id: 2, title: 'orange' },
    ],
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

app.get('/products', (req: Request, res: Response<Product[]>) => {

    res.json(db.products)
    res.sendStatus(200)
})
app.post('/products', (req: Request, res: Response<Product>) => {
    const product = {
        title: req.body.title,
        id: +new Date()
    }
    db.products.push(product)
    res.json(product)
    res.sendStatus(201)
})

app.get('/products/:productTitle', (req: Request, res: Response) => {
    const title = req.params.productTitle
    const product = db.products.find(p => p.title === title)
    if (product) {
        res.json(product)
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
})

app.delete('/products/:id', (req: Request, res: Response<Product>) => {
    const title = req.params.productTitle
    let product = db.products.find(p => p.title === title)
    if (product) {
        const findId = db.products.indexOf(product)
        if (findId > -1) {
            db.products.splice(findId, 1)
            res.sendStatus(204)
        } else res.sendStatus(404)
    } else {
        res.sendStatus(404)
    }

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