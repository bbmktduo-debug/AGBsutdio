# 스튜디오에그비 사이트 이전 절차

작성일 2026-10-26 · 작성 vivien

GitHub 저장소, Vercel 배포, 도메인 연결 세 가지를 vivien 계정에서 클라이언트(studioEGB) 계정으로 옮긴다. Sanity는 이미 클라이언트에게 권한이 있어 역할 확인만 한다. 순서대로 하면 사이트가 끊기는 시간 없이 하루 안에 끝난다.

이 문서는 Codex 같은 AI 코딩 도구에 그대로 넘겨서 진행해도 되도록 썼다. 맨 아래 "Codex로 진행하기"에 쓸 프롬프트가 있다.

## 지금 상태

클라이언트는 코드를 올릴 수는 있지만 배포를 일으킬 수 없다. Vercel이 vivien 계정 소유라서 클라이언트 커밋은 GitHub에만 들어가고 사이트에는 반영되지 않는다.

| 서비스 | 소유자 | 클라이언트 권한 | 이전 필요 |
| --- | --- | --- | --- |
| GitHub 저장소 | vivien (bbmktduo-debug) | Collaborator (쓰기 가능) | 소유권 이전 (요청 보냄, 수락 대기) |
| Vercel 프로젝트 | vivien (Hobby) | 없음 | 클라이언트가 새 프로젝트 생성 |
| 도메인 연결 (studio-egb.com) | vivien Vercel 프로젝트 | 없음 | 새 프로젝트로 옮김 |
| Sanity 프로젝트 (bpxy2drf) | vivien | 초대됨 (역할 확인 필요) | 역할만 Administrator로 확인 |
| 도메인 등록 | 클라이언트 (Google Domains → Squarespace) | 소유자 | 없음. DNS만 변경 |

Vercel Hobby 플랜은 멤버 초대가 안 되므로 "프로젝트 이전" 대신 클라이언트가 자기 Vercel에서 저장소를 새로 가져오는 쪽이 더 단순하다. 환경변수 두 개와 도메인만 다시 넣으면 된다.

## 전체 순서 한눈에

위에서 아래로 차례대로 진행한다. 한 사람이 끝내면 상대가 받아서 다음 줄을 시작한다. 상태 칸은 진행하면서 직접 고친다.

| 순서 | 담당 | 할 일 | 끝나면 상대가 할 일 | 상태 |
| --- | --- | --- | --- | --- |
| 1 | vivien | GitHub 저장소 소유권 이전 요청 (받는 계정 studioEGB) | 클라이언트가 이메일에서 수락 | 완료 |
| 2 | 클라이언트 | GitHub 메일 또는 알림에서 이전 수락 (1단계 상세 참고). 저장소가 클라이언트 계정으로 이동 | vivien에게 완료 알림 | 완료 |
| 3 | 클라이언트 | Vercel 계정 생성 (GitHub studioEGB 계정으로 로그인) | 없음 | 완료 |
| 4 | 클라이언트 | Vercel에서 Add New Project → 이전받은 저장소 Import, 환경변수 2개 입력 후 Deploy | vivien에게 임시 주소 공유 | 완료 |
| 5 | vivien | Sanity 관리 화면에서 CORS origins에 임시 주소 추가 | 없음 | 완료 |
| 6 | 둘 다 | 임시 주소에서 콘텐츠·이미지·Studio 동작 검수 | 통과하면 도메인 작업 시작 | 완료 |
| 7 | vivien | 기존 Vercel 프로젝트에서 도메인 제거 | 클라이언트가 바로 다음 줄 진행 | 완료 |
| 8 | 클라이언트 | 새 프로젝트 Settings → Domains에 studio-egb.com, www.studio-egb.com 추가 | 안내값과 DNS가 다르면 직접 DNS 변경 | 완료 |
| 9 | 클라이언트 | 필요 시 Squarespace Domains(예전 Google Domains)에서 DNS 레코드 변경 | 반영 대기 (수 분에서 몇 시간) | 완료 (기존 DNS 유지, 변경 불필요) |
| 10 | 둘 다 | 실제 도메인으로 사이트 확인 | 문제없으면 정리 단계로 | 완료 |
| 11 | vivien | 기존 Vercel 프로젝트 삭제, Sanity에서 클라이언트 역할 Administrator 확인 | 없음 | 대기 |

