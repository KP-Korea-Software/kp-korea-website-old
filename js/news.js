fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('http://naenara.com.kp/main/index/en/first'))
  .then(response => {
    if (!response.ok) throw new Error('Network error');
    return response.json();
  })
  .then(data => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, 'text/html');

    // Try to locate the latest article
    const latest = doc.querySelector('.content .title a');
    if (latest) {
      const title = latest.textContent.trim();
      const link = "http://naenara.com.kp" + latest.getAttribute('href');

      const newsLink = document.getElementById('news-link');
      newsLink.textContent = title;
      newsLink.href = link;

      document.getElementById('news-bar').style.display = 'block';
    }
  })
  .catch(err => {
    console.warn('Naenara news fetch failed:', err);
  });