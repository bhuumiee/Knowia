// ============================================================
// DEMO DATA — Clearly labelled mock data for the Knowvia UI.
// No backend connected. Replace these with real Flask API calls
// when the backend is implemented. Everything here is SAMPLE DATA.
// ============================================================

export const studentProfile = {
  name: 'Alex Rivera',
  email: 'alex.rivera@knowvia.edu',
  avatarInitials: 'AR',
  grade: 'Undergraduate — Year 2',
  major: 'Computer Science',
  streak: 12,
  joinedDate: 'March 2026',
  totalStudyHours: 47,
  lessonsCompleted: 28,
  currentLevel: 'Intermediate',
};

export const initialOverallStats = {
  masteryScore: 72,
  weeklyProgress: 68,
  studyGoalHours: 10,
  studyHoursThisWeek: 7.5,
  rank: 'Top 15%',
};

export const weeklyActivity = [
  { day: 'Mon', hours: 1.5, lessons: 3 },
  { day: 'Tue', hours: 2.0, lessons: 4 },
  { day: 'Wed', hours: 0.5, lessons: 1 },
  { day: 'Thu', hours: 1.0, lessons: 2 },
  { day: 'Fri', hours: 1.5, lessons: 3 },
  { day: 'Sat', hours: 0.0, lessons: 0 },
  { day: 'Sun', hours: 1.0, lessons: 2 },
];

export const initialWeakTopics = [
  { id: 'wt1', topic: 'Recursion & Backtracking', subject: 'Data Structures', mastery: 38, trend: 'down' },
  { id: 'wt2', topic: 'Bayes Theorem', subject: 'Probability', mastery: 42, trend: 'stable' },
  { id: 'wt3', topic: 'Graph Traversal (BFS/DFS)', subject: 'Algorithms', mastery: 45, trend: 'up' },
  { id: 'wt4', topic: 'Normalization (3NF/BCNF)', subject: 'Databases', mastery: 48, trend: 'up' },
];

export const initialStrengths = [
  { id: 'st1', topic: 'Arrays & Strings', subject: 'Data Structures', mastery: 92 },
  { id: 'st2', topic: 'Stacks & Queues', subject: 'Data Structures', mastery: 88 },
  { id: 'st3', topic: 'Hash Tables', subject: 'Data Structures', mastery: 80 },
  { id: 'st4', topic: 'Sorting Algorithms', subject: 'Algorithms', mastery: 78 },
];

export const recommendedLessons = [
  {
    id: 'rl1',
    title: 'Understanding Recursion: Base Cases & Recursive Steps',
    subject: 'Data Structures',
    duration: '25 min',
    difficulty: 'Intermediate',
    reason: 'Based on your weak area in Recursion & Backtracking',
    type: 'video',
    progress: 0,
  },
  {
    id: 'rl2',
    title: 'Bayes Theorem with Real-World Examples',
    subject: 'Probability',
    duration: '18 min',
    difficulty: 'Beginner',
    reason: 'Your quiz scores in Probability are below average',
    type: 'reading',
    progress: 30,
  },
  {
    id: 'rl3',
    title: 'BFS vs DFS: When to Use Each',
    subject: 'Algorithms',
    duration: '32 min',
    difficulty: 'Advanced',
    reason: 'Recommended after completing Graph Basics',
    type: 'video',
    progress: 0,
  },
  {
    id: 'rl4',
    title: 'Database Normalization Step by Step',
    subject: 'Databases',
    duration: '40 min',
    difficulty: 'Intermediate',
    reason: 'Your last quiz flagged normalization as a gap',
    type: 'interactive',
    progress: 60,
  },
];

export const recentActivity = [
  { id: 'a1', action: 'Completed quiz', detail: 'Graph Basics — Score: 85%', time: '2 hours ago', type: 'quiz' },
  { id: 'a2', action: 'Finished lesson', detail: 'Hash Tables & Collision Resolution', time: '5 hours ago', type: 'lesson' },
  { id: 'a3', action: 'Asked AI Tutor', detail: 'How does quicksort work?', time: 'Yesterday', type: 'chat' },
  { id: 'a4', action: 'Completed quiz', detail: 'Probability Fundamentals — Score: 62%', time: '2 days ago', type: 'quiz' },
  { id: 'a5', action: 'Uploaded material', detail: 'lecture_notes_week_8.pdf', time: '3 days ago', type: 'upload' },
];

