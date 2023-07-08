// import classNames from "classnames";
// import { Icons, Icon } from "../../../../components/common/Icon";
// import { TextComponent } from "../../../../components/common/TextComponent";
// import { useAppSelector } from "../../../../store/hooks";
// import { Week } from "../../../../store/static/staticSlice";
// import styles from "./StaticCards.module.css";

// interface IStaticCardsProp {
//   chosenWeek: "thisWeek" | "lastWeek" | "prelastWeek";
//   nameDayOfWeek: Week;
// }

// export function StaticCards({ chosenWeek, nameDayOfWeek }: IStaticCardsProp) {
//   const timeActiveTimer = useAppSelector(
//     (state) =>
//       state.static.staticInfo[chosenWeek][nameDayOfWeek].timeActiveTimer
//   );
//   const pauseTime = useAppSelector(
//     (state) => state.static.staticInfo[chosenWeek][nameDayOfWeek].pauseTime
//   );
//   const countStops = useAppSelector(
//     (state) => state.static.staticInfo[chosenWeek][nameDayOfWeek].countStops
//   );

//   const classNameContainerCard =
//     timeActiveTimer < 60
//       ? classNames(styles.infoCardContainer)
//       : classNames(styles.infoCardContainer, styles.infoCardActive);

//   function getPauseTime(time: number): string {
//     time = Math.floor(time / 60);
//     const minutes = time % 60;
//     const hours = Math.floor(time / 60);
//     let hoursStr = "";
//     if (hours > 0) {
//       hoursStr = `${hours}Ч`;
//     }
//     let minutesStr = ``;
//     if (minutes > 0) {
//       minutesStr = `${minutes}M`;
//     }

//     return `${hoursStr} ${minutesStr}`;
//   }

//   return (
//     <div className={classNameContainerCard}>
//       <div className={classNames(styles.infoCard, styles.infoCardFocus)}>
//         <TextComponent
//           size={24}
//           children={"Фокус"}
//           addClass={styles.cardTitle}
//         />
//         <TextComponent
//           size={64}
//           children={`${
//             timeActiveTimer < 60
//               ? "0"
//               : `${Math.round(
//                   (timeActiveTimer / (timeActiveTimer + pauseTime)) * 100
//                 )}`
//           }%`}
//           addClass={styles.cardData}
//         />
//         <Icon
//           name={Icons.focusCard}
//           widthSize={108}
//           heightSize={108}
//           addClass={styles.cardIcon}
//         />
//       </div>
//       <div className={classNames(styles.infoCard, styles.infoCardPause)}>
//         <TextComponent
//           size={24}
//           children={"Время на паузе"}
//           addClass={styles.cardTitle}
//         />
//         <TextComponent
//           size={64}
//           children={pauseTime < 60 ? "0M" : `${getPauseTime(pauseTime)}`}
//           addClass={styles.cardData}
//         />
//         <Icon
//           name={Icons.pauseCard}
//           widthSize={108}
//           heightSize={108}
//           addClass={styles.cardIcon}
//         />
//       </div>
//       <div className={classNames(styles.infoCard, styles.infoCardStops)}>
//         <TextComponent
//           size={24}
//           children={"Остановки"}
//           addClass={styles.cardTitle}
//         />
//         <TextComponent
//           size={64}
//           children={`${countStops}`}
//           addClass={styles.cardData}
//         />
//         <Icon
//           name={Icons.pauseCard}
//           widthSize={108}
//           heightSize={108}
//           addClass={styles.cardIcon}
//         />
//       </div>
//     </div>
//   );
// }
