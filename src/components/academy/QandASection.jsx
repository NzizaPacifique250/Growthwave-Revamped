import { useMemo, useState } from 'react';
import { ArrowUp, MessageCircle, Search, Filter } from 'lucide-react';

const seedQuestions = [
  {
    id: 1,
    author: 'Daniel R.',
    initials: 'DR',
    question: 'How is this different from a free YouTube playlist?',
    answer:
      'Mentor reviews, real partner-brief capstones, and direct introductions to hiring partners. The structured cadence matters more than any single video.',
    upvotes: 42,
    answeredBy: 'Mentor · Aline U.',
    tag: 'curriculum',
  },
  {
    id: 2,
    author: 'Sarah M.',
    initials: 'SM',
    question: 'Can I keep my full-time job while doing this?',
    answer:
      'Most students do. Lessons are bite-sized and the project work is asynchronous. Plan for ~10 hours per week.',
    upvotes: 31,
    answeredBy: 'Mentor · Eric N.',
    tag: 'logistics',
  },
  {
    id: 3,
    author: 'Tony A.',
    initials: 'TA',
    question: 'What happens if I fail an assessment?',
    answer:
      'You get unlimited retries with hints unlocked on the second attempt. If you\'re stuck, mentors run office hours twice a week.',
    upvotes: 18,
    answeredBy: 'Growthwave Team',
    tag: 'assessments',
  },
];

const tags = ['all', 'curriculum', 'logistics', 'assessments'];

export default function QandASection() {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('all');
  const [upvoted, setUpvoted] = useState(() => new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return seedQuestions.filter((qn) => {
      const tagOk = activeTag === 'all' || qn.tag === activeTag;
      const queryOk =
        q.length === 0 ||
        qn.question.toLowerCase().includes(q) ||
        qn.answer.toLowerCase().includes(q);
      return tagOk && queryOk;
    });
  }, [query, activeTag]);

  const toggleUpvote = (id) => {
    setUpvoted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <h3 className="font-display text-2xl font-bold text-gw-ink">Student Q&A</h3>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gw-teal hover:gap-2 transition-all"
        >
          <MessageCircle size={14} /> Ask a question
        </button>
      </div>

      <div className="mt-5 flex flex-col md:flex-row gap-3">
        <label className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gw-slate pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions"
            className="w-full rounded-lg border border-gw-navy/15 bg-white pl-9 pr-3 py-2 text-sm text-gw-ink placeholder:text-gw-slate focus:outline-none focus:border-gw-teal focus:ring-2 focus:ring-gw-teal/20 transition"
          />
        </label>
        <div className="inline-flex items-center gap-1.5 flex-wrap">
          <Filter size={14} className="text-gw-slate" />
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTag(t)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all capitalize ${
                activeTag === t
                  ? 'bg-gw-teal text-white border-gw-teal'
                  : 'bg-white text-gw-slate border-gw-navy/15 hover:border-gw-teal hover:text-gw-teal'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {filtered.map((q) => {
          const hasUpvoted = upvoted.has(q.id);
          return (
            <article
              key={q.id}
              className="rounded-xl bg-white border border-gw-navy/10 p-5 flex gap-4"
            >
              <button
                type="button"
                onClick={() => toggleUpvote(q.id)}
                className={`shrink-0 flex flex-col items-center justify-center gap-1 rounded-lg border px-2 py-2 transition-all ${
                  hasUpvoted
                    ? 'bg-gw-teal text-white border-gw-teal'
                    : 'border-gw-navy/15 text-gw-slate hover:border-gw-teal hover:text-gw-teal'
                }`}
                aria-pressed={hasUpvoted}
              >
                <ArrowUp size={14} />
                <span className="text-xs font-bold">
                  {q.upvotes + (hasUpvoted ? 1 : 0)}
                </span>
              </button>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-xs text-gw-slate">
                  <span className="h-6 w-6 rounded-full bg-gw-ice text-gw-navy text-[10px] font-bold flex items-center justify-center">
                    {q.initials}
                  </span>
                  <span className="font-semibold text-gw-ink">{q.author}</span>
                  <span>·</span>
                  <span className="capitalize">{q.tag}</span>
                </div>
                <h4 className="mt-2 font-display font-bold text-gw-ink">{q.question}</h4>
                <p className="mt-2 text-sm text-gw-slate leading-relaxed">{q.answer}</p>
                <p className="mt-3 text-[11px] text-gw-teal font-semibold">
                  Answered by {q.answeredBy}
                </p>
              </div>
            </article>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-sm text-gw-slate text-center py-8">
            No questions match. Try a different filter or ask a new one.
          </p>
        )}
      </div>
    </div>
  );
}
