declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'local' | 'sit' | 'development' | 'production';
            HEADLESS: string;
            SLOWMO: string;
            BASE_URL: string;
            TEST_USERNAME: string;
            TEST_PASSWORD: string;
            MY_VAR: string;
        }
    }
}

export {}