export const initialSubjects = [
  { id: 's1', name: 'Data Structures', mastery: 78, color: 'navy', lessons: 12, completed: 9 },
  { id: 's2', name: 'Algorithms', mastery: 65, color: 'violet', lessons: 10, completed: 6 },
  { id: 's3', name: 'Probability & Statistics', mastery: 58, color: 'navy', lessons: 8, completed: 5 },
  { id: 's4', name: 'Databases', mastery: 82, color: 'violet', lessons: 7, completed: 6 },
  { id: 's5', name: 'Discrete Math', mastery: 70, color: 'navy', lessons: 6, completed: 4 },
];

// ---- Course Materials ----

export const initialMaterials = [
  {
    id: 'm1',
    name: 'Data Structures Textbook — Ch. 1-5.pdf',
    type: 'PDF',
    size: '4.2 MB',
    uploadedAt: '2 days ago',
    subject: 'Data Structures',
    status: 'processed',
    pages: 184,
    extractedTopics: ['Arrays', 'Linked Lists', 'Stacks & Queues', 'Hash Tables', 'Trees', 'Binary Search Trees'],
    summary: 'Covers fundamental data structures including array operations, linked list traversal, stack/queue implementations, hash table collision resolution, and tree traversals. Includes practice problems for each chapter.',
    metadata: {
      author: 'Dr. Sarah Chen',
      course: 'CS 201',
      semester: 'Fall 2026',
      language: 'English',
      pagesProcessed: 184,
    },
  },
  {
    id: 'm2',
    name: 'Algorithms Lecture Slides — Week 8.pptx',
    type: 'PowerPoint',
    size: '8.7 MB',
    uploadedAt: '3 days ago',
    subject: 'Algorithms',
    status: 'processed',
    pages: 42,
    extractedTopics: ['Sorting Algorithms', 'Quick Sort', 'Merge Sort', 'Graph Traversal', 'BFS', 'DFS'],
    summary: 'Week 8 lecture slides covering comparison-based sorting (quick sort, merge sort) and graph traversal algorithms (BFS, DFS) with complexity analysis and pseudocode examples.',
    metadata: {
      author: 'Prof. Raj Kumar',
      course: 'CS 301',
      semester: 'Fall 2026',
      language: 'English',
      pagesProcessed: 42,
    },
  },
  {
    id: 'm3',
    name: 'Probability Lecture Recording.mp4',
    type: 'Video',
    size: '156 MB',
    uploadedAt: '5 days ago',
    subject: 'Probability & Statistics',
    status: 'processing',
    pages: null,
    extractedTopics: [],
    summary: null,
    metadata: {
      duration: '52 min',
      course: 'MA 301',
      semester: 'Fall 2026',
    },
  },
  {
    id: 'm4',
    name: 'Database Design Notes.pdf',
    type: 'PDF',
    size: '1.8 MB',
    uploadedAt: '1 week ago',
    subject: 'Databases',
    status: 'processed',
    pages: 67,
    extractedTopics: ['ER Diagrams', 'Normalization', '1NF', '2NF', '3NF', 'BCNF', 'SQL Joins'],
    summary: 'Comprehensive notes on database design principles including entity-relationship modeling, functional dependencies, and normalization forms from 1NF through BCNF with worked examples.',
    metadata: {
      author: 'Dr. Maria Lopez',
      course: 'CS 350',
      semester: 'Spring 2026',
      language: 'English',
      pagesProcessed: 67,
    },
  },
];

export const uploadAreaConfig = [
  {
    id: 'pdf',
    label: 'PDF Documents',
    description: 'Textbooks, lecture notes, study guides',
    accept: '.pdf',
    icon: 'FileText',
    color: 'navy',
  },
  {
    id: 'pptx',
    label: 'PowerPoint Slides',
    description: 'Lecture slides, presentations',
    accept: '.pptx,.ppt',
    icon: 'Presentation',
    color: 'violet',
  },
  {
    id: 'video',
    label: 'Lecture Videos',
    description: 'Recorded lectures, tutorials',
    accept: 'video/*',
    icon: 'Video',
    color: 'navy',
  },
  {
    id: 'doc',
    label: 'Text Documents',
    description: 'Word docs, plain text, notes',
    accept: '.docx,.doc,.txt',
    icon: 'FileType',
    color: 'violet',
  },
];

