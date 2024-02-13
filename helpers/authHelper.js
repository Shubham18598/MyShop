import bcrypt from 'bcrypt'

//1st function for hash karke incript karne ke liye

export const hashPassword =async (password)=>{
    try {
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(password,saltRounds)
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
}

//2nd for comparre karke decript karne ke liye

export const comparePassword = async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword)
}