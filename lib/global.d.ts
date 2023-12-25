declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV?: string;
        readonly SECRET?: string;
        readonly POSTGRES_PRISMA_URL?: string;
        readonly POSTGRES_URL_NON_POOLING?: string;
        readonly JWTSECRET?: string;
    }
}