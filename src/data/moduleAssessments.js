// Module assessment fixtures. Keyed by `${pathSlug}:${moduleId}`. The Web
// Development Module 4 assessment is the demo focus; other modules can be
// authored later following the same shape.

export const moduleAssessments = {
  'web-development:wd-m4': {
    title: 'Module 4 · React Components',
    description: 'Six questions covering state, props, and the rules of useState. Aim for 70%.',
    passingScore: 70,
    masteryScore: 90,
    estMinutes: 12,
    timerMinutes: null, // optional — null disables the timer
    badge: {
      id: 'badge-react-components',
      label: 'React Components',
      description: 'Earned by passing the Module 4 assessment.',
    },
    masteryBadge: {
      id: 'badge-react-components-mastery',
      label: 'React Components Master',
      description: 'Awarded for scoring 90% or higher on Module 4.',
    },
    nextModuleId: 'wd-m5',
    questions: [
      {
        id: 'q1',
        type: 'single',
        skillTag: 'state-basics',
        question: 'What is the purpose of useState in React?',
        options: [
          { label: 'To remember values between renders' },
          { label: 'To trigger network requests on mount' },
          { label: 'To replace components when props change' },
          { label: 'To define new HTML elements' },
        ],
        correctIndex: 0,
        explanation:
          'useState gives a component memory across renders. Without it, every render starts from scratch.',
        hintText: 'Think about what changes between two clicks of a button.',
      },
      {
        id: 'q2',
        type: 'single',
        skillTag: 'closure-trap',
        question:
          'You call setCount(count + 1) twice in a row inside a click handler. Why might count only go up by 1?',
        options: [
          { label: 'React batches updates and the second call wins' },
          { label: 'Both calls capture the same closure value of count' },
          { label: 'setCount is asynchronous and only the last call lands' },
          { label: 'count is reset between calls' },
        ],
        correctIndex: 1,
        explanation:
          'Both calls read the same `count` from the same render. The fix is the function form: setCount(c => c + 1).',
        hintText: 'What does each call see when it reads `count`?',
      },
      {
        id: 'q3',
        type: 'multi',
        skillTag: 'state-rules',
        question: 'Which of these are true about React state? (select all that apply)',
        options: [
          { label: 'Mutating state directly may skip the re-render', correct: true },
          { label: 'State updates are synchronous', correct: false },
          { label: 'You should pass the function form when the next state depends on the previous', correct: true },
          { label: 'Components share their state by default', correct: false },
        ],
        correctIndices: [0, 2],
        explanation:
          'State is owned per component, updates are scheduled (not synchronous), and mutating in place causes React to skip the re-render because the reference stayed the same.',
        hintText: 'Two are true, two are false.',
      },
      {
        id: 'q4',
        type: 'single',
        skillTag: 'composition',
        question: 'Which is the better signal that you should extract a new component?',
        options: [
          { label: 'A function with more than 50 lines of code' },
          { label: 'JSX you find yourself copy-pasting in two places' },
          { label: 'Any component that uses useState' },
          { label: 'Anything that renders a list' },
        ],
        correctIndex: 1,
        explanation:
          'Repetition is the surest sign. Length, hooks, and lists are not by themselves reasons to extract.',
        hintText: 'The DRY principle: Don\'t Repeat Yourself.',
      },
      {
        id: 'q5',
        type: 'code-output',
        skillTag: 'closure-trap',
        question: 'What does this print after one button click?',
        codeSnippet: `function Counter() {\n  const [count, setCount] = useState(0);\n  function handleClick() {\n    setCount(count + 1);\n    setCount(count + 1);\n  }\n  return <button onClick={handleClick}>{count}</button>;\n}`,
        options: [
          { label: '0' },
          { label: '1' },
          { label: '2' },
          { label: 'NaN' },
        ],
        correctIndex: 1,
        explanation:
          'Both setCount calls capture the same `count` (0). The button shows 1 after one click. To get 2, use the function form: setCount(c => c + 1) twice.',
        hintText: 'Both setCount calls see the same `count` from the current render.',
      },
      {
        id: 'q6',
        type: 'single',
        skillTag: 'props',
        question: 'What is the right way to pass data into a component?',
        options: [
          { label: 'By mutating a global variable' },
          { label: 'Through props passed by the parent' },
          { label: 'Via setState from a sibling' },
          { label: 'By calling a method on the child instance' },
        ],
        correctIndex: 1,
        explanation:
          'Props are how parents talk to children in React. They are read-only — children should not mutate them.',
        hintText: 'It is the same answer in pretty much every React component.',
      },
    ],
  },
};

// Maps a skill tag to the lessons in the same module that cover it. Used to
// build the remediation path after a failed attempt.
export const skillToLessonMap = {
  'web-development:wd-m4': {
    'state-basics': ['wd-m4-l1', 'wd-m4-l4'],
    'closure-trap': ['wd-m4-l4'],
    'state-rules': ['wd-m4-l4'],
    composition: ['wd-m4-l2', 'wd-m4-l3'],
    props: ['wd-m4-l2'],
  },
};

export function getModuleAssessment(pathSlug, moduleId) {
  return moduleAssessments[`${pathSlug}:${moduleId}`] || null;
}

export function getSkillLessons(pathSlug, moduleId, skill) {
  return skillToLessonMap[`${pathSlug}:${moduleId}`]?.[skill] || [];
}
