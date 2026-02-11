import User from "../models/user.js";


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