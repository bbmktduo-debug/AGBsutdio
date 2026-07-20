import Link from "next/link";
import Image from "next/image";
import { getNotes, getNoteCategories } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import NoteCategoryFilter from "@/components/note/NoteCategoryFilter";

type Note = {
  _id: string;
  title: string;
  slug: { current: string };
  thumbnail?: { asset: { _ref: string } };
  publishedAt?: string;
  categoryName?: string;
  categoryColor?: string;
  categorySlug?: string;
};

type NoteCategory = {
  _id: string;
  name: string;
  slug: { current: string };
  color?: string;
};

export const revalidate = 60;

export default async function NotesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [notes, categories] = await Promise.all([
    getNotes(category) as Promise<Note[]>,
    getNoteCategories() as Promise<NoteCategory[]>,
  ]);

  return (
    <>
      <section className="pt-28 md:pt-32 pb-4">
        <div className="container-page">
          <h1 className="font-display text-[clamp(32px,5vw,56px)] font-semibold tracking-tight mb-6">
            NOTES
          </h1>

          {/* 카테고리 필터 */}
          {categories.length > 0 && (
            <NoteCategoryFilter
              categories={categories}
              activeCategory={category}
            />
          )}
        </div>
      </section>

      <div className="container-page">
        <div className="border-b border-ink" />
      </div>

      <section className="py-8 md:py-12">
        <div className="container-page">
          {notes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {notes.map((note) => (
                <Link
                  key={note._id}
                  href={`/notes/${note.slug.current}`}
                  className="group"
                >
                  <div className="aspect-video overflow-hidden bg-ink/5 mb-3">
                    {note.thumbnail ? (
                      <Image
                        src={urlFor(note.thumbnail)
                          .width(600)
                          .height(338)
                          .url()}
                        alt={note.title}
                        width={600}
                        height={338}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-ink/15">
                        No Image
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm group-hover:underline">
                    {note.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    {note.categoryName && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: note.categoryColor
                            ? `${note.categoryColor}66`
                            : "rgba(0,0,0,0.06)",
                        }}
                      >
                        {note.categoryName}
                      </span>
                    )}
                    {note.publishedAt && (
                      <span className="text-xs text-ink/30">
                        {new Date(note.publishedAt).toLocaleDateString("ko-KR")}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border border-ink/10 p-12 text-center">
              <p className="text-ink/30">노트가 등록되면 표시됩니다.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
