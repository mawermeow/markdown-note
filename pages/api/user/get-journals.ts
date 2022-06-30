import type { NextApiRequest, NextApiResponse } from 'next'
import searchUser from "../../../lib/checkUserAuth";

async function handler(req:NextApiRequest, res:NextApiResponse) {
    console.log(req)
    if (req.method !== 'GET') {
        res.status(401).json({ message: 'Please use GET method.'});
        return;
    }

    const isUser = await searchUser(req, res);
    if(isUser){
        const {client, usersCollection, user, username} = isUser;

        const journals = user.journals;
        const toolbars = user.toolbars;
        const timestamp = user.timestamp;

        res.status(200).json({ message: 'Take notes successfully.', journals, username, toolbars, timestamp});
        await client.close();
    }
}

export default handler;