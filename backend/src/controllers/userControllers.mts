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

export const getCurrentUser = async(req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "user not authenticated." })
        }
        
        const user = await User.findById(userId).select('username email');
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}