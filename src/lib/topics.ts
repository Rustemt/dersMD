import map from "../../content/topics/lgs-yks.json";

export type TopicNode = {
  id: string;
  label: string;
  exam: string;
  children?: TopicNode[];
};

export type TopicMap = {
  id: string;
  title: string;
  nodes: TopicNode[];
};

export function getTopicMap(): TopicMap {
  return map as TopicMap;
}
