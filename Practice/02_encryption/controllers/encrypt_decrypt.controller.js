import { encrypt, decrypt } from "../utils/encrypt_decrypt.js";

export default {
  encryptText: (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const encryptedData = encrypt(text);
    res.json({ encryptedData });
  },

  decryptText: (req, res) => {
    const { encryptedData } = req.body;
    if (!encryptedData)
      return res.status(400).json({ error: "Encrypted data is required" });

    const decryptedText = decrypt(encryptedData);
    res.json({ decryptedText });
  },
};
