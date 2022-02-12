export type UserState = {
    userID: string,
    password: string,
    login: LoginState
}

export type PostLoginParam = {
    userID: string,
    password: string
}
export type PostLoginResponse = {
    errorMsg?: string
}
export type LoginState = {
    isLogin: boolean,
    errorMsg: string
}
export type LoginSuccess = {
    isLoginSuccess: boolean,
    errorMsg: string
}
export type LoginFalse = {
    isLoginSuccess: boolean,
    errorMsg: string
}