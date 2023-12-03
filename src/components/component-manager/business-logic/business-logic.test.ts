import { describe, test, expect } from "vitest";
import { getAllDocuments, generateCodeChallenge, generateRandomString } from "./appRequest";

describe('Testing Asynchronous Functions', () => {
    test('getAllDocumentsTest', async () => {
        return getAllDocuments().then(data => {
            expect(data).toBeDefined();
        })
    });

    test('generateCodeChallenge', async () => {

        const verifier = generateRandomString(16);

        expect(verifier.length).toBe(16);

        return generateCodeChallenge(verifier).then(data => 
            expect(data).toBeDefined()
        )
    });

});