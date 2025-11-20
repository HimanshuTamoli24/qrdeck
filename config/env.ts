
const env = {
    MONGODB_URI: process.env.MONGODB_URI as string,

    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY as string,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY as string,
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT as string,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,

    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET as string,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL as string

}

const isServer = typeof window === 'undefined';

for (const [key, value] of Object.entries(env)) {
    if (!value) {
        if (isServer) {
            console.error(`Missing environment variable: ${key}`);
            throw new Error(`Missing environment variable: ${key}`);
        } else {
            console.warn(`Skipping missing env var on client: ${key}`);
        }
    }
}

export default env