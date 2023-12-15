import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { UserService, UserEntity, UserModel, UserController } from './index.js';
import { Component } from '../../types/index.js';
import { DefaultUserService } from './default-user.service.js';
import { Controller } from '../../libs/rest/index.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  userContainer.bind<Controller>(Component.UserController).to(UserController).inSingletonScope();

  return userContainer;
}
