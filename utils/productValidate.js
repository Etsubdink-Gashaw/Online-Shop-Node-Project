import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  description: Joi.string().max(500).optional(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().min(0).default(0),
  category: Joi.string().max(50).required(),
  imageUrl: Joi.string().uri().optional(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  description: Joi.string().trim().max(500).optional(),
  price: Joi.number().min(0).optional(),
  stock: Joi.number().min(0).default(0),
  category: Joi.string().max(50).optional(),
  imageUrl: Joi.string().uri().optional(),
});

