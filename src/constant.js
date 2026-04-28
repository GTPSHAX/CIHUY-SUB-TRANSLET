// App configuration
const APP_HOST = process.env.APP_HOST || '0.0.0.0';
const APP_PORT = process.env.APP_PORT || 3000;

// WebVTT configuration
const WEBVTT_MAX_CHARS = 2000;
const WEBVTT_DELIMITER = ' ||| ';
const WEBVTT_SPLIT_REGEX = /\s*\|\|\|\s*/;

// Social links
const SOCIAL_LINKS = {
  github: 'https://github.com/ZertCihuyy',
  tiktok: 'https://tiktok.com/@zertcihuy',
  support: 'https://sociabuzz.com/zerty_/tribe',
  instagram: 'https://instagram.com/zrertcihuy'
};

module.exports = {
  APP_HOST,
  APP_PORT,

  WEBVTT_MAX_CHARS,
  WEBVTT_DELIMITER,
  WEBVTT_SPLIT_REGEX,
  
  SOCIAL_LINKS,
};
