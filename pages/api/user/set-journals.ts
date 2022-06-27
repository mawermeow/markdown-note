import type { NextApiRequest, NextApiResponse } from 'next'
import searchUser from "../../../lib/searchUser";

async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method !== 'PATCH') {
        res.status(401).json({ message: 'Please use patch to access.'});
        return;
    }

    const isUser = await searchUser(req, res);
    if(isUser){
        const {client, usersCollection, user, username} = isUser;

        const newJournals = req.body;

        await usersCollection.updateOne(
            {username:username},
            {$set: {journals: newJournals}}
        );

        await client.close();
        res.status(200).json({ message: 'Journals updated!' });
        return;
    }
}

export default handler;