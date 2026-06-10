export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <section className="pt-28 md:pt-36 pb-24 md:pb-40">
      <div className="container-page">
        <p className="text-ink/50">에디토리얼 상세: {slug}</p>
      </div>
    </section>
  );
}
