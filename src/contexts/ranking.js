import { createContext } from 'react';

export const RankingContext = createContext({
  // rankings[speakerId] = commentList 형태
  rankings: {
    speakerId: [
      {
        commentId: 0,
        context: "",
        likeCount: 0,
      },
    ]
  },
  setRankings: () => {},
  updateRankingsOfSpeaker: () => {},
});

export const RankingProvider = RankingContext.Provider;
export const RankingConsumer = RankingContext.Consumer;
