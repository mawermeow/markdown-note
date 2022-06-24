import { hashPassword } from '../../../lib/auth';
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

    const data = req.body;

    const { email, password } = data;

    if (
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 7
    ) {
        res.status(422).json({
            message:'輸入錯誤，密碼長度請大於七位數',
        });
        return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email: email });

    if (existingUser) {
        res.status(422).json({ message: '這個信箱註冊過囉' });
        await client.close();
        return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection('users').insertOne({
        email: email,
        password: hashedPassword,
        journal:[]
    });

    res.status(201).json({ message: '帳號註冊完成！' });
    await client.close();
}

export default handler;