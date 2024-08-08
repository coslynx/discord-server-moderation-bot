import natural from 'natural';
import { logger } from './logger';
import { config } from './config';

const { WordNet } = natural;

export const isOffensive = (text: string): boolean => {
  try {
    const tokenizer = new natural.WordTokenizer();
    const words = tokenizer.tokenize(text);

    // Check if any words are considered offensive
    for (const word of words) {
      // Use a pre-trained profanity list or a custom list
      if (config.profanityList.includes(word.toLowerCase())) {
        return true;
      }

      // Use WordNet to check for synonyms that might be offensive
      const synsets = WordNet.lookup(word);
      if (synsets) {
        for (const synset of synsets) {
          for (const synonym of synset.words) {
            if (config.profanityList.includes(synonym.toLowerCase())) {
              return true;
            }
          }
        }
      }
    }

    return false;
  } catch (error) {
    logger.error('Error in NLP.isOffensive:', error);
    return false;
  }
};

export const detectSpam = (text: string): boolean => {
  try {
    // Use machine learning models or rules-based approaches
    // Example: Using a basic rule-based approach
    const keywords = ['discount', 'free', 'cheap', 'sale'];
    for (const keyword of keywords) {
      if (text.toLowerCase().includes(keyword)) {
        return true;
      }
    }

    // Check for repeated characters or patterns often found in spam messages
    // ...

    return false;
  } catch (error) {
    logger.error('Error in NLP.detectSpam:', error);
    return false;
  }
};

export const analyzeSentiment = (text: string): 'positive' | 'negative' | 'neutral' => {
  try {
    // Use sentiment analysis libraries or APIs
    // Example: Using a basic sentiment analysis library
    const sentimentAnalyzer = new natural.Sentiment();
    const sentimentScore = sentimentAnalyzer.getSentiment(text);

    if (sentimentScore > 0) {
      return 'positive';
    } else if (sentimentScore < 0) {
      return 'negative';
    } else {
      return 'neutral';
    }
  } catch (error) {
    logger.error('Error in NLP.analyzeSentiment:', error);
    return 'neutral';
  }
};

export const extractKeywords = (text: string): string[] => {
  try {
    const tokenizer = new natural.WordTokenizer();
    const words = tokenizer.tokenize(text);

    // Use keyword extraction techniques
    // Example: Using TF-IDF (Term Frequency-Inverse Document Frequency)
    const tfidf = new natural.TfIdf();
    tfidf.addDocument(words);

    // Get top keywords
    const keywords = tfidf.listTerms(5); // Get top 5 keywords
    return keywords.map((k) => k.term);
  } catch (error) {
    logger.error('Error in NLP.extractKeywords:', error);
    return [];
  }
};

export const detectLanguage = (text: string): string => {
  try {
    // Use language detection libraries or APIs
    // Example: Using a basic language detection library
    const languageDetector = new natural.LanguageDetector();
    const detectedLanguage = languageDetector.detect(text);
    return detectedLanguage;
  } catch (error) {
    logger.error('Error in NLP.detectLanguage:', error);
    return 'en'; // Default to English
  }
};