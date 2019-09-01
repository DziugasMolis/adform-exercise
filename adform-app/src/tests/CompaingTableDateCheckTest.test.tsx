import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CampaignTable } from "../components/table/CampaignTable";

describe("CompaignTable", () => {
  it("Checks if table row is not showed", () => {
    const data = [
      {
        id: 1,
        name: "Divavu",
        startDate: "9/19/2020",
        endDate: "3/9/2019",
        Budget: 88377,
        userName: "Bret",
        isActive: false
      }
    ];

    const { getByText } = render(<CampaignTable campaignsTableData={data} />);

    expect(getByText(data[0].name)).toBeUndefined();
  });
});
