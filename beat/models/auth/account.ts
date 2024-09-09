import mongoose, { Schema, Document, Model } from 'mongoose'; 

export interface IAccount extends Document{
    userId: mongoose.Types.ObjectId; 
    provider: string; 
    providerAccountId: string; 
    accessToken?: string; 
    refreshToken?: string; 
    createdAt: Date; 
}

const AccountSchema: Schema<IAccount> = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}, 
    provider: {type: String, required: true}, 
    providerAccountId: {type: String, required: true}, 
    accessToken: {type: String}, 
    refreshToken: {type: String}, 
    createdAt: { type: Date, default: Date.now }, 
})

const Account: Model<IAccount> = mongoose.models.Account || mongoose.model<IAccount>('Account', AccountSchema); 
export default Account; 