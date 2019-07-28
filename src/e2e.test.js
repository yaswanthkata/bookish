import puppeteer from "puppeteer";
import axios from "axios";

const appUrlBase = "http://192.168.0.106:3000";

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({headless:false});
  page = await browser.newPage();
});

beforeEach(() => {
  jest.setTimeout(30000);
  //  axios.delete("http://localhost:8080/books?_cleanup=true")
  // .catch(err => err);
  // const books = [
  //   { name: "Refactoring", id: 1 },
  //   { name: "Domain-driven design", id: 2 },
  //   { name: "Building Micro-service", id: 3 }
  // ];

  // return books.map(item =>
  //   axios.post("http://localhost:8080/books", item, {
  //     headers: { "Content-Type": "application/json" }
  //   })
  // );
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

    expect(books.length).toEqual(10);
    // expect(books[0]).toEqual("Refactoring");
    // expect(books[1]).toEqual("Domain-driven design");
  });

  test("Goto book detail page", async () => {
    await page.goto(`${appUrlBase}`);
    await page.waitForSelector("a.view-detail");
    const links = await page.evaluate(() => {
      return [...document.querySelectorAll("a.view-detail")].map(el =>
        el.getAttribute("href")
      );
    });

    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2" }),
      page.goto(`${appUrlBase}${links[0]}`)
    ]);
    const url = await page.evaluate("location.href");
    expect(url).toEqual(`${appUrlBase}/books/1`);

    await page.waitForSelector(".description");
    const result = await page.evaluate(() => {
      return document.querySelector(".description").innerText;
    });
    expect(result).toEqual("Bret");
  });

  test("Show books which name contains keyword", async () => {
    await page.goto(`${appUrlBase}/`,{ waitUntil : ['load', 'domcontentloaded']});
    const input = await page.waitForSelector('input.search');
    page.type('.search','be');

    await page.waitForSelector('.books-list');
    const books = await page.evaluate(() => {
      return [...document.querySelectorAll('.book .title')].map(el=>el.innerText);
    });
    expect(books.length).toEqual(1);
  });
});

afterAll(() => {
  browser.close();
});
