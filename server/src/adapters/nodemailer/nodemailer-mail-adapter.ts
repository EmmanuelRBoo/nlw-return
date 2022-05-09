import { MailAdapter, SendMailData } from '../mail-adapter';
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: "00a563ffab6578",
    pass: "92446d0b2b874e"
  }
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Emmanuel Boo <EmmanuelRodriguesBoo@gmail.com>',
      subject,
      html: body,
    })
  }
}