// ---- AI Tutor ----

export const tutorSubjects = [
  { id: 'tsub1', name: 'Data Structures', topics: ['Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Hash Tables', 'Trees', 'Graphs', 'Recursion', 'Dynamic Programming'] },
  { id: 'tsub2', name: 'Algorithms', topics: ['Sorting', 'Searching', 'Graph Traversal', 'Greedy Algorithms', 'Divide & Conquer', 'Backtracking'] },
  { id: 'tsub3', name: 'Probability & Statistics', topics: ['Basic Probability', 'Bayes Theorem', 'Distributions', 'Hypothesis Testing'] },
  { id: 'tsub4', name: 'Databases', topics: ['ER Diagrams', 'Normalization', 'SQL', 'Transactions', 'Indexing'] },
];

export const initialChatHistory = [
  {
    id: 'c1',
    role: 'user',
    content: 'Can you explain how a hash table works?',
    timestamp: '10:32 AM',
    subject: 'Data Structures',
    topic: 'Hash Tables',
  },
  {
    id: 'c2',
    role: 'ai',
    content:
      'A hash table is a data structure that maps keys to values using a hash function. The hash function takes a key and computes an index into an array of buckets, from which the desired value can be found.\n\nKey concepts:\n1. **Hash Function** — converts a key into an array index.\n2. **Collision** — when two different keys produce the same index.\n3. **Collision Resolution** — techniques like chaining (linked lists at each bucket) or open addressing (probing for the next empty slot).\n\nAverage time complexity for insert, lookup, and delete is O(1), but worst case is O(n) if many collisions occur.',
    timestamp: '10:32 AM',
    citations: [
      { source: 'Data Structures Textbook — Ch. 3', page: 47, type: 'PDF', materialId: 'm1' },
      { source: 'Algorithms Lecture Slides — Week 8', page: 12, type: 'PowerPoint', materialId: 'm2' },
    ],
    covered: true,
  },
  {
    id: 'c3',
    role: 'user',
    content: "What's the difference between chaining and open addressing?",
    timestamp: '10:35 AM',
    subject: 'Data Structures',
    topic: 'Hash Tables',
  },
  {
    id: 'c4',
    role: 'ai',
    content:
      'Great follow-up! Here are the key differences:\n\n**Chaining:**\n- Each bucket stores a linked list (or other structure) of all key-value pairs that hash to that index.\n- Simple to implement and handles high load factors well.\n- Uses extra memory for linked list pointers.\n\n**Open Addressing:**\n- All elements live in the array itself. On collision, probe for the next available slot (linear probing, quadratic probing, or double hashing).\n- More cache-friendly since everything is in one array.\n- Performance degrades sharply when the table gets nearly full.\n\nA good rule of thumb: use chaining when you expect frequent insertions and deletions; use open addressing when you need speed and memory is tight.',
    timestamp: '10:35 AM',
    citations: [
      { source: 'Data Structures Textbook — Ch. 3', page: 52, type: 'PDF', materialId: 'm1' },
    ],
    covered: true,
  },
];

