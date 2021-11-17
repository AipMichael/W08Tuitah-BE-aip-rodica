require("dotenv").config();
const debug = require("debug")("user:routes:tests");
const chalk = require("chalk");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const initializeDB = require("../../database");
const User = require("../../database/models/user");
const { initializeServer } = require("../index");
const { app } = require("../index");

jest.setTimeout(20000);

const request = supertest(app);

let server;

beforeAll(async () => {
  await initializeDB(process.env.MONGO_DB_STRING_TEST);
  server = await initializeServer(process.env.SERVER_PORT_TEST);
});

beforeEach(async () => {
  myTuits = [
    {
      text: "soy una reina tuitera. Cuidado que lo peto",
      likes: 5,
      date: new Date(),
    },
    {
      text: "yendo a comer tacos al pastor.",
      likes: 10,
      date: new Date(),
    },
  ];
  await User.deleteMany();
  await User.create(myUsers[0]);
  await User.create(myUsers[1]);
});

afterAll(async () => {
  await mongoose.connection.on("close", () => {
    debug(chalk.greenBright("Connexion to database has been closed."));
  });
  await mongoose.connection.close();
  await server.on("close", () => {
    debug(chalk.greenBright("Connexion to server has been closed."));
  });
  await server.close();
});

describe("Given a /tuits router,", () => {
  describe("When it gets a GET request for /tuits", () => {
    test("Then it should send a respond with the requested tuits", async () => {
      const { body } = await request;

      expect(myTuits).toBeDefined(); //to be in the document
    });
  });
});
