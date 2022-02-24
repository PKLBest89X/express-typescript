import { Request, Response, NextFunction } from 'express';

const verifyRole = (...roleArray: number[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const getRoleArray = [...roleArray];
        const result = req.role.map(rl => getRoleArray.includes(rl)).find(f => f === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

export default verifyRole;