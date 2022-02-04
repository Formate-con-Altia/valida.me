const { check } = require("express-validator");

const FIRSTNAME_INVALID = "El campo 'Nombre' no es válido.";
const LASTNAME_INVALID = "El campo 'Apellidos' no es válido.";
const EMAIL_INVALID = "El campo 'Correo electrónico' no es válido.";
const PASSWORD_BLANK = "El campo 'Contraseña' no puede estar vacío.";
const PASSWORDS_DONT_MATCH = "Las contraseñas no coinciden.";
const PASSWORD_LENGTH =
  "El campo 'Contraseña' debe contener entre 6 y 32 caracteres.";

exports.validate = (method) => {
  switch (method) {
    case "signIn": {
      return [
        check("email", EMAIL_INVALID).isEmail(),
        check("password", PASSWORD_BLANK).notEmpty(),
      ];
    }

    case "signUp": {
      return [
        check("firstName", FIRSTNAME_INVALID).isLength({ min: 3, max: 75 }),
        check("lastName", LASTNAME_INVALID).isLength({ min: 3, max: 100 }),
        check("email", EMAIL_INVALID).isEmail().isLength({ max: 100 }),
        check("password", PASSWORD_LENGTH)
          .isLength({ min: 6, max: 32 })
          .custom((value, { req }) => {
            if (value !== req.body.password_confirm) {
              throw new Error(PASSWORDS_DONT_MATCH);
            }

            return true;
          }),
      ];
    }
  }
};
