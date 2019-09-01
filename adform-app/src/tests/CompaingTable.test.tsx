import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CampaignTable } from "../components/table/CampaignTable";

describe("CompaignTable", () => {
  it("shows campaign table row", () => {
    const data = [
      {
        id: 1,
        name: "Divavu",
        startDate: "9/19/2017",
        endDate: "3/9/2020",
        Budget: 88377,
        userName: "Bret",
        isActive: false
      }
    ];

    const { getByText } = render(<CampaignTable campaignsTableData={data} />);

    expect(getByText(data[0].name)).toBeDefined();
  });
});
