import jsonWebToken from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const signToken = async (user) => {
  const sign = jsonWebToken.sign(
    {
      id: user._id
    },
    JWT_SECRET,
    {
      expiresIn: '10s'
    }
  )

  return sign
}

export const verifyToken = async (token) => {
  try {
    const verify = jsonWebToken.verify(token, JWT_SECRET)

    if (!verify) {
      return null
    }

    return verify
  } catch (error) {
    return null
  }
}
