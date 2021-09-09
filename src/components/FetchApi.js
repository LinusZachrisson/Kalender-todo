// import React, { useEffect } from "react";

// const FetchApi = () => {
//   const fetchHolidays = () => {
//     fetch(`http://sholiday.faboul.se/dagar/v2.1/2021`)
//       .then((response) => response.json())
//       .then((data) => {
//         holiday(data.dagar);
//       });
//   };

//   useEffect(() => {
//     fetchHolidays();
//   }, []);

//   const holiday = (dag) => {
//     const holidays = dag.filter((dag) => dag.helgdag);
//     console.log("holidays", holidays);

//     let specialDays = [];

//     holidays.map((x) => specialDays.push({ title: x.helgdag, date: x.datum, display: "background" }));

//     console.log(specialDays);
//   };

//   return <div></div>;
// };

// export default FetchApi;
