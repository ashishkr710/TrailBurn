/**
 * TrailBurn — Main Application
 * Touch Grass Challenge
 * 
 * An AI-powered outdoor exercise advisor that recommends
 * outdoor workouts based on calorie burn goals.
 */

import './style.css';
import { getRecommendations } from './exercises.js';
import { ollamaClient } from './ai.js';

// ============================================
// State
// ============================================
const state = {
  weight: 70,
  weightUnit: 'kg',
  targetCalories: 300,
  maxMinutes: null,
  fitnessLevel: 'intermediate',
  environment: 'all',
  chatHistory: [],
  lastRecommendations: [],
};

// ============================================
// DOM References
// ============================================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initInputListeners();
  initAI();
  initParticles();
});

// ============================================
// Animated Background Particles
// ============================================
function initParticles() {
  const container = $('#particles-bg');
  const count = 25;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.15 + 0.05;

    Object.assign(particle.style, {
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: `rgba(74, 222, 128, ${opacity})`,
      animation: `particleFloat ${duration}s ease-in-out ${delay}s infinite`,
      pointerEvents: 'none',
    });

    container.appendChild(particle);
  }

  // Add the particle animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
      25% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) scale(1.2); opacity: 0.6; }
      50% { transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px) scale(0.8); opacity: 0.4; }
      75% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 30 - 15}px) scale(1.1); opacity: 0.5; }
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// Animations
// ============================================
function initAnimations() {
  // Animate stat counters
  const statNumbers = $$('.stat-number[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));

  // Smooth scroll for nav links
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 1500;
  const start = performance.now();

  function update(timestamp) {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// ============================================
// Input Listeners
// ============================================
function initInputListeners() {
  // Weight input
  const weightInput = $('#weight-input');
  weightInput.addEventListener('input', () => {
    state.weight = parseFloat(weightInput.value) || 70;
  });

  // Weight unit toggle
  $$('.unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const newUnit = btn.dataset.unit;

      if (newUnit !== state.weightUnit) {
        if (newUnit === 'lbs') {
          weightInput.value = Math.round(state.weight * 2.20462);
          state.weight = state.weight; // keep kg internally
        } else {
          state.weight = Math.round(parseFloat(weightInput.value) / 2.20462);
          weightInput.value = state.weight;
        }
        state.weightUnit = newUnit;
      }
    });
  });

  // Calories slider & input sync
  const caloriesSlider = $('#calories-slider');
  const caloriesInput = $('#calories-input');

  caloriesSlider.addEventListener('input', () => {
    caloriesInput.value = caloriesSlider.value;
    state.targetCalories = parseInt(caloriesSlider.value);
  });

  caloriesInput.addEventListener('input', () => {
    state.targetCalories = parseInt(caloriesInput.value) || 300;
    if (state.targetCalories <= 2000) {
      caloriesSlider.value = state.targetCalories;
    }
  });

  // Time input
  const timeInput = $('#time-input');
  timeInput.addEventListener('input', () => {
    const val = parseInt(timeInput.value);
    state.maxMinutes = val > 0 ? val : null;
  });

  // Fitness level
  $$('.fitness-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.fitness-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.fitnessLevel = btn.dataset.level;
    });
  });

  // Environment chips
  $$('.env-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      $$('.env-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.environment = chip.dataset.env;
    });
  });

  // Calculate button
  $('#calculate-btn').addEventListener('click', calculateAndDisplay);
}

// ============================================
// Calculate & Display Results
// ============================================
function calculateAndDisplay() {
  // Get weight in kg
  let weightKg = state.weight;
  if (state.weightUnit === 'lbs') {
    weightKg = Math.round(parseFloat($('#weight-input').value) / 2.20462);
  }

  // Validate
  if (weightKg < 20 || weightKg > 300) {
    showNotification('Please enter a valid weight.', 'warning');
    return;
  }
  if (state.targetCalories < 10) {
    showNotification('Please enter a calorie target of at least 10 kcal.', 'warning');
    return;
  }

  const recommendations = getRecommendations({
    weightKg,
    targetCalories: state.targetCalories,
    level: state.fitnessLevel,
    environment: state.environment,
    maxMinutes: state.maxMinutes,
  });

  state.lastRecommendations = recommendations;
  displayResults(recommendations, weightKg);
}

