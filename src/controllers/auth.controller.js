import * as authService from "../services/auth.service.js";
import User from '../models/user.js';
export const register = async (req, res) => {
    try {
        const newUser = await authService.registerUser(req.body);
        res.status(201).json({ 
            message: "Usuario registrado con éxito", 
            userId: newUser._id 
        });
    } catch (error) {
        // Usamos el statusCode que definimos en el servicio o 500 por defecto
        res.status(error.statusCode || 500).json({ 
            message: error.message 
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser(email, password);
        
        res.status(200).json({
            message: "Login exitoso",
            ...result
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ 
            message: error.message 
        });
    }
};
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // El '-password' es para no enviar las contraseñas
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};