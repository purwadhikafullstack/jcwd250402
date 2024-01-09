import { DateRange } from "react-date-range";
import { useState, useEffect } from "react";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DatePicker = ({
  value,
  onChange,
  disabledDates,
  onSubmit,
  specialDates,
}) => {
  const [state, setState] = useState({
    selection: {
      startDate: addDays(new Date(), 1),
      endDate: null,
      key: "selection",
      isStatic: true,
    },
  });

  useEffect(() => {
    if (specialDates && specialDates.length > 0) {
      const specialDateRange = {
        startDate: specialDates[0],
        endDate: specialDates[0],
        key: "special",
        isStatic: true,
      };
      setState({ selection: specialDateRange });
    }
  }, [specialDates]);

  return (
    <DateRange
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
      staticRanges={[
        {
          label: "Special Date",
          range: state.selection,
        },
      ]}
    />
  );
};

export default DatePicker;
