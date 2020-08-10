import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../style/globalStyles';
import {
    getTopFiveAlbumUS,
    getTopFiveAlbumVietnam,
    getTopFiveAlbumKorea,
    navigateRoute,
    getRandomAlbumForNewDay,
    getTopSinger,
    getAlbumUSRapHiphop,
} from '../../actions';

const Main = () => {
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = useState(false);

    let topFiveAlbumUS = useSelector((state) => state.albums.resultAlbumUS);
    let topFiveAlbumKorea = useSelector(
        (state) => state.albums.resultAlbumKorea,
    );
    let topFiveAlbumVietnam = useSelector(
        (state) => state.albums.resultAlbumVietnam,
    );
    let albumForNewDay = useSelector(
        (state) => state.albums.resultAlbumForNewDay,
    );
    let topSingers = useSelector((state) => {
        return state.singers.resultTopSingers;
    });
    let topAlbumUSRapHiphop = useSelector(
        (state) => state.albums.resultAlbumUSRapHiphop,
    );

    const getData = () => {
        dispatch(getTopFiveAlbumUS());
        dispatch(getTopFiveAlbumVietnam());
        dispatch(getTopFiveAlbumKorea());
        dispatch(getRandomAlbumForNewDay());
        dispatch(getTopSinger());
        dispatch(getAlbumUSRapHiphop());
    };

    useEffect(() => {
        (async () => {
            await getData();
        })();
    }, []);

    const navigation = useNavigation();

    const handleRefresh = async () => {
        setRefreshing(true);
        getData();
        return setRefreshing(false);
    };

    const handlePress = async (item) => {
        await dispatch(navigateRoute('Album'));
        console.log(item);
        await navigation.navigate('Album', {albumSongList: item.albumSongList});
    };

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => handlePress(item)}>
                <Album data={item} />
            </TouchableOpacity>
        );
    };

    const renderItemSinger = ({item}) => {
        return (
            <View>
                <TouchableOpacity onPress={() => handlePress(item)}>
                    <Singer data={item} />
                </TouchableOpacity>
            </View>
        );
    };

    const Singer = ({data}) => (
        <View style={styles.singerItem}>
            <Image
                source={{uri: data.singerCover}}
                style={styles.singerCover}
            />
            <Text style={styles.titleContent}>{data.singerName}</Text>
        </View>
    );

    const Album = ({data}) => (
        <View style={styles.albumItem}>
            <Image source={{uri: data.albumCover}} style={styles.albumCover} />
            <Text style={styles.titleContent}>{data.albumName}</Text>
            <Text style={styles.descContent}>{data.albumAuthor}</Text>
        </View>
    );

    const renderListAlbumUS = () => {
        if (topFiveAlbumUS.data && topFiveAlbumUS.data.length > 0) {
            return (
                <View
                    key={topFiveAlbumUS.title}
                    style={styles.albumListWrapper}>
                    <Text style={styles.sectionListHeader}>
                        {topFiveAlbumUS.title}
                    </Text>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={topFiveAlbumUS.data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item + index}
                        contentContainerStyle={styles.albumList}
                    />
                </View>
            );
        }
    };

    const renderListAlbumVietnam = () => {
        if (topFiveAlbumVietnam.data && topFiveAlbumVietnam.data.length > 0) {
            return (
                <View
                    key={topFiveAlbumVietnam.title}
                    style={styles.albumListWrapper}>
                    <Text style={styles.sectionListHeader}>
                        {topFiveAlbumVietnam.title}
                    </Text>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={topFiveAlbumVietnam.data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item + index}
                        contentContainerStyle={styles.albumList}
                    />
                </View>
            );
        }
    };

    const renderListAlbumKorea = () => {
        if (topFiveAlbumKorea.data && topFiveAlbumKorea.data.length > 0) {
            return (
                <View
                    key={topFiveAlbumKorea.title}
                    style={styles.albumListWrapper}>
                    <Text style={styles.sectionListHeader}>
                        {topFiveAlbumKorea.title}
                    </Text>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={topFiveAlbumKorea.data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item + index}
                        contentContainerStyle={styles.albumList}
                    />
                </View>
            );
        }
    };

    const renderListTopSingers = () => {
        if (topSingers.data && topSingers.data.length > 0) {
            return (
                <View key={topSingers.title} style={styles.singerListWrapper}>
                    <Text style={styles.sectionListHeader}>
                        {topSingers.title}
                    </Text>
                    <FlatList
                        horizontal={false}
                        numColumns={3}
                        showsVerticalScrollIndicator={false}
                        data={topSingers.data}
                        renderItem={renderItemSinger}
                        keyExtractor={(item, index) => item + index}
                        columnWrapperStyle={styles.singerList}
                    />
                </View>
            );
        }
    };

    const renderAlbumForNewDay = () => {
        if (albumForNewDay.data && albumForNewDay.data.length > 0) {
            return (
                <View
                    key={albumForNewDay.title}
                    style={styles.albumListWrapper}>
                    <Text style={styles.sectionListHeader}>
                        {albumForNewDay.title}
                    </Text>
                    <View style={styles.newDayCoverWrapper}>
                        <Image
                            source={{uri: albumForNewDay.data[0].albumCover}}
                            style={styles.newDayCover}
                        />
                    </View>
                </View>
            );
        }
    };

    const renderListAlbumUSRapHiphop = () => {
        if (topAlbumUSRapHiphop.data && topAlbumUSRapHiphop.data.length > 0) {
            return (
                <View
                    key={topAlbumUSRapHiphop.title}
                    style={styles.albumListWrapper}>
                    <Text style={styles.sectionListHeader}>
                        {topAlbumUSRapHiphop.title}
                    </Text>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={topAlbumUSRapHiphop.data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item + index}
                        contentContainerStyle={styles.albumList}
                    />
                </View>
            );
        }
    };

    const albumLists = () => {
        return (
            <>
                {renderAlbumForNewDay(navigation)}
                {renderListAlbumUS(navigation)}
                {renderListAlbumVietnam(navigation)}
                {renderListAlbumKorea(navigation)}
                {renderListTopSingers(navigation)}
                {renderListAlbumUSRapHiphop(navigation)}
            </>
        );
    };

    return (
        <FlatList
            style={styles.mainWrapper}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            }
            ListHeaderComponent={albumLists}
        />
    );
};

