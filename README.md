# 한국소아암재단 추모기부

GitHub Pages 로 운영하는 추모기부 공개 사이트입니다. 주소: `https://아이디.github.io/memorial/`

| 파일 | 주소 |
|---|---|
| index.html | /memorial/ — 메인 |
| spaces/index.html | /memorial/spaces/ — 추모 공간 둘러보기 |
| space/index.html, 404.html | /memorial/space/공간주소 — 각 추모 공간 (두 파일은 같은 내용) |
| apply/child, apply/adult | 추모 공간 신청 |
| config.js | 데이터 연결 주소 (Google Apps Script) |
| .nojekyll | GitHub Pages 설정 파일 (지우지 마세요) |

- 수정: 파일을 열고 연필(✎) → 고치기 → **Commit changes**. 1~2분 뒤 사이트에 반영됩니다.
- **space/index.html 을 고치면 404.html 에도 같은 내용을 붙여넣어 주세요.** (GitHub 에서 /space/공간주소 를 열 때 404.html 이 쓰입니다)
- 모바일 부고장: index.html 맨 아래 `var OBIT_READY=false;` 를 `true` 로 바꾸면 준비 중 안내 대신 바로 연결됩니다.
- 나중에 memorial.soaam.net 으로 연결하면 코드 수정 없이 그대로 동작합니다. (CNAME 파일 추가 + DNS 변경)
- 신청·방명록·기부 데이터는 구글 시트와 Apps Script 에 있으며 이 저장소에는 없습니다.
