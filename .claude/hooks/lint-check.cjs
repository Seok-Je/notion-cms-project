#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

/**
 * Claude Code Hook: TypeScript/TSX 파일 자동 ESLint 검사
 * 이벤트: PostToolUse (Edit, Write)
 * 목적: 파일 수정 후 자동으로 ESLint 검사 실행
 */

let input = '';

// stdin에서 JSON 데이터 읽기
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => {
  input += chunk;
});

process.stdin.on('end', async () => {
  try {
    // stdin이 비어있으면 종료
    if (!input.trim()) {
      process.exit(0);
    }

    const data = JSON.parse(input);
    const filePath = data.tool_input?.file_path;

    // file_path가 없으면 종료
    if (!filePath) {
      process.exit(0);
    }

    const projectRoot = process.cwd();

    // 파일 경로 정규화 (Windows 경로 지원)
    const normalizedPath = filePath.replace(/\\/g, path.sep);
    const absolutePath = path.resolve(projectRoot, normalizedPath);

    // 1. 프로젝트 내부 파일만 검사
    if (!absolutePath.startsWith(projectRoot)) {
      process.exit(0);
    }

    // 2. TypeScript/TSX 파일만 검사
    if (!/\.(ts|tsx)$/.test(absolutePath)) {
      process.exit(0);
    }

    // 3. node_modules, .next, .claude 폴더 제외
    const excludePatterns = [
      /[\\\/]node_modules[\\\/]/,
      /[\\\/]\.next[\\\/]/,
      /[\\\/]\.claude[\\\/]/,
      /[\\\/]dist[\\\/]/,
      /[\\\/]build[\\\/]/
    ];

    if (excludePatterns.some(pattern => pattern.test(absolutePath))) {
      process.exit(0);
    }

    // 4. 파일 존재 확인
    if (!fs.existsSync(absolutePath)) {
      process.exit(0);
    }

    // 5. 무한 반복 방지: Hook 자신이 실행 중이면 다시 실행하지 않기
    if (process.env.CLAUDE_LINT_CHECK_RUNNING === '1') {
      process.exit(0);
    }

    // ESLint 실행
    runESLint(absolutePath, projectRoot);

  } catch (error) {
    console.error('❌ Hook 실행 오류:', error.message);
    process.exit(0);
  }
});

/**
 * ESLint 실행 함수
 */
function runESLint(filePath, projectRoot) {
  const relativeFilePath = path.relative(projectRoot, filePath);

  // 환경 변수로 무한 반복 방지
  const env = {
    ...process.env,
    CLAUDE_LINT_CHECK_RUNNING: '1'
  };

  const eslint = spawn('npx', ['eslint', filePath, '--max-warnings', '0'], {
    cwd: projectRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
    env: env,
    timeout: 10000
  });

  let stdout = '';
  let stderr = '';

  eslint.stdout.on('data', (data) => {
    stdout += data.toString();
  });

  eslint.stderr.on('data', (data) => {
    stderr += data.toString();
  });

  eslint.on('close', (code) => {
    // code 0: 성공
    if (code === 0) {
      // 성공 메시지는 출력하지 않음 (조용히 통과)
    }
    // code 1: ESLint 에러 발견
    else if (code === 1) {
      console.log(`\n📋 ESLint 검사 결과: ${relativeFilePath}`);
      if (stdout) {
        console.log(stdout);
      }
    }
    // 기타 코드: ESLint 실행 오류
    else if (code !== null) {
      console.log(`\n⚠️  ESLint 실행 오류 (코드: ${code})`);
      if (stderr) {
        console.log(stderr);
      }
    }

    process.exit(0);
  });

  eslint.on('error', (error) => {
    console.error('❌ ESLint 실행 실패:', error.message);
    process.exit(0);
  });

  // 타임아웃 처리
  setTimeout(() => {
    eslint.kill();
    process.exit(0);
  }, 10000);
}
