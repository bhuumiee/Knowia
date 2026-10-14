import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Paperclip,
  BookOpen,
  FileText,
  Presentation,
  Video,
  Lightbulb,
  RefreshCw,
  AlertTriangle,
  Info,
  ChevronDown,
} from 'lucide-react';
import { Badge } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { tutorSubjects, demoTutorResponses, suggestionPrompts } from '@/data/demoData';

const citationIcons = { PDF: FileText, PowerPoint: Presentation, Video: BookOpen };

// Response when the topic is not covered by uploaded materials.
// This is clearly a mock — the real coverage check will be done by the Flask backend.
const notCoveredResponse = {
  content:
    "I don't have any uploaded materials that cover this topic yet. I can give you a general explanation, but I won't be able to cite specific source pages or slides.\n\nTo get source-backed answers, please upload relevant textbooks, slides, or lecture videos from the Upload Materials page. Once processed, I'll reference them directly in my responses.",
  citations: [],
  covered: false,
};

function formatBold(text) {
  return text.split('\n').map((line, i) => (
    <span key={i}>
      {line.includes('**') ? (
        <span dangerouslySetInnerHTML={{
          __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
        }} />
      ) : line}
      {i < text.split('\n').length - 1 && <br />}
    </span>
  ));
}

export default function AITutor() {
  const { chatHistory, addChatMessage, clearChat, materials } = useApp();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(tutorSubjects[0].name);
  const [selectedTopic, setSelectedTopic] = useState(tutorSubjects[0].topics[0]);
  const [subjectDropdownOpen, setSubjectDropdownOpen] = useState(false);
  const scrollRef = useRef(null);
  const responseIndex = useRef(0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [chatHistory, isTyping]);

  const handleSubjectChange = (subjectName) => {
    setSelectedSubject(subjectName);
    const subj = tutorSubjects.find((s) => s.name === subjectName);
    setSelectedTopic(subj.topics[0]);
    setSubjectDropdownOpen(false);
  };

  const handleSend = (text) => {
    const message = (text || input).trim();
    if (!message) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    addChatMessage({
      id: `u-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: now,
      subject: selectedSubject,
      topic: selectedTopic,
    });
    setInput('');
    setIsTyping(true);

    // DEMO: Simulates AI response with a delay.
    // When the Flask backend is connected, replace with:
    //   fetch('/api/tutor', { method: 'POST', body: JSON.stringify({ question, subject, topic }) })
    setTimeout(() => {
      // Check if any processed material covers this subject
      const hasMaterial = materials.some(
        (m) => m.status === 'processed' && m.subject.toLowerCase().includes(selectedSubject.toLowerCase().split('&')[0].trim())
      );

      let response;
      if (!hasMaterial && responseIndex.current >= demoTutorResponses.length) {
        response = notCoveredResponse;
      } else {
        response = demoTutorResponses[responseIndex.current % demoTutorResponses.length];
        responseIndex.current++;
      }

      addChatMessage({
        id: `a-${Date.now()}`,
        role: 'ai',
        content: response.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: response.citations || [],
        covered: response.covered !== false,
        subject: selectedSubject,
        topic: selectedTopic,
      });
      setIsTyping(false);
    }, 1500);
  };

  const processedMaterials = materials.filter((m) => m.status === 'processed');

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-fade-in h-[calc(100vh-130px)]">
      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Chat header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-500 to-violet-500 flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 ring-2 ring-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold font-display text-navy-900">Knowvia AI Tutor</h2>
              <p className="text-xs text-green-500 font-medium">Online — Demo Mode</p>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-navy-700 transition-all"
            aria-label="Clear chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Subject / Topic selector */}
        <div className="flex flex-col sm:flex-row gap-2 px-5 py-3 border-b border-gray-50 bg-gray-50/30">
          {/* Subject dropdown */}
          <div className="relative flex-1">
            <button
              onClick={() => setSubjectDropdownOpen(!subjectDropdownOpen)}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white border border-gray-100 text-sm font-medium text-navy-700 hover:border-violet-200 transition-colors"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-violet-500" />
                {selectedSubject}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${subjectDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {subjectDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-gray-100 shadow-lg z-10 overflow-hidden animate-fade-in">
                {tutorSubjects.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSubjectChange(s.name)}
                    className={`w-full text-left px-3 py-2.5 text-sm hover:bg-violet-50 transition-colors ${
                      selectedSubject === s.name ? 'bg-violet-50 text-violet-700 font-semibold' : 'text-navy-700'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Topic selector */}
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl bg-white border border-gray-100 text-sm font-medium text-navy-700 hover:border-violet-200 transition-colors outline-none cursor-pointer"
          >
            {tutorSubjects.find((s) => s.name === selectedSubject)?.topics.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin px-4 sm:px-6 py-6 space-y-6 bg-gray-50/30">
          {/* Demo data banner */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-100">
            <Info className="w-4 h-4 text-amber-500 shrink-0" />
            <p className="text-xs text-amber-700">
              <span className="font-semibold">Demo mode:</span> Responses are pre-written sample answers, not real AI output. Citations reference demo materials.
            </p>
          </div>

          {chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
            >
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-navy-500 to-violet-500 flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                {/* Subject/topic label for user messages */}
                {msg.role === 'user' && msg.subject && (
                  <div className="flex gap-1.5">
                    <Badge color="navy" variant="soft">{msg.subject}</Badge>
                    {msg.topic && <Badge color="violet" variant="soft">{msg.topic}</Badge>}
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-navy-600 to-violet-600 text-white rounded-tr-sm shadow-md'
                      : msg.covered === false
                        ? 'bg-amber-50 border border-amber-200 text-navy-800 rounded-tl-sm shadow-sm'
                        : 'bg-white border border-gray-100 text-navy-800 rounded-tl-sm shadow-sm'
                  }`}
                >
                  {msg.covered === false && (
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-amber-200">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-semibold text-amber-700">Not covered by uploaded material</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{formatBold(msg.content)}</div>
                </div>

                {/* Citations */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="flex flex-col gap-1.5 w-full">
                    <p className="text-xs font-semibold text-gray-400 px-1">Sources cited:</p>
                    {msg.citations.map((c, i) => {
                      const Icon = citationIcons[c.type] || FileText;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-violet-50/60 border border-violet-100 hover:bg-violet-50 transition-colors cursor-pointer group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                            <Icon className="w-3.5 h-3.5 text-violet-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-navy-700 truncate">{c.source}</p>
                            {c.page && <p className="text-[11px] text-gray-400">Page {c.page}</p>}
                            {!c.page && c.type === 'Video' && <p className="text-[11px] text-gray-400">Full recording</p>}
                          </div>
                          <Badge color="violet" variant="soft">{c.type}</Badge>
                        </div>
                      );
                    })}
                    <p className="text-[11px] text-gray-300 px-1">Demo citations — not from real document retrieval</p>
                  </div>
                )}

                <span className={`text-[11px] text-gray-300 px-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                  {msg.timestamp}
                </span>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-navy-100 text-navy-600 flex items-center justify-center shrink-0 text-xs font-bold">
                  AR
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-navy-500 to-violet-500 flex items-center justify-center shrink-0 shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-4 shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-violet-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-violet-300 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        {/* Suggestion prompts */}
        {chatHistory.length <= 4 && !isTyping && (
          <div className="px-4 sm:px-6 py-3 border-t border-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <p className="text-xs font-semibold text-gray-400">Suggested questions</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestionPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-1.5 rounded-full bg-violet-50 text-violet-600 text-xs font-medium border border-violet-100 hover:bg-violet-100 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-4 sm:px-6 py-4 border-t border-gray-50 bg-white">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl border border-gray-100 focus-within:border-violet-300 transition-colors px-3 py-2.5">
            <button className="p-1 rounded-lg text-gray-400 hover:text-navy-700 transition-colors" aria-label="Attach file">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
              placeholder={`Ask about ${selectedTopic}...`}
              className="flex-1 bg-transparent text-sm text-navy-900 placeholder-gray-400 outline-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-navy-600 to-violet-600 text-white flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-gray-300 text-center mt-2">
            Demo responses — not real AI. Will connect to Flask backend at <code className="text-navy-400">POST /api/tutor</code>
          </p>
        </div>
      </div>

      {/* Side panel — Knowledge Sources */}
      <div className="hidden lg:flex flex-col w-72 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-hidden">
        <h3 className="text-sm font-bold font-display text-navy-900 mb-1">Knowledge Sources</h3>
        <p className="text-xs text-gray-400 mb-4">Materials the AI can reference</p>
        <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2">
          {materials.map((m) => {
            const Icon = m.type === 'PDF' ? FileText : m.type === 'PowerPoint' ? Presentation : m.type === 'Video' ? Video : BookOpen;
            return (
              <div key={m.id} className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-50 hover:border-violet-100 hover:bg-violet-50/20 transition-all">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  m.status === 'processed' ? 'bg-violet-50 text-violet-600' : 'bg-gray-50 text-gray-300'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-navy-800 truncate">{m.name.split(' — ')[0]}</p>
                  <p className="text-[11px] text-gray-400">{m.subject}</p>
                </div>
                {m.status === 'processed' ? (
                  <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 animate-pulse-soft" />
                )}
              </div>
            );
          })}
        </div>
        <div className="pt-4 mt-2 border-t border-gray-50">
          <div className="bg-gradient-to-br from-navy-50 to-violet-50 rounded-xl p-3 border border-violet-100">
            <p className="text-xs font-semibold text-navy-700">{processedMaterials.length} sources available</p>
            <p className="text-xs text-gray-500 mt-1">The more materials you upload, the better Knowvia's answers become.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
