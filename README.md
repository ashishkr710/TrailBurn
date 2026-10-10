# 🌿 TrailBurn — Touch Grass, Burn Calories

[![GitHub Repository](https://img.shields.io/badge/GitHub-ashishkr710%2FTrailBurn-22c55e?logo=github&style=for-the-badge)](https://github.com/ashishkr710/TrailBurn)
[![Hacktoberfest Challenge](https://img.shields.io/badge/Hacktoberfest%202026-Touch%20Grass%20Week%201-4ade80?style=for-the-badge)](https://dev.to/challenges/hacktoberfest-week1-2026-10-05)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Local AI: Ollama](https://img.shields.io/badge/AI-Ollama%20(Open--Weight)-38bdf8?style=for-the-badge)](https://ollama.com/)

> **Built for the [Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass](https://dev.to/challenges/hacktoberfest-week1-2026-10-05)**  
> An open-source outdoor fitness planner and local AI coach that turns screen time into trail time. Enter your target calorie burn, and TrailBurn gives you exact outdoor activities and durations calculated with exercise physiology science — with 100% private, offline AI guidance.

---

## 🏔️ Overview

Most fitness apps keep you glued to your phone tracking micro-stats, counting paces, or watching video workouts indoors. **TrailBurn** does the opposite: **the screen is the shortest part of the experience.**

1. You tell TrailBurn how many calories you want to burn (e.g., 300 kcal, 500 kcal, 750 kcal) and your profile.
2. TrailBurn instantly calculates exact exercise durations across **25+ outdoor activities** spanning trails, parks, lakes, city streets, and gardens.
3. An integrated **Local Open-Weight AI Coach** powered by **Ollama** (`llama3.2`, `mistral`, `gemma2`, `phi3`) crafts custom outdoor routes, weather preparations, warm-ups, and pacing advice.
4. You close your laptop and **go touch grass!** 🌿

---

## 💡 Why Open Innovation Matters for TrailBurn

The core premise of the **Touch Grass** challenge is exploring why open-source AI and open innovation are essential:

1. **🔒 100% Health Privacy (Zero Cloud Telemetry)**:
   - Body weight, physical limitations, and fitness goals constitute sensitive personal data.
   - Closed-source APIs (OpenAI, Anthropic, Gemini Cloud) require transmitting this data to corporate servers for surveillance and monetization.
   - With TrailBurn, **all AI inference runs locally on your machine via Ollama**. Your metrics never leave your device.

2. **🌲 Offline on the Trail (Zero Cellular Signal Required)**:
   - Nature trails, mountain ridges, state parks, and lakes frequently lack cellular connectivity.
   - Proprietary cloud-hosted APIs fail the moment you lose signal.
   - TrailBurn's MET engine is fully client-side, and local open-weight models run offline on your laptop or edge device without an active internet connection.

3. **🔄 Model Freedom & Hardware Adaptability**:
   - Closed APIs lock you into fixed models, deprecation schedules, and pricing tiers.
   - Open innovation allows users to choose the right open-weight model for their hardware:
     - Ultra-lightweight on low-power devices: `llama3.2:1b` or `phi3:mini`
     - Balanced laptops: `llama3.2:3b` or `gemma2:2b`
     - Performance workstations: `mistral:7b` or `llama3.1:8b`

4. **💰 Truly Free & Equitable Fitness**:
   - Commercial AI fitness apps charge subscription fees ($10–$30/month) or token costs.
   - Open-weight models democratize access to personalized health guidance for everyone at **$0 cost**.

---

## ⚡ Key Features

- **🔥 MET-Based Calorie Duration Engine**:
  - Implements Ainsworth's *Compendium of Physical Activities* formula:
    $$\text{Calories} = \text{MET} \times \text{Weight (kg)} \times \left(\frac{\text{Duration (min)}}{60}\right)$$
  - Directly solves for required workout duration based on user target calories.
- **🏃 25+ Outdoor Activities Across 5 Terrains**:
  - **🥾 Trail**: Easy Trail Walk (3.5 MET), Moderate Hiking (6.0 MET), Steep Hill Hiking (7.8 MET), Trail Running (9.5 MET)
  - **🌳 Park**: Brisk Walk (4.3 MET), Jogging (8.3 MET), Outdoor Yoga (3.0 MET), Park Calisthenics (6.5 MET), Frisbee/Disc Golf (3.5 MET), Soccer (8.5 MET), Badminton (5.5 MET)
  - **🌊 Water**: Leisure Swimming (5.8 MET), Lap Swimming (8.3 MET), Kayaking (5.0 MET), Stand-Up Paddleboarding (5.0 MET), Surfing (6.0 MET)
  - **🏙️ Urban**: Casual Cycling (5.5 MET), Vigorous Cycling (10.0 MET), Roller Skating (7.0 MET), Jump Rope (10.0 MET), Outdoor Stair Climbing (8.8 MET), Power Walking (5.0 MET)
  - **🌻 Garden**: Light Gardening (3.0 MET), Heavy Yard Work (5.0 MET), Push Mowing (5.5 MET), Wood Chopping (6.3 MET), Raking Leaves (4.0 MET)
- **🤖 Streaming Local AI Coach**:
  - Real-time SSE streaming from local Ollama endpoint (`http://localhost:11434/api/chat`).
  - Auto-detects installed models and configures fitness system prompts.
  - Generates personalized warm-up routines, weather-adapted safety plans, and progressive targets.
- **🎨 Forest Aesthetic UI**:
  - Dark mode with emerald-green accents, glassmorphic cards, ambient floating spores/particles, responsive layouts, and interactive range controls.

---

## 🛠️ Architecture & Tech Stack

```
TrailBurn Web App (Vite + Vanilla JS + CSS3)
   │
   ├── MET Engine (src/exercises.js) ── 100% Client-Side Physics & Physiology
   │
   └── Local AI Gateway (src/ai.js)
         │
         ▼ (HTTP POST /api/chat)
      Ollama Local Server (http://localhost:11434)
         ├── Llama 3.2
         ├── Mistral
         ├── Phi-3
         └── Gemma 2
```

- **Frontend**: Vanilla JavaScript (ES Modules), Vite
- **Styling**: Vanilla CSS3, Glassmorphism, CSS Custom Properties, Responsive Grid
- **AI Backend**: [Ollama](https://ollama.com/) (Local Open-Weight Model Runner)
- **Scientific Foundation**: Ainsworth et al., *Compendium of Physical Activities*

---

## 🚀 Quickstart Guide

### 1. Clone Repository
```bash
git clone https://github.com/ashishkr710/TrailBurn.git
cd TrailBurn
```

### 2. Install Dependencies & Run
```bash
npm install
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### 3. (Optional) Enable Local AI Coaching with Ollama
If you wish to use the streaming AI Coach:
1. Install [Ollama](https://ollama.com/).
2. Pull and start an open-weight model:
   ```bash
   ollama run llama3.2
   ```
3. Refresh TrailBurn — the navigation bar status will glow green (**AI Online**) and connect automatically!

---

## 📦 Project Structure

```
TrailBurn/
├── index.html              # Main HTML entry with semantic tags & SEO metadata
├── package.json            # Project dependencies & scripts
├── README.md               # Project documentation
├── SUBMISSION.md           # DEV.to Hacktoberfest Challenge submission draft
├── src/
│   ├── style.css           # Design system tokens, glassmorphism, animations
│   ├── exercises.js        # 25+ activities with MET indices & duration solver
│   ├── ai.js               # Ollama streaming client & model auto-detection
│   └── main.js             # UI state machine, slider sync & DOM controller
```

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 🤝 Acknowledgments

- Built for the **[Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass](https://dev.to/challenges/hacktoberfest-week1-2026-10-05)** on [DEV.to](https://dev.to).
- MET values sourced from Ainsworth BE, et al. *2011 Compendium of Physical Activities*.
- Supported by open-weight models from Meta (Llama), Mistral AI, and Google DeepMind (Gemma).
