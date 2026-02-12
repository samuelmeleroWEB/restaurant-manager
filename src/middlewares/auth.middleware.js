import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Espera "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({ message: "No hay token, autorización denegada" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Guardamos los datos del usuario (id, rol) en la petición
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};

export const isAdmin = (req, res, next) => {
    // req.user viene del middleware anterior (authRequired)
    if (req.user && req.user.role === 'admin') {
        next(); // Es admin, adelante
    } else {
        return res.status(403).json({ message: "Acceso denegado: Se requieren permisos de administrador" });
    }
};