import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/redis"],
    moduleFileExtensions: ["ts", "js", "json"],
    moduleNameMapper: {
        "^@common/(.*)$": "<rootDir>/../../common/src/$1",
        "^@events/(.*)$": "<rootDir>/../../events/src/$1",
        "^@shared/(.*)$": "<rootDir>/$1",
    },
};

export default config;