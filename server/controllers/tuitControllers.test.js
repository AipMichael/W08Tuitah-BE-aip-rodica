const Tuit = require("../../database/models/tuit");
const { getTuits } = require("./tuitControllers");

jest.mock("../../database/models/tuit");

describe("Given a getTuits function", () => {
  describe("When it receives an object response", () => {
    test("Then it should invoke its json metod", async () => {
      const tuits = [
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
      const res = {
        json: jest.fn(),
      }

      Tuit.find = jest.fn().mockResolvedValue(tuits);

      await getTuits(null,res);

      expect(Tuit.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(tuits);

    })
  })
})