## 1단계 GitHub 저장소 이전

커밋 기록, 브랜치, 설정이 그대로 옮겨지고 예전 주소로 접근해도 새 주소로 자동 연결된다. 코드는 어떤 시점에도 사라지지 않는다.

**vivien** (완료)

1. GitHub 저장소 → Settings → General → 맨 아래 Danger Zone → Transfer ownership
2. "Specify an organization or username"을 고르고 `studioEGB` 입력
3. 저장소 이름을 따라 입력해 확인
4. 클라이언트에게 "GitHub 이메일 확인해 달라"고 알림

**클라이언트**

1. **메일 찾기.** studioEGB GitHub 계정에 등록된 이메일 받은편지함에서 GitHub가 보낸 메일을 찾는다. 제목에 "transferred" 또는 "Transfer repository"가 들어 있다. 안 보이면 스팸함과 프로모션함도 확인.
2. **메일에서 수락.** 메일 안의 초록색 **Accept transfer** 버튼을 누른다. GitHub 로그인 화면이 뜨면 studioEGB 계정으로 로그인. 다른 GitHub 계정으로 로그인된 상태면 수락이 안 되므로 계정을 확인한다.
3. **확인 페이지.** 저장소 이름과 "이 저장소를 내 계정으로 받겠다"는 문구가 뜨면 확인 버튼을 누른다. 비밀번호나 2단계 인증을 다시 물을 수 있다.
4. **메일이 없을 때.** github.com에 studioEGB로 로그인 → 오른쪽 위 종 모양 아이콘(Notifications) → 저장소 이전 알림을 클릭하면 같은 확인 페이지로 간다.
5. **이전 확인.** 수락 후 오른쪽 위 프로필 사진 → Your repositories에 저장소가 보이면 완료. 주소가 `github.com/studioEGB/AGBsutdio` 로 바뀐다.
6. **vivien에게 알림.** "수락했다"고 알리고 바로 2단계로 넘어간다.

수락 기한은 하루다. 넘고 답이 없으면 요청이 취소되니 vivien이 다시 보내면 된다. 이전 후 vivien은 저장소에 대한 권한을 잃으므로, 남은 단계에서 vivien이 코드를 손봐야 한다면 클라이언트가 vivien(bbmktduo-debug)을 Collaborator로 초대한다.

## 2단계 Vercel 새 프로젝트

기존 프로젝트를 옮기는 게 아니라 클라이언트가 자기 Vercel에서 저장소를 새로 가져온다. Hobby 플랜은 무료이고, 이 단계가 끝나도 기존 사이트는 그대로 돌아간다.

**클라이언트**

1. vercel.com에서 "Continue with GitHub"으로 가입. studioEGB 계정으로 로그인한다.
2. 플랜은 Hobby 선택
3. 대시보드에서 Add New → Project
4. GitHub 연동 화면에서 이전받은 저장소 `AGBsutdio`가 보이면 Import. 안 보이면 "Adjust GitHub App Permissions"에서 그 저장소를 허용한다.
5. Framework Preset이 Next.js로 자동 잡혀 있는지 확인. 나머지 설정은 기본값 그대로.
6. Environment Variables 칸을 펼쳐 아래 두 개를 입력한다. 둘 다 공개해도 되는 값이라 README에도 적혀 있다.
    - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `bpxy2drf`
    - `NEXT_PUBLIC_SANITY_DATASET` = `production`
7. Deploy. 1~2분 뒤 `xxx.vercel.app` 형태의 임시 주소가 나온다.
8. 임시 주소를 열어 작업물과 이미지가 나오는지 확인하고, 그 주소를 vivien에게 공유한다.

이제부터 클라이언트가 저장소에 푸시하면 배포까지 자동으로 된다. 코드와 Vercel이 같은 사람 소유가 되었기 때문이다. Codex가 푸시해도 마찬가지다.

## 3단계 Sanity 연결 확인

이 사이트는 콘텐츠 관리 화면(Studio)이 사이트 안에 `/studio`로 포함되어 있다. Sanity는 허용된 주소에서만 Studio 로그인과 데이터 쓰기를 받아 주므로, 새 주소를 Sanity에 등록해야 한다. 등록하지 않으면 사이트는 뜨는데 `/studio` 로그인이 막힌다.

**vivien**

