const nodemailer = require("nodemailer");
const bitacora = require("./bitacora");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
        
            service: "Outlook365",
            port: 465,
            secure: true,
            auth: {
                user: "liceodiurnoguarari@outlook.com",
                pass: "Qwe!234LDG",
            },
            tls: {
                ciphers:'SSLv3'
            }
        });

        await transporter.sendMail({
            from: "liceodiurnoguarari@outlook.com",
            to: email,
            subject: subject,
            text: text,
        });
        tls: {
        ciphers:'SSLv3'
    }
        console.log('info',"Correo de reestablecimiento de contraseña enviado exitosamente");
        bitacora.log('info',"Correo de reestablecimiento de contraseña enviado exitosamente");
    } catch (error) {
        bitacora.log('error', "Fallo en el envío del email");
        console.log('error', "Fallo en el envío del email");
    }
};

module.exports = sendEmail;