import { createClient } from "redis";

export function createRedisClient(): ReturnType<typeof createClient> {
    const client = createClient({
        url: process.env.REDIS_URL || "redis://localhost:6379",
    });

    client.on("error", (err) => console.error("Redis Client Error", err));

    return client;
}