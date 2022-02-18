import request from 'supertest';
import { app } from '../app';

describe('Logout => /api/users/logout', (): void => {
  it('should logout successfully', async (): Promise<void> => {
    const cookie = await global.getAuthCookie();

    const logoutResponse = await request(app).post('/api/v1/users/logout').set('Cookie', cookie).send({});

    expect(logoutResponse.status).toBe(200);
    expect(logoutResponse.body.status).toBe(true);
    expect(logoutResponse.body.code).toBe(200);
    expect(logoutResponse.body.message).toBe('Logged out successfully.');
    expect(logoutResponse.body.data).toBe(null);
    expect(logoutResponse.headers['set-cookie']).toEqual(
      expect.arrayContaining(['session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'])
    );
  });
});
