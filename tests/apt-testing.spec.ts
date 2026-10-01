import { test, expect } from '@playwright/test';

test.describe('API Testing', () => {
    const BASE_URL = 'https://reqres.in';

    test('GET - List user', async ({ request }) => {
        const res = await test.step('GET - List user', async () => {
            return await request.get(`${BASE_URL}/api/users?page=2`);
        });

        expect(res.ok()).toBe(true);
        expect(res.status()).toBe(200);

        const body = await res.json();

        expect(body.data.length).toBeGreaterThan(0);
        expect(body.page).toBe(2);
        expect(body.per_page).toBe(6);
        expect(body.total).toBe(12);
        expect(body.total_pages).toBe(2);

        

        await test.step('Validate Data Schema', async () => {
            for (const user of body.data) {
                expect(user).toHaveProperty('id');
                expect(user).toHaveProperty('email');
                expect(user).toHaveProperty('first_name');
                expect(user).toHaveProperty('last_name');
                expect(user).toHaveProperty('avatar');
            }
        })
    })

    test('GET Single User - Field by Field Assertion', async({ request }) => {
        const res = await test.step('GET Single User', async() => {
            return await request.get(`${BASE_URL}/api/users/2`);
        })

        expect(res.ok()).toBe(true);
        expect(res.status()).toBe(200);

        const body = await res.json();

        expect(body.data.id).toBe(2);
        expect(body.data.email).toBe('janet.weaver@reqres.in');
        expect(body.data.first_name).toBe('Janet');
        expect(body.data.last_name).toBe('Weaver');
        expect(body.data.avatar).toBe('https://reqres.in/img/faces/2-image.jpg');
    })

    test('GET Single User - Assertions for Missing Resource (404)', async({ request }) => {
        const res = await test.step('GET Single User - Assertions for Missing Resource (404)', async() => {
            return await request.get(`${BASE_URL}/api/users/23`);
        })

        expect(res.ok()).toBe(false);
        expect(res.status()).toBe(404);

        await test.step('Validate Response Body for Missing Resource', async() => {
            const body = await res.json();
            expect(body).toEqual({});
        })
    })

    test('POST - Create User', async({ request }) => {
        const payload = {
            "name": "morpheus",
            "job": "leader"
        }

        const res = await test.step('POST - Create User', async() => {
            return await request.post(`${BASE_URL}/api/users`, {
                data: payload
            });
        })

        expect(res.ok()).toBe(true);
        expect(res.status()).toBe(201);

        const body = await res.json();

        expect(body.name).toBe(payload.name);
        expect(body.job).toBe(payload.job);
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('createdAt');
    })
})