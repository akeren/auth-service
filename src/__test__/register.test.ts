import request from 'supertest';
import { app } from '../app';

describe('User account creation', (): void => {
  const registerEndpoint = `/api/v1/auth/register`;

  it('should register successful with aptly response', async (): Promise<void> => {
    const response = await request(app).post(registerEndpoint).send({
      email: 'test@dev.io',
      password: 'password',
    });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe('Account created successfully');
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data).toHaveProperty('email');
    expect(response.body.data).toHaveProperty('created_at');
    expect(response.body.data).toHaveProperty('updated_at');
    expect(response.headers['set-cookie']).toBeDefined();
  });

  it('should register with missing email and password upon registration', async (): Promise<void> => {
    const response = await request(app).post(registerEndpoint).send({}).expect(422);

    expect(response.status).toBe(422);
    expect(response.body.status).toBe(false);
    expect(response.body.code).toBe(422);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        {
          message: 'Email is required',
          field: 'email',
        },
        {
          message: 'Email must be valid',
          field: 'email',
        },
        {
          message: 'Password is required',
          field: 'password',
        },
        {
          message: 'Password must contain at least 4 characters',
          field: 'password',
        },
      ])
    );
  });

  it('returns aptly response with an invalid email upon registration', async (): Promise<void> => {
    const response = await request(app).post(registerEndpoint).send({
      email: 'test',
      password: 'password',
    });

    expect(response.status).toBe(422);
    expect(response.body.status).toBe(false);
    expect(response.body.code).toBe(422);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        {
          message: 'Email must be valid',
          field: 'email',
        },
      ])
    );
  });

  it('returns aptly response with an invalid password upon registration', async (): Promise<void> => {
    const response = await request(app).post(registerEndpoint).send({
      email: 'hi@dev.io',
      password: 'p',
    });

    expect(response.status).toBe(422);
    expect(response.body.status).toBe(false);
    expect(response.body.code).toBe(422);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        {
          message: 'Password must contain at least 4 characters',
          field: 'password',
        },
      ])
    );
  });

  it('disallows duplicate email with an aptly response upon registration', async (): Promise<void> => {
    await request(app)
      .post(registerEndpoint)
      .send({
        email: 'emelia@dev.io',
        password: 'password',
      })
      .expect(201);

    const response = await request(app).post(registerEndpoint).send({
      email: 'emelia@dev.io',
      password: 'password',
    });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.code).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        {
          message: 'Email already in use',
        },
      ])
    );
  });

  it('checks the existence of cookie upon successful registration', async (): Promise<void> => {
    const response = await request(app).post(registerEndpoint).send({
      email: 'wandoo@dev.io',
      password: 'password',
    });

    expect(response.status).toBe(201);
    expect(response.headers['set-cookie']).toBeDefined();
  });
});
