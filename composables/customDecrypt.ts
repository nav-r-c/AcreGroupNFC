export default function (encryptedString : string, key : string) {
    const characters = process.env.CHARS?.toString() as string;
    let decryptedString = '';
    for (let i = 0; i < encryptedString.length; i++) {
      const char = encryptedString.charAt(i);
      const charIndex = characters.indexOf(char);
      if (charIndex !== -1) { // Check if the character is in characters
        const keyChar = key.charCodeAt(i % key.length) % characters.length;
        const decryptedChar = (charIndex - keyChar + characters.length) % characters.length;
        decryptedString += characters.charAt(decryptedChar);
      } else {
        // Handle characters not in characters string, you can skip or handle them as needed
        decryptedString += char;
      }
    }
    return decryptedString;
}