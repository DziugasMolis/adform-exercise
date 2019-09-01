import React, { useEffect, useState } from "react";

import { CampaignTable } from "./components/table/CampaignTable";
import { CampaignTableData } from "./components/table/CampaignTableData";

import { Campaign } from "./interfaces/Campaign";

import { Layout } from "./components/layout/Layout";
import { User } from "./interfaces/User";

import "./App.scss";

enum Status {
  Init,
  Loaded,
  Failed
}

function checkIfDateIsInRange(startDate: string, endDate: string) {
  const today = new Date().getTime();
  return (
    today >= new Date(startDate).getTime() &&
    today <= new Date(endDate).getTime()
  );
}

const App: React.FC = () => {
  const [tableCampaigns, setCampaignTableData] = useState<CampaignTableData[]>(
    []
  );
  const [status, setStatus] = useState<Status>(Status.Init);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaigns: Campaign[] = await (await fetch(
          "/assets/campaign.json"
        )).json();

        const userIds: number[] = [];
        campaigns.forEach(campaign => {
          if (!userIds.indexOf(campaign.userId)) {
            userIds.push(campaign.userId);
          }
        });

        const userQuery = userIds.map(id => `id=${id}`).join("&");
        const users: User[] = await (await fetch(
          `https://jsonplaceholder.typicode.com/users?${userQuery}`
        )).json();
        setStatus(Status.Loaded);
        let tableCampaigns: CampaignTableData[] = [];
        campaigns.forEach(
          ({ userId, id, name, startDate, endDate, Budget }) => {
            const user = users.find(x => x.id === userId);
            if (
              new Date(startDate).getTime() <
              new Date(endDate).getTime()
            ) {
              tableCampaigns.push({
                id,
                name,
                userName: user ? user.username : "Unknown user",
                startDate,
                endDate,
                Budget,
                isActive: checkIfDateIsInRange(startDate, endDate)
              });
            }
          }
        );
        setCampaignTableData(tableCampaigns);
      } catch (error) {
        console.error(error);
        setStatus(Status.Failed);
      }
    };

    fetchData();
  }, []);

  switch (status) {
    case Status.Init: {
      return <Layout>Loading...</Layout>;
    }
    case Status.Loaded: {
      return (
        <Layout>
          <CampaignTable campaignsTableData={tableCampaigns} />
        </Layout>
      );
    }
    case Status.Failed: {
      return <Layout>Failed</Layout>;
    }
  }
};

export default App;
