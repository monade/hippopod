import { XMLParser } from "fast-xml-parser";
import { Z_DEFAULT_STRATEGY } from "zlib";
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
    imageUrl: findByPaths(channel, ['image', 'itunes:image', 'googleplay:image']),
    episodes: (channel.item as any[]).map(item => ({
      title: item.title,
      description: findByPaths(item, ['description', 'itunes:description', 'googleplay:description']),
      url: findByPath(item, 'enclosure.@_url'),
      type: findByPath(item, 'enclosure.@_type'),
      sizeBytes: findByPath(item, 'enclosure.@_length'),
      imageUrl: findByPaths(item, ['image', 'itunes:image', 'googleplay:image']),
      durationSeconds: findByPaths(item, ['duration', 'itunes:duration', 'googleplay:duration']),
      publicationDate: findByPaths(item, ['pubDate', 'itunes:pubDate', 'googleplay:pubDate']),
    })),
    lastUpdate: new Date(channel.lastBuildDate),
    language: channel.language,
    copyright: channel.copyright
  };
}

const findMultipleByPaths = (tag: any, paths: string[]): string[] => {
  const matches: string[] = [];

  for (const path of paths) {
    const match = findByPath(tag, path);

    if (match && (typeof match === 'string') && !matches.some(m => m?.toLowerCase()?.trim() === match?.toLowerCase()?.trim())) {
      matches.push(match);
    }
  }

  return matches;
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

  const child = tag[pathSegments[0]];

  if (pathSegments.length === 1) {
    return child;
  }

  return findByPath(child, pathSegments.slice(1).join('.'));
}