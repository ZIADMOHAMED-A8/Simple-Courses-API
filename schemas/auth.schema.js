const { z } = require('zod')
const roles = require('../utils/rolesArray')
const email = z.email({
    error: 'email is invalid'
})
const password = z.string({
    error: "please provide a password"
}).min(8, 'password must be at least 8 charachters')
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[^A-Za-z0-9]/, "Must contain a special character")
const signUpSchema = z.object({
    body: z.object({
        firstName: z.string({
            error: "firstName is required"
        }),
        lastName: z.string({
            error: "lastName is required"
        }),
        password,
        email,
        role: z.enum(Object.values(roles), 'role must be user,admin or manager')
    })
})
const loginSchema = z.object({
    body: z.object({
        email,
        password
    })
})

module.exports = {
    signUpSchema,
    loginSchema
}