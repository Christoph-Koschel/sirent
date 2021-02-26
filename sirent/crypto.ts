import crypto from "crypto";

export namespace Hashed {
    export function encode(text: string, password: string) {
        let key = crypto.createCipher('aes-128-cbc', password);
        let encodedString = key.update(text, 'utf8', 'hex')
        encodedString += key.final('hex');
        return encodedString;
    }

    export function decode(hash: string, password: string) {
        let key = crypto.createDecipher('aes-128-cbc', password);
        let decodedString = key.update(hash, 'hex', 'utf8')
        decodedString += key.final('utf8');
        return decodedString;
    }
}
