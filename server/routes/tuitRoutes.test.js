require("dotenv").config();
const debug = require("debug")("user:routes:tests");
const chalk = require("chalk");
const mongoose = require("mongoose");

const supertest = require("supertest");
const initializeDB = require("../../database");
const Tuit = require("../../database/models/tuit");
const { initializeServer } = require("../index");
const { app } = require("../index");

jest.setTimeout(20000);

const request = supertest(app);

let server;
let myTuits;
let newDate;

beforeAll(async () => {
  await initializeDB(process.env.MONGO_DB_STRING_TEST);
  server = await initializeServer(process.env.SERVER_PORT_TEST);
});

beforeEach(async () => {
  myTuits = [
    {
      text: "soy una reina tuitera. Cuidado que lo peto",
      likes: 5,
      date: newDate,
    },
    {
      text: "yendo a comer tacos al pastor.",
      likes: 10,
      date: newDate,
    },
  ];
  newDate = new Date();
  await Tuit.deleteMany();
  await Tuit.create(myTuits[0]);
  await Tuit.create(myTuits[1]);
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
    test("Then it should send a respond an array of robots and a 200 status", async () => {
      const { body } = await request.get("/robots").expect(200);

      expect(body).toHaveLength(2);
      expect(body).toContainEqual({
        text: "soy una reina tuitera. Cuidado que lo peto",
        likes: 5,
        date: newDate,
      });
    });
  });
});
