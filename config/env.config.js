import { config } from "dotenv";
import { num, cleanEnv, str } from "envalid";

config()

const env = cleanEnv(process.env, {
    PORT: num(),
    TOKEN: str()
})

export default env
