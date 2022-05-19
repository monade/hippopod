import { XMLParser } from "fast-xml-parser";
import moment from 'moment';
import { Podcast } from "../models/podcast";

export const getPodcast = async (feedUrl: string): Promise<any> => {
  const feedText = await getFeedText(feedUrl);
  const feed = new XMLParser({ ignoreAttributes: false }).parse(feedText);
  return {
    feedUrl,
    ...parsePodcast(feed)
  };
}

const getFeedText = (url: string) => {
  return fetch(url).then(res => res.text());
}

const parsePodcast = (feed: any): Omit<Podcast, 'feedUrl'> => {
  const channel = feed.rss.channel;

  return {
    title: channel.title,
    description: findByPaths(channel, ['description', 'itunes:description', 'googleplay:description']),
    author: findByPaths(channel, ['itunes:owner.itunes:name', 'author', 'itunes:author', 'googleplay:author']),
    email: findByPaths(channel, ['itunes:owner.itunes:email']),
    categories: findMultipleByPaths(channel, ['category', 'itunes:category', 'itunes:category.@_text', 'googleplay:category', 'googleplay:category.@_text']),
    imageUrl: findByPaths(channel, ['image.url', 'itunes:image.url', 'googleplay:image.url']),
    episodes: (channel.item as any[]).map(item => ({
      title: item.title,
      description: findByPaths(item, ['description', 'itunes:description', 'googleplay:description']),
      url: findByPath(item, 'enclosure.@_url'),
      type: findByPath(item, 'enclosure.@_type'),
      sizeBytes: +findByPath(item, 'enclosure.@_length') || undefined,
      imageUrl: findByPaths(item, ['image.@_href', 'itunes:image.@_href', 'googleplay:image.@_href']),
      durationSeconds: +findByPaths(item, ['duration', 'itunes:duration', 'googleplay:duration']),
      publicationDate: parseDate(findByPaths(item, ['pubDate', 'itunes:pubDate', 'googleplay:pubDate', 'lastBuildDate'])),
    })),
    lastBuildDate: channel.lastBuildDate,
    language: channel.language,
    copyright: channel.copyright
  };
}

const parseDate = (dateString: string): Date | undefined => {
  if (!dateString) {
    return undefined;
  }

  return moment(dateString).toDate();
}

const findMultipleByPaths = (tag: any, paths: string[]): string[] => {
  const matches: string[] = [];

  for (const path of paths) {
    matches.push(...findMultipleByPath(tag, path).filter(match => !matches.includes(match.toLowerCase().trim())));
  }

  return matches;
}

const findMultipleByPath = (tag: any, path: string): string[] => {
  const pathSegments = path.split('.');

  if (!pathSegments.length) {
    return [];
  }

  try {
    const child = tag[pathSegments[0]];

    if (!child) {
      return [];
    }

    if (pathSegments.length === 1) {
      if (typeof child === 'string') {
        return [ child ];
      }

      if (Array.isArray(child)) {
        return child.filter(match => typeof match === 'string');
      }

      return [];
    } else {
      const childAsArray = Array.isArray(child) ? child : [ child ];

      if (Array.isArray(child)) {
        return child.reduce((accumulator, current) =>
          [ ...accumulator, ...findMultipleByPath(current, pathSegments.slice(1).join('.')) ], []
        );
      }

      if (typeof child === 'object') {
        return findMultipleByPath(child, pathSegments.slice(1).join('.'));
      }

      return [];
    }
  } catch {
    return [];
  }
}

const findByPaths = (tag: any, paths: string[]): any | null => {
  for (const path of paths) {
    const match = findByPath(tag, path);

    if (match) {
      return match;
    }
  }

  return null;
}

const findByPath = (tag: any, path: string): any | null => {
  const pathSegments = path.split('.');

  if (!pathSegments.length) {
    return null;
  }

  try {
    const child = tag[pathSegments[0]];
  
    if (pathSegments.length === 1) {
      return child;
    }
  
    return findByPath(child, pathSegments.slice(1).join('.'));
  } catch {
    return null;
  }
}