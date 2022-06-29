import {describe, it, expect, vi} from 'vitest';
import {createMocks} from 'node-mocks-http';
import signup from "./signup";
import {connectToDatabase} from '../../../lib/database';
import {hashPassword} from "../../../lib/auth";

const validUsername = 'mawer';
const validPassword = '12345678';

vi.mock("../../../lib/form");

let callInsertOne = false;

vi.mock('../../../lib/database', () => {
    return {
        connectToDatabase: vi.fn(() => ({
            db: vi.fn(() => ({
                collection: vi.fn((collection: string) => ({
                    findOne: vi.fn((searchObj: {username:string})=>{
                        const existingUsername = 'sett';
                        if(searchObj.username === existingUsername){
                            return existingUsername;
                        }
                    }),
                    insertOne: vi.fn(()=>{
                        callInsertOne = true;
                    }),
                }))
            })),
            close:vi.fn()
        }))
    }
});


describe('signup()', () => {
    it('should not return anything if the method is not POST', async () => {
        const {req, res} = createMocks({
            method: 'GET'
        });

        await signup(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                message: 'please use post to access.'
            }),
        );

    });

    it('should display an error message if the entered password is less than seven characters long', async () => {
        const invalidPassword = '12345';

        const {req, res} = createMocks({
            method: 'POST',
            body: {
                username: validUsername,
                password: invalidPassword
            },
        });

        await signup(req, res);

        expect(res._getStatusCode()).toBe(422);
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                message:'Input error, the length of the username should be longer than four characters, and the length of the password should be longer than seven characters',
            }),
        );
    })

    it('should call the function which connect to the database , if the input username and password are in the correct format', async () => {

        const {req, res} = createMocks({
            method: 'POST',
            body: {
                username: validUsername,
                password: validPassword
            },
        });

        await signup(req, res);

        expect(connectToDatabase).toBeCalled();
    });
    it('should display an error message if the entered mailbox already exists',async()=>{

        const existingUsername = 'sett';

        const {req, res} = createMocks({
            method: 'POST',
            body: {
                username: existingUsername,
                password: validPassword
            },
        });

        await signup(req, res);

        expect(res._getStatusCode()).toBe(422);
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                message: 'username already exists'
            }),
        );
    });

    it('should call the function of password encryption , if the input data is correct',async()=>{

        const {req, res} = createMocks({
            method: 'POST',
            body: {
                username: validUsername,
                password: validPassword
            },
        });

        await signup(req, res);

        expect(hashPassword).toBeCalledWith(validPassword);
    });

    it('should call the function of adding data, if the input data is correct',async()=>{
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                username: validUsername,
                password: validPassword
            },
        });

        await signup(req, res);

        expect(callInsertOne).toBeTruthy();
    });

    it('should show that the registration is successful, if the function of the new information is called correctly',async()=>{
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                username: validUsername,
                password: validPassword
            },
        });

        await signup(req, res);

        expect(res._getStatusCode()).toBe(201);
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                message: 'account registration completed'
            }),
        );
    });
})