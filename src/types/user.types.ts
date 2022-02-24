export interface UserRoleType {
    user: number;
    editor: number;
    admin: number;
}

export interface UserType {
    email: string;
    role: UserRoleType;
    password: string;
    refreshToken?: string
}