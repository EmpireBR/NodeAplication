import { EntityRepository, Repository } from "typeorm";

import { User } from '../models/User';

// A classe UserRepository contem todos os metodos que Repository tem
@EntityRepository(User)
class UsersRepository extends Repository<User> {}

export { UsersRepository };


