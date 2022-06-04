import express from 'express'

export const register = (req: express.Request, res: express.Response) => {
    res.send('register')
}

export const login = (req: express.Request, res: express.Response) => {
    res.send('log in')
}
