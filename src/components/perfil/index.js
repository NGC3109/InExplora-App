import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { styles } from '../../styles/perfil';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PerfilComponent({
    groupsByUser,
    updateUser,
    currentUser,
    logout,
    navigation,
    onShare,
}) {
    const renderGridItem = ({ item, index }) => {
        const totalItems = groupsByUser.length;
        let isLastItemSingleInRow = false;
        if (totalItems % 3 === 1 && index === totalItems - 1) {
            isLastItemSingleInRow = true;
        }
        const gridItemStyle = isLastItemSingleInRow ? styles.singleGridItem : styles.gridItem;
        return (
            <TouchableOpacity style={gridItemStyle} onPress={() => navigation.navigate('update_groups', { group: item })}>
                <Image source={{ uri: item.profilePicture }} style={styles.image} />
            </TouchableOpacity>
        );
    };

    const Tag = ({ text }) => (
        <TouchableOpacity style={styles.tag}>
            <Text style={styles.tagText}>{text}</Text>
        </TouchableOpacity>
    );

    const renderHeader = () => (
        <View style={styles.container}>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Icon name="sign-out" size={24} color="#000" />
            </TouchableOpacity>
            <View style={styles.profileContainer}>
                <View style={styles.profileContent}>
                    <Image
                        source={{ uri: currentUser.profilePicture || 'https://via.placeholder.com/100' }}
                        style={styles.profileImage}
                    />
                    <View style={styles.profileStats}>
                        <View style={styles.infoStat}>
                            <Text style={styles.profileStatText}>{currentUser.totalGroups || 0}</Text>
                            <Text>grupos</Text>
                        </View>
                        <View style={styles.infoStat}>
                            <Text style={styles.profileStatText}>{currentUser.followersCount || 0}</Text>
                            <Text>seguidores</Text>
                        </View>
                        <View style={styles.infoStat}>
                            <Text style={styles.profileStatText}>{currentUser.followingCount || 0}</Text>
                            <Text>seguidos</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.profileUserName}>{currentUser.displayName || 'Astronauta🌍🚀'}</Text>
                <Text style={styles.profileDescription}>
                    {currentUser.bio}
                </Text>
                <View style={styles.tagsContainer}>
                    {currentUser.interests && currentUser.interests.map((value, index) => (
                        <Tag key={index} text={value} />
                    ))}
                    {currentUser.superpower && currentUser.superpower.map((value, index) => (
                        <Tag key={index} text={value} />
                    ))}
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={updateUser}>
                            <Text style={styles.buttonText}>Editar perfil</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={onShare}>
                            <Text style={styles.buttonText}>Compartir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <FlatList
            ListHeaderComponent={renderHeader}
            data={groupsByUser || []}
            renderItem={renderGridItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
        />
    );
}
