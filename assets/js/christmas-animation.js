document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('christmasDecorations');
  if (!container) return;

  const effectDuration = 20000; // 20 seconds

  const elementTypes = [
    { class: 'snowflake', emoji: '❄️', count: 12 },
    { class: 'reindeer', emoji: null, count: 6 },
    { class: 'gift', emoji: null, count: 8 },
    { class: 'small-snow', emoji: null, count: 20 }
  ];

  // Create smoother batch insert
  const fragment = document.createDocumentFragment();

  function createElement(type) {
    const el = document.createElement('div');
    el.className = type.class;

    if (type.emoji) {
      el.textContent = type.emoji;
      el.style.fontSize = `${Math.random() * 16 + 24}px`;
    }

    // Random horizontal starting point
    el.style.left = `${Math.random() * 100}%`;

    // Slightly reduced randomness to avoid lag spikes
    el.style.animationDelay = `${Math.random() * 1.5}s`;
    el.style.animationDuration = `${Math.random() * 3 + 5}s`;

    return el;
  }

  // Bulk create elements (smooth)
  elementTypes.forEach(type => {
    for (let i = 0; i < type.count; i++) {
      fragment.appendChild(createElement(type));
    }
  });

  container.appendChild(fragment);

  // Auto-remove container after animation
  setTimeout(() => container.remove(), effectDuration);
});
