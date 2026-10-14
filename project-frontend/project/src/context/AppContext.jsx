import { createContext, useContext, useState, useCallback } from 'react';
import {
  initialSubjects,
  initialMasteryByTopic,
  initialWeakTopics,
  initialStrengths,
  initialMaterials,
  initialChatHistory,
  initialQuizScoreHistory,
  initialOverallStats,
  studentProfile,
} from '@/data/demoData';

// ============================================================
// SHARED APP STATE — This is demo-only state held in React
// context so that quiz completion updates mastery across pages.
// When the Flask backend is connected, replace these setters
// with API calls to the backend endpoints.
// ============================================================

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [masteryByTopic, setMasteryByTopic] = useState(initialMasteryByTopic);
  const [weakTopics, setWeakTopics] = useState(initialWeakTopics);
  const [strengths, setStrengths] = useState(initialStrengths);
  const [materials, setMaterials] = useState(initialMaterials);
  const [chatHistory, setChatHistory] = useState(initialChatHistory);
  const [quizScoreHistory, setQuizScoreHistory] = useState(initialQuizScoreHistory);
  const [overallStats, setOverallStats] = useState(initialOverallStats);

  // Called when a quiz is completed. Records the score and
  // adjusts topic/subject mastery based on which questions
  // were answered correctly.
  const recordQuizResult = useCallback((result) => {
    // result: { subject, topic, scorePct, correct, total, answers, questions, date }

    // Add to quiz score history
    setQuizScoreHistory((prev) => {
      const nextNum = prev.length + 1;
      return [
        ...prev,
        { quiz: `Quiz ${nextNum}`, score: result.scorePct, subject: result.subject, date: result.date },
      ];
    });

    // Update mastery for topics that were tested
    setMasteryByTopic((prev) =>
      prev.map((t) => {
        const matchingQuestions = result.questions.filter((q) => q.topic === t.topic);
        if (matchingQuestions.length === 0) return t;
        const correctCount = matchingQuestions.filter((q) => {
          const ans = result.answers.find((a) => a.questionId === q.id);
          return ans?.correct;
        }).length;
        const topicScorePct = Math.round((correctCount / matchingQuestions.length) * 100);
        // Blend: 70% existing mastery + 30% quiz performance, clamped 0-100
        const newMastery = Math.round(Math.min(Math.max(t.mastery * 0.7 + topicScorePct * 0.3, 0), 100));
        return { ...t, mastery: newMastery };
      }),
    );

    // Update weak topics mastery values to match
    setWeakTopics((prev) =>
      prev.map((t) => {
        const masteryEntry = initialMasteryByTopic.find((m) =>
          m.topic.toLowerCase().includes(t.topic.toLowerCase().split('(')[0].trim()) ||
          t.topic.toLowerCase().includes(m.topic.toLowerCase()),
        );
        return masteryEntry ? { ...t, mastery: masteryEntry.mastery } : t;
      }),
    );

    // Update subject mastery as weighted average of its topics
    setSubjects((prev) =>
      prev.map((s) => {
        const topicMasteries = masteryByTopic.filter((t) => t.subject === s.name);
        if (topicMasteries.length === 0) return s;
        const avg = Math.round(topicMasteries.reduce((sum, t) => sum + t.mastery, 0) / topicMasteries.length);
        return { ...s, mastery: avg };
      }),
    );

    // Recalculate overall mastery
    setOverallStats((prev) => {
      const allMasteries = masteryByTopic.map((t) => t.mastery);
      const overall = Math.round(allMasteries.reduce((sum, m) => sum + m, 0) / allMasteries.length);
      return { ...prev, masteryScore: overall };
    });
  }, [masteryByTopic]);

  // Add a new uploaded material
  const addMaterial = useCallback((material) => {
    setMaterials((prev) => [material, ...prev]);
  }, []);

  // Update material status (e.g. from 'uploading' to 'processing' to 'processed')
  const updateMaterial = useCallback((id, updates) => {
    setMaterials((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  }, []);

  // Remove a material
  const removeMaterial = useCallback((id) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  }, []);

  // Add a chat message
  const addChatMessage = useCallback((message) => {
    setChatHistory((prev) => [...prev, message]);
  }, []);

  const clearChat = useCallback(() => {
    setChatHistory(initialChatHistory);
  }, []);

  const value = {
    subjects,
    masteryByTopic,
    weakTopics,
    strengths,
    materials,
    chatHistory,
    quizScoreHistory,
    overallStats,
    studentProfile,
    recordQuizResult,
    addMaterial,
    updateMaterial,
    removeMaterial,
    addChatMessage,
    clearChat,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
