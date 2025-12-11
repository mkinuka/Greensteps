import { User } from "../models/User.mjs"
import type { Request, Response } from "express"


export const fetchUser = async(req: Request, res: Response) => {
    try {
        const getUser = await User.findOne()
        res.status(200).json(getUser)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}