interface Headline {
  headline: string;
  url: string;
  pub_date: string;
  year: number;
}

interface HeadlineQuality {
  score: number;
  reason: string;
}

// Keywords that might indicate significant historical events
const SIGNIFICANT_KEYWORDS = [
  'breakthrough', 'revolutionary', 'historic', 'first', 'launch',
  'discovery', 'invention', 'election', 'summit', 'treaty'
];

function assessHeadlineQuality(headline: Headline): HeadlineQuality {
  console.log(`[Filter] Assessing headline: "${headline.headline}"`);

  // Check headline length
  if (!headline.headline || headline.headline.length < 10) {
    console.log(`[Filter] Headline too short: ${headline.headline.length} chars`);
    return { score: 0, reason: 'Headline too short' };
  }

  if (headline.headline.length > 200) {
    console.log(`[Filter] Headline too long: ${headline.headline.length} chars`);
    return { score: 0, reason: 'Headline too long' };
  }

  // Calculate significance score
  const significantMatches = SIGNIFICANT_KEYWORDS.filter(keyword =>
    headline.headline.toLowerCase().includes(keyword)
  ).length;

  const baseScore = 0.5;
  const significanceBonus = significantMatches * 0.1;
  const finalScore = Math.min(baseScore + significanceBonus, 1);

  console.log(`[Filter] Score: ${finalScore} (${significantMatches} significant keywords)`);
  return {
    score: finalScore,
    reason: significantMatches > 0 ? 'Contains significant historical event' : 'Standard headline'
  };
}

export function filterHeadlines(headlines: Headline[]): Headline[] {
  console.log(`[Filter] Starting with ${headlines.length} headlines`);

  const filtered = headlines
    .map(headline => ({
      headline,
      quality: assessHeadlineQuality(headline)
    }))
    .filter(({ quality }) => quality.score > 0.5)
    .sort((a, b) => b.quality.score - a.quality.score)
    .map(({ headline }) => headline);

  console.log(`[Filter] Filtered down to ${filtered.length} headlines`);
  return filtered;
}

export function getBestHeadlines(headlines: Headline[], count: number = 3): Headline[] {
  const filtered = filterHeadlines(headlines);
  return filtered.slice(0, count);
} 