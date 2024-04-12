// SelectFilter.js
import React from 'react';
import { FormControl, Select, CheckIcon } from 'native-base';

const SelectFilter = ({ title, values, selectedValue, onValueChange }) => {
  return (
    <FormControl>
      <Select
        selectedValue={selectedValue}
        minWidth="50"
        accessibilityLabel={title}
        placeholder={title}
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="1" />
        }}
        onValueChange={onValueChange}
      >
        {values.map((option, index) => (
          <Select.Item key={index} label={option} value={option} />
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectFilter;
