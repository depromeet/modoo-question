import { createContext } from 'react';

export const RankingContext = createContext({
  // ranking = { speaker1: [], speaker2: [], ...}
  rankings: {
    'speaker': [
      {
        commentId: 0,
        context: "",
        likeCount: 0,
      }
    ]
  },
  setRankings: () => {},
});

export const RankingProvider = RankingContext.Provider;
export const RankingConsumer = RankingContext.Consumer;
