const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const db = require("../db/connection.js");
const request = require("supertest");
const app = require("../app.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/article/:article_id", () => {
  test("GET 200: Should return a requested article with matching article_id, with status code 200", () => {
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
  test("GET 400: Should receive a Bad Request message with status code 400 when passed an invalid id", () => {
    return request(app)
      .get("/api/articles/eggs")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("GET 404: Should receive a Not Found message with status code 404 when passed an id that does not exist", () => {
    return request(app)
      .get("/api/articles/103")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not Found");
      });
  });
});

describe("GET /api/articles", () => {
  test("GET 200: Should return an array of article objects on a key of articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const articleArr = response.body.articles;
        expect(articleArr.length).toBe(13);
        articleArr.forEach((article, index) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number),
          });
        });
      });
  });
  test("GET 200: Should sort articles by created_at date by default", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const articleArr = response.body.articles;
        articleArr.forEach((article, index) => {
          if (index !== 0) {
            expect(
              new Date(article.created_at) -
                new Date(articleArr[index - 1].created_at) <=
                0
            ).toBe(true);
          }
        });
      });
  });
});
