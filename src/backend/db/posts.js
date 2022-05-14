import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "I think it is possible for ordinary people to choose to be extraordinary.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "elon",
    lastName: "Musk",
    firstName: "Elon",
    comments: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "I see myself as the best footballer in the world. If you don't believe you are the best, then you will never achieve all that you are capable of.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "cristiano",
    lastName: "Ronaldo",
    firstName: "Cristiano",
    comments: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "John Wick is a man of focus, commitment, sheer will… something you know very little about.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "johnwick",
    lastName: "Wick",
    firstName: "John",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "elon",
        text: "Wow!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: uuid(),
    content:
      "But it's a journey and the sad thing is you only learn from experience, so as much as someone can tell you things, you have to go out there and make your own mistakes in order to learn.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "emma",
    lastName: "Watson",
    firstName: "Emma",
    comments: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Himanshu Singh (@hsnice16) posts some nice content on Twitter. You all should follow his content.",
    likes: {
      likeCount: 100,
      likedBy: [],
      dislikedBy: [],
    },
    username: "elon",
    lastName: "Musk",
    firstName: "Elon",
    comments: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "What's important is for us to be aware that our actions have repercussions.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "katherine",
    lastName: "Langford",
    firstName: "Katherine",
    comments: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Stop looking at hard work as **work**",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "mastershi",
    lastName: "Heng",
    firstName: "Master Shi",
    comments: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Sometimes your higher self will guide you to make mistakes so you can learn lessons.\n\n\t\t — Gabrielle Bernstein",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "prabhu",
    lastName: "Prabhu",
    firstName: "Amogh",
    comments: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  }
];
