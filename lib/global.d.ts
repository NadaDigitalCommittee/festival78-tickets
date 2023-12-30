/* eslint-disable no-unused-vars */
declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV?: string;
        readonly SECRET: string;
        readonly POSTGRES_PRISMA_URL: string;
        readonly POSTGRES_URL_NON_POOLING: string;
        readonly JWTSECRET: string;
        readonly MICROCMS_API_KEY:string;
        readonly MICROCMS_SERVICE_DOMAIN:string;
    }
}