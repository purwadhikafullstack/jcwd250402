import { DateRange } from "react-date-range";
import { useState, useEffect } from "react";
import { addDays, format } from "date-fns";
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
      staticRanges: [], // Initialize staticRanges as an empty array
    },
  });

  useEffect(() => {
    if (specialDates && specialDates.length > 0) {
      const staticRanges = specialDates.map((specialDate) => ({
        label: `Special Date ${specialDate.id}`,
        range: [new Date(specialDate.startDate), new Date(specialDate.endDate)],
        key: specialDate.id,
        isStatic: true,
      }));

      setState((prevState) => ({
        ...prevState,
        selection: {
          ...prevState.selection,
          staticRanges: [...staticRanges],
        },
      }));
    }
  }, [specialDates]);

  const customDayContent = (day) => {
    let extraDot = null;
    const isSpecialDate = state.selection.staticRanges.some(
      (range) => day >= range.range[0] && day <= range.range[1]
    );

    if (isSpecialDate) {
      extraDot = (
        <div
          style={{
            height: "5px",
            width: "5px",
            borderRadius: "50%",
            padding: "20px",
            background: "#9B02EE",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.2,
          }}
        />
      );
    }

    return (
      <div>
        {extraDot}
        <span>{format(day, "d")}</span>
      </div>
    );
  };

  return (
    <DateRange
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
      staticRanges={state.selection.staticRanges}
      editableDateInputs={false}
      dayContentRenderer={customDayContent}
    />
  );
};

export default DatePicker;
