// Per-lesson content blocks. Keyed by `${moduleId}:${lessonId}`. Lesson 4
// (`wd-m4-l4`) is the demo focus — every block type is represented across
// the module. Other modules carry minimal stubs.

export const lessonContent = {
  // ─── Module 4 lesson 1 ──────────────────────────────────────────────
  'wd-m4:wd-m4-l1': [
    {
      id: 'video',
      type: 'video',
      title: 'What is a component?',
      duration: 8 * 60,
      poster: 'gradient-teal',
      chapters: [
        { at: 0, label: 'Why components exist' },
        { at: 120, label: 'A first JSX example' },
        { at: 360, label: 'Composition over inheritance' },
      ],
      transcript:
        "Components are how React lets you describe a piece of UI as a reusable function. Think of them like building blocks. We'll build our first one in 30 seconds — and by the end you'll see why composition is React's superpower.",
    },
    {
      id: 'reading',
      type: 'reading',
      title: 'Quick recap',
      blocks: [
        { kind: 'p', text: "A component is a JavaScript function that returns markup. Same input, same output." },
        { kind: 'p', text: 'You compose components by nesting them. That is most of React.' },
      ],
    },
  ],

  // ─── Module 4 lesson 2 ──────────────────────────────────────────────
  'wd-m4:wd-m4-l2': [
    {
      id: 'reading-1',
      type: 'reading',
      title: 'Props are inputs',
      blocks: [
        { kind: 'h3', text: 'Why props matter' },
        {
          kind: 'p',
          text:
            'Props are how a parent passes data into a child. They are read-only — children cannot mutate them. This restriction is what keeps React predictable.',
        },
        {
          kind: 'code',
          language: 'jsx',
          text: `function Greet({ name }) {\n  return <h1>Hello, {name}</h1>;\n}\n\nfunction App() {\n  return <Greet name="Karenzi" />;\n}`,
        },
        { kind: 'h3', text: 'Composition' },
        {
          kind: 'p',
          text:
            "Components compose by nesting and by accepting `children`. A Card that wraps anything you give it is more reusable than a Card that hard-codes its content.",
        },
        {
          kind: 'callout',
          text:
            'Rule of thumb: if you find yourself copy-pasting JSX, you probably want to extract a component with props.',
        },
      ],
    },
  ],

  // ─── Module 4 lesson 3 ──────────────────────────────────────────────
  'wd-m4:wd-m4-l3': [
    {
      id: 'reading-1',
      type: 'reading',
      title: 'Make a counter that actually works',
      blocks: [
        {
          kind: 'p',
          text: "We'll build a Counter that increments when you click a button. By the end you will know how to wire state to the DOM.",
        },
      ],
    },
    {
      id: 'interactive',
      type: 'interactive',
      title: 'Build the counter',
      brief:
        "Make the button increment the count when clicked. The expected output should show 'Count: 1' after one click.",
      starter: `function Counter() {\n  // TODO: track the count using state\n  const count = 0;\n  return (\n    <button onClick={() => /* increment */}>\n      Count: {count}\n    </button>\n  );\n}`,
      // The validator looks for these substrings in the user's code.
      requiredSubstrings: ['useState', 'setCount', 'count + 1'],
      hint: 'Reach for the useState hook. The setter is the second item React gives back.',
      successMessage: 'Nice — your counter increments. State is wired correctly.',
      failureMessage:
        "Looks like state is not wired up yet. You need useState, a setter, and a click handler that calls the setter.",
      mockOutput: 'Count: 0',
      successOutput: 'Count: 1',
    },
  ],

  // ─── Module 4 lesson 4 — DEMO FOCUS ────────────────────────────────
  'wd-m4:wd-m4-l4': [
    {
      id: 'video',
      type: 'video',
      title: 'State and the useState hook',
      duration: 9 * 60 + 12,
      poster: 'gradient-teal',
      chapters: [
        { at: 0, label: 'Why state matters' },
        { at: 90, label: 'Calling useState' },
        { at: 280, label: 'Updating state correctly' },
        { at: 480, label: 'Common gotchas' },
      ],
      transcript:
        "State is what makes a component remember things between renders. We'll wire up our first stateful counter, then look at the three rules that catch beginners off guard.",
    },
    {
      id: 'reading',
      type: 'reading',
      title: 'The three rules',
      blocks: [
        { kind: 'h3', text: 'Rule 1 — Never mutate state directly' },
        {
          kind: 'p',
          text:
            "React detects changes by comparing references. If you mutate the existing object, React will not see anything changed and the UI will not re-render.",
        },
        { kind: 'h3', text: 'Rule 2 — State updates are asynchronous' },
        {
          kind: 'p',
          text:
            "When you call setCount, the state does not update immediately. The new value shows up on the next render. If you need the previous value, use the function form: setCount(c => c + 1).",
        },
        { kind: 'h3', text: 'Rule 3 — One concept per state slot' },
        {
          kind: 'p',
          text:
            'Group state that changes together; split state that changes independently. Two state slots is fine, ten is usually a sign that some of those should derive from props or each other.',
        },
        {
          kind: 'callout',
          text:
            'These three rules cover ~80% of useState bugs. Memorize them and you will save yourself a lot of debugging.',
        },
      ],
    },
    {
      id: 'interactive',
      type: 'interactive',
      title: 'Try it: previous-value updates',
      brief:
        "Update the increment handler to use the function form so it works correctly inside setTimeout. The expected behavior: clicking the button increments the count by 1.",
      starter: `function DelayedCounter() {\n  const [count, setCount] = useState(0);\n  const incrementSoon = () => {\n    // TODO: use the function form so we don't capture stale state\n    setTimeout(() => setCount(count + 1), 1000);\n  };\n  return (\n    <button onClick={incrementSoon}>\n      Count: {count}\n    </button>\n  );\n}`,
      requiredSubstrings: ['setCount(c =>', 'c + 1'],
      hint: 'The function form of the setter receives the current value as its argument.',
      successMessage:
        'Exactly — the function form sees the live value, even from inside setTimeout.',
      failureMessage:
        'Still using the closure value. Try the function form: setCount(c => c + 1).',
      mockOutput: 'Count: 0  (after 1s click: stays 0 if rapid-clicked)',
      successOutput: 'Count: 1',
    },
    {
      id: 'quiz',
      type: 'quiz',
      title: 'Quick check',
      question: 'Which of these will reliably increment count by 2 when called twice in a row?',
      options: [
        { label: 'setCount(count + 1); setCount(count + 1);', correct: false },
        { label: 'setCount(c => c + 1); setCount(c => c + 1);', correct: true },
        { label: 'count = count + 2;', correct: false },
        { label: 'setCount(count++);', correct: false },
      ],
      explanation:
        'Only the function form sees the most recent value. The first option captures the same `count` twice and ends up incrementing once.',
    },
  ],

  // ─── Module 4 lesson 5 ──────────────────────────────────────────────
  'wd-m4:wd-m4-l5': [
    {
      id: 'reading',
      type: 'reading',
      title: 'Lifting state up',
      blocks: [
        {
          kind: 'p',
          text:
            'When two siblings need to share state, the simplest pattern is to lift the state up to their nearest common ancestor — the parent.',
        },
        {
          kind: 'callout',
          text: 'If you find yourself prop-drilling deeply, that is the signal to consider context. Not yet.',
        },
      ],
    },
  ],

  // ─── Module 4 lesson 6 (quiz, locked content) ───────────────────────
  'wd-m4:wd-m4-l6': [
    {
      id: 'quiz',
      type: 'quiz',
      title: 'Module 4 final check',
      question: 'Why is mutating state directly a problem in React?',
      options: [
        { label: 'It is technically illegal JavaScript', correct: false },
        { label: 'React compares references — same object means no re-render', correct: true },
        { label: 'It triggers infinite re-renders', correct: false },
        { label: 'It throws a runtime error', correct: false },
      ],
      explanation:
        'React diffs by reference. If the reference is the same as before, React assumes nothing changed and skips the render — even if internal fields are different.',
    },
  ],
};

export function getLessonContent(moduleId, lessonId) {
  return lessonContent[`${moduleId}:${lessonId}`] || [];
}
