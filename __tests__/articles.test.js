const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const db = require("../db/connection.js");
const request = require("supertest");
const app = require("../app.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/article/:article_id", () => {
  test("200: Should return a requested article with matching article_id, with status code 200", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        const articleObject = response.body.article;
        expect(articleObject).toEqual(
          expect.objectContaining({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          })
        );
      });
  });
  test('400: Should receive a Bad Request message with status code 400 when passed an invalid id', () => {
    return request(app).get('/api/articles/eggs').expect(400).then((response) => {
        expect(response.body.msg).toBe('Bad Request')
    })
  });
   test("404: Should receive a Not Found message with status code 404 when passed an id that does not exist", () => {
     return request(app)
       .get("/api/articles/103")
       .expect(404)
       .then((response) => {
         expect(response.body.msg).toBe("Not Found");
       });
   });
});
