import puppeteer from "puppeteer";
import  axios  from "axios";

const appUrlBase = "http://localhost:3000";

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({});
  page = await browser.newPage();
});

beforeEach(() => {
  jest.setTimeout(10000);
  const books = [
    { name: "Refactoring", id: 1 },
    { name: "Domain-driven design", id: 2 },
    { name: "Building Micro-service", id: 3 }
  ];

  return books.map(item =>
    axios.post("http://localhost:8080/books", item, {
      headers: { "Content-Type": "application/json" }
    })
  );
});

afterEach(() => {
  return axios.delete("http://localhost:8080/books?_cleanup=true")
    .catch(err => err);
});

describe("Bookish", () => {
  test("Heading", async () => {
    await page.goto(`${appUrlBase}`);
    await page.waitForSelector("h1");

    const result = await page.evaluate(() => {
      return document.querySelector("h1").innerText;
    });

    expect(result).toEqual("Bookish");
  });

  test("Book List", async () => {
    await page.goto(`${appUrlBase}`);
    await page.waitForSelector(".books-list");
    const books = await page.evaluate(() => {
      return [...document.querySelectorAll(".book .title")].map(
        el => el.innerText
      );
    });

    expect(books.length).toEqual(3);
    expect(books[0]).toEqual("Refactoring");
    expect(books[1]).toEqual("Domain-driven design");
  });
});

afterAll(() => {
  browser.close();
});
