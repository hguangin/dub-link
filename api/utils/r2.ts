// 這裡你可用 aws-sdk v3 相容 R2 實作，初版先保留空
export async function uploadToR2(file: Buffer, filename: string): Promise<string> {
  // 實作見下方補充
  return "https://pub-xxxx.r2.dev/" + filename;
}
