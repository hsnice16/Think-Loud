import { v4 as uuid } from "uuid";

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
    profilePic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_thumb,h_100,w_100/v1652807157/elon_f0pmdq.jpg",
    lastName: "Musk",
    firstName: "Elon",
    comments: [],
    createdAt: "2022-06-22T00:05:39+05:30",
    updatedAt: "2022-06-22T00:05:39+05:30",
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
    profilePic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_thumb,h_100,w_100/v1652809914/ronaldo_nklsfu.jpg",
    lastName: "Ronaldo",
    firstName: "Cristiano",
    comments: [],
    createdAt: "2022-06-22T00:07:24+05:30",
    updatedAt: "2022-06-22T00:07:24+05:30",
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
    profilePic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_thumb,h_100,w_100/v1652807080/johnwick_nk2ibz.jpg",
    lastName: "Wick",
    firstName: "John",
    createdAt: "2022-06-22T00:08:15+05:30",
    updatedAt: "2022-06-22T00:08:15+05:30",
    comments: [
      {
        _id: uuid(),
        username: "elon",
        profilePic:
          "https://res.cloudinary.com/thinkloud/image/upload/c_thumb,h_100,w_100/v1652807157/elon_f0pmdq.jpg",
        lastName: "Musk",
        firstName: "Elon",
        text: "Wow!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        createdAt: "2022-06-22T00:10:37+05:30",
        updatedAt: "2022-06-22T00:10:37+05:30",
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
    profilePic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_thumb,h_100,w_100/v1652807229/emma_pnvnbh.jpg",
    lastName: "Watson",
    firstName: "Emma",
    comments: [],
    createdAt: "2022-06-22T00:08:15+05:30",
    updatedAt: "2022-06-22T00:08:15+05:30",
  },
  {
    _id: uuid(),
    content:
      "Himanshu Singh (@hsnice16) posts some nice content on Twitter. You all should follow his content.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "elon",
    profilePic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_thumb,h_100,w_100/v1652807157/elon_f0pmdq.jpg",
    lastName: "Musk",
    firstName: "Elon",
    comments: [],
    createdAt: "2022-06-22T00:08:15+05:30",
    updatedAt: "2022-06-22T00:08:15+05:30",
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
    profilePic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_thumb,h_100,w_100/v1652809914/katherine_whqwrl.jpg",
    lastName: "Langford",
    firstName: "Katherine",
    comments: [],
    createdAt: "2022-06-22T00:08:15+05:30",
    updatedAt: "2022-06-22T00:08:15+05:30",
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
    profilePic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_thumb,h_100,w_100/v1652809914/master_shi_wpqvx1.jpg",
    lastName: "Heng",
    firstName: "Master Shi",
    comments: [],
    createdAt: "2022-06-22T00:08:15+05:30",
    updatedAt: "2022-06-22T00:08:15+05:30",
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
    profilePic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_thumb,h_100,w_100/v1652809914/amogh_prabhu_baeztz.jpg",
    lastName: "Prabhu",
    firstName: "Amogh",
    comments: [],
    createdAt: "2022-06-22T00:08:15+05:30",
    updatedAt: "2022-06-22T00:08:15+05:30",
  },
];
