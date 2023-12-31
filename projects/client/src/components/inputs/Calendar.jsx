import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DatePicker = ({
  value,
  onChange,
  disabledDates,
  onSubmit,
  specialDates,
}) => {
  return (
    <DateRange
      rangeColors={["#0256EE"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};

export default DatePicker;