1. sanity.io/manage → 프로젝트 `bpxy2drf` → API → CORS origins
2. 클라이언트의 임시 주소(`https://xxx.vercel.app`)를 추가. "Allow credentials" 켜기.
3. `https://www.studio-egb.com`과 `https://studio-egb.com`이 이미 있는지 확인. 없으면 추가.
4. Members에서 클라이언트 역할이 Administrator인지 확인. Editor면 Administrator로 변경.

**둘 다**

- 임시 주소 뒤에 `/studio`를 붙여 열고 Sanity 로그인이 되는지 확인
- 내용을 하나 고치고 Publish 한 뒤 임시 주소 사이트에 반영되는지 확인 (최대 1분)

이 사이트는 Sanity 쓰기 토큰을 쓰지 않는다. 환경변수는 위의 공개값 두 개뿐이라 비밀값 전달이 없다.

## 4단계 도메인 연결

임시 주소에서 사이트가 정상임을 확인한 뒤에만 시작한다. 하나의 도메인은 Vercel 프로젝트 하나에만 붙일 수 있어서, 기존 프로젝트에서 먼저 떼어야 새 프로젝트에 추가된다. 떼는 순간부터 붙일 때까지 사이트가 안 뜨므로 두 사람이 같은 시간에 붙어서 한다.

**vivien**

1. 클라이언트와 시간을 맞춘다. 평일 낮 사용자가 적은 시간대가 좋다.
2. 기존 Vercel 프로젝트 → Settings → Domains에서 `studio-egb.com`과 `www.studio-egb.com` 각각 Edit → Remove
3. 클라이언트에게 "뗐다"고 바로 알림

**클라이언트**

1. 새 Vercel 프로젝트 → Settings → Domains → `studio-egb.com` 입력 후 Add
2. www 버전도 같이 추가하라는 안내가 뜨면 수락 (www를 기본으로, 루트는 www로 리다이렉트)
3. Vercel이 보여 주는 DNS 안내값을 확인한다. 보통 아래 둘이다.
    - 루트 도메인(studio-egb.com): A 레코드 `76.76.21.21`
    - www: CNAME `cname.vercel-dns.com`
4. 도메인은 클라이언트가 Google Domains에서 샀다. Google Domains는 2023년 Squarespace에 인수되어 지금은 Squarespace Domains에서 관리한다. 기존에도 Vercel을 가리키고 있었으므로 값이 같으면 바꿀 게 없다. Vercel 화면에 "Valid Configuration"이 바로 뜨면 끝.
5. 값이 다르거나 "Invalid Configuration"이 뜨면: domains.squarespace.com에 도메인을 살 때 쓴 Google 계정으로 로그인 → 해당 도메인 → DNS → Custom records에서 A 또는 CNAME 레코드를 위 값으로 바꾼다.
6. DNS를 바꾼 뒤 Vercel Domains 화면이 "Valid Configuration"으로 바뀔 때까지 기다린다. 보통 수 분, 길면 몇 시간.

도메인 소유권 자체는 이미 클라이언트 것이라 이전할 게 없다.

## 5단계 확인과 정리

실제 도메인에서 사이트가 정상이면 이전은 끝난 것이다. 남은 건 vivien 계정에 매달린 잔여물을 정리해서 클라이언트가 완전히 독립하게 만드는 일이다.

**둘 다 확인**

- [ ] https://www.studio-egb.com 으로 접속했을 때 사이트가 뜨고 https 자물쇠가 보인다
- [ ] https://studio-egb.com 이 www로 넘어간다
- [ ] 작업물 목록, 상세 페이지, 이미지, YouTube 임베드가 나온다
- [ ] https://www.studio-egb.com/studio 에서 로그인이 되고, 내용을 고치면 사이트에 반영된다
- [ ] 클라이언트가 코드를 푸시하면 Vercel에서 자동 배포된다

**vivien**

1. Sanity 관리 화면 → Members에서 클라이언트 역할이 Administrator인지 다시 확인
2. Sanity 프로젝트에 결제가 걸려 있거나 조직 소유자가 vivien이면, 조직 설정에서 클라이언트를 소유자로 바꾼다. 무료 플랜이면 생략 가능.
3. 기존 Vercel 프로젝트 삭제 (Settings → General → 맨 아래 Delete Project). 도메인을 떼고 새 사이트가 확인된 뒤에만.
4. Sanity CORS origins에서 예전 Vercel 임시 주소(vivien 프로젝트 것)를 지운다.

