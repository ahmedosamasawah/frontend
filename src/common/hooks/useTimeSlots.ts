import { useCallback } from "react";
import type { TimeSlot, Time } from "../../types/FormTypes.types.ts";

const useTimeSlots = () => {
  const addTimeSlot = useCallback((day: string, setTimeSlots) => {
    setTimeSlots(prev => {
      const updated = {
        ...prev,
        [day]: [
          ...prev[day],
          {
            from: { hour: "00", minute: "00", period: "PM" },
            to: { hour: "00", minute: "00", period: "PM" },
            confirmed: false,
          },
        ],
      };
      return updated;
    });
  }, []);

  const removeTimeSlot = useCallback(
    (day: string, index: number, setTimeSlots, setReservedPeriods) => {
      setTimeSlots(prev => ({
        ...prev,
        [day]: prev[day].filter((_, i) => i !== index),
      }));

      setReservedPeriods(prev => ({
        ...prev,
        [day]: prev[day].filter((_, i) => i !== index),
      }));
    },
    [],
  );

  const updateTimeSlot = useCallback(
    (
      day: string,
      index: number,
      field: keyof TimeSlot,
      value: string,
      setTimeSlots,
      timeSlots,
    ) => {
      const [hour, minute] = value.split(":");
      const updatedTimeSlots = [...timeSlots[day]];
      updatedTimeSlots[index][field] = {
        hour: hour.toString(),
        minute: minute.toString(),
        period: (updatedTimeSlots[index][field] as Time).period,
      } as Time;
      setTimeSlots(prev => ({ ...prev, [day]: updatedTimeSlots }));
    },
    [],
  );

  const togglePeriod = useCallback(
    (
      day: string,
      index: number,
      field: keyof TimeSlot,
      setTimeSlots,
      timeSlots,
    ) => {
      const updatedTimeSlots = [...timeSlots[day]];
      if (typeof updatedTimeSlots[index][field] === "object") {
        (updatedTimeSlots[index][field] as Time).period =
          (updatedTimeSlots[index][field] as Time).period === "AM"
            ? "PM"
            : "AM";
        setTimeSlots(prev => ({
          ...prev,
          [day]: updatedTimeSlots,
        }));
      }
    },
    [],
  );

  return {
    addTimeSlot,
    removeTimeSlot,
    updateTimeSlot,
    togglePeriod,
  };
};

export default useTimeSlots;
