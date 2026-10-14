import { useState } from 'react';
import {
  ListChecks,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Trophy,
  Sparkles,
  Brain,
  Timer,
  ArrowRight,
  CheckSquare,
  PenLine,
  Hash,
  BookOpen,
} from 'lucide-react';
import { Card, Badge, ProgressBar, SectionHeader } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { quizSubjects, quizQuestions, difficultyLevels, questionTypes } from '@/data/demoData';

const questionTypeIcons = { CheckSquare, PenLine, Hash };

export default function AdaptiveQuiz() {
  const { recordQuizResult } = useApp();
  const [phase, setPhase] = useState('select');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedType, setSelectedType] = useState('mcq');
  const [selectedDifficulty, setSelectedDifficulty] = useState('adaptive');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [numericAnswerValue, setNumericAnswerValue] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [resultRecorded, setResultRecorded] = useState(false);

  // Filter questions by subject and topic, then by type
  const activeQuestions = quizQuestions.filter((q) => {
    if (selectedSubject && q.subject !== selectedSubject.name) return false;
    if (selectedTopic && q.topic !== selectedTopic) return false;
    return true;
  });

  // If filtered list is too small, fall back to all questions for that subject
  const quizPool = activeQuestions.length >= 2 ? activeQuestions : quizQuestions.filter((q) =>
    !selectedSubject || q.subject === selectedSubject.name
  );
  const finalPool = quizPool.length >= 2 ? quizPool : quizQuestions;

  const startQuiz = () => {
    setPhase('active');
    setCurrentQ(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setTextAnswer('');
    setNumericAnswerValue('');
    setShowFeedback(false);
    setTimeLeft(30);
    setResultRecorded(false);
  };

  const checkAnswer = (q, userAnswer) => {
    if (q.type === 'mcq') {
      return userAnswer === q.correctAnswer;
    }
    if (q.type === 'short') {
      const normalized = userAnswer.trim().toLowerCase();
      return q.acceptableAnswers.some((a) => a.toLowerCase() === normalized);
    }
    if (q.type === 'numerical') {
      const num = parseFloat(userAnswer);
      return !isNaN(num) && Math.abs(num - q.numericAnswer) <= (q.numericTolerance || 0);
    }
    return false;
  };

  const submitAnswer = () => {
    const q = finalPool[currentQ];
    let userAnswer;
    if (q.type === 'mcq') userAnswer = selectedAnswer;
    else if (q.type === 'short') userAnswer = textAnswer;
    else if (q.type === 'numerical') userAnswer = numericAnswerValue;

    if (userAnswer === null || userAnswer === '' || userAnswer === undefined) return;

    const isCorrect = checkAnswer(q, userAnswer);
    setShowFeedback(true);
    setAnswers((prev) => [...prev, {
      questionId: q.id,
      selected: userAnswer,
      correct: isCorrect,
      type: q.type,
    }]);
  };

  const nextQuestion = () => {
    if (currentQ + 1 < finalPool.length) {
      setCurrentQ((prev) => prev + 1);
      setSelectedAnswer(null);
      setTextAnswer('');
      setNumericAnswerValue('');
      setShowFeedback(false);
      setTimeLeft(30);
    } else {
      // Record result before showing results page
      if (!resultRecorded) {
        const score = answers.filter((a) => a.correct).length;
        const scorePct = answers.length > 0 ? Math.round((score / answers.length) * 100) : 0;
        recordQuizResult({
          subject: selectedSubject?.name || 'General',
          topic: selectedTopic || 'Mixed',
          scorePct,
          correct: score,
          total: answers.length,
          answers,
          questions: finalPool,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        });
        setResultRecorded(true);
      }
      setPhase('results');
    }
  };

  const resetQuiz = () => {
    setPhase('select');
    setSelectedSubject(null);
    setSelectedTopic(null);
    setSelectedAnswer(null);
    setTextAnswer('');
    setNumericAnswerValue('');
    setShowFeedback(false);
    setResultRecorded(false);
  };

  const score = answers.filter((a) => a.correct).length;
  const scorePct = answers.length > 0 ? Math.round((score / answers.length) * 100) : 0;

  // ---- SELECTION PHASE ----
  if (phase === 'select') {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h2 className="text-2xl font-bold font-display text-navy-900">Adaptive Quiz</h2>
          <p className="text-sm text-gray-400 mt-1">
            Test your knowledge with quizzes that adjust to your performance. Your scores update your mastery on the Progress page.
          </p>
        </div>

        {/* Subject selection */}
        <Card className="p-6 animate-slide-up">
          <SectionHeader title="Choose a Subject" subtitle="Select what you want to be quizzed on" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {quizSubjects.map((s) => {
              const active = selectedSubject?.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => { setSelectedSubject(s); setSelectedTopic(null); }}
                  className={`text-left p-4 rounded-xl border-2 transition-all group ${
                    active
                      ? 'border-violet-300 bg-violet-50/50 shadow-sm'
                      : 'border-gray-100 hover:border-violet-200 hover:bg-violet-50/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      active ? 'bg-violet-500 text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-violet-100 group-hover:text-violet-600'
                    } transition-all`}>
                      <ListChecks className="w-5 h-5" />
                    </div>
                    {active && <CheckCircle2 className="w-5 h-5 text-violet-500" />}
                  </div>
                  <p className="text-sm font-bold text-navy-900 mt-3">{s.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.topics.length} topics available</p>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Topic selection (appears after subject is chosen) */}
        {selectedSubject && (
          <Card className="p-6 animate-slide-up">
            <SectionHeader title="Choose a Topic" subtitle={`Topics in ${selectedSubject.name}`} />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTopic(null)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                  selectedTopic === null
                    ? 'border-violet-300 bg-violet-50 text-violet-700'
                    : 'border-gray-100 text-gray-500 hover:border-violet-200'
                }`}
              >
                All Topics
              </button>
              {selectedSubject.topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                    selectedTopic === t
                      ? 'border-violet-300 bg-violet-50 text-violet-700'
                      : 'border-gray-100 text-gray-500 hover:border-violet-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Question type + Difficulty */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 animate-slide-up">
            <SectionHeader title="Question Type" subtitle="How should questions be formatted?" />
            <div className="space-y-2">
              {questionTypes.map((qt) => {
                const Icon = questionTypeIcons[qt.icon] || CheckSquare;
                const active = selectedType === qt.id;
                return (
                  <button
                    key={qt.id}
                    onClick={() => setSelectedType(qt.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                      active ? 'border-violet-300 bg-violet-50/50' : 'border-gray-100 hover:border-violet-200'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      active ? 'bg-violet-500 text-white' : 'bg-gray-50 text-gray-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy-900">{qt.label}</p>
                      <p className="text-xs text-gray-400">{qt.description}</p>
                    </div>
                    {active && <CheckCircle2 className="w-5 h-5 text-violet-500 ml-auto shrink-0" />}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="p-6 animate-slide-up">
            <SectionHeader title="Difficulty" subtitle="Adaptive mode adjusts to your skill" />
            <div className="grid grid-cols-2 gap-3">
              {difficultyLevels.map((d) => {
                const active = selectedDifficulty === d.id;
                const colorClasses = {
                  green: { active: 'border-green-300 bg-green-50 text-green-700', inactive: 'border-gray-100 hover:border-green-200' },
                  amber: { active: 'border-amber-300 bg-amber-50 text-amber-700', inactive: 'border-gray-100 hover:border-amber-200' },
                  rose: { active: 'border-rose-300 bg-rose-50 text-rose-700', inactive: 'border-gray-100 hover:border-rose-200' },
                  violet: { active: 'border-violet-300 bg-violet-50 text-violet-700', inactive: 'border-gray-100 hover:border-violet-200' },
                };
                const c = colorClasses[d.color] || colorClasses.violet;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDifficulty(d.id)}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${active ? c.active : c.inactive}`}
                  >
                    {d.id === 'adaptive' && <Sparkles className={`w-4 h-4 mb-2 ${active ? 'text-violet-600' : 'text-gray-400'}`} />}
                    <p className="text-sm font-bold">{d.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{d.description}</p>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Start button */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={startQuiz}
            disabled={!selectedSubject}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-navy-600 to-violet-600 text-white font-semibold shadow-lg shadow-violet-200 hover:shadow-xl hover:shadow-violet-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <Brain className="w-5 h-5" />
            Start Quiz
            <ArrowRight className="w-5 h-5" />
          </button>
          {!selectedSubject && <p className="text-xs text-gray-400">Select a subject to begin</p>}
        </div>
      </div>
    );
  }

  // ---- ACTIVE PHASE ----
  if (phase === 'active') {
    const q = finalPool[currentQ];
    const progressPct = ((currentQ + (showFeedback ? 1 : 0)) / finalPool.length) * 100;
    const isCorrect = showFeedback && answers[answers.length - 1]?.correct;

    const canSubmit = q.type === 'mcq'
      ? selectedAnswer !== null
      : q.type === 'short'
        ? textAnswer.trim() !== ''
        : numericAnswerValue.trim() !== '';

    return (
      <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
        {/* Quiz header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-500 to-violet-500 flex items-center justify-center shadow-md">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-navy-900">{selectedSubject.name}</p>
              <p className="text-xs text-gray-400">Question {currentQ + 1} of {finalPool.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {selectedDifficulty === 'adaptive' && (
              <Badge color="violet"><Sparkles className="w-3 h-3" /> Adaptive</Badge>
            )}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100">
              <Timer className="w-4 h-4 text-gray-400" />
              <span className={`text-sm font-bold ${timeLeft < 10 ? 'text-rose-500' : 'text-navy-700'}`}>{timeLeft}s</span>
            </div>
          </div>
        </div>

        <ProgressBar value={progressPct} color="violet" size="lg" />

        {/* Question card */}
        <Card className="p-6 sm:p-8 animate-slide-up">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Badge color={
              q.difficulty === 'Easy' ? 'green' :
              q.difficulty === 'Medium' ? 'amber' : 'rose'
            }>
              {q.difficulty}
            </Badge>
            <Badge color="gray" variant="soft">{q.topic}</Badge>
            <Badge color="navy" variant="soft">
              {q.type === 'mcq' ? <CheckSquare className="w-3 h-3" /> : q.type === 'short' ? <PenLine className="w-3 h-3" /> : <Hash className="w-3 h-3" />}
              {q.type === 'mcq' ? 'Multiple Choice' : q.type === 'short' ? 'Short Answer' : 'Numerical'}
            </Badge>
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-display text-navy-900 leading-snug mb-6">
            {q.question}
          </h3>

          {/* Answer area depends on question type */}
          {q.type === 'mcq' && (
            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const isSelected = selectedAnswer === i;
                const isCorrectOpt = i === q.correctAnswer;
                let styles = 'border-gray-100 hover:border-violet-200 hover:bg-violet-50/20 text-navy-700';
                if (showFeedback) {
                  if (isCorrectOpt) styles = 'border-green-300 bg-green-50 text-green-700';
                  else if (isSelected) styles = 'border-rose-300 bg-rose-50 text-rose-700';
                  else styles = 'border-gray-100 text-gray-400 opacity-60';
                } else if (isSelected) {
                  styles = 'border-violet-400 bg-violet-50 text-navy-900';
                }
                return (
                  <button
                    key={i}
                    onClick={() => !showFeedback && setSelectedAnswer(i)}
                    disabled={showFeedback}
                    className={`w-full text-left flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${styles} ${!showFeedback && 'cursor-pointer'}`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 border-2 ${
                      showFeedback && isCorrectOpt ? 'border-green-400 bg-green-400 text-white' :
                      showFeedback && isSelected && !isCorrectOpt ? 'border-rose-400 bg-rose-400 text-white' :
                      isSelected ? 'border-violet-500 bg-violet-500 text-white' :
                      'border-gray-200 text-gray-400'
                    }`}>
                      {showFeedback && isCorrectOpt ? <CheckCircle2 className="w-5 h-5" /> :
                       showFeedback && isSelected && !isCorrectOpt ? <XCircle className="w-5 h-5" /> :
                       String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm font-medium">{opt}</span>
                  </button>
                );
              })}
            </div>
          )}

          {q.type === 'short' && (
            <div>
              <textarea
                value={textAnswer}
                onChange={(e) => !showFeedback && setTextAnswer(e.target.value)}
                disabled={showFeedback}
                placeholder="Type your answer here..."
                rows={3}
                className={`w-full p-4 rounded-xl border-2 text-sm outline-none transition-all resize-none ${
                  showFeedback
                    ? isCorrect
                      ? 'border-green-300 bg-green-50 text-green-700'
                      : 'border-rose-300 bg-rose-50 text-rose-700'
                    : 'border-gray-100 focus:border-violet-300 bg-gray-50/30 text-navy-900 placeholder-gray-400'
                }`}
              />
              {showFeedback && !isCorrect && (
                <p className="mt-2 text-xs text-gray-500">
                  Acceptable answers: {q.acceptableAnswers.join(', ')}
                </p>
              )}
            </div>
          )}

          {q.type === 'numerical' && (
            <div>
              <input
                type="number"
                value={numericAnswerValue}
                onChange={(e) => !showFeedback && setNumericAnswerValue(e.target.value)}
                disabled={showFeedback}
                placeholder="Enter a number..."
                className={`w-full p-4 rounded-xl border-2 text-lg font-semibold outline-none transition-all ${
                  showFeedback
                    ? isCorrect
                      ? 'border-green-300 bg-green-50 text-green-700'
                      : 'border-rose-300 bg-rose-50 text-rose-700'
                    : 'border-gray-100 focus:border-violet-300 bg-gray-50/30 text-navy-900 placeholder-gray-400'
                }`}
              />
              {showFeedback && !isCorrect && (
                <p className="mt-2 text-xs text-gray-500">
                  Correct answer: {q.numericAnswer}
                </p>
              )}
            </div>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className={`mt-5 p-4 rounded-xl border animate-slide-up ${
              isCorrect ? 'bg-green-50 border-green-200' : 'bg-rose-50 border-rose-200'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isCorrect ? 'bg-green-500 text-white' : 'bg-rose-500 text-white'
                }`}>
                  {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-bold ${isCorrect ? 'text-green-700' : 'text-rose-700'}`}>
                    {isCorrect ? 'Correct!' : 'Not quite right'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{q.explanation}</p>

                  {/* Source reference */}
                  {q.source && (
                    <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-100">
                      <BookOpen className="w-3.5 h-3.5 text-violet-500" />
                      <span className="text-xs text-gray-500">Source:</span>
                      <span className="text-xs font-semibold text-navy-700">{q.source.source}</span>
                      {q.source.page && <span className="text-xs text-gray-400">— Page {q.source.page}</span>}
                      <Badge color="violet" variant="soft">{q.source.type}</Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-6 flex justify-end">
            {!showFeedback ? (
              <button
                onClick={submitAnswer}
                disabled={!canSubmit}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-navy-600 to-violet-600 text-white text-sm font-semibold shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-navy-600 to-violet-600 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {currentQ + 1 < finalPool.length ? 'Next Question' : 'See Results'}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </Card>

        {/* Mini stats */}
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="font-semibold text-navy-900">{answers.filter(a => a.correct).length}</span>
            <span className="text-gray-400">correct</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-rose-500" />
            <span className="font-semibold text-navy-900">{answers.filter(a => !a.correct).length}</span>
            <span className="text-gray-400">wrong</span>
          </div>
        </div>
      </div>
    );
  }

  // ---- RESULTS PHASE ----
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      {/* Results hero */}
      <Card className="p-8 text-center animate-slide-up overflow-hidden relative">
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-violet-100/50 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-navy-100/50 blur-3xl" />
        <div className="relative">
          <div className={`w-20 h-20 rounded-2xl mx-auto flex items-center justify-center shadow-lg ${
            scorePct >= 80 ? 'bg-gradient-to-br from-green-400 to-green-600' :
            scorePct >= 60 ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
            'bg-gradient-to-br from-rose-400 to-rose-600'
          }`}>
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold font-display text-navy-900 mt-4">
            {scorePct >= 80 ? 'Excellent Work!' : scorePct >= 60 ? 'Good Effort!' : 'Keep Practicing!'}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {selectedSubject.name} • {selectedTopic || 'All Topics'} • {selectedDifficulty} mode
          </p>

          <div className="mt-6 flex items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold font-display text-navy-900">{scorePct}%</p>
              <p className="text-xs text-gray-400 mt-1">Score</p>
            </div>
            <div className="w-px h-12 bg-gray-100" />
            <div className="text-center">
              <p className="text-4xl font-bold font-display text-green-600">{score}</p>
              <p className="text-xs text-gray-400 mt-1">Correct</p>
            </div>
            <div className="w-px h-12 bg-gray-100" />
            <div className="text-center">
              <p className="text-4xl font-bold font-display text-rose-500">{answers.length - score}</p>
              <p className="text-xs text-gray-400 mt-1">Wrong</p>
            </div>
          </div>

          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-600 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Mastery updated on Progress page
          </div>
        </div>
      </Card>

      {/* AI insight */}
      <Card className="p-6 animate-slide-up border-violet-100 bg-violet-50/30">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-500 to-violet-500 flex items-center justify-center shrink-0 shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-navy-900">AI Insight <span className="text-xs font-normal text-gray-400">(demo)</span></p>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
              {scorePct >= 80
                ? `Outstanding! You've mastered the fundamentals of ${selectedSubject.name}. The AI recommends moving to advanced-level questions to push your limits further.`
                : scorePct >= 60
                ? `Good progress! Focus on reviewing the topics you missed to boost your score above 80%.`
                : `Don't worry — learning takes time! Review the lesson materials for ${selectedSubject.name} and retake the quiz. Your weak areas have been added to your Focus Areas.`}
            </p>
          </div>
        </div>
      </Card>

      {/* Question review */}
      <Card className="p-6 animate-slide-up">
        <SectionHeader title="Question Review" subtitle="See how you did on each question" />
        <div className="space-y-2">
          {finalPool.map((q, i) => {
            const ans = answers.find((a) => a.questionId === q.id);
            const correct = ans?.correct;
            return (
              <div key={q.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-50">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  correct ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-600'
                }`}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy-800 truncate">{q.question}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">{q.topic}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-400 capitalize">{q.type}</span>
                  </div>
                </div>
                <Badge color={correct ? 'green' : 'rose'} variant="soft">
                  {correct ? 'Correct' : 'Wrong'}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={startQuiz}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-navy-600 to-violet-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          Retake Quiz
        </button>
        <button
          onClick={resetQuiz}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-50 text-navy-700 font-semibold hover:bg-gray-100 transition-all"
        >
          <ListChecks className="w-4 h-4" />
          Choose Different Topic
        </button>
      </div>
    </div>
  );
}
