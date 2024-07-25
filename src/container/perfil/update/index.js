import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MultiSelect from 'react-native-multiple-select';
import { IconEdit, IconCheck } from '../../../assets/vectores';

const items = [
  { id: 'Universo', name: 'Universo' },
  { id: 'Natural', name: 'Natural' },
  { id: 'Cafe', name: 'Cafe' },
  { id: 'Viajes espontaneo', name: 'Viajes espontaneo' },
  { id: 'Playa', name: 'Playa' },
  { id: 'Bosques', name: 'Bosques' },
  { id: 'Viajes', name: 'Viajes' },
  { id: 'Comida', name: 'Comida' },
];

const superpowers = [
  { id: 'Fotografia perfecta', name: 'Fotografia perfecta' },
  { id: 'Reserva veloz', name: 'Reserva veloz' },
  { id: 'Detector de Atracciones Ocultas', name: 'Detector de Atracciones Ocultas' },
];

const languages = [
  { id: 'Español', name: 'Español' },
  { id: 'Inglés', name: 'Inglés' },
  { id: 'Aleman', name: 'Aleman' },
  { id: 'Ruso', name: 'Ruso' },
  // Agrega más idiomas según sea necesario
];

function UpdateProfile() {
  const navigation = useNavigation();
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState('Una breve descripcion de cada usuario Una breve  de cada usuario Una breve descripcion  cada  Una   de cada usuario');
  const [selectedItems, setSelectedItems] = useState(['Universo', 'Natural', 'Cafe']);
  const [selectedSuperpowers, setSelectedSuperpowers] = useState(['Fotografia perfecta', 'Reserva veloz']);
  const [selectedLanguages, setSelectedLanguages] = useState(['Español', 'Inglés']);
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [isEditingSuperpowers, setIsEditingSuperpowers] = useState(false);
  const [isEditingLanguages, setIsEditingLanguages] = useState(false);

  const handleEditDescription = () => {
    if (isEditingDescription) {
      console.log('Descripción guardada:', description);
    }
    setIsEditingDescription(!isEditingDescription);
  };

  const handleEditInterests = () => {
    if (isEditingInterests) {
      console.log('Intereses guardados:', selectedItems);
    }
    setIsEditingInterests(!isEditingInterests);
  };

  const handleEditSuperpowers = () => {
    if (isEditingSuperpowers) {
      console.log('Superpoderes guardados:', selectedSuperpowers);
    }
    setIsEditingSuperpowers(!isEditingSuperpowers);
  };

  const handleEditLanguages = () => {
    if (isEditingLanguages) {
      console.log('Idiomas guardados:', selectedLanguages);
    }
    setIsEditingLanguages(!isEditingLanguages);
  };

  const onSelectedItemsChange = selectedItems => {
    setSelectedItems(selectedItems);
  };

  const onSelectedSuperpowersChange = selectedSuperpowers => {
    setSelectedSuperpowers(selectedSuperpowers);
  };

  const onSelectedLanguagesChange = selectedLanguages => {
    setSelectedLanguages(selectedLanguages);
  };

  const sections = [
    {
      id: 'information',
      render: () => (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Información</Text>
            <TouchableOpacity onPress={() => navigation.navigate('updateProfile_information')}>
              <IconEdit />
            </TouchableOpacity>
          </View>
          <View style={styles.sectionContent}>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>+569 3870 7436</Text>
            </View>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>undatorres1994@gmail.com</Text>
            </View>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>Chile</Text>
            </View>
            <View style={styles.sectionItem}>
              <Text style={styles.sectionItemText}>Hombre</Text>
            </View>
          </View>
        </View>
      ),
    },
    {
      id: 'description',
      render: () => (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            {isEditingDescription ? (
              <TextInput
                style={styles.textarea}
                value={description}
                onChangeText={setDescription}
                multiline={true}
                numberOfLines={4}
              />
            ) : (
              <Text style={styles.profileInfo}>{description}</Text>
            )}
            <TouchableOpacity onPress={handleEditDescription}>
              {isEditingDescription ? <IconCheck /> : <IconEdit />}
            </TouchableOpacity>
          </View>
        </View>
      ),
    },
    {
      id: 'interests',
      render: () => (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Intereses</Text>
            <TouchableOpacity onPress={handleEditInterests}>
              {isEditingInterests ? <IconCheck /> : <IconEdit />}
            </TouchableOpacity>
          </View>
          <View style={!isEditingInterests ? styles.sectionContent : {}}>
            {isEditingInterests ? (
              <MultiSelect
                items={items}
                uniqueKey="id"
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="Seleccione intereses"
                searchInputPlaceholderText="Buscar intereses..."
                tagRemoveIconColor="#021121"
                tagBorderColor="#021121"
                tagTextColor="#021121"
                selectedItemTextColor="#021121"
                selectedItemIconColor="#021121"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#021121' }}
                submitButtonColor="#021121"
                submitButtonText="Confirmar"
                styleDropdownMenuSubsection={{ paddingRight: 8 }}
                styleItemsContainer={{ width: '100%' }}
                styleListContainer={{ width: '100%' }}
                style={{ width: '100%' }}
              />
            ) : (
              selectedItems.map(item => {
                const selectedItem = items.find(i => i.id === item);
                return (
                  <View key={item} style={styles.sectionItem}>
                    <Text style={styles.sectionItemText}>{selectedItem ? selectedItem.name : item}</Text>
                  </View>
                );
              })
            )}
          </View>
        </View>
      ),
    },
    {
      id: 'superpowers',
      render: () => (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Super poderes</Text>
            <TouchableOpacity onPress={handleEditSuperpowers}>
              {isEditingSuperpowers ? <IconCheck /> : <IconEdit />}
            </TouchableOpacity>
          </View>
          <View style={!isEditingSuperpowers ? styles.sectionContent : {}}>
            {isEditingSuperpowers ? (
              <MultiSelect
                items={superpowers}
                uniqueKey="id"
                onSelectedItemsChange={onSelectedSuperpowersChange}
                selectedItems={selectedSuperpowers}
                selectText="Seleccione super poderes"
                searchInputPlaceholderText="Buscar super poderes..."
                tagRemoveIconColor="#021121"
                tagBorderColor="#021121"
                tagTextColor="#021121"
                selectedItemTextColor="#021121"
                selectedItemIconColor="#021121"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#021121' }}
                submitButtonColor="#021121"
                submitButtonText="Confirmar"
                styleDropdownMenuSubsection={{ paddingRight: 8 }}
                styleItemsContainer={{ width: '100%' }}
                styleListContainer={{ width: '100%' }}
                style={{ width: '100%' }}
              />
            ) : (
              selectedSuperpowers.map(item => {
                const selectedItem = superpowers.find(i => i.id === item);
                return (
                  <View key={item} style={styles.sectionItem}>
                    <Text style={styles.sectionItemText}>{selectedItem ? selectedItem.name : item}</Text>
                  </View>
                );
              })
            )}
          </View>
        </View>
      ),
    },
    {
      id: 'languages',
      render: () => (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Idiomas</Text>
            <TouchableOpacity onPress={handleEditLanguages}>
              {isEditingLanguages ? <IconCheck /> : <IconEdit />}
            </TouchableOpacity>
          </View>
          <View style={!isEditingLanguages ? styles.sectionContent : {}}>
            {isEditingLanguages ? (
              <MultiSelect
                items={languages}
                uniqueKey="id"
                onSelectedItemsChange={onSelectedLanguagesChange}
                selectedItems={selectedLanguages}
                selectText="Seleccione idiomas"
                searchInputPlaceholderText="Buscar idiomas..."
                tagRemoveIconColor="#021121"
                tagBorderColor="#021121"
                tagTextColor="#021121"
                selectedItemTextColor="#021121"
                selectedItemIconColor="#021121"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#021121' }}
                submitButtonColor="#021121"
                submitButtonText="Confirmar"
                styleDropdownMenuSubsection={{ paddingRight: 8 }}
                styleItemsContainer={{ width: '100%' }}
                styleListContainer={{ width: '100%' }}
                style={{ width: '100%' }}
              />
            ) : (
              selectedLanguages.map(item => {
                const selectedItem = languages.find(i => i.id === item);
                return (
                  <View key={item} style={styles.sectionItem}>
                    <Text style={styles.sectionItemText}>{selectedItem ? selectedItem.name : item}</Text>
                  </View>
                );
              })
            )}
          </View>
        </View>
      ),
    },
  ];

  return (
    <FlatList
      style={styles.container}
      data={sections}
      renderItem={({ item }) => (
        <View key={item.id}>
          {item.render()}
          <View style={styles.separator} />
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    height: 1.5,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
    width: '100%',
  },
  profileInfo: {
    color: 'gray',
    fontSize: 18,
    marginLeft: 4,
    maxWidth: '93%',
  },
  textarea: {
    color: 'gray',
    fontSize: 18,
    marginLeft: 4,
    maxWidth: '93%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    textAlignVertical: 'top',
    height: 100,
  },
});

export default UpdateProfile;
