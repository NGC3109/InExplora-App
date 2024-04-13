import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const Home = () => {
  const banners = [
    { id: 1, imageUrl: 'https://dus6dayednven.cloudfront.net/app/uploads/2022/09/Imma-Barrera-United-States-Shortlist-01.jpg' },
    { id: 2, imageUrl: 'https://mott.pe/noticias/wp-content/uploads/2018/05/que-es-la-astrofotografia-y-que-es-lo-que-necesitas-para-realizarla1.png' },
    { id: 3, imageUrl: 'https://mott.pe/noticias/wp-content/uploads/2018/05/que-es-la-astrofotografia-y-que-es-lo-que-necesitas-para-realizarla1.png' },
    { id: 4, imageUrl: 'https://www.astroshop.es/CMS/images/text/category/italien-panorama-berge_all.jpg' },
    { id: 5, imageUrl: 'https://mott.pe/noticias/wp-content/uploads/2018/05/que-es-la-astrofotografia-y-que-es-lo-que-necesitas-para-realizarla1.png' },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Image source={{ uri: item.imageUrl }} style={styles.carouselImage} />
      </View>
    );
  };
  const renderItemBottom = ({ item }) => {
    return (
      <View style={styles.carouselItemBottom}>
        <Image source={{ uri: item.imageUrl }} style={styles.carouselImage} />
      </View>
    );
  };

  return (
    <View>
      {/* <Carousel
        data={banners}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        loop={true}
        autoplay={true}
        autoplayInterval={3000}
        layout={'default'}
      /> */}
      {/* Other content of the screen */}
      {/* <View style={styles.textContainer}>
        <Text style={styles.text}>Animate a viajar con estos destinos!</Text>
      </View>
      <Carousel
        data={banners}
        renderItem={renderItemBottom}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width / 3}
        loop={true}
        autoplay={true}
        autoplayInterval={5000}
        layout={'default'}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        loopClonesPerSide={banners.length}
      />
      <View>
        <Text>Other Content Here</Text>
      </View>
      
      <Carousel
        data={banners}
        renderItem={renderItemBottom}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width / 3}
        loop={true}
        autoplay={true}
        autoplayInterval={5000}
        layout={'default'}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        loopClonesPerSide={banners.length}
      />
      
      <Carousel
        data={banners}
        renderItem={renderItemBottom}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width / 3}
        loop={true}
        autoplay={true}
        autoplayInterval={5000}
        layout={'default'}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        loopClonesPerSide={banners.length}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    backgroundColor: 'white',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItemBottom: {
    backgroundColor: 'white',
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignSelf: 'flex-start', // Alinea el texto a la izquierda
    marginLeft: 10, // Opcional: añade margen izquierdo para separar del borde izquierdo
    marginBottom: 15,
    marginTop: 15,
  },
  text: {
    fontSize: 20, // Tamaño de la fuente
    fontWeight: 'bold', // Peso de la fuente
    color: 'black', // Color del texto
  },
});

export default Home;
