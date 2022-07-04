import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../lib/database';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req:NextApiRequest, res:NextApiResponse) {

    const session = await getSession({ req: req });

    if (!session) {
        res.status(401).json({ message: 'Not authenticated!' });
        return;
    }

    const username = session.user.name;

    const client = await connectToDatabase();

    const usersCollection = client.db().collection('users');

    const user = await usersCollection.findOne({ username: username });

    if (!user) {
        res.status(404).json({ message: 'User not found.' });
        await client.close();
        return;
    }

    return {client, usersCollection, user, username};
}

export default handler;