// DEMO AI tutor responses — these are clearly mock responses, not real AI output.
// When the Flask backend is connected, replace handleSend() with a fetch() call.
export const demoTutorResponses = [
  {
    content:
      "Dynamic programming (DP) is a technique for solving problems by breaking them into overlapping subproblems and storing results to avoid redundant computation.\n\n**Key principles:**\n1. **Overlapping subproblems** — the same subproblem is solved multiple times.\n2. **Optimal substructure** — the optimal solution to the problem contains optimal solutions to its subproblems.\n\n**Two approaches:**\n- **Top-down (Memoization):** Recursion + caching results.\n- **Bottom-up (Tabulation):** Iterative, building from smallest subproblems up.\n\n**Classic example — Fibonacci:**\nInstead of recursively computing fib(n) = fib(n-1) + fib(n-2) in O(2^n), store each computed value in an array for O(n) time.",
    citations: [
      { source: 'Data Structures Textbook — Ch. 8', page: 210, type: 'PDF', materialId: 'm1' },
      { source: 'Algorithms Lecture Slides — Week 8', page: 28, type: 'PowerPoint', materialId: 'm2' },
    ],
    covered: true,
  },
  {
    content:
      "**BFS (Breadth-First Search)** explores all neighbors at the current depth before moving deeper.\n- Uses a **queue** (FIFO).\n- Guarantees shortest path in unweighted graphs.\n- Space: O(V)\n\n**DFS (Depth-First Search)** explores as far as possible along each branch before backtracking.\n- Uses a **stack** or recursion.\n- Does NOT guarantee shortest path.\n- Space: O(h) where h is the depth (can be O(V) worst case).\n\n**When to use each:**\n- BFS: shortest path, level-order traversal, closest connections.\n- DFS: topological sorting, cycle detection, solving mazes/puzzles.",
    citations: [
      { source: 'Algorithms Lecture Slides — Week 8', page: 15, type: 'PowerPoint', materialId: 'm2' },
    ],
    covered: true,
  },
  {
    content:
      "Database normalization to 3NF involves three main steps:\n\n**1NF (First Normal Form):**\n- Ensure all columns contain atomic (indivisible) values.\n- No repeating groups or arrays in a single cell.\n\n**2NF (Second Normal Form):**\n- Must be in 1NF.\n- Remove partial dependencies: every non-key attribute must depend on the ENTIRE primary key, not just part of it.\n\n**3NF (Third Normal Form):**\n- Must be in 2NF.\n- Remove transitive dependencies: no non-key attribute should depend on another non-key attribute.\n- Essentially: every non-key column depends on the key, the whole key, and nothing but the key.\n\n**Example:** If a table has (StudentID, CourseID, CourseName, Instructor), CourseName and Instructor depend on CourseID, not StudentID — so split into separate tables.",
    citations: [
      { source: 'Database Design Notes.pdf', page: 34, type: 'PDF', materialId: 'm4' },
    ],
    covered: true,
  },
  {
    content:
      "**Bayes Theorem** lets you update the probability of a hypothesis when new evidence appears.\n\n**Formula:**\nP(A|B) = P(B|A) × P(A) / P(B)\n\n**Reading it:**\n- P(A|B) = posterior: probability of A given B happened\n- P(B|A) = likelihood: probability of B given A is true\n- P(A) = prior: initial probability of A\n- P(B) = evidence: total probability of B\n\n**Step-by-step example:**\nA medical test is 99% accurate for a disease that affects 1 in 1000 people. You test positive. What's the probability you actually have it?\n- P(Disease) = 0.001, P(No Disease) = 0.999\n- P(Positive|Disease) = 0.99, P(Positive|No Disease) = 0.01\n- P(Positive) = (0.99 × 0.001) + (0.01 × 0.999) = 0.01098\n- P(Disease|Positive) = (0.99 × 0.001) / 0.01098 ≈ 9%\n\nSurprising, right? Even with a 99% accurate test, there's only a 9% chance you're sick — because the disease is rare!",
    citations: [
      { source: 'Probability Lecture Recording', page: null, type: 'Video', materialId: 'm3' },
    ],
    covered: true,
  },
];

export const suggestionPrompts = [
  'Explain dynamic programming with an example',
  'What is the difference between BFS and DFS?',
  'How do I normalize a database to 3NF?',
  'Walk me through Bayes theorem step by step',
];

// ---- Adaptive Quiz ----

export const quizSubjects = [
  { id: 'qsub1', name: 'Data Structures', topics: ['Hash Tables', 'Trees', 'Sorting', 'Graph Algorithms', 'Heaps'] },
  { id: 'qsub2', name: 'Algorithms', topics: ['Sorting', 'Graph Traversal', 'Dynamic Programming', 'Greedy Algorithms'] },
  { id: 'qsub3', name: 'Probability & Statistics', topics: ['Basic Probability', 'Bayes Theorem', 'Distributions'] },
  { id: 'qsub4', name: 'Databases', topics: ['Normalization', 'SQL Joins', 'ER Diagrams', 'Transactions'] },
];

