import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../style/globalStyles';
import {
    getTopAlbumUS,
    getTopAlbumVietnam,
    getTopAlbumKorea,
} from '../../api/api';
import {getTopFiveAlbumUS} from '../../actions';

const Main = () => {
    const dispatch = useDispatch();
    const [topAlbumUS, setTopAlbumUS] = useState([]);
    const [topAlbumVietnam, setTopAlbumVietnam] = useState([]);
    const [topAlbumKorea, setTopAlbumKorea] = useState([]);
    const topFiveAlbumUS = useSelector((state) => state.topFiveAlbumUS);
    const topFiveAlbumKorea = useSelector((state) => state.topFiveAlbumKorea);
    const topFiveAlbumVietnam = useSelector(
        (state) => state.topFiveAlbuVietnam,
    );

    console.log(1, topFiveAlbumUS);

    useEffect(() => {
        dispatch(getTopFiveAlbumUS());
        async function getData() {
            let resultAlbumUS = await getTopAlbumUS();
            let resultAlbumVietnam = await getTopAlbumVietnam();
            let resultAlbumKorea = await getTopAlbumKorea();

            setTopAlbumUS(resultAlbumUS);
            setTopAlbumVietnam(resultAlbumVietnam);
            setTopAlbumKorea(resultAlbumKorea);
        }
        getData();
    }, []);

    const navigation = useNavigation();

    const handlePress = (item) => {
        console.log(item.albumUrl);
        navigation.navigate('Album');
    };

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => handlePress(item)}>
                <Album data={item} />
            </TouchableOpacity>
        );
    };

    const Album = ({data}) => (
        <View style={styles.albumItem}>
            <Image source={{uri: data.albumCover}} style={styles.albumCover} />
            <Text style={styles.titleContent}>{data.albumName}</Text>
            <Text style={styles.descContent}>{data.albumAuthor}</Text>
        </View>
    );

    const renderListAlbumUS = () => {
        return (
            <View key={topAlbumUS.title} style={styles.albumListWrapper}>
                <Text style={styles.sectionListHeader}>{topAlbumUS.title}</Text>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={topAlbumUS.data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item + index}
                    contentContainerStyle={styles.albumList}
                />
            </View>
        );
    };
    const renderListAlbumVietnam = () => {
        return (
            <View key={topAlbumVietnam.title} style={styles.albumListWrapper}>
                <Text style={styles.sectionListHeader}>
                    {topAlbumVietnam.title}
                </Text>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={topAlbumVietnam.data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item + index}
                    contentContainerStyle={styles.albumList}
                />
            </View>
        );
    };
    const renderListAlbumKorea = () => {
        return (
            <View key={topAlbumKorea.title} style={styles.albumListWrapper}>
                <Text style={styles.sectionListHeader}>
                    {topAlbumKorea.title}
                </Text>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={topAlbumKorea.data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item + index}
                    contentContainerStyle={styles.albumList}
                />
            </View>
        );
    };

    return (
        <ScrollView style={styles.mainWrapper}>
            {renderListAlbumUS(navigation)}
            {renderListAlbumVietnam(navigation)}
            {renderListAlbumKorea(navigation)}
        </ScrollView>
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
});

export default Main;
