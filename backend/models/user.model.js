import mongoose from 'mongoose'
const { model, models, Schema } = mongoose
import validator from 'validator'
import bcrypt from 'bcrypt'

const userSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, 'Email is required.'],
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: true,
      validate: [
        {
          validator: (value) => validator.isStrongPassword(value),
          message:
            'Password must contain at least one alphanumeric and special character',
        },
      ],
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(this.password, salt)
  this.password = hashedPassword
  next()
})

userSchema.methods.comparePassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password)
}

const User = models.User || model('User', userSchema)

export default User
