// src/screens/PerfilContainer.js
import React from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconIconIcon from 'react-native-vector-icons/FontAwesome6';
import ImageGallery from '../../../components/ui/ImageGallery';
import { useNavigation } from '@react-navigation/native';

const images = [
  'https://us.123rf.com/450wm/yanik88/yanik881807/yanik88180700197/104375748-hombre-de-hipster-turista-barbudo-en-gafas-de-sol-con-una-mochila-de-pie-en-un-bache-en-la-carretera.jpg?ver=6',
  'https://us.123rf.com/450wm/santiaga22/santiaga221903/santiaga22190300152/119458206-hombre-mirando-al-faro-en-la-playa-hipsters-fotos-de-mar-puesta-de-sol-playa-pedregosa-con-el-faro.jpg?ver=6',
  'https://us.123rf.com/450wm/vitaliymateha/vitaliymateha1710/vitaliymateha171000245/88185729-viajero-mujer-con-peque%C3%B1a-mochila-naranja-caminando-en-la-playa-de-arena-negra-sur-de-islandia.jpg?ver=6',
];

function PerfilPublicoContainer() {
  const navigation = useNavigation();
  return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <ImageGallery images={images} />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-back-outline" size={30} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.profileDetails}>
          <View style={[styles.section, styles.sectionProfile]}>
            <Text style={styles.profileName}>Nele 24</Text>
            <View style={styles.profileInfoContainer}>
              <Icon name="person-outline" size={18} color="grey" />
              <Text style={styles.profileInfo}>Woman</Text>
            </View>
            <View style={styles.profileInfoContainer}>
              <Icon name="location-outline" size={18} color="grey" />
              <Text style={styles.profileInfo}>8 kilometers away</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.section}>
            <Text style={styles.profileInfo}>Una breve descripcion de cada usuario</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={styles.sectionContent}>
              <View style={styles.sectionItem}>
                <Text style={styles.sectionItemText}>Travel</Text>
              </View>
              <View style={styles.sectionItem}>
                <Text style={styles.sectionItemText}>Music</Text>
              </View>
              <View style={styles.sectionItem}>
                <Text style={styles.sectionItemText}>Reading</Text>
              </View>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.sectionContent}>
              <View style={styles.sectionItem}>
                <Text style={styles.sectionItemText}>English</Text>
              </View>
              <View style={styles.sectionItem}>
                <Text style={styles.sectionItemText}>Spanish</Text>
              </View>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Social Links</Text>
            <View style={styles.sectionContent}>
              <View style={styles.sectionItem}>
                <Icon name="logo-instagram" size={18} color="white" />
                <Text style={styles.sectionItemText}>@instagram_handle</Text>
              </View>
              <View style={styles.sectionItem}>
                <Icon name="logo-twitter" size={18} color="white" />
                <Text style={styles.sectionItemText}>@twitter_handle</Text>
              </View>
              <View style={styles.sectionItem}>
                <IconIconIcon name="tiktok" size={18} color="white" />
                <Text style={styles.sectionItemText}>@tiktok_handle</Text>
              </View>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Verifications</Text>
            <View style={styles.sectionContent}>
              <View style={styles.sectionItem}>
                <Icon name="checkmark-circle-outline" size={18} color="white" />
                <Text style={styles.sectionItemText}>Email Verified</Text>
              </View>
              <View style={styles.sectionItem}>
                <Icon name="checkmark-circle-outline" size={18} color="white" />
                <Text style={styles.sectionItemText}>Phone Verified</Text>
              </View>
              <View style={styles.sectionItem}>
                <Icon name="checkmark-circle-outline" size={18} color="white" />
                <Text style={styles.sectionItemText}>ID Verified</Text>
              </View>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Memberships</Text>
            <View style={styles.sectionContent}>
              <View style={styles.sectionItem}>
                <Text style={styles.sectionItemText}>Premium (01/01/2022 - 01/01/2023)</Text>
              </View>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Privacy Settings</Text>
            <View style={styles.sectionContent}>
              <View style={styles.sectionItem}>
                <Text style={styles.sectionItemText}>Profile Visibility: Public</Text>
              </View>
              <View style={styles.sectionItem}>
                <Text style={styles.sectionItemText}>Search Visibility: Yes</Text>
              </View>
              <View style={styles.sectionItem}>
                <Text style={styles.sectionItemText}>Data Sharing: Yes</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 350,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileDetails: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: -10, // Ajusta este valor para que el perfil toque la imagen
  },
  sectionProfile: {
    marginTop: 10,
  },
  profileName: {
    color: '#021121',
    fontSize: 28, // Tamaño de fuente ajustado
    fontWeight: 'bold',
    marginBottom: 8,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  profileInfo: {
    color: 'gray',
    fontSize: 18, // Tamaño de fuente ajustado
    marginLeft: 4,
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#021121',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#021121',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  sectionItemText: {
    color: 'white',
    marginLeft: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
    width: '100%',
  },
});

export default PerfilPublicoContainer;
