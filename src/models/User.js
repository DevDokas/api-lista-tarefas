import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'Campo nome deve ter entre 3 e 50 caracteres',
          },
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 80],
            msg: 'Campo sobrenome deve ter entre 3 e 80 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já registrado',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido.',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [8, 50],
            msg: 'A senha deve ter entre 8 e 50 caracteres',
          },
        },
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Pics, { foreignKey: 'user_id' });
    this.hasMany(models.Services, { foreignKey: 'user_id' });
  }
}
