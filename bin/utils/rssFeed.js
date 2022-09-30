import { XMLParser } from "fast-xml-parser";
import axios from 'axios';

const getImageUrlFromRssFeed = async (rssFeedLink) => {
  try {
    const {data: feedText} = await axios.get(rssFeedLink);
    const feed = new XMLParser({ ignoreAttributes: false }).parse(feedText);
    const channel = feed.rss.channel;

    return findByPaths(channel, ['image.url', 'itunes:image.url', 'googleplay:image.url']);
  } catch(e) {
    throw new Error(e);
  }
};

const findByPaths = (tag, paths) => {
  for (const path of paths) {
    const match = findByPath(tag, path);

    if (match) {
      return match;
    }
  }

  return null;
};

const findByPath = (tag, path) => {
  const pathSegments = path.split(".");

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
};

export default getImageUrlFromRssFeed;
