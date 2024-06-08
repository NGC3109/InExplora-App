import React from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconIconIcon from 'react-native-vector-icons/FontAwesome6';
import ImageGallery from '../../../components/ui/ImageGallery';
import { useNavigation } from '@react-navigation/native';
import { IconFacebookNoVerify, IconFacebookVerify, IconGmailNoVerify, IconGmailVerify, IconInstagramNoVerify, IconInstagramVerify, IconWhatsappNoVerify, IconWhatsappVerify, LeafSeparator } from '../../../assets/vectores';

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
          <View style={styles.profileHeader}>
            <Text style={styles.profileName}>Nele 24</Text>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Seguir</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.followInfoContainer}>
            <Text style={styles.followInfo}>430 seguidos - 50 seguidores</Text>
          </View>
          <View style={styles.profileInfoContainer}>
            <Icon name="person-outline" size={18} color="grey" />
            <Text style={styles.profileInfo}>Woman</Text>
          </View>
          <View style={styles.profileInfoContainer}>
            <View style={styles.iconsVerify}>
              <IconFacebookNoVerify />
            </View>
            <View style={styles.iconsVerify}>
              <IconWhatsappVerify />
            </View>
            <View style={styles.iconsVerify}>
              <IconGmailNoVerify />
            </View>
            <View style={styles.iconsVerify}>
              <IconInstagramVerify />
            </View>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.section}>
          <Text style={styles.profileInfo}>Una breve descripcion de cada usuario</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Intereses</Text>
          <View style={styles.sectionContent}>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>Mochilear</Text>
            </View>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>Explorar</Text>
            </View>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>Universo</Text>
            </View>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>Viajar en auto</Text>
            </View>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>Fotografia</Text>
            </View>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Super poderes</Text>
          <View style={styles.sectionContent}>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>Fotografia perfecta</Text>
            </View>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>Reserva veloz</Text>
            </View>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>Detector de Atracciones Ocultas</Text>
            </View>
          </View>
        </View>
        <View style={styles.separator} />

        {/* Nuevo segmento de referencias */}
        <View style={styles.section}>
          <View style={styles.referencesHeader}>
            <Text style={styles.sectionTitle}>Referencias</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>Ver todo (60)</Text>
            </TouchableOpacity>
          </View>
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
  headerContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 350,
  },
  iconsVerify: {
    marginRight: 4
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
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileName: {
    color: '#021121',
    fontSize: 28, // Tamaño de fuente ajustado
    fontWeight: 'bold',
    marginBottom: 8,
  },
  followButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  followButtonText: {
    color: 'white',
    fontSize: 16,
  },
  followInfoContainer: {
    marginBottom: 8,
  },
  followInfo: {
    color: 'gray',
    fontSize: 18,
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
  referencesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewAll: {
    color: '#3498db',
    fontSize: 16,
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
    marginHorizontal: 20
  },
});

export default PerfilPublicoContainer;
