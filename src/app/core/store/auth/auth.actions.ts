import { Action } from '@ngrx/store';
import { User } from '../user/user.model';

export const LOAD = '[Auth] load currentUser';
export const LOADED = '[Auth] loaded';

export const LOGIN         = '[Auth] login';
export const LOGIN_SUCCESS = '[Auth] login success';
export const LOGIN_FAIL    = '[Auth] login fail';

export const LOGOUT         = '[Auth] logout';
export const LOGOUT_SUCCESS = '[Auth] logout success';
export const LOGOUT_FAIL    = '[Auth] logout fail';

export class LoadAuth implements Action {
  readonly type = LOAD;
  constructor(public correlationId?: string) {}
}

export class LoadedAuth implements Action {
  readonly type = LOADED;
  constructor(public payload: {
    user: User
  }, public correlationId?: string) {}
}

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: {
    provider: string,
    scope?: string
  }, public correlationId?: string) { }
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: any, public correlationId?: string) { }
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public error: any, public correlationId?: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  constructor(public correlationId?: string) { }
}

export class LogoutSuccess implements Action {
  readonly type = LOGOUT_SUCCESS;
  constructor(public correlationId?: string) {}
}

export class LogoutFail implements Action {
  readonly type = LOGOUT_FAIL;
  constructor(public error?: any, public correlationId?: string) {}
}

export type AuthActions =
  LoadAuth |
  LoadedAuth |
  Login |
  LoginSuccess |
  LoginFail |
  Logout |
  LogoutSuccess |
  LogoutFail;