export const questionTypes = [
  { id: 'mcq', label: 'Multiple Choice', description: 'Select one correct answer', icon: 'CheckSquare' },
  { id: 'short', label: 'Short Answer', description: 'Type a brief text answer', icon: 'PenLine' },
  { id: 'numerical', label: 'Numerical', description: 'Enter a numeric answer', icon: 'Hash' },
];

export const difficultyLevels = [
  { id: 'easy', label: 'Easy', description: 'Foundational concepts', color: 'green' },
  { id: 'medium', label: 'Medium', description: 'Application & analysis', color: 'amber' },
  { id: 'hard', label: 'Hard', description: 'Advanced problem-solving', color: 'rose' },
  { id: 'adaptive', label: 'Adaptive', description: 'AI adjusts difficulty', color: 'violet' },
];

// DEMO quiz questions — all three types.
// type: 'mcq' uses options + correctAnswer (index)
// type: 'short' uses acceptableAnswers (array of strings, case-insensitive)
// type: 'numerical' uses numericAnswer (number) + numericTolerance (number)
export const quizQuestions = [
  {
    id: 'q1',
    type: 'mcq',
    question: 'What is the average time complexity of inserting an element into a hash table?',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
    correctAnswer: 2,
    difficulty: 'Easy',
    explanation:
      'On average, hash table insertion is O(1) because the hash function directly computes the bucket index. In the worst case (many collisions), it can degrade to O(n).',
    topic: 'Hash Tables',
    subject: 'Data Structures',
    source: { source: 'Data Structures Textbook — Ch. 3', page: 47, type: 'PDF' },
  },
  {
    id: 'q2',
    type: 'mcq',
    question: 'In a binary search tree, what is the inorder traversal of: 5, 3, 7, 1, 4?',
    options: ['1, 3, 4, 5, 7', '5, 3, 7, 1, 4', '1, 4, 3, 5, 7', '5, 3, 1, 4, 7'],
    correctAnswer: 0,
    difficulty: 'Medium',
    explanation:
      'Inorder traversal visits left subtree, root, right subtree. For this BST, inorder gives sorted order: 1, 3, 4, 5, 7.',
    topic: 'Trees',
    subject: 'Data Structures',
    source: { source: 'Data Structures Textbook — Ch. 5', page: 142, type: 'PDF' },
  },
  {
    id: 'q3',
    type: 'mcq',
    question: 'Which sorting algorithm has a worst-case time complexity of O(n²) but average case of O(n log n)?',
    options: ['Merge Sort', 'Quick Sort', 'Bubble Sort', 'Radix Sort'],
    correctAnswer: 1,
    difficulty: 'Medium',
    explanation:
      'Quick Sort has O(n log n) average case but O(n²) worst case when the pivot is consistently the smallest or largest element. Merge Sort is always O(n log n).',
    topic: 'Sorting',
    subject: 'Algorithms',
    source: { source: 'Algorithms Lecture Slides — Week 8', page: 8, type: 'PowerPoint' },
  },
  {
    id: 'q4',
    type: 'short',
    question: 'What data structure does BFS use to track nodes to visit?',
    acceptableAnswers: ['queue', 'a queue', 'fifo', 'fifo queue'],
    difficulty: 'Medium',
    explanation:
      'BFS uses a queue (FIFO) to process nodes in the order they are discovered, which ensures all nodes at the current depth are visited before deeper nodes.',
    topic: 'Graph Traversal',
    subject: 'Algorithms',
    source: { source: 'Algorithms Lecture Slides — Week 8', page: 15, type: 'PowerPoint' },
  },
  {
    id: 'q5',
    type: 'numerical',
    question: 'A hash table has 10 slots and uses simple modulo hashing. If the key is 37, which slot does it map to?',
    numericAnswer: 7,
    numericTolerance: 0,
    difficulty: 'Easy',
    explanation:
      '37 mod 10 = 7. The hash function h(k) = k mod m maps key 37 to slot 7 in a table with 10 slots.',
    topic: 'Hash Tables',
    subject: 'Data Structures',
    source: { source: 'Data Structures Textbook — Ch. 3', page: 50, type: 'PDF' },
  },
  {
    id: 'q6',
    type: 'mcq',
    question: 'In a min-heap, which element is always at the root?',
    options: ['The largest element', 'The median element', 'The smallest element', 'A random element'],
    correctAnswer: 2,
    difficulty: 'Easy',
    explanation:
      'In a min-heap, the smallest element is always at the root. This property makes heaps useful for priority queues.',
    topic: 'Heaps',
    subject: 'Data Structures',
    source: { source: 'Data Structures Textbook — Ch. 6', page: 165, type: 'PDF' },
  },
  {
    id: 'q7',
    type: 'numerical',
    question: 'How many comparisons does bubble sort make for an array of 5 elements in the worst case?',
    numericAnswer: 10,
    numericTolerance: 0,
    difficulty: 'Hard',
    explanation:
      'Bubble sort makes n(n-1)/2 comparisons in the worst case. For n=5: 5×4/2 = 10 comparisons.',
    topic: 'Sorting',
    subject: 'Algorithms',
    source: { source: 'Algorithms Lecture Slides — Week 8', page: 5, type: 'PowerPoint' },
  },
];

