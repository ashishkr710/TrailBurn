*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass](https://dev.to/challenges/hacktoberfest-week1-2026-10-05)*

---

# 🌿 TrailBurn — Touch Grass, Burn Calories: An Offline-First, Open-Weight AI Outdoor Fitness Advisor

## What I Built

Most modern fitness apps do the exact opposite of what outdoor exercise should be: they keep you staring at a glowing screen, scrutinizing live heart rate graphs, tapping through ads, or following indoor video workouts. 

I built **TrailBurn** around a simple guiding principle: **the screen should be the shortest part of the experience.**

**TrailBurn** is an open-source outdoor exercise advisor powered by local open-weight AI that answers a straightforward question:
> *"I want to burn 400 calories today outside — what can I do, and how long will it take?"*

### Who Is It For?
- **Outdoor enthusiasts, hikers, and trail runners** who want scientifically accurate calorie goals without needing an internet connection on remote trails.
- **Privacy-conscious individuals** who refuse to upload their body weight, workout habits, and health metrics to closed proprietary cloud servers.
- **Everyday people looking to touch grass** — whether through trail hiking, kayaking, park calisthenics, brisk walking, or even heavy yard work and gardening.

### What Does It Do?
1. **Goal-Driven Calorie Calculator**: You select your target calorie burn (from 50 kcal up to 2,000+ kcal) and body weight. 
2. **Accurate Exercise Duration Solver**: Using peer-reviewed **MET (Metabolic Equivalent of Task)** data from the Ainsworth Compendium of Physical Activities, TrailBurn calculates the exact duration needed across **25+ outdoor activities** spanning 5 outdoor environments:
   - 🥾 **Trails**: Easy walks, moderate ascents, steep scrambles, trail runs
   - 🌳 **Parks**: Brisk walking, jogging, outdoor calisthenics, frisbee, yoga, pickup soccer
   - 🌊 **Water**: Leisure swimming, lap workouts, kayaking, paddleboarding, surfing
   - 🏙️ **Urban Outdoors**: Casual biking, high-tempo cycling, roller skating, jump rope, public stair repeats
   - 🌻 **Garden & Yard**: Light gardening, heavy soil work, push mowing, firewood chopping, leaf raking
3. **Local AI Coach**: Connects directly to **Ollama** running local open-weight models (like **Llama 3.2**, **Mistral**, **Phi-3**, or **Gemma 2**) to stream personalized outdoor workout plans, weather prep tips, hydration guidelines, and warm-ups without a single byte of telemetry leaving your machine.

---

## Demo

- **GitHub Repository**: [https://github.com/ashishkr710/TrailBurn](https://github.com/ashishkr710/TrailBurn)
- **Local Dev Preview**: Run locally in seconds via `npm run dev` at `http://localhost:5173/`

### How It Works in Action
1. **Set your profile**: Weight (e.g. 75 kg / 165 lbs), fitness level (Beginner, Intermediate, Advanced), and target calories (e.g. 450 kcal).
2. **Select your outdoor scenery**: Choose from all terrains or filter down to Trails, Parks, Water, Urban, or Gardening.
3. **Get instant durations**: See immediately that 450 kcal equals:
   - ~48 minutes of trail running
   - ~1 hour 15 minutes of moderate hiking
   - ~1 hour 45 minutes of brisk park walking
   - ~1 hour 2 minutes of stand-up paddleboarding
   - ~1 hour 30 minutes of heavy garden digging
4. **Chat with your AI Coach**: Ask *"I'm hiking an unfamiliar trail in the late afternoon. What's a smart pacing and safety plan for burning 500 kcal?"* and receive a real-time streaming answer from your local open-weight LLM.
5. **Shut your laptop, head outside, and touch grass!**

---

## Code

The complete source code is open source under the MIT License on GitHub:

{% embed https://github.com/ashishkr710/TrailBurn %}

### Key Architecture Highlights
- **`src/exercises.js`**: Contains the full MET database for 25+ activities with beginner, intermediate, and advanced intensity factors, plus pure mathematical formulas solving for duration:
  $$\text{Duration (hours)} = \frac{\text{Target Calories}}{\text{MET} \times \text{Weight (kg)}}$$
- **`src/ai.js`**: Client-side gateway connecting directly to local Ollama instances (`http://localhost:11434/api/chat`). Features automatic model detection, streaming SSE chunk parsing, fallback handling, and structured prompt engineering.
- **`src/style.css`**: Custom forest-inspired dark aesthetic, fluid glassmorphism, responsive grid layout, and ambient spore/particle canvas animation written in pure Vanilla CSS without heavy UI library dependencies.

---

## How I Built It

### The Open-Source AI Stack
1. **Local Open-Weight Models**:
   - **Llama 3.2 (Meta)**: Tested with both the 1B and 3B parameter open-weight models for rapid, low-latency mobile/laptop inference.
   - **Mistral 7B & Gemma 2**: Supported seamlessly through Ollama's model swap interface for higher-depth outdoor planning.
2. **Local Inference Engine**:
   - **Ollama**: Serves open-weight GGUF models directly via a local REST API (`/api/tags` for model detection and `/api/chat` with `stream: true`).
3. **Frontend & Math Foundation**:
   - **Vite + Vanilla JavaScript**: Zero bloat, instant startup time, offline cacheability.
   - **Compendium of Physical Activities**: Ainsworth et al. (2011) exercise physiology data embedded directly in the client bundle.

---

## Why Does Open Innovation Matter?

The theme of this week's challenge is **Touch Grass** with open-source AI at its core. Here is why an open innovation approach is strictly superior to closed proprietary APIs for this project:

### 1. Zero Cellular Reception on the Trail
When you pack your gear and go outside — deep into a state park, climbing an alpine ridge, or paddling across a mountain lake — cellular reception drops to zero. 
- A proprietary model behind an API (like OpenAI or Claude Cloud) fails immediately with `Connection Refused` or `Network Unavailable`.
- Because TrailBurn is built with **open-weight models and local inference via Ollama**, the AI coach and calculation engine function 100% offline. You can carry your laptop or edge device into a camper van or off-grid cabin with zero signal and still get complete workout planning.

### 2. Radical Health Privacy (No Corporate Cloud Telemetry)
Your body weight, body composition, fitness level, and workout habits are sensitive personal health metrics. 
- Closed API services log prompts, retain chat histories, and often train future models on user queries.
- With open-source AI, **no personal data ever leaves your computer**. There are no cookies, no tracking pixels, no telemetry, and no third-party data broker pipelines.

### 3. Model Autonomy & Swappability
Closed APIs change under your feet: models get deprecated, system prompts get throttled, and pricing changes at will. With open weights:
- On a lightweight, battery-efficient ultrabook, you can spin up `llama3.2:1b` or `phi3:mini` to conserve wattage on the trail.
- On a workstation at home, you can run `mistral:7b` or `llama3.1:8b` for detailed multi-day hiking expeditions.
- You have complete control over system prompts, temperature, and top-p sampling.

### 4. Zero Token Inequity & Cost Barriers
Health and physical wellness should not require a monthly software subscription. Closed APIs impose paywalls and token metering. Open-weight models democratize access to personalized, evidence-backed fitness guidance for anyone with a computer at **$0 cost**.

---

## My Agent Session

This application was developed pair-programming with Google Antigravity / Gemini CLI. The session covered:
- Ideating an offline-first fitness concept adhering to the *Touch Grass* challenge requirements.
- Extracting and codifying MET values from exercise physiology research into pure JavaScript functions.
- Architecting an asynchronous streaming Ollama gateway that auto-probes local models.
- Refining the dark forest glassmorphic UI with smooth slider interactions and responsive layouts.

*(Agent session transcript generated with DevRelay / Antigravity IDE).*

---

## Prize Categories

- **Touch Grass Week 1 Main Challenge**: Building with open-weight models that get people off the screen and into the real world.
- **Open-Source Innovation Track**: Local inference, privacy-first architecture, and offline trail readiness.

---

<!-- Team Submissions: Individual submission by @ashishkr710 -->
<!-- Thanks for participating in Hacktoberfest 2026! -->
