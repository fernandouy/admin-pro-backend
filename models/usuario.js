const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE',
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSaltSync();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UsuarioSchema.pre('findOneAndUpdate', async function (next) {
  if (!this._update.password) {
    next();
  }

  const salt = await bcrypt.genSaltSync();
  this._update.password = await bcrypt.hash(this._update.password, salt);

  next()
})

module.exports = model('Usuario', UsuarioSchema);
