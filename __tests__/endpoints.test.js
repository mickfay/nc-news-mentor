const request = require("supertest");
const app = require("../app.js");
const fs = require("fs/promises");

describe("get /api", () => {
  test("200: Responds with an object describing all endpoints of api", () => {
    const endpointsJSON = fs
      .readFile(`${__dirname}/../endpoints.json`)
      .then((data) => {
        const endpointsObj = JSON.parse(data);
        return endpointsObj;
      });

    const testQuery = request(app).get("/api").expect(200);

    return Promise.all([endpointsJSON, testQuery]).then(
      ([endpointsObj, queryOutput]) => {
        const endpoints = queryOutput.body.endpoints;
        const numberOfEndpoints = Object.keys(endpointsObj).length;
        expect(Object.keys(endpoints).length).toBe(numberOfEndpoints);
        for (key in endpoints) {
          expect(endpoints[key]).toHaveProperty("description");
          expect(endpoints[key]).toHaveProperty("queries");
          expect(endpoints[key]).toHaveProperty("exampleResponse");
        }
      }
    );
  });
});
