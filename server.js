const express = require('express');
const path = require('path');
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const exampleHighlights = [
  {
    category: 'Key Idea',
    items: [
      'Placeholder transcript summaries will appear here.',
      'Replace this with real LLM output once connected.'
    ]
  },
  {
    category: 'Action Items',
    items: [
      'Add transcript + LLM API keys to the server.',
      'Send the full transcript to your model for concise bullet points.'
    ]
  }
];

app.post('/api/process', (req, res) => {
  const { url } = req.body || {};

  if (!url) {
    return res.status(400).json({ error: 'Please provide a YouTube link.' });
  }

  const videoId = extractYouTubeId(url);
  const mockTranscriptSnippet = 'This is a placeholder transcript. Connect the transcript API to replace it.';
  const derivedTitle = videoId
    ? `Placeholder title for video ${videoId}`
    : 'Placeholder YouTube Video Title';

  const answer = `Quick take: ${mockTranscriptSnippet}`;

  return res.json({
    title: derivedTitle,
    answer,
    highlights: exampleHighlights
  });
});

app.post('/api/transcript', async (req, res) => {
  const { videoId } = req.body || {};

  if (!videoId) {
    return res.status(400).json({ error: 'Please provide a YouTube video ID.' });
  }

  try {
    const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId.trim());
    const transcriptText = transcriptItems.map((item) => item.text).join(' ');
    return res.json({ transcript: transcriptText });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to fetch transcript for that video ID.' });
  }
});

function extractYouTubeId(url) {
  const match = /(?:v=|\.be\/|embed\/)([\w-]{11})/.exec(url);
  return match ? match[1] : null;
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
