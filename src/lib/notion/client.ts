/**
 * Notion API 클라이언트 초기화
 * 서버 전용 모듈 - 클라이언트 코드에서 사용 불가
 */

import { Client } from '@notionhq/client';

const notionToken = process.env.NOTION_TOKEN;

if (!notionToken) {
  throw new Error('NOTION_TOKEN environment variable is not set');
}

export const notion = new Client({
  auth: notionToken,
});

export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || '';
export const NOTION_DATA_SOURCE_ID = process.env.NOTION_DATA_SOURCE_ID || '';

if (!NOTION_DATABASE_ID) {
  throw new Error('NOTION_DATABASE_ID environment variable is not set');
}

if (!NOTION_DATA_SOURCE_ID) {
  throw new Error('NOTION_DATA_SOURCE_ID environment variable is not set');
}
