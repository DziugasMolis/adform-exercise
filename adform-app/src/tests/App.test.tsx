import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import { wait } from "@testing-library/dom";

declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
      fetch: any;
    }
  }
}

it("renders without crashing", () => {
  const div = document.createElement("div");
  const app = render(<App />);
  expect(app).toBeTruthy();
});

describe("API test load", () => {
  global.fetch = require("node-fetch");
  afterEach(() => global.fetch.mockClear());

  test("displays row if API succeeds", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(() =>
        Promise.resolve({
          url: "http://localhost:3000/assets/campaign.json",
          status: 200,
          json: () =>
            Promise.resolve([
              {
                id: 1,
                name: "Divavu",
                startDate: "9/19/2017",
                endDate: "3/9/2020",
                Budget: 88377,
                userId: 3
              }
            ])
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          json: () =>
            Promise.resolve([
              {
                id: 3,
                name: "Leanne Graham",
                username: "Bret",
                email: "Sincere@april.biz",
                address: {
                  street: "Kulas Light",
                  suite: "Apt. 556",
                  city: "Gwenborough",
                  zipcode: "92998-3874",
                  geo: {
                    lat: "-37.3159",
                    lng: "81.1496"
                  }
                }
              }
            ])
        })
      );
    const { getByText } = render(<App />);
    await wait();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch.mock.calls[1][0]).toBe("https://jsonplaceholder.typicode.com/users?id=3");
    expect(getByText("Bret")).toBeTruthy();
  });

  test("displays failed if API fails", async () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        url: "http://localhost:3000/assets/campaign.json",
        status: 404
      })
    );
    const { getByText } = render(<App />);
    await wait();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(getByText("Failed")).toBeTruthy();
  });

  test("does not displays table row when start date is before end date", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(() =>
        Promise.resolve({
          url: "http://localhost:3000/assets/campaign.json",
          status: 200,
          json: () =>
            Promise.resolve([
              {
                id: 1,
                name: "Divavu",
                startDate: "9/19/2020",
                endDate: "3/9/2017",
                Budget: 88377,
                userId: 3
              }
            ])
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          json: () =>
            Promise.resolve([
              {
                id: 3,
                name: "Leanne Graham",
                username: "Bret",
                email: "Sincere@april.biz",
                address: {
                  street: "Kulas Light",
                  suite: "Apt. 556",
                  city: "Gwenborough",
                  zipcode: "92998-3874",
                  geo: {
                    lat: "-37.3159",
                    lng: "81.1496"
                  }
                }
              }
            ])
        })
      );
    const { queryByText } = render(<App />);
    await wait();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch.mock.calls[1][0]).toBe("https://jsonplaceholder.typicode.com/users?id=3");
    expect(queryByText("Bret")).toBeNull();
  });
});
