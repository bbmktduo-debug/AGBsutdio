#!/usr/bin/env python3
"""
파비콘 세트 생성기.

원본 이미지 1장(정사각형 권장, 512px 이상)을 받아서 Next.js App Router가 인식하는
아이콘 파일 3개를 src/app/ 에 만들어 줍니다.

  src/app/favicon.ico    (16·32·48px 멀티 사이즈)
  src/app/icon.png       (512px, 브라우저 탭·PWA용)
  src/app/apple-icon.png (180px, iOS 홈 화면용)

사용법:
  python3 scripts/make-favicon.py <원본이미지.png>
  python3 scripts/make-favicon.py <원본이미지.png> --bg "#F1EEE8"   # 투명 배경 채우기

정사각형이 아니면 긴 변 기준으로 정사각형 캔버스 중앙에 배치합니다.
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
APP = ROOT / "src" / "app"


def parse_args(argv: list[str]) -> tuple[Path, str | None]:
    if len(argv) < 2:
        print(__doc__)
        sys.exit(1)
    src = Path(argv[1]).expanduser().resolve()
    bg = None
    if "--bg" in argv:
        bg = argv[argv.index("--bg") + 1]
    if not src.exists():
        print(f"파일을 찾을 수 없습니다: {src}")
        sys.exit(1)
    return src, bg


def to_square(img: Image.Image, bg: str | None) -> Image.Image:
    img = img.convert("RGBA")
    w, h = img.size
    side = max(w, h)
    canvas = Image.new("RGBA", (side, side), bg or (0, 0, 0, 0))
    canvas.paste(img, ((side - w) // 2, (side - h) // 2), img)
    return canvas


def main() -> None:
    src, bg = parse_args(sys.argv)
    base = to_square(Image.open(src), bg)

    icon = base.resize((512, 512), Image.LANCZOS)
    icon.save(APP / "icon.png", "PNG", optimize=True)

    apple = base.resize((180, 180), Image.LANCZOS)
    apple.save(APP / "apple-icon.png", "PNG", optimize=True)

    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    base.save(APP / "favicon.ico", format="ICO", sizes=ico_sizes)

    for name in ("favicon.ico", "icon.png", "apple-icon.png"):
        p = APP / name
        print(f"✔ {p.relative_to(ROOT)}  ({p.stat().st_size:,} bytes)")
    print("완료. `npm run build` 후 브라우저 탭에서 확인하세요.")


if __name__ == "__main__":
    main()
