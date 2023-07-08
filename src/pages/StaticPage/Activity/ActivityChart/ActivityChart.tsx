// import {
//   Week,
//   WeekInfo,
//   setChosenDayOfWeek,
// } from "../../../../store/static/staticSlice";
// import styles from "./ActivityChart.module.css";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Cell,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
//   Text,
// } from "recharts";
// import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
// import { useState } from "react";

// interface IActivityChartProp {
//   chosenWeek: "thisWeek" | "lastWeek" | "prelastWeek";
// }

// export function ActivityChart({ chosenWeek }: IActivityChartProp) {
//   const dataWeek = useAppSelector(
//     (state) => state.static.staticInfo[chosenWeek]
//   );
//   const [activeIndex, setActiveIndex] = useState(
//     new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
//   );

//   const dispatch = useAppDispatch();

//   const data = preparationDataForChart(dataWeek);

//   function preparationDataForChart(data: WeekInfo) {
//     return [
//       {
//         name: "Пн",
//         time: Math.floor(data[Week.monday].timeActiveTimer / 60),
//       },
//       {
//         name: "Вт",
//         time: Math.floor(data[Week.tuesday].timeActiveTimer / 60),
//       },
//       {
//         name: "Ср",
//         time: Math.floor(data[Week.wednesday].timeActiveTimer / 60),
//       },
//       {
//         name: "Чт",
//         time: Math.floor(data[Week.thursday].timeActiveTimer / 60),
//       },
//       {
//         name: "Пт",
//         time: Math.floor(data[Week.friday].timeActiveTimer / 60),
//       },
//       {
//         name: "Сб",
//         time: Math.floor(data[Week.saturday].timeActiveTimer / 60),
//       },
//       {
//         name: "Вс",
//         time: Math.floor(data[Week.sunday].timeActiveTimer / 60),
//       },
//     ];
//   }

//   function getYTicks(data: { name: string; time: number }[]) {
//     let ticks: number[] = [];
//     let max = data[0].time;
//     for (let i = 1; i < data.length; i++) {
//       if (data[i].time > max) {
//         max = data[i].time;
//       }
//     }
//     const tickCount = Math.floor(max / 25);

//     if (tickCount < 4) {
//       return [0, 25, 50, 75];
//     }

//     for (let i = 1; i < 5; i++) {
//       ticks.push(i * 25);
//     }

//     return ticks;
//   }

//   return (
//     <div className={styles.chartContainer}>
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart
//           data={data}
//           margin={{ top: 45, right: 0, bottom: 0, left: 0 }}
//           barCategoryGap="10%"
//         >
//           <svg>
//             <rect fill="#ECECEC" height="51" width="100%" y="437" x="0" />
//           </svg>
//           <svg>
//             <rect fill="#ebe8e8" height="437" width="100%" y="0" x="0" />
//           </svg>
//           <XAxis
//             dataKey="name"
//             cursor="pointer"
//             axisLine={false}
//             tickLine={false}
//             height={35}
//             padding={{ left: 40, right: 20 }}
//             fontSize={20}
//             tick={(e) => {
//               const {
//                 payload: { index, value },
//               } = e;
//               const color = index === activeIndex ? "#DC3E22" : "#999999";
//               e["fill"] = color;
//               const onClick = () => {
//                 setActiveIndex(index);
//                 dispatch(setChosenDayOfWeek(index));
//               };
//               e["onClick"] = onClick;
//               return <Text {...e}>{value}</Text>;
//             }}
//           />
//           <YAxis
//             orientation={"right"}
//             axisLine={false}
//             width={100}
//             tickLine={false}
//             tickSize={0}
//             tickFormatter={(value) => {
//               const m = value % 60;
//               const h = Math.floor(value / 60);
//               const hoursStr = h > 0 ? `${h} ч` : "";
//               return `${hoursStr} ${m} мин`;
//             }}
//             tick={{ fontSize: 12, fill: "#333333", fontWeight: 400 }}
//             tickMargin={32}
//             ticks={getYTicks(data)}
//           />

//           <CartesianGrid vertical={false} />

//           <Bar
//             onClick={(date, index) => {
//               setActiveIndex(index);
//               dispatch(setChosenDayOfWeek(index));
//             }}
//             dataKey="time"
//             minPointSize={5}
//           >
//             {data.map((entry, index) => {
//               let color = index === activeIndex ? "#DC3E22" : "#EA8A79";
//               if (entry.time === 0) {
//                 color = "#C4C4C4";
//               }
//               return (
//                 <Cell cursor="pointer" fill={color} key={`cell-${index}`} />
//               );
//             })}
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
