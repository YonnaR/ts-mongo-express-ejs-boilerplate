import * as mongoose from 'mongoose';

//get mongoose schema
const Schema = mongoose.Schema;

//create User data schema
export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a first name'
    },
    email: {
        type: String            
    },
    password: {
        type: String            
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});