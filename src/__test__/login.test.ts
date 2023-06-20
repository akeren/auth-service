import request from 'supertest';
import { app } from '../app';

describe('Login', (): void => {
  const loginEndpoint = `/api/v1/auth/login`;
  const registerEndpoint = `/api/v1/auth/register`;

  it('fails when email and password are empty', async (): Promise<void> => {
    const response = await request(app).post(loginEndpoint).send({});

    expect(response.status).toBe(422);
    expect(response.body.status).toBe(false);
    expect(response.body.code).toBe(422);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        { field: 'email', message: 'Email is required' },
        { field: 'email', message: 'Email must be valid.' },
        { field: 'password', message: 'You must provide a password.' },
      ])
    );
  });

  it('fails when email is invalid', async (): Promise<void> => {
    const response = await request(app).post(loginEndpoint).send({
      email: 'test',
      password: 'password',
    });

    expect(response.status).toBe(422);
    expect(response.body.status).toBe(false);
    expect(response.body.code).toBe(422);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        {
          field: 'email',
          message: 'Email must be valid.',
        },
      ])
    );
  });

  it('fails when password is incorrect', async (): Promise<void> => {
    await request(app).post(registerEndpoint).send({
      email: 'test@dev.io',
      password: 'password',
    });

    const response = await request(app).post(loginEndpoint).send({
      email: 'test@dev.io',
      password: 'p',
    });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.code).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        {
          message: 'Invalid login credentials.',
        },
      ])
    );
  });

  it('fails when email does not exist', async (): Promise<void> => {
    const response = await request(app).post(loginEndpoint).send({
      email: 'kater@dev.io',
      password: 'p',
    });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.code).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        {
          message: 'Invalid login credentials.',
        },
      ])
    );
  });

  it('login successfully with aptly response', async (): Promise<void> => {
    await request(app).post(registerEndpoint).send({
      email: 'kwaghdoo@dev.io',
      password: 'password',
    });

    const response = await request(app).post(loginEndpoint).send({
      email: 'kwaghdoo@dev.io',
      password: 'password',
    });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe('Logged in successfully.');
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.email).toBeDefined();
    expect(response.body.data.created_at).toBeDefined();
    expect(response.body.data.updated_at).toBeDefined();
    expect(response.body.jwt.token).toBeDefined();
    expect(response.body.jwt.expiredAt).toBeDefined();
    expect(response.headers['set-cookie']).toBeDefined();
  });
});
