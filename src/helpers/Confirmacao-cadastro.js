const nodemailer = require("nodemailer");

class Email {
  async enviaEmail() {
    const transportador = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ed47aa3cf09881",
        pass: "1a380824b1421d",
      },
    });
    const info = await transportador.sendMail(this);
  }
}

class EmailVerificacao extends Email {
  constructor(usuario, token) {
    super();
    this.from = '"AluraFlix"<noreply@aluraflix.com.br>';
    this.to = usuario.email;
    this.subject = "Confirmação de e-mail";
    this.html = `<h1>Olá ${usuario.name},</h1>
     </p>Você acaba de se cadastrar em nosso sistema,
     com o email ${usuario.email}, copie e cole este token <strong>${token}</strong> que tem duração de 5 minutos para confirmar seu cadastro</p>`


    
    //<a href="${endereco}">${endereco}</a>;
  }
}

class RecuperaSenha extends Email {
  constructor(usuario, senha) {
    super();
    this.from = '"AluraFlix"<noreply@aluraflix.com.br>';
    this.to = usuario.email;
    this.subject = "Recuperação de senha";
    this.html = `<h1>Olá ${usuario.name},</h1> <p>Sua nova senha de acesso ao sistema é ${senha}</p>`;
  }
}

module.exports = { EmailVerificacao, RecuperaSenha };
