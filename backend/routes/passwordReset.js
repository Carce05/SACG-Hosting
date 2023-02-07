const Usuario = require("../models/user");
const Token = require("../models/token");
const sendEmail = require("../controllers/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

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
        const link = `http://localhost:3000/reset-password/${user._id}/${token.token}`;
        await sendEmail(user.email, "Reestablecimiento de contraseña Liceo Diurno de Guararí", link);

        res.send("Enlace de restablecimiento de contraseña enviado a su cuenta de correo electrónico");
    } catch (error) {
        res.send("Ocurrió un error");
        console.log(error);
    }
});

router.post("/:userId/:token", async (req, res) => {
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await Usuario.findById(req.params.userId);
        if (!user) return res.status(400).send("Link invalido o expirado");

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
        res.send("Ocurrió un error");
        console.log(error);
    }
});

module.exports = router;