import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import globalStyles from '../../style/globalStyles';
import PlayerControl from './PlayerControl';
import {useSelector} from 'react-redux';

const Player = ({route}) => {
    const {listItem} = route.params;
    const currentUrlList = useSelector((state) => state.player.tripSongUrl);
    return (
        <View style={styles.songWrapper}>
            <View style={styles.songCoverWrapper}>
                <Image
                    style={styles.songCover}
                    source={{
                        uri: currentUrlList[1].songCover,
                    }}
                />
            </View>
            <View style={styles.songInfoWrapper}>
                <Text style={styles.songName}>
                    {currentUrlList[1].songName}
                </Text>
                <Text style={styles.songAuthor}>
                    {currentUrlList[1].songAuthor}
                </Text>
            </View>
            <View style={styles.songControlWrapper}>
                <PlayerControl listItem={listItem} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    songDuration: {
        height: 60,
        paddingLeft: 10,
        paddingRight: 30,
        color: globalStyles.darkDescColor,
        paddingTop: 17,
    },
    songCoverWrapper: {
        flex: 1.5,
        marginTop: 150,
        marginBottom: 50,
    },
    songCover: {
        height: '100%',
        width: '100%',
    },
    songWrapper: {
        display: 'flex',
        height: '100%',
        backgroundColor: globalStyles.darkBackgroundColor,
        padding: 20,
    },
    songItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    songInfoWrapper: {
        flex: 0.3,
    },
    songControlWrapper: {
        flex: 1,
    },
    songName: {
        color: globalStyles.darkTextColor,
        fontWeight: 'bold',
        fontSize: 18,
    },
    songAuthor: {
        color: globalStyles.darkDescColor,
    },
});

export default Player;
