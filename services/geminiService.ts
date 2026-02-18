/**
 * Gemini AI Service
 * Calls Gemini API through Vite proxy to keep API key server-side
 */

export interface GeminiResponse {
  text: string;
  error?: string;
}

/**
 * Generate AI-powered goal suggestions or insights
 * @param prompt - The prompt to send to Gemini
 * @returns AI-generated response
 */
export async function generateAIResponse(prompt: string): Promise<GeminiResponse> {
  try {
    // In production, this would call through the Vite proxy to /api/gemini
    // For now, returning a mock response since we're using placeholders
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Mock AI response
    return {
      text: `AI-generated suggestion based on: "${prompt}". Here are some personalized recommendations to help you achieve your goal.`,
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    return {
      text: '',
      error: 'Failed to generate AI response. Please try again.',
    };
  }
}

/**
 * Get goal suggestions based on user history
 * @param userGoals - Array of previous user goals
 * @returns AI-suggested goals
 */
export async function suggestGoals(userGoals: string[]): Promise<string[]> {
  const prompt = `Based on these previous goals: ${userGoals.join(', ')}. Suggest 3 new challenging but achievable goals.`;
  
  const response = await generateAIResponse(prompt);
  
  if (response.error) {
    return [];
  }
  
  // In production, would parse the AI response properly
  // For now, return mock suggestions
  return [
    'Complete a 45-minute deep work session',
    'Read 25 pages of a technical book',
    'Practice a new skill for 30 minutes',
  ];
}

/**
 * Analyze commitment patterns and provide insights
 * @param successRate - User's success rate percentage
 * @param averageDuration - Average session duration in minutes
 * @returns AI-generated insights
 */
export async function analyzePatterns(
  successRate: number,
  averageDuration: number
): Promise<string> {
  const prompt = `Analyze commitment patterns: ${successRate}% success rate, average ${averageDuration} minutes per session. Provide actionable insights.`;
  
  const response = await generateAIResponse(prompt);
  return response.text || 'Keep up the great work!';
}
