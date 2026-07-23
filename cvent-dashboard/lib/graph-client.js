const { ConfidentialClientApplication } = require('@azure/msal-node');

// 서버리스 함수가 "웜 스타트"로 재사용될 때 매번 새 토큰을 발급받지 않도록
// 모듈 스코프에 클라이언트를 한 번만 만들어 재사용합니다.
let msalClient = null;

function getMsalClient() {
  if (msalClient) return msalClient;

  const { MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET } = process.env;
  if (!MS_TENANT_ID || !MS_CLIENT_ID || !MS_CLIENT_SECRET) {
    throw new Error('MS_TENANT_ID / MS_CLIENT_ID / MS_CLIENT_SECRET 환경변수가 설정되지 않았습니다.');
  }

  msalClient = new ConfidentialClientApplication({
    auth: {
      clientId: MS_CLIENT_ID,
      authority: `https://login.microsoftonline.com/${MS_TENANT_ID}`,
      clientSecret: MS_CLIENT_SECRET,
    },
  });
  return msalClient;
}

// 앱 전용(App-only) 토큰 발급 (사용자 로그인 없이, 서버 대 서버 인증)
async function getGraphToken() {
  const client = getMsalClient();
  const result = await client.acquireTokenByClientCredential({
    scopes: ['https://graph.microsoft.com/.default'],
  });
  if (!result || !result.accessToken) {
    throw new Error('Graph API 토큰 발급에 실패했습니다.');
  }
  return result.accessToken;
}

// OneDrive/SharePoint 공유 링크(URL)를 Microsoft Graph의 Shares API가 요구하는
// "encoded sharing URL" 형식으로 변환합니다.
// 참고: https://learn.microsoft.com/graph/api/shares-get
function encodeSharingUrl(shareUrl) {
  const base64 = Buffer.from(shareUrl, 'utf-8').toString('base64');
  return 'u!' + base64.replace(/=+$/, '').replace(/\//g, '_').replace(/\+/g, '-');
}

// 공유 링크로부터 파일의 원본 바이트(엑셀 바이너리)를 직접 다운로드합니다.
async function downloadSharedFile(shareUrl) {
  const token = await getGraphToken();
  const encoded = encodeSharingUrl(shareUrl);

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/shares/${encoded}/driveItem/content`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Graph API 파일 다운로드 실패 (HTTP ${res.status}): ${text}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

module.exports = { downloadSharedFile, encodeSharingUrl };
