import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import ButtonCustom from '../../components/ui/Button';
import Alert from '../ui/Alert';
import GooglePlacesAutocomplete from '../ui/Testing';
import { StarIcon } from '../../assets/vectores';

const GroupTemplate = ({
  continueButton,
  onChangeText,
  messageAlert,
  destino,
  getPhotoUrl,
}) => {
  const [activeTab, setActiveTab] = useState('informacion');

  const Review = ({ author, rating, text, photo_profile }) => {
    return (
      <View style={styles.review}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: photo_profile && photo_profile }}
            style={styles.profileImage}
          />
          <View style={styles.profileText}>
            <Text style={styles.authorName}>{author}</Text>
            <Text style={styles.time}>Hace 5 meses</Text>
          </View>
          <View style={styles.ratingContainerTopRight}>
            <Text style={styles.rating}>{rating}</Text>
            <StarIcon name="star" />
          </View>
        </View>
        <Text style={styles.reviewDescription}>{text}</Text>
      </View>
    );
  };

  const renderHeader = () => (
    <>
      <GooglePlacesAutocomplete onSelect={onChangeText} />
      {messageAlert && <Alert message="Ingrese un destino válido." type="danger" customStyle={styles.alert} />}
      {destino.photos?.length > 0 && (
        <View style={styles.destinationCard}>
          <Image
            source={{ uri: getPhotoUrl(destino.photos[0].photo_reference) }}
            style={styles.destinationImage}
          />
          <View style={styles.ratingOverlay}>
            <Text style={styles.ratingText}>{destino.rating}</Text>
            <StarIcon name="star" />
          </View>
          <Text style={styles.descriptionText}>
            {destino.description || 'No hay descripción disponible.'}
          </Text>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'informacion' && styles.activeTab]}
              onPress={() => setActiveTab('informacion')}
            >
              <Text style={styles.tabText}>Información</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab2, activeTab === 'comentarios' && styles.activeTab2]}
              onPress={() => setActiveTab('comentarios')}
            >
              <Text style={styles.tabText}>Comentarios ({destino.reviews ? destino.reviews.length : 0})</Text>
            </TouchableOpacity>
          </View>
          {activeTab === 'informacion' && (
            <View style={{ marginTop: 5 }}>
              <Text style={{ color: 'black' }}>Pais: {destino.country || 'Sin información'}</Text>
              <Text style={{ color: 'black' }}>Region: {destino.region || 'Sin información'}</Text>
            </View>
          )}
        </View>
      )}
    </>
  );

  const renderFooter = () => (
    <View style={styles.buttonContainer}>
      <ButtonCustom title="Continuar" onPress={continueButton} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={activeTab === 'comentarios' ? destino.reviews : []}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <Review key={item.id} author={item.author_name} rating={item.rating} text={item.text} photo_profile={item.profile_photo_url} />
        )}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  weekday: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#081F2C',
    borderRadius: 10,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#081F2C',
  },
  tab2: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#5570F1',
  },
  activeTab: {
    backgroundColor: '#11313F'
  },
  activeTab2: {
    backgroundColor: '#7787D3'
  },
  tabText: {
    color: '#fff',
  },
  review: {
    marginBottom: 16,
    marginTop: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileText: {
    flex: 1,
    marginLeft: 10,
  },
  authorName: {
    fontWeight: 'bold',
  },
  time: {
    color: '#A9A9A9',
  },
  ratingContainerTopRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Alinea la valoración a la derecha
  },
  rating: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 4,
  },
  reviewDescription: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'left', // Asegúrate de que el texto esté alineado a la izquierda
  },
  alert: {
    marginTop: 10,
  },
  destinationCard: {
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 20,
    position: 'relative'
  },
  cardContent: {
    padding: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  destinationImage: {
    width: '100%',
    height: 200, // Altura de la imagen de 300x200
  },
  ratingOverlay: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 3,
    paddingLeft: 8,
    borderTopStartRadius: 20,
  },
  ratingText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 5,
  },
  descriptionText: {
    marginTop: 10, // Espaciado superior para el texto
    fontSize: 16,
    color: '#333', // Un color de texto más oscuro para el contraste
  },
  buttonContainer: {
    marginTop: 10, // Espaciado antes del botón
  },
});

export default GroupTemplate;
