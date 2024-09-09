import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUserData extends Document{
    num: number[]; 
    word: string[]; 

}


export interface IUser extends Document{
    name?: string; 
    email?: string; 
    image?: string; 
    accounts: mongoose.Types.ObjectId[]; 
    createdAt: Date; 
    data: IUserData; 
}


export const UserDataSchema: Schema<IUserData> = new Schema({
    num: [{ type: Number }],
    word: [{ type: String }],
  });



export const UserSchema: Schema<IUser> = new Schema({
    name: {type: String, required: false}, 
    email: {type: String, required: false}, 
    image: String, 
    accounts: [{type: Schema.Types.ObjectId, ref: 'Account'}], 
    createdAt: {type: Date, default: Date.now}, 
    data: UserDataSchema, 
}); 

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema); 
export default User; 
