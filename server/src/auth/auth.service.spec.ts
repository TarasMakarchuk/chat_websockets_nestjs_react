import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import TestUtil from "../common/test/testUtil";
import {User} from "./entities/user.entity";
import {AuthService} from "./auth.service";

describe('ArticlesService', () => {
  let service: AuthService;
  let user;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: null,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    user = TestUtil.getUserWithoutId();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create user', () => {
    it('should be create one user with id', async () => {
      const newUser = await service.createUser({name: user.name});
      const users = await service.findAll();

      expect(Array.isArray(users)).toBe(true);
      expect(users).toHaveLength(1);
      users.forEach(item => expect(item).toHaveProperty('id'));
      users.forEach(item => expect(item).toHaveProperty('name', 'User1'));
      users.forEach(item => expect(item).toHaveProperty('userWsId'));
      users.forEach(item => expect(item.id).toBe(newUser.id));
      users.forEach(item => expect(item).toMatchObject(newUser));
    });
  });

  describe('identify user', () => {
    it('should be identify user by name', async () => {
      await service.createUser({name: user.name});
      const foundUser = await service.identify(user.name, 'toHaveProperty');

      expect(foundUser).toHaveProperty('id');
      expect(foundUser).toHaveProperty('userWsId', 'toHaveProperty');
      expect(foundUser).toHaveProperty('name', 'User1');
    });
  });

  describe('get user by id', () => {
    it('should be get user by id', async () => {
      const newUser = await service.createUser({ ...user });
      const foundUser = await service.getUser(newUser.id)[0];

      expect(foundUser).toHaveProperty('id');
      expect(foundUser.id).toEqual(newUser.id);
      expect(foundUser.id).toBe(newUser.id);
    });
  });

  describe('get all users', () => {
    it('should be get all users', async () => {
      for (let i = 0; i < 2; i++) {
        await service.createUser({ name: user.name + i });
      }
      const users = await service.findAll();

      expect(Array.isArray(users)).toBe(true);
      expect(users).toHaveLength(3);
      users.forEach(item => expect(item).toHaveProperty('id'));
      users.forEach(item => expect(item).toHaveProperty('name'));
      users.forEach(item => expect(item).toHaveProperty('userWsId'));
    });
  });
});
