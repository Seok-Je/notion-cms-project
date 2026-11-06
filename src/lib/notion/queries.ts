/**
 * Notion API 쿼리 함수
 * 프로젝트 데이터 조회 및 변환
 *
 * Note: Database Query API는 작동하지 않으므로 Pages API + Search를 사용합니다.
 */

import { NotionProject, NotionProjectRaw } from '@/types/notion';

/**
 * Notion 페이지의 원본 데이터를 표준 형식으로 변환
 */
function transformNotionProject(raw: NotionProjectRaw): NotionProject {
  const props = raw.properties;

  const title = props.Name?.title?.[0]?.plain_text || 'Untitled';
  const category = props.Category?.select?.name || null;
  const tools = props.Tools?.multi_select?.map((t) => t.name) || [];
  const description = props.Description?.rich_text?.[0]?.plain_text || '';
  const status = (props.Status?.select?.name || 'Draft') as
    | 'Draft'
    | 'Published'
    | 'Archived';
  const featured = props.Featured?.checkbox || false;

  // Thumbnail 이미지 URL 추출
  let thumbnail: string | null = null;
  const files = props.Thumbnail?.files;
  if (files && files.length > 0) {
    const file = files[0];
    thumbnail = file.file?.url || file.external?.url || null;
  }

  // 생성 날짜 (ISO 형식)
  const createdAt = props.CreatedAt?.date?.start || new Date().toISOString();

  return {
    id: raw.id,
    title,
    category,
    tools,
    description,
    thumbnail,
    status,
    createdAt,
    featured,
  };
}

/**
 * Search API를 사용하여 Database의 모든 페이지 조회
 */
async function searchDatabasePages(): Promise<NotionProjectRaw[]> {
  const url = 'https://api.notion.com/v1/search';
  const headers = {
    Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
    'Notion-Version': '2025-09-03',
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({
    filter: {
      value: 'page',
      property: 'object',
    },
    sort: {
      direction: 'descending',
      timestamp: 'last_edited_time',
    },
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status}`);
    }

    const data = await response.json();
    const results = (data.results || []) as NotionProjectRaw[];

    // Database에 속한 페이지만 필터링
    return results.filter((page) => page.parent?.data_source_id);
  } catch (error) {
    console.error('Failed to search database pages:', error);
    throw error;
  }
}

/**
 * Published 상태의 모든 프로젝트 조회
 */
export async function getPublishedProjects(): Promise<NotionProject[]> {
  try {
    const pages = await searchDatabasePages();

    // Status 필터링 및 변환
    return pages
      .filter((page) => {
        const status = page.properties?.Status?.select?.name;
        return status === 'Published';
      })
      .sort((a, b) => {
        const dateA = a.properties?.CreatedAt?.date?.start || '';
        const dateB = b.properties?.CreatedAt?.date?.start || '';
        return dateB.localeCompare(dateA); // 최신순
      })
      .map((item) => transformNotionProject(item));
  } catch (error) {
    console.error('Failed to fetch published projects:', error);
    throw error;
  }
}

/**
 * Featured 프로젝트만 조회 (홈 페이지용)
 */
export async function getFeaturedProjects(): Promise<NotionProject[]> {
  try {
    const pages = await searchDatabasePages();

    // Status + Featured 필터링
    return pages
      .filter((page) => {
        const status = page.properties?.Status?.select?.name;
        const featured = page.properties?.Featured?.checkbox;
        return status === 'Published' && featured === true;
      })
      .sort((a, b) => {
        const dateA = a.properties?.CreatedAt?.date?.start || '';
        const dateB = b.properties?.CreatedAt?.date?.start || '';
        return dateB.localeCompare(dateA); // 최신순
      })
      .map((item) => transformNotionProject(item));
  } catch (error) {
    console.error('Failed to fetch featured projects:', error);
    throw error;
  }
}

/**
 * 특정 프로젝트 ID로 상세 정보 조회
 * Search API 캐시를 먼저 확인한 후 Pages API 사용
 */
export async function getProjectById(
  projectId: string
): Promise<NotionProject | null> {
  try {
    // 1. Search API에서 모든 프로젝트를 조회하고 ID 매칭
    const pages = await searchDatabasePages();
    const matchedPage = pages.find((p) => p.id === projectId);

    if (matchedPage) {
      // Status가 Published인지 확인
      const status = matchedPage.properties?.Status?.select?.name;
      if (status === 'Published') {
        return transformNotionProject(matchedPage);
      }
      // Published가 아니면 null 반환
      return null;
    }

    // 2. Search API에서 찾지 못하면 Pages API 직접 호출
    console.warn(`Project ${projectId} not found in search, trying direct API call`);

    const response = await fetch(
      `https://api.notion.com/v1/pages/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
          'Notion-Version': '2025-09-03',
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Direct API call failed for ${projectId}: ${response.status}`
      );
      return null;
    }

    const data = await response.json();
    const project = transformNotionProject(data as NotionProjectRaw);

    // Published 상태만 반환
    if (project.status === 'Published') {
      return project;
    }

    return null;
  } catch (error) {
    console.error(`Failed to fetch project ${projectId}:`, error);
    return null;
  }
}

/**
 * 고유한 카테고리 목록 조회 (필터링용)
 */
export async function getCategories(): Promise<string[]> {
  try {
    const projects = await getPublishedProjects();
    const categories = new Set(
      projects
        .filter((p) => p.category !== null)
        .map((p) => p.category as string)
    );
    return Array.from(categories).sort();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

/**
 * 고유한 도구 목록 조회 (필터링용)
 */
export async function getTools(): Promise<string[]> {
  try {
    const projects = await getPublishedProjects();
    const tools = new Set<string>();
    projects.forEach((p) => {
      p.tools.forEach((tool) => tools.add(tool));
    });
    return Array.from(tools).sort();
  } catch (error) {
    console.error('Failed to fetch tools:', error);
    return [];
  }
}

/**
 * 최근 프로젝트 조회 (제한된 개수)
 */
export async function getMostRecentProjects(
  limit: number = 6
): Promise<NotionProject[]> {
  try {
    const projects = await getPublishedProjects();
    return projects.slice(0, limit);
  } catch (error) {
    console.error('Failed to fetch recent projects:', error);
    throw error;
  }
}
