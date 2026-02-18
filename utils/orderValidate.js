import Joi from "joi";

const objectId = Joi.string().hex().length(24);

const orderItemSchema = Joi.object({
  product: objectId.required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().min(0).required(),
});

const customerSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  address: Joi.string().max(300).required(),
});


export const fullOrderSchema = Joi.object({
  items: Joi.array().items(orderItemSchema).min(1).required(),
  total: Joi.number().min(0).required(),
  customer: customerSchema.required(),
  orderDate: Joi.date().optional(),
});


export const clientCreateOrderSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  address: Joi.string().max(300).required(),
});


export const createOrderSchema = Joi.alternatives().try(
  clientCreateOrderSchema,
  fullOrderSchema
);


