import { useState } from 'react';
import {
  FileText,
  Presentation,
  Video,
  FileType,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Clock,
  Sparkles,
  Loader2,
  CheckCircle2,
  FileSearch,
  Tag,
  User,
  Calendar,
} from 'lucide-react';
import { Card, Badge, ProgressBar, SectionHeader } from '@/components/ui';
import { useApp } from '@/context/AppContext';

const typeIcons = { PDF: FileText, PowerPoint: Presentation, Video: Video, Document: FileType };
const typeColors = {
  PDF: 'bg-navy-50 text-navy-600',
  PowerPoint: 'bg-violet-50 text-violet-600',
  Video: 'bg-amber-50 text-amber-600',
  Document: 'bg-gray-50 text-gray-500',
};

export default function CourseMaterials() {
  const { materials } = useApp();
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredMaterials = filter === 'all' ? materials : materials.filter((m) => m.type === filter);
  const processedCount = materials.filter((m) => m.status === 'processed').length;

  const toggleExpand = (id) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-navy-900">Course Materials</h2>
          <p className="text-sm text-gray-400 mt-1">
            Browse uploaded documents, extracted topics, and source metadata. Materials power the AI Tutor and quiz generation.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-50 border border-violet-100">
          <Sparkles className="w-4 h-4 text-violet-600" />
          <span className="text-xs font-semibold text-violet-700">{processedCount} processed / {materials.length} total</span>
        </div>
      </div>

      {/* Summary banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-bold font-display text-navy-900">{materials.filter((m) => m.type === 'PDF').length}</p>
            <p className="text-xs text-gray-400">PDFs</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-bold font-display text-navy-900">{materials.filter((m) => m.type === 'PowerPoint').length}</p>
            <p className="text-xs text-gray-400">Slides</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-bold font-display text-navy-900">{materials.filter((m) => m.type === 'Video').length}</p>
            <p className="text-xs text-gray-400">Videos</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-bold font-display text-navy-900">
              {materials.filter((m) => m.status === 'processed').reduce((sum, m) => sum + (m.extractedTopics?.length || 0), 0)}
            </p>
            <p className="text-xs text-gray-400">Topics Extracted</p>
          </div>
        </Card>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
        {['all', 'PDF', 'PowerPoint', 'Video'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filter === f ? 'bg-navy-500 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            {f === 'all' ? 'All Types' : f}
          </button>
        ))}
      </div>

      {/* Materials list */}
      <div className="space-y-4">
        {filteredMaterials.map((m) => {
          const Icon = typeIcons[m.type] || FileText;
          const isExpanded = expandedId === m.id;
          const isProcessed = m.status === 'processed';

          return (
            <Card key={m.id} className="overflow-hidden animate-slide-up">
              {/* File header row */}
              <button
                onClick={() => toggleExpand(m.id)}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50/50 transition-colors text-left"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${typeColors[m.type] || typeColors.Document}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy-900 truncate">{m.name}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <Badge color={m.type === 'PDF' ? 'navy' : m.type === 'PowerPoint' ? 'violet' : m.type === 'Video' ? 'amber' : 'gray'} variant="soft">
                      {m.type}
                    </Badge>
                    <span className="text-xs text-gray-400">{m.size}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> {m.subject}
                    </span>
                    {m.pages && (
                      <>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-gray-400">{m.pages} pages</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="shrink-0">
                  {isProcessed ? (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
                      <CheckCircle2 className="w-4 h-4" /> Processed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-600">
                      <Loader2 className="w-4 h-4 animate-spin" /> Processing
                    </span>
                  )}
                </div>

                <div className="shrink-0 text-gray-300">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div className="border-t border-gray-50 p-5 bg-gray-50/30 animate-fade-in">
                  {isProcessed ? (
                    <div className="space-y-5">
                      {/* Extracted summary */}
                      {m.summary && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <FileSearch className="w-4 h-4 text-violet-500" />
                            <p className="text-sm font-semibold text-navy-900">Extracted Summary</p>
                            <Badge color="violet" variant="soft">Demo</Badge>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{m.summary}</p>
                        </div>
                      )}

                      {/* Extracted topics */}
                      {m.extractedTopics && m.extractedTopics.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Tag className="w-4 h-4 text-navy-500" />
                            <p className="text-sm font-semibold text-navy-900">Extracted Topics</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {m.extractedTopics.map((t, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-lg bg-white border border-gray-100 text-xs font-medium text-navy-700"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Source metadata */}
                      {m.metadata && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <BookOpen className="w-4 h-4 text-gray-400" />
                            <p className="text-sm font-semibold text-navy-900">Source Metadata</p>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {m.metadata.author && (
                              <div className="flex items-center gap-2 text-xs">
                                <User className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-gray-400">Author:</span>
                                <span className="font-medium text-navy-700">{m.metadata.author}</span>
                              </div>
                            )}
                            {m.metadata.course && (
                              <div className="flex items-center gap-2 text-xs">
                                <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-gray-400">Course:</span>
                                <span className="font-medium text-navy-700">{m.metadata.course}</span>
                              </div>
                            )}
                            {m.metadata.semester && (
                              <div className="flex items-center gap-2 text-xs">
                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-gray-400">Semester:</span>
                                <span className="font-medium text-navy-700">{m.metadata.semester}</span>
                              </div>
                            )}
                            {m.metadata.language && (
                              <div className="flex items-center gap-2 text-xs">
                                <FileText className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-gray-400">Language:</span>
                                <span className="font-medium text-navy-700">{m.metadata.language}</span>
                              </div>
                            )}
                            {m.metadata.pagesProcessed && (
                              <div className="flex items-center gap-2 text-xs">
                                <FileSearch className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-gray-400">Pages:</span>
                                <span className="font-medium text-navy-700">{m.metadata.pagesProcessed}</span>
                              </div>
                            )}
                            {m.metadata.duration && (
                              <div className="flex items-center gap-2 text-xs">
                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-gray-400">Duration:</span>
                                <span className="font-medium text-navy-700">{m.metadata.duration}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-2">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold">
                          <Sparkles className="w-3 h-3" /> Ready for AI Tutor & Quiz
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-3">
                        <Loader2 className="w-7 h-7 text-amber-500 animate-spin" />
                      </div>
                      <p className="text-sm font-semibold text-navy-900">Processing in progress</p>
                      <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                        Knowvia is analyzing this file to extract topics and content. This is a demo state — when connected to the Flask backend, real document ingestion will run here.
                      </p>
                      <div className="mt-4 max-w-xs mx-auto">
                        <ProgressBar value={65} color="amber" size="sm" />
                        <p className="text-xs text-gray-400 mt-1.5">Extracting text & topics (demo)</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <Card className="p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-3">
            <FileSearch className="w-7 h-7 text-gray-300" />
          </div>
          <p className="text-sm font-medium text-gray-400">No materials found</p>
          <p className="text-xs text-gray-300 mt-1">Upload files from the Upload Materials page</p>
        </Card>
      )}

      {/* Demo data disclaimer */}
      <div className="flex items-start gap-2.5 p-4 rounded-xl bg-gray-50 border border-gray-100">
        <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-[10px] font-bold">!</span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          <span className="font-semibold">Demo data:</span> Extracted topics and summaries shown above are sample content for UI demonstration. Real document ingestion, topic extraction, and content analysis will be performed by the Flask backend when connected.
        </p>
      </div>
    </div>
  );
}
