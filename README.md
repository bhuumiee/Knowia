Knowvia — AI Study Companion 📚

Knowvia is an AI-powered learning platform that transforms study materials into a personalized learning experience. It helps students understand concepts, practice through quizzes, and track their learning progress.

✨ Features

- Multiformat Uploads: Upload PDF, DOCX, and PPTX files or provide YouTube lecture links.
- AI-Powered Tutoring: Ask questions and receive explanations grounded in uploaded study materials.
- Visual Understanding: Extract and analyze images, diagrams, and figures from documents and presentations.
- Quiz Generation: Practice with questions using difficulty-based logic.
- Learning Dashboard: Monitor learning activity, history, and progress.
- Personalization: Configure language preferences, learning styles, and daily learning goals.
- Video & Audio Processing: Retrieve available YouTube transcripts and transcribe audio when required.

🛠️ Tech Stack

Frontend: React, TypeScript, Vite, HTML, CSS
Backend: Python, FastAPI
AI: Google Gemini API
Document Processing: pypdf, python-docx, python-pptx
Video & Audio: youtube-transcript-api, yt-dlp, FFmpeg, faster-whisper

🚀 Getting Started

Prerequisites

- Python 3.10+
- Node.js and npm
- Google Gemini API key

Backend Setup

# Navigate to the backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Configure your Gemini API key
# Add it to your environment or .env file

# Start the FastAPI server
uvicorn main:app --reload

Open "http://127.0.0.1:8000/docs" to explore the API documentation.

Frontend Setup

# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev

Adjust directory names and environment variables to match your actual project structure.

🔮 Future Improvements

- More precise page, slide, and video timestamp citations.
- Advanced topic-wise mastery tracking.
- More adaptive assessments and personalized recommendations.
- Improved multilingual tutoring, including Hindi explanations.
- Expanded evaluation for answer quality and retrieval accuracy.

🎯 Vision

Our vision is to turn scattered learning resources into a connected, interactive, and personalized study experience that helps every student learn at their own pace.

---

Built for the IIT Mandi Multimodal AI Hackathon 2026 — Track D: Personalized Tutoring & Adaptive Learning.
