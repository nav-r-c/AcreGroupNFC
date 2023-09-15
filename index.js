const ENCRYPT_KEY = "a!+@_#)$(%*^&C^&%*$(#)@_!+r!+@_#)$(%*^&E^&%*$(#)@_!+1!+@_#)$(%*^&2^&%*$(#)@_!+3!+@_#)$(%*^&G^&%*$(#)@_!+r!+@_#)$(%*^&O^&%*$(#)@_!+u!+@_#)$(%*^&P^&%*$(#)@_!+"

function customEncrypt(inputString, key) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";
    let encryptedString = '';
    for (let i = 0; i < 12; i++) {
        const charIndex = i < inputString.length ? inputString.charCodeAt(i) % characters.length : 0;
        const keyChar = key.charCodeAt(i % key.length) % characters.length;
        const encryptedChar = (charIndex + keyChar) % characters.length;
        encryptedString += characters.charAt(encryptedChar);
    }

    return encryptedString;
}

console.log(customEncrypt("ABC123", ENCRYPT_KEY))