import { hashPassword, verifyPassword } from '../../../lib/auth';
import type { NextApiRequest, NextApiResponse } from 'next'
import searchUser from "../../../lib/checkUserAuth";

async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method !== 'PATCH') {
        res.status(401).json({ message: 'Please use patch to access.'});
        return;
    }

    const isUser = await searchUser(req, res);
    if(isUser) {
        const {client, usersCollection, user, username} = isUser;

        const currentPassword = user.password;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;

        const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

        if (!passwordsAreEqual) {
            res.status(403).json({message: 'Invalid password.'});
            await client.close();
            return;
        }

        const hashedPassword = await hashPassword(newPassword);

        const result = await usersCollection.updateOne(
            {username: username},
            {$set: {password: hashedPassword}}
        );

        res.status(200).json({message: 'Password updated!'});
        await client.close();
    }
}

export default handler;