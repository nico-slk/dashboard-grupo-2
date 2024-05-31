import { model, models, Schema } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
    minLength: [8, 'Password should have more than 8 chars.']
  },
  fullname: {
    type: String,
    require: true,
  },
}, {
  timestamps: true,
});

const User = models.User || model('User', userSchema);
export default User;
