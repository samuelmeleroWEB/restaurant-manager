import User from "../models/user.js";
import jwt from 'jsonwebtoken';

export const registerUser = async (userData) => {
    const { email, password, role } = userData;

    // 1. Validar campos obligatorios
    if (!email || !password) {
        const error = new Error("Email y contraseña son obligatorios");
        error.statusCode = 400;
        throw error;
    }

    // 2. Validar email duplicado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = new Error("El email ya está registrado");
        error.statusCode = 400;
        throw error;
    }

    // 3. Crear usuario
    const newUser = new User({ email, password, role });
    return await newUser.save();
};

export const loginUser = async (email, password) => {
    // 1. ¿Existe el usuario?
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error("Credenciales inválidas");
        error.statusCode = 401;
        throw error;
    }

    // 2. ¿La contraseña coincide?
    const isMatch = await user.verifyPassword(password);
    if (!isMatch) {
        const error = new Error("Credenciales inválidas");
        error.statusCode = 401;
        throw error;
    }

    // 3. Crear el Token
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );

    return {
        token,
        user: { email: user.email, role: user.role }
    };
};