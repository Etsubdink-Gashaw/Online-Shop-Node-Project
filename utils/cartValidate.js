import Joi from "joi";

const objectId = Joi.string().hex().length(24);

 export const addToCartSchema = Joi.object({
  productId: objectId.required(),
  quantity: Joi.number().integer().min(1).default(1),
});

export const updateCartSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: objectId.required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(0)
    .required(),
});

export const removeFromCartSchema = Joi.object({
  productId: objectId.required(),
});



