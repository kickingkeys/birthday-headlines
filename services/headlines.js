// Load headlines from /public/headlines.json
const headlines = require('../public/headlines.json');

// Function to find headlines for exact date (birthdate)
function findHeadlinesForExactDate(date) {
  const dateStr = date.toISOString().split('T')[0];
  const exactMatches = headlines.filter(h => h.pub_date.split('T')[0] === dateStr);
  
  // If no exact matches, try ±1 day
  if (exactMatches.length === 0) {
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    
    return headlines.filter(h => {
      const pubDate = h.pub_date.split('T')[0];
      return pubDate === prevDate.toISOString().split('T')[0] || 
             pubDate === nextDate.toISOString().split('T')[0];
    });
  }
  
  return exactMatches;
}

// Function to find headlines within a date range (for other milestones)
function findHeadlinesInDateRange(startDate, endDate) {
  const startStr = startDate.toISOString().split('T')[0];
  const endStr = endDate.toISOString().split('T')[0];
  
  // First try to find headlines within the specified range
  let matches = headlines.filter(h => {
    const pubDate = h.pub_date.split('T')[0];
    return pubDate >= startStr && pubDate <= endStr;
  });
  
  // If no matches, gradually expand the range
  if (matches.length === 0) {
    const expandedStart = new Date(startDate);
    expandedStart.setDate(expandedStart.getDate() - 30);
    const expandedEnd = new Date(endDate);
    expandedEnd.setDate(expandedEnd.getDate() + 30);
    
    matches = headlines.filter(h => {
      const pubDate = h.pub_date.split('T')[0];
      return pubDate >= expandedStart.toISOString().split('T')[0] && 
             pubDate <= expandedEnd.toISOString().split('T')[0];
    });
  }
  
  return matches;
}

// Function to randomly select a headline from an array
function getRandomHeadline(headlines) {
  if (!headlines || headlines.length === 0) return null;
  
  // Try to find a headline with a non-empty headline field
  const validHeadlines = headlines.filter(h => h.headline && h.headline.trim().length > 0);
  if (validHeadlines.length === 0) return null;
  
  return validHeadlines[Math.floor(Math.random() * validHeadlines.length)];
}

module.exports = {
  findHeadlinesForExactDate,
  findHeadlinesInDateRange,
  getRandomHeadline
}; 