import {
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  Clock,
  Flame,
  ArrowUpRight,
  Brain,
  BookOpen,
  CheckCircle2,
  Minus,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { Card, ProgressBar, Badge, StatCard, RadialProgress, MiniBarChart, RingChart, SectionHeader } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { weeklyActivity, studyTimeDistribution, recommendedRevision, recommendedLessons } from '@/data/demoData';

export default function LearningProgress() {
  const { subjects, masteryByTopic, weakTopics, strengths, quizScoreHistory, overallStats, studentProfile } = useApp();

  const avgScore = quizScoreHistory.length > 0
    ? Math.round(quizScoreHistory.reduce((sum, q) => sum + q.score, 0) / quizScoreHistory.length)
    : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-display text-navy-900">Learning Progress</h2>
        <p className="text-sm text-gray-400 mt-1">
          Track your mastery scores, quiz performance, and study patterns. Mastery updates automatically when you complete quizzes.
        </p>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Target} label="Overall Mastery" value={`${overallStats.masteryScore}%`} sublabel="across all subjects" color="violet" />
        <StatCard icon={Award} label="Quizzes Taken" value={quizScoreHistory.length} sublabel="all time" color="navy" />
        <StatCard icon={Clock} label="Total Study Time" value={`${studentProfile.totalStudyHours}h`} sublabel="since joining" color="amber" />
        <StatCard icon={Flame} label="Current Streak" value={`${studentProfile.streak} days`} sublabel="keep it going!" color="green" />
      </div>

      {/* Mastery by subject + Study time distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject mastery */}
        <Card className="p-6 lg:col-span-2 animate-slide-up">
          <SectionHeader title="Mastery by Subject" subtitle="Your proficiency across enrolled subjects" />
          <div className="space-y-5">
            {subjects.map((s) => (
              <div key={s.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      s.color === 'navy' ? 'bg-navy-50 text-navy-600' : 'bg-violet-50 text-violet-600'
                    }`}>
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.completed} / {s.lessons} lessons completed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold font-display text-navy-900">{s.mastery}%</span>
                    {s.mastery >= 75 && <ArrowUpRight className="w-4 h-4 text-green-500 inline ml-1" />}
                  </div>
                </div>
                <ProgressBar
                  value={s.mastery}
                  color={s.mastery >= 75 ? 'green' : s.mastery >= 60 ? 'amber' : 'rose'}
                  size="md"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Study time distribution ring */}
        <Card className="p-6 animate-slide-up flex flex-col">
          <SectionHeader title="Study Time" subtitle="Hours per subject" />
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <RingChart
              data={studyTimeDistribution.map((d) => ({ value: d.hours, color: d.color }))}
              size={180}
            />
            <div className="w-full space-y-2">
              {studyTimeDistribution.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${d.color === 'navy' ? 'bg-navy-400' : 'bg-violet-400'}`} />
                    <span className="text-gray-500 font-medium">{d.subject}</span>
                  </div>
                  <span className="font-bold text-navy-900">{d.hours}h</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Strengths + Weak topics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card className="p-6 animate-slide-up">
          <SectionHeader title="Your Strengths" subtitle="Topics you've mastered well" />
          <div className="space-y-4">
            {strengths.map((t) => (
              <div key={t.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{t.topic}</p>
                    <p className="text-xs text-gray-400">{t.subject}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-sm font-bold text-navy-900">{t.mastery}%</span>
                  </div>
                </div>
                <ProgressBar value={t.mastery} color="green" size="sm" />
              </div>
            ))}
          </div>
        </Card>

        {/* Weak topics */}
        <Card className="p-6 animate-slide-up">
          <SectionHeader title="Weak Topics" subtitle="Areas that need improvement" />
          <div className="space-y-4">
            {weakTopics.map((t) => {
              const TrendIcon = t.trend === 'up' ? TrendingUp : t.trend === 'down' ? TrendingDown : Minus;
              const trendColor = t.trend === 'up' ? 'text-green-500' : t.trend === 'down' ? 'text-rose-500' : 'text-gray-400';
              const barColor = t.mastery < 45 ? 'rose' : t.mastery < 60 ? 'amber' : 'navy';
              return (
                <div key={t.id}>
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
      </div>

      {/* Mastery by topic — horizontal bar chart */}
      <Card className="p-6 animate-slide-up">
        <SectionHeader title="Topic-wise Mastery" subtitle="Detailed breakdown — updates from completed quizzes" />
        <div className="space-y-3">
          {masteryByTopic.map((t) => {
            const barColor = t.mastery >= 75 ? 'green' : t.mastery >= 60 ? 'amber' : t.mastery < 45 ? 'rose' : 'navy';
            return (
              <div key={t.topic} className="flex items-center gap-4">
                <span className="text-sm font-medium text-navy-700 w-40 sm:w-48 truncate shrink-0">{t.topic}</span>
                <div className="flex-1">
                  <ProgressBar value={t.mastery} color={barColor} size="sm" />
                </div>
                <span className="text-sm font-bold text-navy-900 w-12 text-right shrink-0">{t.mastery}%</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Quiz score history + Assessment history */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2 animate-slide-up">
          <SectionHeader
            title="Quiz Score History"
            subtitle="Your performance trend over time"
            action={
              <div className="flex items-center gap-1.5 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="font-semibold text-green-600">+33%</span>
                <span className="text-gray-400 text-xs">improvement</span>
              </div>
            }
          />
          <div className="flex items-end justify-between gap-2 h-44 pt-4">
            {quizScoreHistory.map((q, i) => {
              const height = (q.score / 100) * 100;
              const isLow = q.score < 65;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-xs font-bold text-navy-900 opacity-0 group-hover:opacity-100 transition-opacity">{q.score}%</span>
                  <div className="w-full flex items-end justify-center flex-1">
                    <div
                      className={`w-full max-w-[28px] rounded-t-lg transition-all duration-700 ease-out hover:opacity-80 ${
                        isLow ? 'bg-gradient-to-t from-rose-400 to-rose-300' : 'bg-gradient-to-t from-violet-500 to-violet-300'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{q.quiz}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-sm">
            <span className="text-gray-400">Average score</span>
            <span className="font-bold text-navy-900">{avgScore}%</span>
          </div>
        </Card>

        {/* Assessment history list */}
        <Card className="p-6 animate-slide-up flex flex-col">
          <SectionHeader title="Assessment History" subtitle="Recent quiz results" />
          <div className="flex-1 space-y-2 overflow-y-auto scrollbar-thin">
            {quizScoreHistory.slice().reverse().slice(0, 8).map((q, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-50">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  q.score >= 80 ? 'bg-green-100 text-green-600' : q.score >= 60 ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                }`}>
                  {q.score}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-navy-800 truncate">{q.quiz}</p>
                  <p className="text-[11px] text-gray-400">{q.subject} • {q.date}</p>
                </div>
                <span className={`text-sm font-bold ${
                  q.score >= 80 ? 'text-green-600' : q.score >= 60 ? 'text-amber-600' : 'text-rose-500'
                }`}>{q.score}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recommended revision */}
      <Card className="p-6 animate-slide-up">
        <SectionHeader
          title="Recommended Revision"
          subtitle="AI-suggested areas to review based on your mastery"
        />
        <div className="space-y-3">
          {recommendedRevision.map((r) => (
            <div key={r.id} className="flex items-center gap-3 p-4 rounded-xl border border-gray-50 hover:border-violet-100 hover:bg-violet-50/20 transition-all">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-navy-900">{r.topic}</p>
                <p className="text-xs text-gray-400 mt-0.5">{r.reason}</p>
              </div>
              <div className="hidden sm:block text-right">
                <Badge color="navy" variant="soft">{r.subject}</Badge>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-50 text-violet-600 text-xs font-semibold hover:bg-violet-100 transition-colors whitespace-nowrap">
                {r.action} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Weekly activity */}
      <Card className="p-6 animate-slide-up">
        <SectionHeader title="Weekly Study Activity" subtitle="Hours studied per day this week" />
        <MiniBarChart
          data={weeklyActivity.map((d) => ({ label: d.day, value: d.hours }))}
          color="navy"
          height={140}
        />
      </Card>

      {/* Recommended lessons */}
      <Card className="p-6 animate-slide-up">
        <SectionHeader title="Recommended Next Steps" subtitle="Lessons to improve your weak areas" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {recommendedLessons.slice(0, 4).map((lesson) => (
            <div key={lesson.id} className="flex items-start gap-3 p-3 rounded-xl border border-gray-50 hover:border-violet-200 transition-all">
              <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-600 flex items-center justify-center shrink-0">
                <Brain className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-navy-900 leading-snug">{lesson.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge color="navy" variant="soft">{lesson.subject}</Badge>
                  <span className="text-xs text-gray-400">{lesson.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
