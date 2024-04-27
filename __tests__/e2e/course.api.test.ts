import request from 'supertest'
import { HTTP_STATUSES, app } from '../../src'

describe('/course', () => {

    beforeAll(async () => {
        await request(app).delete('/__test__/')
    })

    it('should return 200 and empty array', async () => {
        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })

    it('should return 404 and empty array', async () => {
        await request(app)
            .get('/courses/999999')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it('should`n create course', async () => {
        await request(app)
            .post('/courses')
            .send({ title: '' })
            .expect(HTTP_STATUSES.NOT_FOUND_404)

        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })

    it('should create course with correct data', async () => {

        const title = 'new course'

        const response = await request(app)
            .post('/courses')
            .send({ title })
            .expect(HTTP_STATUSES.CREATED_201)

        const createdCource = response.body

        console.log(createdCource, 'createdCource')

        expect(createdCource).toEqual({
            // id: expect.any(Number),
            // title: title
        })

        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [{ id: 1, title }])
    })

    it('should delete course', async () => {

        await request(app)
            .delete('/courses/' + 1)
            .expect(HTTP_STATUSES.NO_CONTEND_204)

        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })
})