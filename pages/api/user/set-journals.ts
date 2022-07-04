import type { NextApiRequest, NextApiResponse } from 'next'
import checkUserAuth from "./checkUserAuth";

async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method !== 'PATCH') {
        res.status(401).json({ message: 'Please use patch to access.'});
        return;
    }

    const isUser = await checkUserAuth(req, res);
    if(isUser){
        const {client, usersCollection, user, username} = isUser;

        const {newJournals, newToolbars, timestamp} = req.body;

        if(newJournals){
            await usersCollection.updateOne(
                {username:username},
                {$set: {journals: newJournals,timestamp}}
            );
        }

        if(newToolbars){
            await usersCollection.updateOne(
                {username:username},
                {$set: {toolbars: newToolbars,timestamp}}
            );
        }

        await client.close();
        res.status(200).json({ message: 'Journals updated!' });
        return;
    }
}

export default handler;