import bcrypt from "bcrypt"

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;


    } catch (err) {
        console.log(`Error While Hashing The Password ${err}`)
    }
}

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}