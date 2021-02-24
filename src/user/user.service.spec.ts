import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserInput } from './user.input';
import { v4 as uuid} from 'uuid';

//import { SmsModule } from 'src/framework/sms-module/sms.module';

class UserRepositoryFake {
  public create(): void {
    console.log("calling from fake create")
  }
  public async save(): Promise<void> {}
  public async delete(): Promise<void> {}
  public async findOne(): Promise<void> {}
}

describe('UserService', () => {
  let service: UserService ;
  let userRepository: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [        
    ],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: UserRepositoryFake,
        },
      ],
    }).compile();

    service = module.get<UserService >(UserService );
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  function userof(params: Partial<User>): User {
    const user = new User();

    Object.assign(user, params);

    return user;
  }
  

  describe('testing function in Userservice', () => {
  
    it('creating a new user', async () => {
      let id = uuid()
      let name = "usha"
      let LastName = "singh";
      let Email = "abc@gmail.com";
      let phoneNumber = "+917397338807";

      const userinput: UserInput = {
        name: name,
        LastName: LastName,
        Email: Email,
        phoneNumber: phoneNumber

      };

      const createdUserEntity = userof(userinput);
      
      const savedUser = userof({
        id: id,
        name,
        LastName,
        Email,
        phoneNumber,
        
      });
      

      const userRepositorySaveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue(savedUser);

      const userRepositoryCreateSpy = jest
        .spyOn(userRepository, 'create')
        .mockReturnValue(createdUserEntity);

      const result = await service.createUser(userinput);

      //expect(userRepositoryCreateSpy).toBeCalledWith(userinput);
      expect(userRepositorySaveSpy).toBeCalledWith(createdUserEntity);
      expect(result).toEqual(savedUser);
      console.log(result)
      
    }); 
  });

  describe('getting a user', () => {

    it('returns the found user', async () => {
      const id = uuid();

      const existingUser = userof({
        id: id,
        name: "usha",
        LastName: "singh",
        Email: "abc@gmail.com",
        phoneNumber: "+917397338807",
        
      });

      const userRepositoryFindOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(existingUser);

      const result = await service.getUser(id);

      expect(result).toBe(existingUser);
      expect(userRepositoryFindOneSpy).toHaveBeenCalledWith({
        id: id,
      });
    });
  });

  describe('removing an user', () => {
    it('calls the repository with correct paramaters', async () => {
      const id = uuid();

      const existingUser = userof({
        id: id,
        name: "usha",
        LastName: "singh",
        Email: "abc@gmail.com",
        phoneNumber: "+917397338807",
      });

      const userServiceFindOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(existingUser);

      const userRepositoryRemoveSpy = jest
        .spyOn(userRepository, 'delete')
        .mockResolvedValue(null);

      const result = await service.removeUser(id);

      expect(userServiceFindOneSpy).toHaveBeenCalledWith({
        id: id,
      });

      expect(userRepositoryRemoveSpy).toHaveBeenCalledWith({
        id: id,
    });

      expect(result).toBe(existingUser);
    });
  });

  describe('updating an user', () => {
    it('calls the repository with correct paramaters', async () => {
      let id = uuid()
      let name = "usha"
      let LastName = "singh";
      let Email = "abc@gmail.com";
      let phoneNumber = "+917397338807";

      const userinput: UserInput = {
        name: name,
        LastName: LastName,
        Email: Email,
        phoneNumber: phoneNumber

      };

      const existingUser = userof({
        id: id,
        name: "nisha",
        LastName: "sinha",
        Email: "abc@gmail.com",
        phoneNumber: "+917397338807",
        
      });

      const newUserData = userof({
        ...existingUser,
        name,
        LastName,
      });

      const savedUser = userof({
        ...newUserData,
      });

      
      const userRepositoryRemoveSpy = jest
        .spyOn(userRepository, 'delete')
        .mockResolvedValue(null);

      const userRepositoryCreateSpy = jest
        .spyOn(userRepository, 'create')
        .mockReturnValue(newUserData);

      const userRepositorySaveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue(savedUser);

      const result = await service.updateUser(id,userinput );

      expect(userRepositoryRemoveSpy ).toHaveBeenCalledWith(
       {id: id,} 
      );

      expect(userRepositoryCreateSpy).toHaveBeenCalledWith({
        ...existingUser,
        name,
        LastName,
      });

      expect(userRepositorySaveSpy).toHaveBeenCalledWith(newUserData);
      expect(result).toEqual(savedUser);
    });
  });
})  