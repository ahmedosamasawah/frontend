import { useCallback } from "react";
import type {
  TimeSlot,
  Time,
  ReservedPeriod,
} from "../../types/FormTypes.types.ts";

const useTimePickerValidation = (
  reservedPeriods: Record<string, ReservedPeriod[]>,
  setTimePickerError: (value: string) => void,
) => {
  const timeToMinutes = useCallback((time: Time): number => {
    const hour =
      time.period === "PM" && time.hour !== "12"
        ? Number.parseInt(time.hour) + 12
        : Number.parseInt(time.hour);
    return hour * 60 + Number.parseInt(time.minute);
  }, []);

  const validateTimeSlot = useCallback(
    (day: string, slot: TimeSlot): boolean => {
      const fromMinutes = timeToMinutes(slot.from);
      const toMinutes = timeToMinutes(slot.to);

      if (fromMinutes >= toMinutes) {
        setTimePickerError(
          "الوقت غير صالح، لا يمكن أن تكون الأوقات متساوية أو أن يكون وقت البدء بعد وقت الانتهاء.",
        );
        return false;
      }
      if (slot.from.hour === "00" || slot.to.hour === "00") {
        setTimePickerError("الوقت غير صالح، لا يمكن أن تكون الساعة صفر");
        return false;
      }
      if (toMinutes - fromMinutes < 5) {
        setTimePickerError(
          "الوقت غير صالح، يجب أن يكون الموعد على الأقل 5 دقائق.",
        );
        return false;
      }
      if (toMinutes - fromMinutes > 180) {
        setTimePickerError("الوقت غير صالح، لا يمكن أن يتجاوز الموعد 3 ساعات.");
        return false;
      }
      if (
        reservedPeriods[day].some(
          period =>
            timeToMinutes(period.from) === fromMinutes &&
            timeToMinutes(period.to) === toMinutes,
        )
      ) {
        setTimePickerError("الوقت المختار محجوز مسبقًا.");
        return false;
      }

      setTimePickerError("");
      return true;
    },
    [reservedPeriods, timeToMinutes, setTimePickerError],
  );

  const validateNoOverlap = useCallback(
    (day: string, slot: TimeSlot): boolean => {
      const fromMinutes = timeToMinutes(slot.from);
      const toMinutes = timeToMinutes(slot.to);

      if (
        reservedPeriods[day].some(period => {
          const periodFromMinutes = timeToMinutes(period.from);
          const periodToMinutes = timeToMinutes(period.to);
          return (
            (fromMinutes < periodToMinutes && toMinutes > periodFromMinutes) ||
            (fromMinutes < periodFromMinutes && toMinutes > periodToMinutes) ||
            (fromMinutes > periodFromMinutes && toMinutes < periodToMinutes)
          );
        })
      ) {
        setTimePickerError("الوقت المختار يتعارض مع موعد آخر في نفس اليوم.");
        return false;
      }

      return true;
    },
    [reservedPeriods, timeToMinutes, setTimePickerError],
  );

  return {
    validateTimeSlot,
    validateNoOverlap,
  };
};

export default useTimePickerValidation;
