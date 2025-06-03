const NVIDIA_API_KEY = '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';
const API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const PROXY_URL = '/api/proxy'; // Proxy endpoint to bypass CORS
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateConnection(milestone, headlines) {
  console.log(`[AI] Generating connection for age ${milestone.age}`);
  console.log(`[AI] Attempting with ${headlines.length} headlines`);

  for (const headline of headlines) {
    console.log(`[AI] Trying headline: "${headline.headline}"`);
    
    const prompt = `
Create a poetic connection between a personal milestone and a world event.
Personal milestone: Age ${milestone.age} - ${milestone.label}
Year: ${milestone.year}
Headline: ${headline.headline}

Additional context: This was a time of ${getTimeContext(milestone.age)}.

Create ONE short connection (max 20 words) linking the personal moment to the world event.
Format: "While you [personal action], [world event] was [parallel action]"
`;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        console.log(`[AI] Attempt ${attempt + 1}/${MAX_RETRIES}`);
        
        const response = await fetch(PROXY_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: API_URL,
            headers: {
              'Authorization': `Bearer ${NVIDIA_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: {
              model: 'meta/llama-3.1-8b-instruct',
              messages: [{ role: 'user', content: prompt }],
              temperature: 0.8,
              max_tokens: 50,
              stream: false
            }
          })
        });

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        const connection = data.choices?.[0]?.message?.content?.trim();
        
        if (!connection) {
          throw new Error('No connection generated');
        }

        console.log(`[AI] Successfully generated connection: "${connection}"`);
        return connection;
      } catch (err) {
        console.error(`[AI] Error on attempt ${attempt + 1}:`, err);
        
        if (attempt < MAX_RETRIES - 1) {
          const delay = RETRY_DELAY * Math.pow(2, attempt);
          console.log(`[AI] Waiting ${delay}ms before retry...`);
          await sleep(delay);
        }
      }
    }
  }

  console.log(`[AI] All attempts failed, using fallback`);
  return fallbackConnection(milestone);
}

function getTimeContext(age) {
  const contexts = {
    0: "new beginnings and first experiences",
    5: "early childhood and discovery",
    10: "growing up and learning",
    16: "teenage years and independence",
    18: "coming of age and new responsibilities",
    21: "young adulthood and personal growth"
  };
  return contexts[age] || "personal growth and change";
}

function fallbackConnection(milestone) {
  const fallbacks = [
    `At age ${milestone.age}, the world was changing as you grew.`,
    `While you reached age ${milestone.age}, history was being made.`,
    `The year you turned ${milestone.age} was a time of transformation.`,
    `As you celebrated your ${milestone.age}th year, the world was evolving.`
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

module.exports = { generateConnection }; 