function displayResults(recommendations, weightKg) {
  const placeholder = $('#results-placeholder');
  const grid = $('#results-grid');

  placeholder.style.display = 'none';
  grid.style.display = 'flex';
  grid.innerHTML = '';

  // Summary bar
  const summary = document.createElement('div');
  summary.className = 'results-summary';
  summary.innerHTML = `
    <span class="results-summary-text">
      🔥 Burning <strong>${state.targetCalories} kcal</strong> at <strong>${weightKg} kg</strong> 
      — ${state.fitnessLevel} level
      ${state.maxMinutes ? ` — within <strong>${state.maxMinutes} min</strong>` : ''}
    </span>
    <span class="results-count">${recommendations.length} exercises found</span>
  `;
  grid.appendChild(summary);

  // Exercise cards
  recommendations.forEach((exercise, index) => {
    const card = createExerciseCard(exercise, index);
    grid.appendChild(card);
  });

  // Scroll to results
  grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function createExerciseCard(exercise, index) {
  const card = document.createElement('div');
  card.className = 'exercise-card';
  card.style.animationDelay = `${index * 0.08}s`;

  const intensityLevel = exercise.intensity;
  const maxDots = 5;
  const intensityClass = intensityLevel <= 2 ? '' : intensityLevel <= 3 ? 'moderate' : intensityLevel <= 4 ? 'high' : 'very-high';

  const dots = Array.from({ length: maxDots }, (_, i) =>
    `<span class="intensity-dot ${i < intensityLevel ? `active ${intensityClass}` : ''}"></span>`
  ).join('');

  const timeWarning = !exercise.fitsInTime && state.maxMinutes
    ? `<span style="color: var(--accent-warm); font-size: var(--fs-xs);">⚠️ Exceeds your ${state.maxMinutes} min limit</span>`
    : '';

  const hours = Math.floor(exercise.duration / 60);
  const mins = exercise.duration % 60;
  const durationDisplay = hours > 0 ? `${hours}h ${mins}m` : `${mins}`;
  const durationUnit = hours > 0 ? '' : 'min';

  card.innerHTML = `
    <div class="exercise-card-header">
      <div class="exercise-info">
        <div class="exercise-emoji">${exercise.emoji}</div>
        <div>
          <div class="exercise-name">${exercise.name}</div>
          <div class="exercise-category">${exercise.category} ${timeWarning}</div>
        </div>
      </div>
      <div class="exercise-duration">
        <div class="duration-value">${durationDisplay}</div>
        <div class="duration-unit">${durationUnit}</div>
      </div>
    </div>
    <div class="exercise-meta">
      <div class="meta-item">
        <span class="meta-label">MET:</span>
        <span>${exercise.met}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Burn Rate:</span>
        <span>${exercise.caloriesPerMinute} cal/min</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Intensity:</span>
        <div class="intensity-bar">${dots}</div>
      </div>
    </div>
    <div class="exercise-tip">
      <strong>💡 Pro Tip:</strong> ${exercise.tip}
    </div>
  `;

  return card;
}

// ============================================
// AI Coach
// ============================================
async function initAI() {
  const connectBtn = $('#ai-connect-btn');
  const urlInput = $('#ollama-url');
  const statusText = $('#ai-model-status');
  const statusDot = $('#ai-status .status-dot');
  const navStatusText = $('#ai-status .status-text');
  const modelName = $('#ai-model-name');

  // Auto-connect on load
  await connectToOllama();

  // Connect button
  connectBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();
    if (url) {
      ollamaClient.baseUrl = url.replace(/\/$/, '');
    }
    await connectToOllama();
  });

  // Chat input
  const chatInput = $('#chat-input');
  const sendBtn = $('#chat-send-btn');

  sendBtn.addEventListener('click', () => sendMessage());
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize textarea
  chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
  });

  // Suggestion chips
  $$('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chatInput.value = chip.dataset.prompt;
      sendMessage();
    });
  });
}

