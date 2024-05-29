import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { styles } from '../../../styles/perfilPublico';

export default function PerfilPublico({
    groupsByUser,
    navigation,
    userPublic,
    onFollow,
    onUnfollow,
}) {
    const {
        profilePicture = 'https://via.placeholder.com/100',
        totalGroups = 0,
        followersCount = 0,
        followingCount = 0,
        displayName = 'Astronauta🌍🚀',
        bio = '',
        interests = [],
        superpower = [],
        isFollowing = null
    } = userPublic || {};

    const renderGridItem = ({ item, index }) => {
        const totalItems = groupsByUser?.data.length;
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
            <View style={styles.profileContainer}>
                <View style={styles.profileContent}>
                    <Image
                        source={{ uri: profilePicture }}
                        style={styles.profileImage}
                    />
                    <View style={styles.profileStats}>
                        <View style={styles.infoStat}>
                            <Text style={styles.profileStatText}>{totalGroups}</Text>
                            <Text>grupos</Text>
                        </View>
                        <View style={styles.infoStat}>
                            <Text style={styles.profileStatText}>{followersCount}</Text>
                            <Text>seguidores</Text>
                        </View>
                        <View style={styles.infoStat}>
                            <Text style={styles.profileStatText}>{followingCount}</Text>
                            <Text>seguidos</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.profileUserName}>{displayName}</Text>
                <Text style={styles.profileDescription}>{bio}</Text>
                <View style={styles.tagsContainer}>
                    {interests.map((value, index) => (
                        <Tag key={index} text={value} />
                    ))}
                    {superpower.map((value, index) => (
                        <Tag key={index} text={value} />
                    ))}
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={isFollowing ? onUnfollow : onFollow}
                        >
                            <Text style={styles.buttonText}>{isFollowing ? 'Dejar de seguir' : 'Seguir'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => {}}>
                            <Text style={styles.buttonText}>Invitar a viajar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <FlatList
            ListHeaderComponent={renderHeader}
            data={groupsByUser?.data || []}
            renderItem={renderGridItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
        />
    );
}
