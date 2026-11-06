/**
 * Notion 데이터베이스 타입 정의
 * Game VFX Portfolio CMS에서 사용하는 Notion 데이터 구조
 */

export interface NotionProject {
  id: string;
  title: string;
  category: string | null;
  tools: string[];
  description: string;
  thumbnail: string | null;
  status: 'Draft' | 'Published' | 'Archived';
  createdAt: string;
  featured: boolean;
}

export interface NotionProjectRaw {
  id: string;
  object?: string;
  parent?: {
    type?: string;
    data_source_id?: string;
  };
  properties: {
    Name?: {
      id: string;
      type: 'title';
      title: Array<{ plain_text: string }>;
    };
    Category?: {
      id: string;
      type: 'select';
      select: { name: string } | null;
    };
    Tools?: {
      id: string;
      type: 'multi_select';
      multi_select: Array<{ name: string }>;
    };
    Description?: {
      id: string;
      type: 'rich_text';
      rich_text: Array<{ plain_text: string }>;
    };
    Thumbnail?: {
      id: string;
      type: 'files';
      files: Array<{ file?: { url: string }; external?: { url: string } }>;
    };
    Status?: {
      id: string;
      type: 'select';
      select: { name: string } | null;
    };
    CreatedAt?: {
      id: string;
      type: 'date';
      date: { start: string } | null;
    };
    Featured?: {
      id: string;
      type: 'checkbox';
      checkbox: boolean;
    };
  };
}

export interface NotionError {
  code: string;
  message: string;
  status?: number;
}
