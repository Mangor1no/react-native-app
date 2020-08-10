import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import globalStyles from '../style/globalStyles';

const Album = ({route}) => {
    const handlePress = (item) => {
        console.log(item.name);
    };

    const {albumSongList} = route.params;

    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                onPress={() => handlePress(item)}
                style={styles.songItemWrapper}>
                <View style={styles.songItem}>
                    <Text style={styles.songIndex}>{index + 1}</Text>
                    <Text style={styles.songName} numberOfLines={1}>
                        {item.songName}
                    </Text>
                </View>
                <View>
                    <Text style={styles.songDuration}>1:24</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.albumWrapper}>
            <Image
                style={styles.albumCover}
                source={{
                    uri:
                        'https://data.chiasenhac.com/data/cover/125/124799.jpg',
                }}
            />
            <FlatList
                style={styles.songListWrapper}
                showsHorizontalScrollIndicator={false}
                data={albumSongList}
                renderItem={(item, index) => renderItem(item, index)}
                keyExtractor={(item, index) => item + index}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    songIndex: {
        height: 60,
        paddingLeft: 30,
        paddingRight: 10,
        color: globalStyles.darkDescColor,
        paddingTop: 17,
    },
    songDuration: {
        height: 60,
        paddingLeft: 10,
        paddingRight: 30,
        color: globalStyles.darkDescColor,
        paddingTop: 17,
    },
    songName: {
        height: 60,
        paddingLeft: 20,
        paddingRight: 10,
        color: globalStyles.darkDescColor,
        paddingTop: 17,
    },
    albumCover: {
        flex: 1,
    },
    albumWrapper: {
        display: 'flex',
        height: '100%',
    },
    songListWrapper: {
        flex: 1,
        backgroundColor: globalStyles.darkBackgroundColor,
    },
    songItemWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: globalStyles.darkHrColor,
    },
    songItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Album;
