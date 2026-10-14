import {
  Clock,
  BookOpen,
  Target,
  TrendingUp,
  TrendingDown,
  Minus,
  PlayCircle,
  FileText,
  MousePointerClick,
  ArrowRight,
  Flame,
  Award,
  HelpCircle,
  Upload as UploadIcon,
  Lightbulb,
} from 'lucide-react';
import { Card, ProgressBar, Badge, StatCard, RadialProgress, MiniBarChart, SectionHeader } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { weeklyActivity, recentActivity, recommendedLessons } from '@/data/demoData';

const typeIcons = { video: PlayCircle, reading: FileText, interactive: MousePointerClick };
const activityIcons = {
  quiz: HelpCircle,
  lesson: BookOpen,
  chat: Lightbulb,
  upload: UploadIcon,
};

export default function Dashboard({ onNavigate }) {
  const { studentProfile, overallStats, weakTopics, subjects, quizScoreHistory } = useApp();
  const goalPct = Math.round((overallStats.studyHoursThisWeek / overallStats.studyGoalHours) * 100);

  const recentQuizzes = quizScoreHistory.slice(-3).reverse();
  const recentlyStudied = subjects.slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-600 via-navy-700 to-violet-700 p-6 sm:p-8">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-navy-400/20 blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-violet-200 text-sm font-medium">Welcome back,</p>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">{studentProfile.name}</h2>
            <p className="text-navy-200 text-sm mt-2 max-w-md">
              You're on a {studentProfile.streak}-day streak. Your overall mastery is {overallStats.masteryScore}% — keep going!
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-white text-xs font-semibold">
                <Flame className="w-3.5 h-3.5" /> {studentProfile.streak} day streak
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-white text-xs font-semibold">
                <Award className="w-3.5 h-3.5" /> {overallStats.rank}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-white text-xs font-semibold">
                <Target className="w-3.5 h-3.5" /> {studentProfile.currentLevel}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 shrink-0">
            <RadialProgress value={overallStats.masteryScore} size={130} color="#c4b5fd" label="Mastery" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Clock} label="Study Hours" value={overallStats.studyHoursThisWeek} sublabel={`of ${overallStats.studyGoalHours}h goal`} color="navy" />
        <StatCard icon={BookOpen} label="Lessons Completed" value={studentProfile.lessonsCompleted} sublabel="this month" color="violet" />
        <StatCard icon={Target} label="Weekly Goal" value={`${goalPct}%`} sublabel="on track" color="green" />
        <StatCard icon={TrendingUp} label="Quizzes Taken" value={quizScoreHistory.length} sublabel={`${studentProfile.currentLevel} level`} color="amber" />
      </div>

      {/* Weekly activity chart + Study goal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2 animate-slide-up">
          <SectionHeader title="Weekly Activity" subtitle="Study hours and lessons completed" />
          <MiniBarChart
            data={weeklyActivity.map((d) => ({ label: d.day, value: d.hours }))}
            color="violet"
            height={140}
          />
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-sm">
            <span className="text-gray-400">Total this week</span>
            <span className="font-semibold text-navy-900">{overallStats.studyHoursThisWeek}h / {overallStats.studyGoalHours}h</span>
          </div>
        </Card>

        <Card className="p-6 animate-slide-up flex flex-col">
          <SectionHeader title="Study Goal" subtitle="Weekly target" />
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <RadialProgress value={goalPct} size={150} color="#344ef7" label="Complete" />
            <div className="w-full">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Progress</span>
                <span className="font-semibold text-navy-900">{overallStats.studyHoursThisWeek}h / {overallStats.studyGoalHours}h</span>
              </div>
              <ProgressBar value={goalPct} color="navy" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recently studied + Recent quiz scores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recently studied subjects */}
        <Card className="p-6 animate-slide-up">
          <SectionHeader
            title="Recently Studied"
            subtitle="Subjects you've been working on"
            action={
              <button onClick={() => onNavigate('progress')} className="text-sm text-violet-600 font-semibold hover:text-violet-700 flex items-center gap-1">
                Details <ArrowRight className="w-4 h-4" />
              </button>
            }
          />
          <div className="space-y-4">
            {recentlyStudied.map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color === 'navy' ? 'bg-navy-50 text-navy-600' : 'bg-violet-50 text-violet-600'}`}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-navy-900">{s.name}</p>
                    <span className="text-sm font-bold text-navy-900">{s.mastery}%</span>
                  </div>
                  <ProgressBar value={s.mastery} color={s.color} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent quiz scores */}
        <Card className="p-6 animate-slide-up">
          <SectionHeader
            title="Recent Quiz Scores"
            subtitle="Your latest assessments"
            action={
              <button onClick={() => onNavigate('quiz')} className="text-sm text-violet-600 font-semibold hover:text-violet-700 flex items-center gap-1">
                Practice <ArrowRight className="w-4 h-4" />
              </button>
            }
          />
          <div className="space-y-3">
            {recentQuizzes.map((q, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-50 hover:border-violet-100 transition-colors">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  q.score >= 80 ? 'bg-green-50 text-green-600' : q.score >= 60 ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy-900">{q.quiz}</p>
                  <p className="text-xs text-gray-400">{q.subject} • {q.date}</p>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${q.score >= 80 ? 'text-green-600' : q.score >= 60 ? 'text-amber-600' : 'text-rose-500'}`}>
                    {q.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Weak topics + Recommended lessons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weak topics */}
        <Card className="p-6 animate-slide-up">
          <SectionHeader
            title="Focus Areas"
            subtitle="Topics that need attention"
            action={
              <button onClick={() => onNavigate('quiz')} className="text-sm text-violet-600 font-semibold hover:text-violet-700 flex items-center gap-1">
                Practice <ArrowRight className="w-4 h-4" />
              </button>
            }
          />
          <div className="space-y-4">
            {weakTopics.map((t) => {
              const TrendIcon = t.trend === 'up' ? TrendingUp : t.trend === 'down' ? TrendingDown : Minus;
              const trendColor = t.trend === 'up' ? 'text-green-500' : t.trend === 'down' ? 'text-rose-500' : 'text-gray-400';
              const barColor = t.mastery < 45 ? 'rose' : t.mastery < 60 ? 'amber' : 'navy';
              return (
                <div key={t.id} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{t.topic}</p>
                      <p className="text-xs text-gray-400">{t.subject}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${trendColor} flex items-center`}>
                        <TrendIcon className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-sm font-bold text-navy-900">{t.mastery}%</span>
                    </div>
                  </div>
                  <ProgressBar value={t.mastery} color={barColor} size="sm" />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recommended lessons */}
        <Card className="p-6 animate-slide-up">
          <SectionHeader
            title="Recommended Next Lesson"
            subtitle="AI-personalized based on your progress"
            action={
              <button onClick={() => onNavigate('tutor')} className="text-sm text-violet-600 font-semibold hover:text-violet-700 flex items-center gap-1">
                Ask Tutor <ArrowRight className="w-4 h-4" />
              </button>
            }
          />
          <div className="space-y-3">
            {recommendedLessons.slice(0, 3).map((lesson) => {
              const Icon = typeIcons[lesson.type] || BookOpen;
              return (
                <div
                  key={lesson.id}
                  className="group flex items-start gap-3 p-3 rounded-xl border border-gray-50 hover:border-violet-200 hover:bg-violet-50/30 transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 group-hover:bg-violet-100 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy-900 leading-snug">{lesson.title}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <Badge color="navy" variant="soft">{lesson.subject}</Badge>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {lesson.duration}
                      </span>
                      <Badge
                        color={lesson.difficulty === 'Beginner' ? 'green' : lesson.difficulty === 'Advanced' ? 'rose' : 'amber'}
                        variant="soft"
                      >
                        {lesson.difficulty}
                      </Badge>
                    </div>
                    {lesson.progress > 0 && (
                      <div className="mt-2">
                        <ProgressBar value={lesson.progress} color="violet" size="sm" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Recent activity */}
      <Card className="p-6 animate-slide-up">
        <SectionHeader title="Recent Activity" subtitle="Your latest learning actions" />
        <div className="space-y-1">
          {recentActivity.map((a) => {
            const Icon = activityIcons[a.type] || BookOpen;
            return (
              <div key={a.id} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                <div className="w-9 h-9 rounded-xl bg-gray-50 text-gray-500 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy-900">{a.action}</p>
                  <p className="text-xs text-gray-400 truncate">{a.detail}</p>
                </div>
                <span className="text-xs text-gray-300 font-medium shrink-0">{a.time}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
