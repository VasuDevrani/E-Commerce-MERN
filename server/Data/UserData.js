import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Vasu",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "John",
      email: "user@example.com",
      password: bcrypt.hashSync("123677656756"),
      isAdmin: false,
    },
  ],
};

export default data;