이 정리까지 끝나면 vivien 계정을 없애도 사이트에 영향이 없다.

## 주의할 점

- **순서를 바꾸지 않는다.** 도메인을 먼저 떼거나 기존 프로젝트를 먼저 지우면 새 사이트가 준비될 때까지 사이트가 죽는다. 새 사이트가 임시 주소에서 완전히 돌아간 다음에만 도메인을 옮긴다.
- **GitHub 이전은 클라이언트가 수락해야 끝난다.** 요청만 보내고 수락을 안 하면 하루 뒤 취소된다.
- **Sanity CORS를 빠뜨리기 쉽다.** 새 주소를 추가하지 않으면 사이트는 떠도 Studio 로그인이 안 된다. "사이트는 나오는데 수정이 안 된다"면 여기부터 본다.
- **Squash merge를 쓰지 않는다.** 이전이 끝나기 전까지는 Vercel이 vivien 계정이라, 클라이언트 커밋은 vivien이 "Create a merge commit"으로 머지해야 배포된다. 이전이 끝나면 이 제약은 사라진다.
- **예상 소요 시간**: GitHub 수락 5분, Vercel 프로젝트 15분, Sanity 확인 10분, 도메인 전환 10분에 DNS 반영 대기. 연락이 바로바로 되면 한 시간이면 끝난다.

## 저장소 내려받기와 올리기

클라이언트 컴퓨터에 저장소가 없으면 (이전 수락 후):

```bash
git clone https://github.com/studioEGB/AGBsutdio.git
cd AGBsutdio
npm install
```

이미 받아 둔 폴더가 있으면 그 폴더에서 최신 내용을 가져온다. 이전 전에 받은 폴더라면 주소도 바꿔 둔다.

```bash
git remote set-url origin https://github.com/studioEGB/AGBsutdio.git
git pull origin main
```

작업 후 올리기:

```bash
git add -A
git commit -m "변경 내용 한 줄"
git push origin main
```

## Codex로 진행하기

Codex(또는 다른 AI 코딩 도구)에 아래 프롬프트를 붙여 넣으면 이 문서를 읽고 단계별로 안내한다. GitHub 수락, Vercel 가입, 도메인 추가처럼 웹 화면에서 직접 눌러야 하는 일은 Codex가 대신 못 하므로, Codex는 "지금 무엇을 누르면 되는지"를 알려 주고 사람이 누른다. 코드와 설정 파일 확인, 환경변수 이름 찾기, 명령어 실행은 Codex가 한다.

```
저장소의 docs/HANDOVER.md를 읽고 사이트 이전을 같이 진행하자. 나는 "클라이언트"이고 GitHub 아이디는 studioEGB다.

먼저 git pull origin main 으로 최신 내용을 받고, 문서의 "전체 순서 한눈에" 표에서 상태가 "대기"인 가장 위 줄부터 시작해.

진행 방식:
- 담당이 "클라이언트"인 줄은 내가 해야 할 일이다. 문서의 해당 단계 상세를 보고, 지금 내가 어느 화면에서 무엇을 누르면 되는지 한 번에 한 단계씩 알려 줘. 내가 "했어"라고 하면 다음으로 넘어가.
- 담당이 "vivien"인 줄은 vivien이 해야 한다. 그 줄에 오면 "vivien에게 이렇게 요청하라"는 메시지를 한국어로 짧게 써 주고, vivien이 끝냈다고 내가 알리면 다음으로 넘어가.
- 웹 화면에서 누르는 일은 네가 대신 할 수 없으니 안내만 해. 터미널 명령, 코드 확인, 환경변수 이름 확인은 네가 직접 해.
- 환경변수 값은 README.md와 docs/HANDOVER.md에 있는 공개값 두 개뿐이다. 그 외의 비밀값을 만들거나 추측하지 마.
- 한 단계가 끝날 때마다 docs/HANDOVER.md의 상태 칸을 "완료"로 고치고 커밋해.
- 문서에 없는 걸 바꾸거나 sanity/schemas 아래 파일을 수정하지 마. 막히면 어디서 막혔는지 말해 주고 멈춰.

지금 어느 단계부터 시작하면 되는지 말해 줘.
```
