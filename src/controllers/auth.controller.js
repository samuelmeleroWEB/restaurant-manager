import User from "../models/user.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // 1. Validar que no falten datos
        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son obligatorios" });
        }

        // 2. Validar email duplicado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El email ya está registrado" });
        }

        // 3. Crear usuario (el modelo cifra la clave automáticamente con el pre-save)
        const newUser = new User({ email, password, role });
        await newUser.save();

        res.status(201).json({ message: "Usuario registrado con éxito", userId: newUser._id });

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. ¿Existe el usuario?
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas" }); // No decimos cuál para no dar pistas a hackers
        }

        // 2. ¿La contraseña coincide? (Usamos el método del modelo)
        const isMatch = await user.verifyPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        // 3. Crear el Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'clave_secreta_provisional',
            { expiresIn: '8h' } // El ticket dura 8 horas
        );

        // 4. Responder (Sin la contraseña)
        res.json({
            message: "Login exitoso",
            token,
            user: {
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Error en el login", error: error.message });
    }
};