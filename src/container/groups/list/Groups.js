import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import GroupItem from './GroupItem';
import FiltrosComponent from '../../../components/ui/Filtros';
import FiltersContainer from '../../../components/FiltersContainer';
import { filters } from './DataMock';
import { loadGroups } from '../../../actions/groups/groupAction';
import Config from 'react-native-config';
import io from 'socket.io-client';
import CommentSection from './CommentSection';
import { bookmark, removeBookmark } from '../../../actions/bookmark/bookmarkAction';
import { useNavigation } from '@react-navigation/native';

const socket = io(Config.SOCKET);

const Grupos = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [selectedFilters, setSelectedFilters] = useState({});
    const [showFilters, setShowFilters] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [currentGroupId, setCurrentGroupId] = useState(null);
    const groupsData = useSelector(state => state.groupReducer.allGroups);
    const currentUserId = useSelector(state => state.userReducer.user);
    const currentBookmarks = useSelector(state => state.bookmarkReducer.bookmarks);
    const viewableItems = useRef(new Set());
    useEffect(() => {
        dispatch(loadGroups(currentUserId.id));
    }, [dispatch]);

    const handleSelectChange = useCallback((filterId, itemValue) => {
        setSelectedFilters(prevFilters => ({
          ...prevFilters,
          [filterId]: itemValue === "Seleccionar" ? "" : itemValue
        }));
    }, []);

    const handleViewableItemsChanged = ({ viewableItems: viewable }) => {
        const newViewableItems = new Set(viewable.map(({ item }) => item._id));
        const added = new Set([...newViewableItems].filter(x => !viewableItems.current.has(x)));
        const removed = new Set([...viewableItems.current].filter(x => !newViewableItems.has(x)));
        added.forEach(groupId => {
            socket.emit('joinGroup', { userId: currentUserId.id, groupId });
            socket.emit('joinComment', { userId: currentUserId.id, commentableId: groupId });
        });
        removed.forEach(groupId => {
            socket.emit('leaveRoom', { userId: currentUserId.id, groupId });
        });
        viewableItems.current = newViewableItems;
    };

    useEffect(() => {
        return () => {
            viewableItems.current.forEach(groupId => {
                socket.emit('leaveRoom', { userId: currentUserId.id, groupId });
            });
        };
    }, [currentUserId.id]);

    const handleShowComments = (groupId) => {
        setCurrentGroupId(groupId);
        setShowComments(true);
    };

    const handleCloseComments = () => {
        setShowComments(false);
        setCurrentGroupId(null);
    };

    const handleBookmark = (userId, bookmarkableId, onModel, setBookmarkedByUser) => {
        dispatch(bookmark(userId, bookmarkableId, onModel))
        setBookmarkedByUser(true)
    }

    const handleDeleteBookmark = (bookmarkId, setBookmarkedByUser, setBookmarkId) => {
        dispatch(removeBookmark(bookmarkId))
        setBookmarkedByUser(false)
        setBookmarkId(currentBookmarks._id)
    }
    
    return (
        <>
            <FiltrosComponent />
            {showFilters && (
                <FiltersContainer 
                    filters={filters}
                    selectedFilters={selectedFilters}
                    handleSelectChange={handleSelectChange}
                />
            )}
            <View style={styles.listContainer}>
                <FlatList
                    data={groupsData?.data}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <GroupItem 
                            item={item} 
                            userId={currentUserId.id}
                            socket={socket}
                            onShowComments={handleShowComments}
                            handleBookmark={handleBookmark}
                            handleDeleteBookmark={handleDeleteBookmark}
                            navigation={navigation}
                        />
                    )}
                    ListFooterComponent={<View style={styles.footer} />}
                    onViewableItemsChanged={handleViewableItemsChanged}
                    viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                />
            </View>
            {showComments && (
                <CommentSection 
                    groupId={currentGroupId} 
                    socket={socket} 
                    onClose={handleCloseComments}
                    currentUserId={currentUserId.id}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    footer: {
        marginBottom: '15%',
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
});

export default Grupos;
