import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserInput } from '../src/user/user.input';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/user/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from '../src/user/user.module';
import { TwilioModule } from 'nestjs-twilio';
import * as dotenv from 'dotenv';
dotenv.config();




describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/test_users',
      synchronize: true,
      useUnifiedTopology: true,
      keepConnectionAlive: true,
      entities: [
        User
      ]

    }),

    GraphQLModule.forRoot({
      autoSchemaFile:true
    }),


    TwilioModule.forRoot({
      accountSid: process.env.accountSid,
      authToken: process.env.authToken,
    }),

    UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });



  afterAll(async () => {
    await app.close();
  });


const user: UserInput = {
    name: 'RAMESH',
    LastName: 'Patil',
    Email: 'rohitkadvekar329@gmail.com',
    phoneNumber: '+919326003932'
  };

  let id: string 


  const updatedUser: UserInput = {
    name: 'Kanak Patel',
    LastName: 'Chaudhary',
    Email: 'me16b112@smail.iitm.ac.in',
    phoneNumber: "+917397338807"
  };


  const createuserObject = JSON.stringify(user).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );


  const createUserQuery = `
  mutation {
    createUser(userinput: ${createuserObject}) {
      name
      LastName
      Email
      id
      phoneNumber
    }
  }`;


  it('createUser', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createUserQuery,
      })
      .expect(({ body }) => {
        const data = body.data.createUser;
        id = data.id;
        expect(data.name).toBe(user.name);
        expect(data.Email).toBe(user.Email);
        expect(data.LastName).toBe(user.LastName);
        expect(data.phoneNumber).toBe(user.phoneNumber);        
      })
      .expect(200);
  });


  it('users', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: '{users{name, LastName, Email, phoneNumber, id}}',
      })
      .expect(({ body }) => {
        const data = body.data.users;
        const userResult = data[data.length-1];
        expect(data.length).toBeGreaterThan(0);
        expect(userResult.name).toBe(user.name);
        expect(userResult.Email).toBe(user.Email);
        expect(userResult.LastName).toBe(user.LastName);
        expect(userResult.phoneNumber).toBe(user.phoneNumber);    
      })
      .expect(200);
  });


  const updateObject = JSON.stringify(updatedUser).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );


  it('update', () => {
    const updateQuery = `
    mutation {
      update(id: "${id}", userinput: ${updateObject}) {
        name
        LastName
        Email
        id
        phoneNumber
      }
    }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: updateQuery,
      })
      .expect(({ body }) => {
        const data = body.data.update;
        expect(data.name).toBe(updatedUser.name);
        expect(data.Email).toBe(updatedUser.Email);
        expect(data.LastName).toBe(updatedUser.LastName);
        expect(data.phoneNumber).toBe(updatedUser.phoneNumber);    
      })
      .expect(200);
  });


  it('deleteUser', () => {
    const deleteUserQuery = `
      mutation {
        deleteUser(id: "${id}") {
          name
          LastName
          Email
          id
          phoneNumber
        }
      }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: deleteUserQuery,
      })
      .expect(({ body }) => {
        const data = body.data.deleteUser;
        expect(data.name).toBe(updatedUser.name);
        expect(data.Email).toBe(updatedUser.Email);
        expect(data.LastName).toBe(updatedUser.LastName);
        expect(data.phoneNumber).toBe(updatedUser.phoneNumber);    
      })
      .expect(200);
  });

});






  




