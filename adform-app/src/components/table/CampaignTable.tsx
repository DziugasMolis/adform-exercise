import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import { CampaignTableData } from "./CampaignTableData";

import "./CampaignTable.scss";

interface Props {
  campaignsTableData: CampaignTableData[];
}

enum Order {
  ASC,
  DESC
}

export const CampaignTable: React.FC<Props> = ({ campaignsTableData }) => {
  const [column, setColumn] = useState<keyof CampaignTableData | undefined>();
  const [order, setOrder] = useState<Order>(Order.ASC);
  const sortedCampaigns = campaignsTableData.slice();

  if (column) {
    sortedCampaigns.sort(function(a, b) {
      let firstValue = a[column];
      let secondValue = b[column];

      if (column === "startDate" || column === "endDate") {
        firstValue = new Date(a[column]).getTime();
        secondValue = new Date(b[column]).getTime();
      }
      return firstValue > secondValue ? 1 : secondValue > firstValue ? -1 : 0;
    });
    if (order === Order.DESC) {
      sortedCampaigns.reverse();
    }
  }

  const onColumnClick = (columnProperty: keyof CampaignTableData) => {
    if (column === columnProperty) {
      if (order === Order.ASC) {
        setOrder(Order.DESC);
      } else {
        setOrder(Order.ASC);
      }
    } else {
      setColumn(columnProperty);
    }
  };

  const thousandsInString = (budget: number) => {
    if (budget >= 1000000000) {
      return (budget / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (budget >= 1000000) {
      return (budget / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (budget >= 1000) {
      return (budget / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return budget;
  };

  return (
    <table className="table campaign-table">
      <thead className="thead-dark">
        <tr>
          <th scope="col" onClick={() => onColumnClick("name")}>
            Name
            {column === "name" && order === Order.ASC ? (
              <FontAwesomeIcon icon={faArrowUp} />
            ) : (
              ""
            )}
            {column === "name" && order === Order.DESC ? (
              <FontAwesomeIcon icon={faArrowDown} />
            ) : (
              ""
            )}
          </th>
          <th scope="col" onClick={() => onColumnClick("userName")}>
            User Name
            {column === "userName" && order === Order.ASC ? (
              <FontAwesomeIcon icon={faArrowUp} />
            ) : (
              ""
            )}
            {column === "userName" && order === Order.DESC ? (
              <FontAwesomeIcon icon={faArrowDown} />
            ) : (
              ""
            )}
          </th>
          <th scope="col" onClick={() => onColumnClick("startDate")}>
            Start Date
            {column === "startDate" && order === Order.ASC ? (
              <FontAwesomeIcon icon={faArrowUp} />
            ) : (
              ""
            )}
            {column === "startDate" && order === Order.DESC ? (
              <FontAwesomeIcon icon={faArrowDown} />
            ) : (
              ""
            )}
          </th>
          <th scope="col" onClick={() => onColumnClick("endDate")}>
            End Date
            {column === "name" && order === Order.ASC ? (
              <FontAwesomeIcon icon={faArrowUp} />
            ) : (
              ""
            )}
            {column === "name" && order === Order.DESC ? (
              <FontAwesomeIcon icon={faArrowDown} />
            ) : (
              ""
            )}
          </th>
          <th scope="col" onClick={() => onColumnClick("isActive")}>
            Active
            {column === "isActive" && order === Order.ASC ? (
              <FontAwesomeIcon icon={faArrowUp} />
            ) : (
              ""
            )}
            {column === "isActive" && order === Order.DESC ? (
              <FontAwesomeIcon icon={faArrowDown} />
            ) : (
              ""
            )}
          </th>
          <th scope="col" onClick={() => onColumnClick("Budget")}>
            Budget
            {column === "Budget" && order === Order.ASC ? (
              <FontAwesomeIcon icon={faArrowUp} />
            ) : (
              ""
            )}
            {column === "Budget" && order === Order.DESC ? (
              <FontAwesomeIcon icon={faArrowDown} />
            ) : (
              ""
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedCampaigns.map(
          ({ id, name, userName, startDate, endDate, Budget, isActive }) => {
            return (
              <tr key={`campaing-${id}`}>
                <td>{name}</td>
                <td>{userName}</td>
                <td>{startDate}</td>
                <td>{endDate}</td>
                <td>
                  {isActive ? (
                    <span>
                      <span className="bubble active"></span>Active
                    </span>
                  ) : (
                    <span>
                      <span className="bubble inactive"></span>Inactive
                    </span>
                  )}
                </td>
                {/* // TODO: Budget */}
                <td>{thousandsInString(Budget)}</td>
              </tr>
            );
          }
        )}
        <tr>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};
