import nodemailer from 'nodemailer'

export const emailRegister = async (data) => {
  const { email, name, token } = data

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  // infomation email
  await transport.sendMail({
    from: 'AdminTask - Administrador de proyectos "<cuentas@admintask.com>"',
    to: email,
    subject: 'AdminTask - Confirma tu cuenta',
    text: 'Comprueba tu cuenta en AdminTask',
    html: `<p>Hola ${name} comprueba tu cuenta en AdminTask</</p>
    <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace</p>

    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>

    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    `
  })
}

export const emailForgotPassword = async (data) => {
  const { email, name, token } = data

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  // infomation email
  await transport.sendMail({
    from: 'AdminTask - Administrador de proyectos "<cuentas@admintask.com>"',
    to: email,
    subject: 'AdminTask - Reestablece tu password',
    text: 'Comprueba tu cuenta en AdminTask',
    html: `<p>Hola ${name} has solicitado reestablecer tu password</</p>
    <p>Sigue el siguiente enlace para generar un nuevo password</p>

    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer contraseña</a>

    <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
    `
  })
}
