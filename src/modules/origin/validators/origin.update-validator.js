import Joi from 'joi';

export const updateOriginSchema = Joi.object({
    origen: Joi.string()
        .max(70)
        .required()
        .messages({
            'string.empty': 'El campo origen no puede estar vacío',
            'string.max': 'El campo origen no puede exceder los 70 caracteres',
            'any.required': 'El campo origen es obligatorio'
        })
});