export default function (inputString : string , key : string) {
    const characters = process.env.CHARS?.toString() as string;
    let encryptedString = '';
    for (let i = 0; i < inputString.length; i++) {
      const char = inputString.charAt(i);
      const charIndex = characters.indexOf(char);
      if (charIndex !== -1) { // Check if the character is in characters
        const keyChar = key.charCodeAt(i % key.length) % characters.length;
        const encryptedChar = (charIndex + keyChar) % characters.length;
        encryptedString += characters.charAt(encryptedChar);
      } else {
        // Handle characters not in characters string, you can skip or handle them as needed
        encryptedString += char;
      }
    }
    return encryptedString;
}