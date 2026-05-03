import PathCard from './PathCard.jsx';
import { learningPaths } from '../../data/learningPaths.js';

export default function RelatedPaths({ currentSlug, onTryFree, onPreviewLesson }) {
  const related = learningPaths.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (!related.length) return null;
  return (
    <section className="bg-gw-ice/60 py-16">
      <div className="container-x">
        <div className="flex items-baseline justify-between gap-4 flex-wrap mb-6">
          <h3 className="font-display text-2xl font-bold text-gw-ink">Related paths</h3>
          <a
            href="/academy/paths"
            className="text-sm font-semibold text-gw-teal hover:underline"
          >
            See all paths →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {related.map((p) => (
            <PathCard
              key={p.slug}
              path={p}
              onTryFree={onTryFree}
              onPreviewLesson={onPreviewLesson}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
