import { hashPassword } from '../../../lib/password';
import { connectToDatabase } from '../../../lib/database';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

const handler = async (req:NextApiRequest, res:NextApiResponse<Data>) => {
    if (req.method !== 'POST') {
        res.status(200).json({message:'please use post to access.'})
        return;
    }

    const { username, password } = req.body;

    if (
        !username ||
        username.trim().length < 3 ||
        !password ||
        password.trim().length < 7
    ) {
        res.status(422).json({
            message:'Input error, the length of the username should be longer than four characters, and the length of the password should be longer than seven characters',
        });
        return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    const existingUser = await db.collection('users').findOne({ username: username });

    if (existingUser) {
        res.status(422).json({ message: 'username already exists' });
        await client.close();
        return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection('users').insertOne({
        username: username,
        password: hashedPassword,
        journals:[{title:'Daily',content:''},{title:'Monthly',content:''},{title:'Future',content:''}],
        toolbars:["","bold","italic","strike","alignLeft","alignCenter","divider1","undo"],
    });

    res.status(201).json({ message: 'account registration completed' });
    await client.close();
}

export default handler;