import { getSession } from 'next-auth/client';

import { hashPassword, verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/database';
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method !== 'PATCH') {
        res.status(401).json({ message: 'Please use patch to access.'});
        return;
    }

    const session = await getSession({ req: req });

    if (!session) {
        res.status(401).json({ message: 'Not authenticated!' });
        return;
    }
    console.log(session)

    const username = session.user.name;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const client = await connectToDatabase();

    const usersCollection = client.db().collection('users');

    const user = await usersCollection.findOne({ username: username });

    if (!user) {
        res.status(404).json({ message: 'User not found.' });
        await client.close();
        return;
    }

    const currentPassword = user.password;

    const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

    if (!passwordsAreEqual) {
        res.status(403).json({ message: 'Invalid password.' });
        await client.close();
        return;
    }

    const hashedPassword = await hashPassword(newPassword);

    const result = await usersCollection.updateOne(
        { username: username },
        { $set: { password: hashedPassword } }
    );

    await client.close();
    res.status(200).json({ message: 'Password updated!' });
}

export default handler;