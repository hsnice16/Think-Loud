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
    password: "muskSon",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    email: "elon@gmail.com",
  },
];
