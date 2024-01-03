import * as path from 'path';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

function setEnv() {
    const NODE_ENV = (process.env.NODE_ENV) ?? 'local';
    const envFileName = `.env.${NODE_ENV}`;
    const envFilePath = `${path.resolve('./')}/${envFileName}`;
    return dotenvExpand.expand(dotenv.config({ path: envFilePath }));
}

const myEnv = setEnv();

export default myEnv;
