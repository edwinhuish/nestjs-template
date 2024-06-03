import { type Request, type Response } from 'express';
import { get, set } from 'lodash';

import { type UsersEntity } from '../databases/entities';
import { UnauthorizedException } from '@nestjs/common';

export interface IFlag {
  [key: string]: string;
}
export const FLAG: IFlag = {
  USER: 'user',
  TOKEN: 'token',
  PERMISSION: 'permission',
};

function setUser(req: Request, user: any) {
  set(req, FLAG.USER, user);
}

function getUser(req: Request) {
  return get(req, FLAG.USER, null) as UsersEntity | null;
}

function getUserThrow(req: Request) {
  const user = getUser(req);
  if (!user) {
    throw new UnauthorizedException('User not found, please login first');
  }
  return user;
}

function setToken(req: Request, res: Response, token: string) {
  set(req, FLAG.TOKEN, token);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: 'none',
    secure: true,
  });
}

function getToken(req: Request) {
  return get(req, FLAG.TOKEN, null) as string | null;
}

function getTokenThrow(req: Request) {
  const token = getToken(req);
  if (!token) {
    throw new UnauthorizedException('Token not found, please login first');
  }
  return token;
}

function removeToken(req: Request, res: Response) {
  set(req, FLAG.TOKEN, null);
  res.clearCookie('token');
}

function getPermission(req: Request) {
  return get(req, FLAG.PERMISSION, null) as Array<string> | null;
}

export const retriveUser = {
  // user related
  getUser,
  getUserThrow,
  setUser,
  // token related
  getToken,
  getTokenThrow,
  setToken,
  removeToken,
  // roles and permissions related
  getPermission,
};
