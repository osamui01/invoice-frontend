import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const DebouncedInput = ({
  value: initValue,
  onChange = () => {},
  debounce = 500,
  immediateUpdate = false,
  ...props
}) => {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  useEffect(() => {
    const updateFunction = () => {
      onChange(value);
    };

    if (immediateUpdate) {
      updateFunction();
    } else {
      const timeout = setTimeout(updateFunction, debounce);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [value, debounce, onChange, immediateUpdate]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

DebouncedInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  debounce: PropTypes.number,
  immediateUpdate: PropTypes.bool,
};

export default DebouncedInput;
