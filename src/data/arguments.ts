const productionArguments = {
  color: 'PRIMARY_COLOR_NAME',
  theme: 'THEME_NAME',
  themeMode: 'THEME_MODE',
  links: {
    applePodcasts: 'APPLE_PODCASTS_LINK',
    googlePodcasts: 'GOOGLE_PODCASTS_LINK',
    pocketCasts: 'POCKET_CASTS_LINK',
    spotify: 'SPOTIFY_LINK',
    rssFeed: 'RSS_FEED_LINK',
  },
  socials: {
    facebook: 'FACEBOOK_LINK',
    instagram: 'INSTAGRAM_LINK',
    twitter: 'TWITTER_LINK',
  },
};

const developmentsArguments = {
  color: '2eb170',
  theme: 'cubango',
  themeMode: 'light',
  links: {
    applePodcasts: 'https://podcasts.apple.com/it/podcast/il-podcast-di-alessandro-barbero-lezioni-e/id1501956064',
    googlePodcasts: 'https://podcasts.google.com/feed/aHR0cHM6Ly93d3cuc3ByZWFrZXIuY29tL3Nob3cvNDI1NTIxMy9lcGlzb2Rlcy9mZWVk',
    pocketCasts: 'https://pca.st/igqozvaa',
    spotify: 'https://open.spotify.com/show/2G4tqGffDNWKTU5oYQRg1W?si=NjLdPQE8Q8CxJ7Fdv6q8-A&nd=1',
    rssFeed: 'https://www.spreaker.com/show/4255213/episodes/feed',
  },
  socials: {
    facebook: 'https://www.facebook.com/barberopodcast',
    instagram: 'https://www.instagram.com/barberopodcast/',
    twitter: 'https://twitter.com/barberopodcast',
  },
};

export const ARGUMENTS = process.env.NODE_ENV === 'production' ? productionArguments : developmentsArguments;
