import joi from 'joi';

export const choiceSchema = joi.object({
    title: joi.string().min(6).required(),
    pollId: joi.string()
})