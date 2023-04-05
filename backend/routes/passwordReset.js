const Usuario = require("../models/user");
const Token = require("../models/token");
const sendEmail = require("../controllers/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const router = require("express").Router();
const mongoose = require('mongoose');
const bitacora = require("../controllers/bitacora");

//Enviar email de reset de contraseña
router.post("/", async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await Usuario.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("Usuario con el email indicado no existe");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        //Quemado de momento, falta definirlo como variable de ambiente. 
        const link = `http://localhost:3000/reset-password?id=${user._id}&token=${token.token}`;
        await sendEmail(user.email, "Reestablecimiento de contraseña Liceo Diurno de Guararí", "Para reestablecer su contraseña por favor haga click en el siguiente enlace: "+"\n"+link);

        res.send("Enlace de restablecimiento de contraseña enviado a su cuenta de correo electrónico");
    } catch (error) {
        console.log("Falló el envío del enlace de restablecimiento de contraseña a su correo electrónico");
        res.send("Falló el envío del enlace de restablecimiento de contraseña a su correo electrónico");
        console.log(error);
    }
});

// verificar link de pass reset
router.get("/:userId/:token", async (req, res) => {
	try {
		const user = await Usuario.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Enlace invalido" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Enlace invalido" });

		res.status(200).send("URL Valida");
	} catch (error) {
		res.status(500).send({ message: "Error interno de servidor" });
	}
});


router.post("/:userId/:token", async (req, res) => {
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await Usuario.findOne(_id = mongoose.Types.ObjectId (req.params.userId)  );
        if (!user) {
            bitacora.log('error', "Usuario al que se desea reestablecer la contraseña no encontrado");
            console.log('error', "Usuario al que se desea reestablecer la contraseña no encontrado");
            return res.status(400).send("Usuario no encontrado");
        }

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Link invalido o expirado");

        user.password = req.body.password;
        await user.save();
        await token.delete();

        res.send("Contraseña reestablecida exitosamente.");
    } catch (error) {
        bitacora.log('error', "Falló el reestablecimiento de contraseña");
        res.send('error', "Falló el reestablecimiento de contraseña");
        console.log(error);
    }
});

module.exports = router;