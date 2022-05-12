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
];
