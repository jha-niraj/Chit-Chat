const zod = require("zod");

const userSignUpSchema = zod.object({
    fullname: zod.string(),
    email: zod.string().email(),
    password: zod.string()
})
const userSignInSchema = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

module.exports = {
    userSignUpSchema,
    userSignInSchema
}