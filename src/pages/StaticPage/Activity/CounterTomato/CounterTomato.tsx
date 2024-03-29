// import { useAppSelector } from "../../../../store/hooks";
// import { Week } from "../../../../store/static/staticSlice";
// import styles from "./CounterTomato.module.css";
// import imgTomato from "../../../../assets/img/tomato.png";
// import { Icons, Icon } from "../../../../components/common/Icon";
// import {
//   Color,
//   TextComponent,
// } from "../../../../components/common/TextComponent";

// interface ICounterTomatoProp {
//   chosenWeek: "thisWeek" | "lastWeek" | "prelastWeek";
//   nameDayOfWeek: Week;
// }

// export function CounterTomato({
//   chosenWeek,
//   nameDayOfWeek,
// }: ICounterTomatoProp) {
//   const countTomato = useAppSelector(
//     (state) => state.static.staticInfo[chosenWeek][nameDayOfWeek].countTomato
//   );
//   function getCountTomato(count: number) {
//     if (count % 10 === 1 && count !== 11) {
//       return `${count} помидор`;
//     } else if (count % 10 > 1 && count % 10 < 5 && (count > 20 || count < 10)) {
//       return `${count} помидора`;
//     } else if (count === 0) {
//       return "";
//     } else {
//       return `${count} помидоров`;
//     }
//   }
//   return (
//     <div className={styles.counterTomato}>
//       {countTomato === 0 && (
//         <div className={styles.plugCounter}>
//           <img src={imgTomato} alt="Tomato" />
//         </div>
//       )}

//       <div className={styles.imgCounterTomato}>
//         <Icon name={Icons.tomato} widthSize={81} heightSize={81} />
//         <TextComponent
//           children={`x ${countTomato}`}
//           size={24}
//           color={Color.gray99}
//           addClass={styles.imgCounter}
//         />
//       </div>

//       <div className={styles.discribeCounter}>
//         <TextComponent
//           children={getCountTomato(countTomato)}
//           size={24}
//           color={Color.white}
//         />
//       </div>
//     </div>
//   );
// }
