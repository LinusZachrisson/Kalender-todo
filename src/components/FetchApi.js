import React, { useEffect, useState } from "react";

const FetchApi = () => {
  const fetchHolidays = () => {
    fetch(`http://sholiday.faboul.se/dagar/v2.1/2021`)
      .then((response) => response.json())
      .then((data) => {
        holiday(data.dagar);
      });
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const holiday = (dag) => {
    const holidays = dag.filter((dag) => dag.helgdag);
    console.log("holidays", holidays);
  };

  return <div></div>;
};

export default FetchApi;
