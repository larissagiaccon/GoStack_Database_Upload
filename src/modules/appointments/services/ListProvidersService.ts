import { inject, injectable } from 'tsyringe';

import User from '@entitiesUsers/User';
import IUsersRepository from '@interfaceRepositoriesUsers/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    return users;
  }
}
