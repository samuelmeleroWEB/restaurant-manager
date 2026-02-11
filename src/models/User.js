import mongoose from 'mongoose';
import { hashPassword, comparePassword } from '../utils/auth.js'; // Importamos tus nuevas funciones

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: 6
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'camarero', 'cocina'],
            message: '{VALUE} no es un rol válido'
        },
        default: 'camarero'
    }
}, {
    timestamps: true
});

// Middleware: Se ejecuta antes de guardar en la DB
userSchema.pre('save', async function() {
    // Si la contraseña no ha cambiado, no hacemos nada
    if (!this.isModified('password')) return;

    try {
        // Usamos tu función de utils
        this.password = await hashPassword(this.password);
        // NO llamamos a next(), la función async se resuelve sola
    } catch (error) {
        // En caso de error, puedes relanzarlo
        throw error;
    }
});

// Método para usar en el Login
userSchema.methods.verifyPassword = async function(candidatePassword) {
    // Usamos tu función de utils comparando lo que envía el usuario 
    // con la contraseña cifrada de este documento (this.password)
    return await comparePassword(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;