import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const { Schema, model } = mongoose

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Activo', 'Inactivo', 'Suspendido', 'Eliminado'],
      default: 'Activo',
      required: true
    },
    role: {
      type: String,
      enum: ['Empleado', 'Dueño', 'Administrador'],
      default: 'Empleado',
      required: true
    },
    idBusiness: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'businesses',
      required: false
    },
    idEmployee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      required: false
    },
    lastLogin: {
      type: Date,
      required: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

UserSchema.plugin(mongoosePaginate)

const UserModel = model('users', UserSchema)

export default UserModel
