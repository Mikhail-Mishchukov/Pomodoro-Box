import { EBtnWeek } from '../../store/static/staticSlice';

export function getChosenWeek(week: EBtnWeek) {
  switch (week) {
    case EBtnWeek.thisWeek:
      return 'thisWeek';
    case EBtnWeek.lastWeek:
      return 'lastWeek';
    case EBtnWeek.preLastWeek:
      return 'prelastWeek';
  }
}
