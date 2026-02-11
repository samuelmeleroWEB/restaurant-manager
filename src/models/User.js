import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
    timestamps: true // Crea campos createdAt y updatedAt automáticamente
});

// Middleware para cifrar la contraseña antes de guardar
userSchema.pre('save', async function(next) {
    // Solo cifrar si la contraseña ha sido modificada (o es nueva)
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Método para comparar contraseñas en el login
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;