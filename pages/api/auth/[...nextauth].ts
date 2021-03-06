import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../lib/password';
import { connectToDatabase } from '../../../lib/database';

type credentials = {
    username:string,
    password:string
}

export default NextAuth({
    session: {
        jwt: true,
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials:credentials) {
                const client = await connectToDatabase();

                const usersCollection = client.db().collection('users');

                const user = await usersCollection.findOne({
                    username: credentials.username,
                });

                if (!user) {
                    await client.close();
                    throw new Error("can't find this username.");
                }

                const isValid = await verifyPassword(
                    credentials.password,
                    user.password
                );

                if (!isValid) {
                    await client.close();
                    throw new Error('wrong password.');
                }

                await client.close();
                return { name: user.username };

            },
        }),

    ],
});