import { Request, Response } from "express";
import prisma from "../models/prisma";
import { uploadToR2 } from "../utils/r2";
import { pushToRagic } from "../utils/ragic";

// 新增短碼（支援單筆或批次）
export const createLinks = async (req: Request, res: Response) => {
  const links = Array.isArray(req.body) ? req.body : [req.body];
  const result = [];
  for (const item of links) {
    const link = await prisma.shortLink.create({
      data: {
        shortCode: item.shortCode || genShortCode(),
        targetUrl: item.targetUrl,
        ogTitle: item.ogTitle,
        ogDescription: item.ogDescription,
        ogImageUrl: item.ogImageUrl,
        expireAt: item.expireAt ? new Date(item.expireAt) : undefined,
      }
    });
    await pushToRagic(link);
    result.push(link);
  }
  res.json({ data: result });
};

// 查詢短碼
export const getLink = async (req: Request, res: Response) => {
  const { shortCode } = req.params;
  const link = await prisma.shortLink.findUnique({ where: { shortCode } });
  if (!link) return res.status(404).json({ error: "Not found" });
  res.json(link);
};

// 編輯短碼
export const updateLink = async (req: Request, res: Response) => {
  const { shortCode } = req.params;
  const data = req.body;
  const link = await prisma.shortLink.update({
    where: { shortCode },
    data: {
      ...data,
      expireAt: data.expireAt ? new Date(data.expireAt) : undefined,
    }
  });
  await pushToRagic(link);
  res.json(link);
};

// 點擊統計
export const getStats = async (req: Request, res: Response) => {
  const { shortCode } = req.params;
  const link = await prisma.shortLink.findUnique({
    where: { shortCode },
    include: { clicks: true }
  });
  if (!link) return res.status(404).json({ error: "Not found" });
  res.json({ stats: link.clicks });
};

// 刪除短碼
export const deleteLink = async (req: Request, res: Response) => {
  const { shortCode } = req.params;
  await prisma.shortLink.delete({ where: { shortCode } });
  res.json({ success: true });
};

// 工具：短碼產生
function genShortCode(length = 7) {
  return Math.random().toString(36).substr(2, length);
}
