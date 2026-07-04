// Comprehensive word filtering list for safe chat environments
export const BLOCKED_WORDS = [
  'fuck', 'shit', 'ass', 'bitch', 'bastard', 'crap', 'piss', 'dick', 'cock',
  'pussy', 'cunt', 'whore', 'slut', 'fag', 'nigga', 'nigger'
];
export const isBlocked = (text) => {
  if (!text) return false;
  const normalized = text.toLowerCase();
  return BLOCKED_WORDS.some(word => normalized.includes(word));
};
