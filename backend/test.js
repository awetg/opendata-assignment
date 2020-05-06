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

// testing the only valid api end point for getting sensor data, expecting empty object or array of sensor data
// describe("GET /", function () {
//   it("it shoud return empty json object or array of array of json data and status code 200", (done) => {
//     supertest(app)
//       .get("/api/events")
//       .expect(200)
//       .expect({})
//       .end((err, res) => {
//         if (err) done(err);
//         done();
//       });
//   });
// });
