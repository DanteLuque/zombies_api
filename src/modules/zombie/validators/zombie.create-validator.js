import Joi from 'joi';

// Esquema de validación para crear un nuevo zombie
export const createZombieSchema = Joi.object({
    nombre: Joi.string()
        .max(70)
        .required()
        .messages({
            'string.empty': 'El nombre no puede estar vacío',
            'string.max': 'El nombre no puede exceder los 70 caracteres',
            'any.required': 'El nombre es obligatorio'
        }),
    descripcion: Joi.string()
        .allow(null, '')
        .optional()
        .max(500)
        .messages({
            'string.max': 'La descripción no puede exceder los 500 caracteres'
        }),
    origenId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'El ID del origen debe ser un número entero positivo',
            'number.positive': 'El ID del origen debe ser mayor a 0',
            'any.required': 'El ID del origen es obligatorio'
        }),
    velocidad: Joi.number()
        .integer()
        .min(0)
        .max(10)
        .required()
        .messages({
            'number.base': 'La velocidad debe ser un número entero',
            'number.min': 'La velocidad no puede ser menor que 0',
            'number.max': 'La velocidad no puede exceder 10',
            'any.required': 'La velocidad es obligatoria'
        }),
    fuerza: Joi.number()
        .integer()
        .min(0)
        .max(10)
        .required()
        .messages({
            'number.base': 'La fuerza debe ser un número entero',
            'number.min': 'La fuerza no puede ser menor que 0',
            'number.max': 'La fuerza no puede exceder 10',
            'any.required': 'La fuerza es obligatoria'
        }),
    resistencia: Joi.number()
        .integer()
        .min(0)
        .max(10)
        .required()
        .messages({
            'number.base': 'La resistencia debe ser un número entero',
            'number.min': 'La resistencia no puede ser menor que 0',
            'number.max': 'La resistencia no puede exceder 10',
            'any.required': 'La resistencia es obligatoria'
        }),
    humanidad: Joi.number()
        .integer()
        .min(0)
        .max(10)
        .required()
        .messages({
            'number.base': 'La humanidad debe ser un número entero',
            'number.min': 'La humanidad no puede ser menor que 0',
            'number.max': 'La humanidad no puede exceder 10',
            'any.required': 'La humanidad es obligatoria'
        })
});
