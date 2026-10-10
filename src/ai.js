/**
 * TrailBurn — Ollama AI Integration
 * 
 * Connects to a local Ollama instance for personalized outdoor fitness coaching.
 * Uses open-weight models (Llama 3.2, Mistral, Gemma, Phi-3, etc.)
 * 
 * All inference runs locally — no data leaves the user's machine.
 */

const SYSTEM_PROMPT = `You are TrailBurn AI Coach, a friendly and knowledgeable outdoor fitness advisor. Your goal is to help people get outside, exercise, and enjoy nature.

Your expertise includes:
- Outdoor exercise recommendations (hiking, running, cycling, swimming, gardening, etc.)
- Calorie burn estimates using MET (Metabolic Equivalent of Task) values
- Training plans for outdoor activities
- Weather-appropriate exercise suggestions
- Safety tips for outdoor workouts
- Motivation and encouragement to "touch grass"

Guidelines:
- Be encouraging and positive — you want people to enjoy being outside
- Give specific, actionable advice
- Include estimated calorie burns when discussing exercises
- Suggest alternatives based on fitness level
- Mention safety considerations when relevant
- Keep responses concise but informative
- Use relevant emojis sparingly to add personality
- Always remind people that any movement outdoors is better than none
- Format responses with clear headings and bullet points when listing multiple items`;

class OllamaClient {
  constructor(baseUrl = 'http://localhost:11434') {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.connected = false;
    this.model = null;
    this.availableModels = [];
    this.abortController = null;
  }

  /**
   * Check connection to Ollama and list available models
   */
  async connect() {
    try {
      // Check if Ollama is running
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      this.availableModels = (data.models || []).map(m => m.name);
      
      // Pick the best available model
      this.model = this._selectBestModel();
      this.connected = this.model !== null;

      return {
        connected: this.connected,
        model: this.model,
        availableModels: this.availableModels,
      };
    } catch (error) {
      this.connected = false;
      this.model = null;
      this.availableModels = [];

      return {
        connected: false,
        model: null,
        availableModels: [],
        error: error.message,
      };
    }
  }

  /**
   * Select the best available model for fitness coaching
   * Prefers smaller, faster models for responsiveness
   */
  _selectBestModel() {
    if (this.availableModels.length === 0) return null;

    // Priority list of preferred models
    const preferred = [
      'llama3.2',
      'llama3.1',
      'llama3',
      'llama2',
      'mistral',
      'gemma2',
      'gemma',
      'phi3',
      'phi',
      'qwen2.5',
      'qwen2',
      'deepseek',
    ];

    // Try to find a preferred model
    for (const pref of preferred) {
      const match = this.availableModels.find(m => 
        m.toLowerCase().includes(pref.toLowerCase())
      );
      if (match) return match;
    }

    // Fall back to the first available model
    return this.availableModels[0];
  }

  /**
   * Send a chat message and get a streaming response
   * @param {string} userMessage - The user's message
   * @param {Array} history - Previous messages [{role, content}, ...]
   * @param {function} onChunk - Callback for each response chunk
   * @returns {Promise<string>} The complete response
   */
  async chat(userMessage, history = [], onChunk = null) {
    if (!this.connected || !this.model) {
      throw new Error('Not connected to Ollama. Please ensure Ollama is running.');
    }

    // Cancel any ongoing request
    this.abort();

    this.abortController = new AbortController();

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
      { role: 'user', content: userMessage },
    ];

    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.model,
          messages,
          stream: true,
          options: {
            temperature: 0.7,
            top_p: 0.9,
            num_predict: 1024,
          },
        }),
        signal: this.abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`Ollama returned HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(l => l.trim());

        for (const line of lines) {
          try {
            const json = JSON.parse(line);
            if (json.message && json.message.content) {
              fullResponse += json.message.content;
              if (onChunk) {
                onChunk(json.message.content, fullResponse);
              }
            }
          } catch {
            // Skip malformed JSON lines
          }
        }
      }

      this.abortController = null;
      return fullResponse;
    } catch (error) {
      this.abortController = null;
      if (error.name === 'AbortError') {
        return '';
      }
      throw error;
    }
  }

  /**
   * Generate a personalized workout plan based on user parameters
   */
  async generatePlan(params, onChunk = null) {
    const { weightKg, targetCalories, level, environment, maxMinutes, exercises } = params;

    const exerciseList = exercises
      .slice(0, 5)
      .map(e => `- ${e.name}: ${e.duration} min (MET ${e.met}, ${e.caloriesPerMinute} cal/min)`)
      .join('\n');

    const prompt = `I want to burn ${targetCalories} calories through outdoor exercise. Here are my details:
- Weight: ${weightKg} kg
- Fitness level: ${level}
- Preferred environment: ${environment === 'all' ? 'Any outdoor setting' : environment}
${maxMinutes ? `- Available time: ${maxMinutes} minutes` : '- No time limit'}

Based on MET calculations, here are the top exercises that match:
${exerciseList}

Please create a personalized outdoor workout plan that:
1. Targets my calorie goal
2. Matches my fitness level
3. Includes warm-up and cool-down suggestions
4. Gives practical tips for doing this outdoors
5. Mentions any safety considerations

Keep it concise and actionable — I want to get outside quickly!`;

    return this.chat(prompt, [], onChunk);
  }

  /**
   * Abort any ongoing request
   */
  abort() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  /**
   * Update the base URL and reconnect
   */
  async setBaseUrl(url) {
    this.baseUrl = url.replace(/\/$/, '');
    return this.connect();
  }
}

// Singleton instance
export const ollamaClient = new OllamaClient();
export default ollamaClient;
