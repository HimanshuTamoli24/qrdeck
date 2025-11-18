
const env = {
    MONGODB_URI: process.env.MONGODB_URI,

    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL

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