import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    lastName: "Wick",
    firstName: "John",
    username: "johnwick",
    bio: "an American neo-noir action-thriller media franchise created by screenwriter Derek Kolstad and starring Keanu Reeves as John Wick, a former hitman who is forced back into the criminal underworld he had abandoned",
    websiteURL: "https://en.wikipedia.org/wiki/John_Wick",
    bgPic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_fill,h_150,w_540/v1652812492/john_bg_kiflfc.jpg",
    profilePic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_thumb,h_100,w_100/v1652807080/johnwick_nk2ibz.jpg",
    password: "johnWick",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    email: "johnwick@gmail.com",
  },
  {
    _id: uuid(),
    lastName: "Heng",
    firstName: "Master Shi",
    username: "mastershi",
    bio: "belongs to the 35th Generation of Shaolin Masters and the headmaster of the Shaolin Temple Europe",
    websiteURL: "https://www.shihengyi.online/",
    bgPic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_fill,h_150,w_540/v1652812492/master_shi_bg_d3c9xa.jpg",
    profilePic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_thumb,h_100,w_100/v1652809914/master_shi_wpqvx1.jpg",
    password: "patience",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    email: "mastershi@gmail.com",
  },
  {
    _id: uuid(),
    lastName: "Watson",
    firstName: "Emma",
    username: "emma",
    bio: "potter girl",
    websiteURL: "https://en.wikipedia.org/wiki/Emma_Watson",
    bgPic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_fill,h_150,w_540/v1652812492/emm_bg_iwnbnz.jpg",
    profilePic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_thumb,h_100,w_100/v1652807229/emma_pnvnbh.jpg",
    password: "potterGirl",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    email: "emma@gmail.com",
  },
  {
    _id: uuid(),
    lastName: "Langford",
    firstName: "Katherine",
    username: "katherine",
    bio: "Hannah Baker of 13 Reasons Why",
    websiteURL: "https://en.wikipedia.org/wiki/Katherine_Langford",
    bgPic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_fill,h_150,w_540/v1652812492/hanna_bg_h6bobs.jpg",
    profilePic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_thumb,h_100,w_100/v1652809914/katherine_whqwrl.jpg",
    password: "13ReasonsWhy",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    email: "katherine@gmail.com",
  },
  {
    _id: uuid(),
    lastName: "Prabhu",
    firstName: "Amogh",
    username: "prabhu",
    bio: "vice president of Dwarka ISKCON temple",
    websiteURL: "https://writerclubs.in/amogh-lila-prabhu-wiki-biography/",
    bgPic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_fill,h_150,w_540/v1652812492/amogh_prabhu_bg_sb4wsb.jpg",
    profilePic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_thumb,h_100,w_100/v1652809914/amogh_prabhu_baeztz.jpg",
    password: "hareKrishna",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    email: "prabhu@gmail.com",
  },
  {
    _id: uuid(),
    lastName: "Ronaldo",
    firstName: "Cristiano",
    username: "cristiano",
    bio: "a Portuguese professional footballer who plays as a forward for Premier League club Manchester United and captains the Portugal national team.",
    websiteURL: "https://www.cristianoronaldo.com/#cr7",
    bgPic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_fill,h_150,w_540/v1652812492/cristiano_bg_ye1cj0.jpg",
    profilePic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_thumb,h_100,w_100/v1652809914/ronaldo_nklsfu.jpg",
    password: "ronaldoFam",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    email: "cristiano@gmail.com",
  },
  {
    _id: uuid(),
    lastName: "Musk",
    firstName: "Elon",
    username: "elon",
    bio: "founder, CEO, and chief engineer at SpaceX; angel investor, CEO and Product Architect of Tesla, Inc.; founder of The Boring Company; and co-founder of Neuralink and OpenAI.",
    websiteURL: "https://en.wikipedia.org/wiki/Elon_musk",
    bgPic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_fill,h_150,w_540/v1652812492/elon_bg_gasjlt.jpg",
    profilePic:
      "https://res.cloudinary.com/thinkloud/image/upload/c_thumb,h_100,w_100/v1652807157/elon_f0pmdq.jpg",
    password: "muskSon",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    email: "elon@gmail.com",
  },
];