async function connectToOllama() {
  const statusText = $('#ai-model-status');
  const statusDot = $('#ai-status .status-dot');
  const navStatusText = $('#ai-status .status-text');
  const modelName = $('#ai-model-name');

  statusText.textContent = 'Connecting...';
  statusText.className = 'ai-model-status';

  const result = await ollamaClient.connect();

  if (result.connected) {
    statusText.textContent = `Connected — using ${result.model}`;
    statusText.className = 'ai-model-status connected';
    statusDot.className = 'status-dot online';
    navStatusText.textContent = 'AI Online';
    modelName.textContent = `Ollama — ${result.model}`;
  } else {
    statusText.textContent = `Not connected — ${result.error || 'Ollama not found'}`;
    statusText.className = 'ai-model-status';
    statusDot.className = 'status-dot offline';
    navStatusText.textContent = 'AI Offline';
    modelName.textContent = 'Ollama — Not Connected';
  }
}

async function sendMessage() {
  const chatInput = $('#chat-input');
  const message = chatInput.value.trim();
  if (!message) return;

  if (!ollamaClient.connected) {
    showNotification('Please connect to Ollama first. Make sure Ollama is running locally.', 'warning');
    return;
  }

  // Clear input
  chatInput.value = '';
  chatInput.style.height = 'auto';

  // Hide suggestions after first message
  const suggestions = $('#chat-suggestions');
  if (suggestions) suggestions.style.display = 'none';

  // Add user message
  addChatMessage('user', message);
  state.chatHistory.push({ role: 'user', content: message });

  // Add loading indicator
  const loadingMsg = addChatMessage('assistant', null, true);

  try {
    let fullResponse = '';

    await ollamaClient.chat(message, state.chatHistory.slice(-10), (chunk, full) => {
      fullResponse = full;
      loadingMsg.querySelector('.message-content').innerHTML = formatMarkdown(full);
      scrollChatToBottom();
    });

    state.chatHistory.push({ role: 'assistant', content: fullResponse });
  } catch (error) {
    loadingMsg.querySelector('.message-content').innerHTML = `
      <p style="color: var(--accent-red);">⚠️ Error: ${error.message}</p>
      <p>Make sure Ollama is running and try again.</p>
    `;
  }

  scrollChatToBottom();
}

function addChatMessage(role, content, isLoading = false) {
  const container = $('#chat-messages');
  const msg = document.createElement('div');
  msg.className = `chat-message ${role}`;

  const avatar = role === 'user' ? '👤' : '🌿';
  const formattedContent = isLoading
    ? '<div class="loading-dots"><span></span><span></span><span></span></div>'
    : formatMarkdown(content);

  msg.innerHTML = `
    <span class="message-avatar">${avatar}</span>
    <div class="message-content">${formattedContent}</div>
  `;

  container.appendChild(msg);
  scrollChatToBottom();
  return msg;
}

function scrollChatToBottom() {
  const container = $('#chat-messages');
  container.scrollTop = container.scrollHeight;
}

/**
 * Simple markdown-to-HTML formatter
 */
function formatMarkdown(text) {
  if (!text) return '';

  return text
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Headers
    .replace(/^### (.*$)/gm, '<h4>$1</h4>')
    .replace(/^## (.*$)/gm, '<h3>$1</h3>')
    .replace(/^# (.*$)/gm, '<h2>$1</h2>')
    // Unordered lists
    .replace(/^[\-\*] (.*$)/gm, '<li>$1</li>')
    // Numbered lists
    .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
    // Paragraphs (simple)
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    // Wrap in paragraph
    .replace(/^(.+)$/s, '<p>$1</p>');
}

// ============================================
// Notifications
// ============================================
function showNotification(message, type = 'info') {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 10000;
    padding: 16px 24px;
    background: ${type === 'warning' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(74, 222, 128, 0.15)'};
    border: 1px solid ${type === 'warning' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(74, 222, 128, 0.3)'};
    border-radius: 12px;
    color: ${type === 'warning' ? '#f59e0b' : '#4ade80'};
    font-family: var(--font-primary);
    font-size: 14px;
    backdrop-filter: blur(12px);
    animation: fadeInUp 0.3s ease-out;
    max-width: 400px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'fadeInDown 0.3s ease-out reverse forwards';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}