const styles = StyleSheet.create({
    mainWrapper: {
        backgroundColor: globalStyles.darkBackgroundColor,
        height: '100%',
        flex: 1,
    },
    titleContent: {
        marginTop: 10,
        color: globalStyles.darkTextColor,
        fontSize: 16,
        fontWeight: 'bold',
        maxWidth: 180,
    },
    descContent: {
        color: globalStyles.darkDescColor,
        maxWidth: 180,
    },
    sectionListHeader: {
        fontSize: globalStyles.fontSizeSubTitle,
        fontWeight: globalStyles.fontWeightSubTitle,
        color: globalStyles.darkTextColor,
        marginTop: 15,
        marginBottom: 15,
        paddingLeft: globalStyles.paddingLeftStandard,
        paddingRight: globalStyles.paddingRightStandard,
    },
    albumCover: {
        width: globalStyles.albumCoverImageWidth,
        height: globalStyles.albumCoverImageHeight,
        borderRadius: globalStyles.albumCoverImageBorderRadius,
    },
    albumListWrapper: {
        marginBottom: 25,
    },
    albumList: {
        paddingLeft: 5,
        paddingRight: 20,
    },
    albumItem: {
        marginLeft: 15,
    },
    newDayCoverWrapper: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    newDayCover: {
        height: 250,
        borderRadius: 15,
    },
    singerListWrapper: {},
    singerList: {
        justifyContent: 'space-evenly',
        marginBottom: 25,
    },
    singerItem: {
        maxWidth: 100,
    },
    singerCover: {
        width: 100,
        height: 100,
        borderRadius: globalStyles.albumCoverImageBorderRadius,
    },
});

export default Main;
