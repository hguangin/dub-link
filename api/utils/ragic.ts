import axios from "axios";
const RAGIC_URL = process.env.RAGIC_URL || "";
const RAGIC_AUTH = process.env.RAGIC_AUTH || "";

// 備份到 Ragic
export async function pushToRagic(link: any) {
  try {
    await axios.post(RAGIC_URL, link, {
      headers: { Authorization: RAGIC_AUTH }
    });
  } catch (e) {
    // 可加 retry 或記錄失敗
  }
}
