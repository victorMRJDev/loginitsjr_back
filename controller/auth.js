const {response} = require('express');
const {  User } = require('../models/User');
const bcrypt = require('bcryptjs');
const {generateJWT} = require('../helpers/jwt');

const addUser = async(req, res = response) => {

    const {name, email, password} = req.body;

    try{

        const usuario = new User(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);  
    
        await usuario.save();

        const token = await generateJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            msg: 'Registro',
            usuario,
            token
    });

    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const loginUser = async(req, res = response) => {
    
    const {email, password} = req.body;

    try{

        const usuario = await User.findOne({where: {email}});

        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }
        const token = await generateJWT(usuario.id, usuario.name);


        res.json({
            ok: true,
            msg: 'Login',
            id: usuario.id,
            name: usuario.name,
            email: usuario.email,
            token
        });

    }catch (error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }


}

module.exports = {
    addUser,
    loginUser
}