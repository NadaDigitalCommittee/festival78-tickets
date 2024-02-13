/* eslint-disable no-unused-vars */
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV?: string;
    readonly SECRET: string;
    readonly CLUB_SECRET: string;
    readonly ADMIN_SECRET: string;
    readonly DB_SITE: string;
    readonly POSTGRES_PRISMA_URL: string;
    readonly POSTGRES_URL_NON_POOLING: string;
    readonly JWTSECRET: string;
    readonly MICROCMS_API_KEY: string;
    readonly MICROCMS_SERVICE_DOMAIN: string;
    readonly NEXT_PUBLIC_ADOBE_FONT_ID: string;
  }
}
