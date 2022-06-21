module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect"
    ],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    },
    globals: {
        API_ROOT: '/mvc/api',
        ROOT: '/mvc/'
    },
    testEnvironment: 'jsdom',
    moduleDirectories: ["node_modules", "src"],
    
};