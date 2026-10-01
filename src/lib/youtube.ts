/** YouTube 링크(youtu.be / watch / embed / shorts)에서 영상 ID 추출 */
export function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?\s/]+)/
  );
  return match ? match[1] : null;
}
