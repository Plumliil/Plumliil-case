// 生成随机的16字节（128位）密钥和初始化向量
const key = new Uint8Array(16);
const iv = new Uint8Array(16);
crypto.getRandomValues(key);
crypto.getRandomValues(iv);

// 将密钥和初始化向量转换为十六进制字符串
const keyHex = Array.from(key)
  .map((byte) => byte.toString(16).padStart(2, "0"))
  .join("");
const ivHex = Array.from(iv)
  .map((byte) => byte.toString(16).padStart(2, "0"))
  .join("");

console.log("随机生成的密钥：", keyHex);
console.log("随机生成的初始化向量：", ivHex);
