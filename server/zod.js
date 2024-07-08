import zod from "zod";

export const userSignUpSchema = zod.object({
    fullname: zod.string(),
    email: zod.string().email(),
    password: zod.string()
})
export const userSignInSchema = zod.object({
    email: zod.string().email(),
    password: zod.string()
})
