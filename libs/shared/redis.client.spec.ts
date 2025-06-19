import { createRedisClient } from "@shared/redis.client";

describe("Redis Client", () => {
    const client = createRedisClient();

    beforeAll(async () => {
        await client.connect();
    });

    afterAll(async () => {
        await client.quit();
    });

    it("should connect successfully", async () => {
        const pong = await client.ping();
        expect(pong).toBe("PONG");
    });

    it("should set and get a value", async () => {
        await client.set("test-key", "test-value");
        const value = await client.get("test-key");
        expect(value).toBe("test-value");
    });

    it("should delete a key", async () => {
        await client.set("temp-key", "123");
        await client.del("temp-key");
        const result = await client.get("temp-key");
        expect(result).toBeNull();
    });
});