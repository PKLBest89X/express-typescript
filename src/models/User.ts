import { Schema, model } from 'mongoose';
import { UserType } from '../types/user.types';
import { rolesList } from '../configs/rolesList';

const userSchema = new Schema<UserType>({
    email: {
        type: String,
        required: true
    },
    role: {
        user: {
            type: Number,
            default: rolesList.user
        },
        editor: Number,
        admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
}, {
    timestamps: true,
    versionKey: false
})

export default model<UserType>("User", userSchema);
