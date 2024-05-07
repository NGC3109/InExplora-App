import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const TabsContainer = ({ tabs, styles }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, activeTab === index && styles.activeTab]}
            onPress={() => handleTabPress(index)}
          >
            <Text style={styles.tabText}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.tabContent}>
        {tabs[activeTab].content}
      </View>
    </View>
  );
};

export default TabsContainer;
