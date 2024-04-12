// FiltersContainer.js
import React from 'react';
import { View } from 'react-native';
import { chunkArray } from '../../utils/functions';
import { styles } from '../../styles/FiltersContainer';
import SelectFilter from '../SelectFilter';


const FiltersContainer = ({ filters, selectedFilters, handleSelectChange }) => {
  return (
    <View style={styles.filtersContainer}>
      {chunkArray(filters, 2).map((rowFilters, rowIndex) => (
        <View key={rowIndex} style={styles.filterRow}>
          {rowFilters.map((filter, columnIndex) => (
            <View key={columnIndex} style={styles.filterColumn}>
              <SelectFilter
                title={filter.title}
                values={filter.values}
                selectedValue={selectedFilters[filter.id]}
                onValueChange={(itemValue) => handleSelectChange(filter.id, itemValue)}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

export default FiltersContainer;