// ---- Learning Progress ----

export const initialMasteryByTopic = [
  { topic: 'Arrays & Strings', subject: 'Data Structures', mastery: 92 },
  { topic: 'Linked Lists', subject: 'Data Structures', mastery: 85 },
  { topic: 'Stacks & Queues', subject: 'Data Structures', mastery: 88 },
  { topic: 'Hash Tables', subject: 'Data Structures', mastery: 80 },
  { topic: 'Trees', subject: 'Data Structures', mastery: 72 },
  { topic: 'Graphs', subject: 'Algorithms', mastery: 55 },
  { topic: 'Sorting', subject: 'Algorithms', mastery: 78 },
  { topic: 'Dynamic Programming', subject: 'Algorithms', mastery: 40 },
  { topic: 'Greedy Algorithms', subject: 'Algorithms', mastery: 62 },
  { topic: 'Recursion', subject: 'Data Structures', mastery: 38 },
];

export const initialQuizScoreHistory = [
  { quiz: 'Quiz 1', score: 55, subject: 'Data Structures', date: 'Mar 15' },
  { quiz: 'Quiz 2', score: 62, subject: 'Algorithms', date: 'Mar 22' },
  { quiz: 'Quiz 3', score: 70, subject: 'Data Structures', date: 'Mar 29' },
  { quiz: 'Quiz 4', score: 65, subject: 'Probability', date: 'Apr 5' },
  { quiz: 'Quiz 5', score: 78, subject: 'Algorithms', date: 'Apr 12' },
  { quiz: 'Quiz 6', score: 82, subject: 'Data Structures', date: 'Apr 19' },
  { quiz: 'Quiz 7', score: 85, subject: 'Databases', date: 'Apr 26' },
  { quiz: 'Quiz 8', score: 72, subject: 'Probability', date: 'May 3' },
  { quiz: 'Quiz 9', score: 88, subject: 'Data Structures', date: 'May 10' },
];

export const studyTimeDistribution = [
  { subject: 'Data Structures', hours: 18, color: 'navy' },
  { subject: 'Algorithms', hours: 12, color: 'violet' },
  { subject: 'Probability', hours: 8, color: 'navy' },
  { subject: 'Databases', hours: 6, color: 'violet' },
  { subject: 'Discrete Math', hours: 3, color: 'navy' },
];

export const recommendedRevision = [
  { id: 'rev1', topic: 'Recursion & Backtracking', reason: 'Mastery at 38% — below threshold', action: 'Review lesson + retake quiz', subject: 'Data Structures' },
  { id: 'rev2', topic: 'Dynamic Programming', reason: 'Mastery at 40% — needs reinforcement', action: 'Watch lesson video + practice', subject: 'Algorithms' },
  { id: 'rev3', topic: 'Bayes Theorem', reason: 'Last quiz score: 62%', action: 'Read notes + attempt quiz', subject: 'Probability' },
  { id: 'rev4', topic: 'Graph Traversal (BFS/DFS)', reason: 'Mastery at 55% — room to improve', action: 'Review slides + practice quiz', subject: 'Algorithms' },
];
