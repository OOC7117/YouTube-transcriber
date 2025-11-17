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

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const url = form.url.value.trim();

  if (!url) {
    showStatus('Please paste a valid YouTube link.');
    return;
  }

  toggleForm(true);
  showStatus('Processing your link…');

  try {
    const response = await fetch('/api/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error || 'Unable to process link.');
    }

    const data = await response.json();
    renderResults(data);
    showStatus('Finished! Replace the stub API with your own to see real data.');
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
    showStatus('Fetching transcript…');

    try {
      const response = await fetch('/api/transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId })
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Unable to fetch transcript.');
      }

      const data = await response.json();
      transcriptEl.textContent = data.transcript;
      transcriptResult.hidden = false;
      transcriptSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      showStatus('Transcript fetched successfully.');
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
