import request from 'supertest';
import { app } from '../app';

describe('Profile', (): void => {
  it('returns an authenticated user details', async (): Promise<void> => {
    const cookie = await global.getAuthCookie();

    const response = await request(app).get('/api/v1/auth/me').set('Cookie', cookie).send();

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe('User profile successfully retrieved.');
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.email).toBeDefined();
  });
});
