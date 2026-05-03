import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import PathDiscoveryHero from '../components/academy/PathDiscoveryHero.jsx';
import PathFilterPanel from '../components/academy/PathFilterPanel.jsx';
import PathCard from '../components/academy/PathCard.jsx';
import SocialProofStrip from '../components/academy/SocialProofStrip.jsx';
import SampleLessonModal from '../components/academy/SampleLessonModal.jsx';
import TryFreeModal from '../components/academy/TryFreeModal.jsx';
import { learningPaths } from '../data/learningPaths.js';

const initialFilters = { difficulty: [], duration: [], outcome: [] };

function matchesDifficulty(path, ids) {
  if (ids.length === 0) return true;
  const level = path.levelRange.toLowerCase();
  return ids.some((id) => {
    if (id === 'beginner') return level.startsWith('beginner');
    if (id === 'intermediate') return level.startsWith('intermediate');
    if (id === 'all-levels') return level.includes('all levels');
    return false;
  });
}

function matchesDuration(path, ids) {
  if (ids.length === 0) return true;
  const weeks = parseInt(path.duration, 10);
  return ids.some((id) => {
    if (id === 'short') return weeks < 12;
    if (id === 'medium') return weeks >= 12 && weeks <= 24;
    if (id === 'long') return weeks > 24;
    return false;
  });
}

function matchesOutcome(path, ids) {
  if (ids.length === 0) return true;
  const slug = path.outcomeType.toLowerCase().replace(/\s+/g, '-');
  return ids.includes(slug);
}

export default function PathDiscoveryPage() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [sampleLessonPath, setSampleLessonPath] = useState(null);
  const [tryFreePath, setTryFreePath] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return learningPaths.filter((p) => {
      const haystack = `${p.title} ${p.tagline} ${p.tags.join(' ')}`.toLowerCase();
      const matchesQuery = q.length === 0 || haystack.includes(q);
      return (
        matchesQuery &&
        matchesDifficulty(p, filters.difficulty) &&
        matchesDuration(p, filters.duration) &&
        matchesOutcome(p, filters.outcome)
      );
    });
  }, [query, filters]);

  const toggleFilter = (group, id) => {
    setFilters((f) => ({
      ...f,
      [group]: f[group].includes(id) ? f[group].filter((x) => x !== id) : [...f[group], id],
    }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setQuery('');
  };

  return (
    <>
      <Navbar />
      <main className="bg-white text-gw-ink min-h-screen">
        <PathDiscoveryHero />

        <section id="paths-grid" className="py-16 md:py-20">
          <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <PathFilterPanel
                query={query}
                onQueryChange={setQuery}
                selected={filters}
                onToggle={toggleFilter}
                onClear={clearFilters}
              />
            </div>

            <div className="lg:col-span-9">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-gw-ink">
                    {filtered.length} {filtered.length === 1 ? 'path' : 'paths'} available
                  </h2>
                  <p className="text-sm text-gw-slate mt-1">
                    Click into any path to see the full curriculum, projects, and outcomes.
                  </p>
                </div>
                <div className="hidden md:inline-flex items-center gap-2 text-xs text-gw-slate">
                  <SlidersHorizontal size={14} />
                  Filters update in real time
                </div>
              </div>

              {filtered.length === 0 ? (
                <EmptyState onClear={clearFilters} />
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                  <AnimatePresence mode="popLayout">
                    {filtered.map((path) => (
                      <motion.div
                        key={path.slug}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <PathCard
                          path={path}
                          onTryFree={setTryFreePath}
                          onPreviewLesson={setSampleLessonPath}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        <SocialProofStrip />
      </main>
      <Footer />

      <SampleLessonModal
        open={!!sampleLessonPath}
        onClose={() => setSampleLessonPath(null)}
        path={sampleLessonPath}
      />
      <TryFreeModal
        open={!!tryFreePath}
        onClose={() => setTryFreePath(null)}
        path={tryFreePath}
      />
    </>
  );
}

function EmptyState({ onClear }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-gw-navy/15 p-10 text-center">
      <h3 className="font-display text-lg font-bold text-gw-ink">No paths match those filters</h3>
      <p className="mt-2 text-sm text-gw-slate">
        Try widening your search or clearing filters.
      </p>
      <button type="button" onClick={onClear} className="btn btn-ghost-teal mt-4">
        Clear filters
      </button>
    </div>
  );
}
