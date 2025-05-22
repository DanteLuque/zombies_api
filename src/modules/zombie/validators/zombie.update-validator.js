import Joi from 'joi';

export const updateZombieSchema = Joi.object({
    nombre: Joi.string()
        .max(70)
        .optional()
        .messages({
            'string.max': 'El nombre no puede exceder los 70 caracteres'
        }),
    descripcion: Joi.string()
        .allow(null, '')
        .optional()
        .messages({
            'string.max': 'La descripción no puede exceder los 65,535 caracteres'
        }),
    origenId: Joi.number()
        .integer()
        .positive()
        .optional()
        .messages({
            'number.base': 'El ID del origen debe ser un número entero positivo',
            'number.positive': 'El ID del origen debe ser mayor a 0'
        }),
    velocidad: Joi.number()
        .integer()
        .min(0)
        .max(10)
        .optional()
        .messages({
            'number.base': 'La velocidad debe ser un número entero',
            'number.min': 'La velocidad no puede ser menor que 0',
            'number.max': 'La velocidad no puede exceder 10'
        }),
    fuerza: Joi.number()
        .integer()
        .min(0)
        .max(10)
        .optional()
        .messages({
            'number.base': 'La fuerza debe ser un número entero',
            'number.min': 'La fuerza no puede ser menor que 0',
            'number.max': 'La fuerza no puede exceder 10'
        }),
    resistencia: Joi.number()
        .integer()
        .min(0)
        .max(10)
        .optional()
        .messages({
            'number.base': 'La resistencia debe ser un número entero',
            'number.min': 'La resistencia no puede ser menor que 0',
            'number.max': 'La resistencia no puede exceder 10'
        }),
    humanidad: Joi.number()
        .integer()
        .min(0)
        .max(10)
        .optional()
        .messages({
            'number.base': 'La humanidad debe ser un número entero',
            'number.min': 'La humanidad no puede ser menor que 0',
            'number.max': 'La humanidad no puede exceder 10'
        })
});