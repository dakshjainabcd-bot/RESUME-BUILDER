const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const getApiKey = () => localStorage.getItem('gemini_api_key') || '';
export const setApiKey = (key) => localStorage.setItem('gemini_api_key', key);
export const hasApiKey = () => !!getApiKey();

async function callGemini(prompt) {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('No API key set. Please add your Gemini API key in settings.');

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

export async function enhanceSummary(rawSummary, jobTitle = '') {
  const prompt = `You are a professional resume writer. Rewrite the following career summary/objective to be more professional, impactful, and ATS-friendly. Use strong action words and quantify achievements where possible. Keep it concise (2-3 sentences max).

${jobTitle ? `Target Job Title: ${jobTitle}` : ''}

Original text:
"${rawSummary}"

Return ONLY the improved summary text, no quotes, no explanations.`;

  return await callGemini(prompt);
}

export async function enhanceBulletPoints(bullets, jobTitle = '', company = '') {
  const prompt = `You are a professional resume writer. Improve the following work experience bullet points to be more impactful, professional, and ATS-optimized. Use strong action verbs (Led, Architected, Spearheaded, Optimized, etc.). Quantify results where possible. Each bullet should start with a past tense action verb.

${jobTitle ? `Job Title: ${jobTitle}` : ''}
${company ? `Company: ${company}` : ''}

Original bullet points:
${bullets.map((b, i) => `${i + 1}. ${b}`).join('\n')}

Return ONLY the improved bullet points, one per line, numbered. No other text.`;

  const result = await callGemini(prompt);
  return result
    .split('\n')
    .map(line => line.replace(/^\d+\.\s*/, '').trim())
    .filter(line => line.length > 0);
}

export async function enhanceFullResume(resumeData) {
  const prompt = `You are a professional resume writer with 20 years of experience. Analyze the following resume data and improve ALL text content to be more professional, impactful, and ATS-optimized.

Resume Data:
${JSON.stringify(resumeData, null, 2)}

Rules:
1. Improve the summary to be concise and impactful (2-3 sentences)
2. Make all experience bullet points start with strong action verbs
3. Quantify achievements where possible
4. Improve project descriptions to highlight impact
5. Keep the same structure and fields
6. Do NOT change names, dates, company names, or contact info
7. Do NOT add information that wasn't there

Return ONLY a valid JSON object with the exact same structure but improved text content. No markdown, no code fences, just the JSON.`;

  const result = await callGemini(prompt);
  
  // Try to parse the JSON response
  try {
    // Clean up potential markdown code fences
    const cleaned = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error('Failed to parse AI response:', e);
    throw new Error('AI returned invalid format. Please try again.');
  }
}

export async function suggestSkills(experience, currentSkills) {
  const prompt = `Based on the following work experience and projects, suggest additional relevant technical and soft skills that would strengthen this resume. Only suggest skills NOT already listed.

Experience:
${JSON.stringify(experience, null, 2)}

Current Skills:
${JSON.stringify(currentSkills, null, 2)}

Return ONLY a comma-separated list of 5-10 suggested skills. No explanations.`;

  const result = await callGemini(prompt);
  return result.split(',').map(s => s.trim()).filter(s => s.length > 0);
}
