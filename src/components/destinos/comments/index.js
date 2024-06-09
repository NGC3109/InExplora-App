import React from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { LeafSeparator } from '../../../assets/vectores';

const Comments = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileDetails}>
        <View style={styles.section}>
          <View style={styles.reference}>
            <Image
              style={styles.referenceImage}
              source={{ uri: 'https://via.placeholder.com/50' }}
            />
            <View style={styles.referenceContent}>
              <Text style={styles.referenceName}>Zehra</Text>
              <Text style={styles.referenceDate}>10 de enero 2024</Text>
              <Text style={styles.referenceText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
              </Text>
            </View>
          </View>
          <View style={styles.referenceSeparator}>
            <LeafSeparator />
          </View>
          <View style={styles.reference}>
            <Image
              style={styles.referenceImage}
              source={{ uri: 'https://via.placeholder.com/50' }}
            />
            <View style={styles.referenceContent}>
              <Text style={styles.referenceName}>Emilia</Text>
              <Text style={styles.referenceDate}>10 de Julio 2022</Text>
              <Text style={styles.referenceText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
              </Text>
            </View>
          </View>
          <View style={styles.referenceSeparator}>
            <LeafSeparator />
          </View>
          <View style={styles.reference}>
            <Image
              style={styles.referenceImage}
              source={{ uri: 'https://via.placeholder.com/50' }}
            />
            <View style={styles.referenceContent}>
              <Text style={styles.referenceName}>Emilia</Text>
              <Text style={styles.referenceDate}>10 de Julio 2022</Text>
              <Text style={styles.referenceText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileDetails: {
    backgroundColor: 'white',
    width: '100%',
  },
  section: {
    paddingHorizontal: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
    width: '100%',
  },
  reference: {
    flexDirection: 'row',
  },
  referenceImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  referenceContent: {
    flex: 1,
  },
  referenceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#021121',
  },
  referenceDate: {
    color: 'gray',
    marginBottom: 5,
  },
  referenceText: {
    color: '#021121',
    marginBottom: 10,
  },
  referenceSeparator: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default Comments;
