const supertest = require("supertest");
const app = require("./index");

describe("GET /", function () {
  it("it shoud return invalid URL for any unhandled paths and status code 501", (done) => {
    supertest(app)
      .get("/")
      .expect(501)
      .expect({ error: { message: "Please check you have the correct URL." } })
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});
