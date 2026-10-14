import { useState, useRef } from 'react';
import {
  FileText,
  Presentation,
  Video,
  FileType,
  UploadCloud,
  CheckCircle2,
  Loader2,
  Trash2,
  Search,
  BookOpen,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { Card, Badge, ProgressBar, SectionHeader } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { uploadAreaConfig } from '@/data/demoData';

const iconMap = { FileText, Presentation, Video, FileType };

const demoExtractedTopics = ['Topic 1', 'Topic 2', 'Topic 3', 'Key Concept A', 'Key Concept B'];

function detectType(name) {
  if (name.endsWith('.pdf')) return 'PDF';
  if (name.endsWith('.pptx') || name.endsWith('.ppt')) return 'PowerPoint';
  if (name.match(/\.(mp4|mov|avi|webm|mkv)$/)) return 'Video';
  return 'Document';
}

export default function UploadMaterials() {
  const { addMaterial, updateMaterial, removeMaterial, materials } = useApp();
  const [dragOver, setDragOver] = useState(false);
  const [filter, setFilter] = useState('all');
  const [uploadProgress, setUploadProgress] = useState({}); // id -> percent
  const intervalsRef = useRef({});

  // Simulates upload progress, then transitions to 'processing'.
  // When the Flask backend is connected, replace this with:
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   fetch('/api/upload', { method: 'POST', body: formData })
  //     .then(res => res.json())
  //     .then(data => updateMaterial(id, { status: 'processed', ...data }));
  const simulateUpload = (materialId) => {
    setUploadProgress((prev) => ({ ...prev, [materialId]: 0 }));

    intervalsRef.current[materialId] = setInterval(() => {
      setUploadProgress((prev) => {
        const current = prev[materialId] || 0;
        if (current >= 100) {
          clearInterval(intervalsRef.current[materialId]);
          delete intervalsRef.current[materialId];
          updateMaterial(materialId, { status: 'processing' });
          const { [materialId]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [materialId]: current + 10 };
      });
    }, 200);
  };

  const handleFiles = (files) => {
    Array.from(files).forEach((f, i) => {
      const id = `new-${Date.now()}-${i}`;
      const material = {
        id,
        name: f.name,
        type: detectType(f.name),
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: 'Just now',
        subject: 'Unassigned',
        status: 'uploading',
        pages: null,
        extractedTopics: [],
        summary: null,
        metadata: { fileName: f.name, fileSize: f.size },
      };
      addMaterial(material);
      simulateUpload(id);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e) => {
    if (e.target.files.length > 0) handleFiles(e.target.files);
  };

  const removeUpload = (id) => {
    if (intervalsRef.current[id]) {
      clearInterval(intervalsRef.current[id]);
      delete intervalsRef.current[id];
    }
    removeMaterial(id);
    setUploadProgress((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const filteredUploads = filter === 'all' ? materials : materials.filter((u) => u.type === filter);

  const typeBadge = {
    PDF: { color: 'navy' },
    PowerPoint: { color: 'violet' },
    Video: { color: 'amber' },
    Document: { color: 'gray' },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-navy-900">Upload Materials</h2>
          <p className="text-sm text-gray-400 mt-1">
            Upload textbooks, slides, and videos. Knowvia will analyze them to create personalized lessons and quizzes.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-50 border border-violet-100">
          <Sparkles className="w-4 h-4 text-violet-600" />
          <span className="text-xs font-semibold text-violet-700">{materials.filter((u) => u.status === 'processed').length} materials processed</span>
        </div>
      </div>

      {/* Upload zones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {uploadAreaConfig.map((zone) => {
          const Icon = iconMap[zone.icon] || FileText;
          const colorClasses = zone.color === 'navy'
            ? 'bg-navy-50 text-navy-600 border-navy-100 hover:border-navy-300'
            : 'bg-violet-50 text-violet-600 border-violet-100 hover:border-violet-300';
          return (
            <label
              key={zone.id}
              className={`group cursor-pointer rounded-2xl border-2 border-dashed p-5 transition-all duration-200 ${colorClasses}`}
            >
              <input
                type="file"
                accept={zone.accept}
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{zone.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{zone.description}</p>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {/* Drag & drop area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-200 ${
          dragOver
            ? 'border-violet-400 bg-violet-50 scale-[1.01]'
            : 'border-gray-200 bg-gray-50/50 hover:border-violet-200 hover:bg-violet-50/20'
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
            dragOver ? 'bg-violet-500 text-white scale-110' : 'bg-white text-violet-500 shadow-sm'
          }`}>
            <UploadCloud className="w-8 h-8" />
          </div>
          <div>
            <p className="text-base font-semibold text-navy-900">
              {dragOver ? 'Drop files here!' : 'Drag & drop files here'}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              or <label className="text-violet-600 font-semibold cursor-pointer hover:text-violet-700 underline-offset-2 hover:underline">
                browse
                <input type="file" multiple className="hidden" onChange={handleFileSelect} />
              </label> from your computer
            </p>
          </div>
          <p className="text-xs text-gray-300 mt-2">Supports PDF, PPTX, DOCX, MP4, MOV — up to 200MB</p>
        </div>
      </div>

      {/* API integration note */}
      <div className="flex items-start gap-2.5 p-4 rounded-xl bg-gray-50 border border-gray-100">
        <AlertCircle className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
        <p className="text-xs text-gray-500 leading-relaxed">
          <span className="font-semibold">Frontend demo:</span> File selection works in the browser and simulates upload progress. Real document ingestion, text extraction, and topic analysis will be handled by the Flask backend API at <code className="text-navy-600 bg-white px-1 py-0.5 rounded">POST /api/upload</code> when connected.
        </p>
      </div>

      {/* Uploaded materials list */}
      <Card className="p-6 animate-slide-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xl font-bold font-display text-navy-900">Your Materials</h2>
            <p className="text-sm text-gray-400 mt-0.5">{materials.length} files uploaded</p>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
            {['all', 'PDF', 'PowerPoint', 'Video'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filter === f ? 'bg-navy-500 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {filteredUploads.map((m) => {
            const isUploading = m.status === 'uploading' && uploadProgress[m.id] !== undefined;

            return (
              <div
                key={m.id}
                className="flex items-center gap-4 p-3.5 rounded-xl border border-gray-50 hover:border-violet-100 hover:bg-violet-50/20 transition-all group"
              >
                {/* File icon */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  m.type === 'PDF' ? 'bg-navy-50 text-navy-600' :
                  m.type === 'PowerPoint' ? 'bg-violet-50 text-violet-600' :
                  m.type === 'Video' ? 'bg-amber-50 text-amber-600' :
                  'bg-gray-50 text-gray-500'
                }`}>
                  {m.type === 'PDF' && <FileText className="w-5 h-5" />}
                  {m.type === 'PowerPoint' && <Presentation className="w-5 h-5" />}
                  {m.type === 'Video' && <Video className="w-5 h-5" />}
                  {m.type === 'Document' && <FileType className="w-5 h-5" />}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy-900 truncate">{m.name}</p>
                  {isUploading ? (
                    <div className="mt-1.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-violet-600 font-medium">Uploading... {uploadProgress[m.id]}%</span>
                      </div>
                      <ProgressBar value={uploadProgress[m.id]} color="violet" size="sm" />
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <Badge color={typeBadge[m.type]?.color || 'gray'} variant="soft">{m.type}</Badge>
                      <span className="text-xs text-gray-400">{m.size}</span>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-400">{m.uploadedAt}</span>
                      {m.pages && (
                        <>
                          <span className="text-xs text-gray-300">•</span>
                          <span className="text-xs text-gray-400">{m.pages} pages</span>
                        </>
                      )}
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> {m.subject}
                      </span>
                    </div>
                  )}
                </div>

                {/* Status */}
                <div className="shrink-0">
                  {m.status === 'processed' ? (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
                      <CheckCircle2 className="w-4 h-4" /> Processed
                    </span>
                  ) : m.status === 'processing' ? (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-600">
                      <Loader2 className="w-4 h-4 animate-spin" /> Processing
                    </span>
                  ) : isUploading ? (
                    <span className="text-xs font-semibold text-violet-600">Uploading</span>
                  ) : null}
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeUpload(m.id)}
                  className="p-2 rounded-lg text-gray-300 hover:bg-rose-50 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Remove file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {filteredUploads.length === 0 && (
          <div className="text-center py-12">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-3">
              <Search className="w-7 h-7 text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-400">No materials found</p>
            <p className="text-xs text-gray-300 mt-1">Upload a file to get started</p>
          </div>
        )}
      </Card>
    </div>
  );
}
