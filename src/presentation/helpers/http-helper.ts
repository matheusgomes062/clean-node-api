import { HttpResponse } from '../protocols/http'
import { ServerError } from '../errors'

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
})

export const internalServerError = (): HttpResponse => ({
    statusCode: 500,
    body: new ServerError()
})

export const successResponse = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
})