# Cvent 대시보드 — Vercel 배포 가이드

OneDrive에 있는 `CVENT 일정표.xlsx`를 서버(Vercel)가 직접, 실시간으로 읽어와서
브라우저에는 가공된 JSON만 내려주는 구조입니다. Power Automate 없이도 동작합니다
(엑셀을 저장하는 즉시 — 정확히는 대시보드가 새로고침될 때마다 — 최신 값을 읽어옵니다).

```
[CVENT 일정표.xlsx] --(Microsoft Graph API, 서버 인증)--> [Vercel: /api/cvent.json] --> [Dashboard]
```

---

## 0. 준비물

- Node.js 18 이상 설치 (https://nodejs.org 에서 LTS 버전 설치)
- GitHub 계정
- Vercel 계정 (https://vercel.com , GitHub 계정으로 가입 가능)
- 회사 Microsoft 365 관리자 권한이 있는 사람(또는 협조받을 IT 담당자) — 1번 단계에서 필요

터미널(맥: 터미널 / 윈도우: PowerShell 또는 명령 프롬프트)에서 아래 확인:

```bash
node -v
npm -v
```

---

## 1. Azure AD(Entra ID) 앱 등록 — Excel을 읽을 권한 만들기

이 링크(`https://teamskorea09.sharepoint.com/:x:/s/teams/...`)는 **로그인한 사람만 볼 수 있는 사설 링크**라서,
서버가 이걸 그냥 GET 요청으로 열 수는 없습니다. 그래서 "이 앱은 우리 회사 Microsoft 365 데이터를 읽어도 된다"는
권한을 미리 등록해줘야 합니다. 한 번만 하면 됩니다.

1. 브라우저에서 `https://entra.microsoft.com` 접속 → 회사 관리자 계정으로 로그인
2. 왼쪽 메뉴 **"ID(Identity)" → "애플리케이션" → "앱 등록"** 클릭
3. 상단 **"새 등록(New registration)"** 클릭
4. 입력:
   - **이름**: `Cvent Dashboard`
   - **지원되는 계정 유형**: "이 조직 디렉터리에 있는 계정만" 선택
   - 리디렉션 URI: 비워둠
5. **"등록(Register)"** 클릭
6. 등록 완료 화면(개요 페이지)에서 아래 2개 값을 메모장에 복사해둡니다.
   - **애플리케이션(클라이언트) ID** → 이게 `MS_CLIENT_ID`
   - **디렉터리(테넌트) ID** → 이게 `MS_TENANT_ID`

### 1-1. 클라이언트 시크릿(비밀번호) 만들기

1. 왼쪽 메뉴 **"인증서 및 비밀(Certificates & secrets)"** 클릭
2. **"새 클라이언트 비밀(New client secret)"** 클릭
3. 설명: `cvent-dashboard-secret`, 만료: `24개월` 선택 → **"추가"**
4. 생성 직후 화면에 표시되는 **"값(Value)"**을 바로 복사해둡니다.
   ⚠️ 이 화면을 벗어나면 값이 다시 보이지 않으니 지금 꼭 복사해두세요. → 이게 `MS_CLIENT_SECRET`

### 1-2. API 권한 부여

1. 왼쪽 메뉴 **"API 권한(API permissions)"** 클릭
2. **"권한 추가(Add a permission)"** → **"Microsoft Graph"** 클릭
3. **"애플리케이션 권한(Application permissions)"** 선택 (사용자 위임 아님, 앱 자체 권한)
4. 검색창에 `Files` 입력 → **`Files.Read.All`** 체크 → **"권한 추가"**
5. 다시 **"권한 추가"** → Microsoft Graph → 애플리케이션 권한 → `Sites` 검색 → **`Sites.Read.All`** 체크 → **"권한 추가"**
6. 권한 목록 상단의 **"[테넌트명]에 대한 관리자 동의 부여(Grant admin consent)"** 클릭 → **"예"**
   - 이 버튼을 눌러야 상태가 초록색 체크로 바뀝니다. 관리자 계정이 아니면 이 버튼이 비활성화되어 있을 수 있으니, 이 경우 IT 담당자에게 요청하세요.

여기까지 하면 3개 값이 준비됩니다: `MS_TENANT_ID`, `MS_CLIENT_ID`, `MS_CLIENT_SECRET`

> **보안 참고**: `Sites.Read.All`은 조직 내 모든 SharePoint 사이트를 읽을 수 있는 권한이라 범위가 넓습니다.
> 특정 사이트만 허용하고 싶다면 나중에 `Sites.Selected` 권한 + PowerShell로 사이트별 권한 부여하는 방식으로
> 좁힐 수 있습니다. 사내용 소규모 대시보드 단계에서는 우선 `Sites.Read.All`로 빠르게 시작하는 것을 추천합니다.

---

## 2. 로컬 프로젝트 준비

터미널에서:

```bash
mkdir cvent-dashboard (mkdir : 폴더 만드는 명령어)
cd cvent-dashboard (cd 폴더 경로 이동하는 명령어)
```

아래 폴더 구조가 되도록 파일을 넣어주세요 (이 대화에서 만들어드린 파일 그대로 사용):

```
cvent-dashboard/
├── public/
│   └── index.html          ← Cvent 대시보드 화면
├── api/
│   └── cvent.json.js        ← 엑셀을 읽어 JSON으로 응답하는 서버 함수
├── lib/
│   └── graph-client.js      ← Microsoft Graph 인증 처리
├── package.json
├── vercel.json
├── .gitignore
├── .env.example
└── README.md
```

패키지 설치:

```bash
npm install
```

Vercel CLI 설치 (로컬에서 테스트하기 위해 필요):

```bash
npm install -g vercel
```

### 2-1. 로컬 환경변수 설정

`.env.example`을 복사해서 `.env.local` 파일을 만듭니다:

```bash
cp .env.example .env.local
```

`.env.local`을 열어서 아래처럼 채웁니다:

```
MS_TENANT_ID=1번에서 복사한 테넌트 ID
MS_CLIENT_ID=1번에서 복사한 클라이언트 ID
MS_CLIENT_SECRET=1-1에서 복사한 시크릿 값
ONEDRIVE_SHARE_URL=https://teamskorea09.sharepoint.com/:x:/s/teams/IQBQYJejve4GSos3logA2mvlAUi6dRmIVp461KMH8rD8Tck?e=GjRcaA
CVENT_SHEET_NAME=일정
```

> `ONEDRIVE_SHARE_URL`은 지금 주신 링크를 그대로 넣으면 됩니다. 코드가 내부적으로
> 이 URL을 Microsoft Graph가 이해하는 형식으로 자동 변환합니다.

### 2-2. 로컬 테스트

```bash
vercel dev
```

- 처음 실행하면 "Set up and deploy?" 같은 질문이 나오는데 전부 기본값(Enter)으로 진행해도 됩니다.
- 터미널에 `http://localhost:3000` 같은 주소가 뜨면 브라우저로 접속
- 대시보드가 뜨고, 실제 Excel 데이터가 표시되면 성공입니다.
- 만약 화면 상단에 "데이터를 불러오지 못했습니다" 라는 문구가 뜨면:
  - 터미널에 출력된 에러 메시지를 확인 (권한 동의가 아직 안 됐거나, 시크릿 값이 잘못 복사됐을 확률이 높습니다)
  - 브라우저에서 직접 `http://localhost:3000/api/cvent.json` 접속해보면 에러 상세 내용을 볼 수 있습니다.

---

## 3. GitHub에 연결

1. `https://github.com` 접속 → 로그인 → 우측 상단 **"+" → "New repository"**
2. Repository name: `cvent-dashboard` → Private 선택 → **"Create repository"**
3. 터미널에서 (프로젝트 폴더 안에서):

```bash  (git에 올리는 순서는 add -> commit -> push origin main 순서)
git init
git add .   
git commit -m "Initial commit: Cvent dashboard"
git branch -M main
git remote add origin https://github.com/내계정이름/cvent-dashboard.git
git push -u origin main
```

> `.env.local`은 `.gitignore`에 이미 포함되어 있어 GitHub에는 올라가지 않습니다. (비밀 값이 공개 저장소에
> 노출되면 안 되므로 이 부분은 반드시 확인하세요 — Private 저장소를 쓰더라도 시크릿은 커밋하지 않는 것이 원칙입니다.)

---

## 4. Vercel에 배포     
- Vercel은 서버 

1. `https://vercel.com` 접속 → GitHub 계정으로 로그인
2. 대시보드에서 **"Add New..." → "Project"** 클릭
3. **"Import Git Repository"** 목록에서 방금 만든 `cvent-dashboard` 선택 → **"Import"**
4. **"Configure Project"** 화면에서:
   - Framework Preset: `Other` (자동 감지되면 그대로 둬도 무방)
   - Root Directory: 기본값 유지
5. **"Environment Variables"** 섹션을 펼쳐서 아래 4개를 하나씩 입력 (Key / Value):

   | Key | Value |
   |---|---|
   | `MS_TENANT_ID` | (Azure에서 복사한 값) |
   | `MS_CLIENT_ID` | (Azure에서 복사한 값) |
   | `MS_CLIENT_SECRET` | (Azure에서 복사한 값) |
   | `ONEDRIVE_SHARE_URL` | `https://teamskorea09.sharepoint.com/:x:/s/teams/IQBQYJejve4GSos3logA2mvlAUi6dRmIVp461KMH8rD8Tck?e=GjRcaA` |
   | `CVENT_SHEET_NAME` | `일정` |

   각 값 입력 후 **"Add"** 버튼을 눌러 추가합니다. (Environment는 기본값 "Production, Preview, Development" 전체 체크된 상태로 두면 됩니다.)

6. **"Deploy"** 클릭
7. 1~2분 정도 빌드가 진행되고, 완료되면 **"Congratulations!"** 화면과 함께 `https://cvent-dashboard-xxxx.vercel.app` 같은 주소가 발급됩니다.
8. 그 주소를 클릭해서 대시보드가 정상적으로 뜨는지 확인합니다.

이후로는 로컬에서 코드를 수정하고

```bash
git add .
git commit -m "수정 내용"
git push
```

하면 Vercel이 자동으로 감지해서 재배포합니다. 별도로 배포 버튼을 누를 필요가 없습니다.

---

## 5. 커스텀 도메인 연결 (선택)

회사 도메인(예: `cvent.company.com`)으로 접속하게 하고 싶다면:

1. Vercel 프로젝트 화면 → 상단 탭 **"Settings" → "Domains"**
2. 입력창에 원하는 도메인 입력 (예: `cvent.company.com`) → **"Add"**
3. Vercel이 안내하는 DNS 레코드를 회사 도메인 관리 화면(가비아, Route53, Cloudflare 등)에 등록합니다.
   - 서브도메인(`cvent.company.com`)인 경우 보통 **CNAME 레코드**를 요구합니다:
     - Host/이름: `cvent`
     - Value/대상: `cname.vercel-dns.com`
   - 루트 도메인(`company.com`)인 경우 **A 레코드**를 요구합니다:
     - Vercel 화면에 표시되는 IP 주소를 그대로 등록
4. DNS는 반영까지 몇 분~몇 시간 걸릴 수 있습니다. Vercel Domains 화면에서 상태가 "Valid Configuration"으로 바뀌면 완료입니다.
5. Vercel이 자동으로 무료 SSL 인증서를 발급해줘서 `https://`로 바로 접속 가능합니다.

---

## 6. 접근 제어 (사내 전용으로 만들기)

지금 상태로는 URL만 알면 누구나 `/api/cvent.json`을 포함해 접속할 수 있습니다. 사내 전용으로 제한하려면:

- **Vercel Pro 플랜**의 **Password Protection** 기능을 프로젝트 Settings → Deployment Protection에서 켜기 (가장 간단)
- 또는 회사 Entra ID 로그인 연동(SSO)을 프론트엔드 앞단에 추가 (별도 구현 필요, 요청하시면 이어서 설계해드릴게요)

---

## 7. 문제 해결 체크리스트

| 증상 | 확인할 것 |
|---|---|
| `/api/cvent.json`에서 500 에러 | Vercel 프로젝트 → "Deployments" → 해당 배포 클릭 → "Functions" 탭에서 로그 확인 |
| "MS_TENANT_ID... 환경변수가 설정되지 않았습니다" | Vercel Settings → Environment Variables에 4개 값이 정확히 들어갔는지, 오타 없는지 확인 |
| "Graph API 파일 다운로드 실패 (HTTP 401)" | 클라이언트 시크릿이 만료/오타이거나, 관리자 동의(Grant admin consent)를 아직 안 누른 경우 |
| "Graph API 파일 다운로드 실패 (HTTP 403)" | API 권한에 `Files.Read.All` / `Sites.Read.All`이 실제로 부여·동의됐는지 재확인 |
| 화면은 뜨는데 이벤트가 0개 | `CVENT_SHEET_NAME` 값이 실제 엑셀 시트 탭 이름과 정확히 일치하는지, 헤더 행의 9개 열 이름이 정확히 일치하는지 확인 |

---

이 구조로 배포하면, Excel 파일을 수정하고 대시보드 페이지를 새로고침(또는 "새로고침" 버튼 클릭)할 때마다
최신 내용이 그대로 반영됩니다 — Power Automate 없이도 실시간에 가장 가까운 방식입니다.
