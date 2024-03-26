import bcrypt from 'bcrypt'

const test = 'hehexd'

const encryptPwd = async (plainPwd) => {
  try {
    const hash = await bcrypt.hash(plainPwd, 12)
    return hash
  } catch (err) {
    throw new Error(err)
  }
}

const decryptPwd = async (encryptedPwd) => {
  // TODO
}
