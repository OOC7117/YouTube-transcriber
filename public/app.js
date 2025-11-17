const form = document.getElementById('extract-form');
const statusBox = document.getElementById('status');
const resultsSection = document.getElementById('results');
const titleEl = document.getElementById('title');
const answerEl = document.getElementById('answer');
const highlightsEl = document.getElementById('highlights');
const transcriptSection = document.getElementById('transcript-section');
const transcriptForm = document.getElementById('transcript-form');
const transcriptResult = document.getElementById('transcript-result');
const transcriptEl = document.getElementById('transcript');
const demoHighlights = [
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

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const url = form.url.value.trim();

  if (!url) {
    showStatus('Please paste a valid YouTube link.');
    return;
  }

  toggleForm(true);
  showStatus('Processing your link with built-in demo data…');

  try {
    const data = await getDemoSummary(url);
    renderResults(data);
    showStatus('Finished! Replace the stub logic in app.js with your API to see real data.');
  } catch (error) {
    console.error(error);
    showStatus(error.message || 'Something went wrong.');
  } finally {
    toggleForm(false);
  }
});

function renderResults(data) {
  resultsSection.hidden = false;
  titleEl.textContent = data.title;
  answerEl.textContent = data.answer;
  highlightsEl.innerHTML = '';

  (data.highlights || []).forEach((group) => {
    const container = document.createElement('div');
    container.className = 'highlight-group';
    const heading = document.createElement('h3');
    heading.textContent = group.category;
    const list = document.createElement('ul');

    (group.items || []).forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });

    container.appendChild(heading);
    container.appendChild(list);
    highlightsEl.appendChild(container);
  });
}

function toggleForm(disabled) {
  const button = form.querySelector('button');
  button.disabled = disabled;
}

function showStatus(message) {
  statusBox.textContent = message;
}

if (transcriptForm) {
  transcriptForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const videoId = transcriptForm.videoId.value.trim();

    if (!videoId) {
      showStatus('Please enter a YouTube video ID.');
      return;
    }

    toggleTranscriptForm(true);
    showStatus('Fetching transcript sample…');

    try {
      const data = await getDemoTranscript(videoId);
      transcriptEl.textContent = data.transcript;
      transcriptResult.hidden = false;
      transcriptSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      showStatus('Transcript fetched successfully from demo data.');
    } catch (error) {
      console.error(error);
      showStatus(error.message || 'Something went wrong while fetching the transcript.');
      transcriptResult.hidden = true;
      transcriptEl.textContent = '';
    } finally {
      toggleTranscriptForm(false);
    }
  });
}

function toggleTranscriptForm(disabled) {
  const button = transcriptForm.querySelector('button');
  button.disabled = disabled;
}

function extractYouTubeId(url) {
  const match = /(?:v=|\.be\/|embed\/)([\w-]{11})/.exec(url);
  return match ? match[1] : null;
}

function getDemoSummary(url) {
  const videoId = extractYouTubeId(url);
  const derivedTitle = videoId
    ? `Placeholder title for video ${videoId}`
    : 'Placeholder YouTube Video Title';
  const mockTranscriptSnippet = 'This is a placeholder transcript. Connect the transcript API to replace it.';

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: derivedTitle,
        answer: `Quick take: ${mockTranscriptSnippet}`,
        highlights: demoHighlights
      });
    }, 400);
  });
}

function getDemoTranscript(videoId) {
  const text =
    'This is a placeholder transcript for the provided YouTube video ID. Swap this helper for a real transcript API call.';

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ transcript: `${text} (ID: ${videoId})` });
    }, 400);
  });
}
