import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    AppRegistry,
} from 'react-native';
import globalStyles from '../../style/globalStyles';
import TrackPlayer from 'react-native-track-player';
import ProgressBar from './ProgressBar';
import PlayButton from '../../assets/play.png';
import PauseButton from '../../assets/pause.png';
import ForwardButton from '../../assets/skip-forward.png';
import BackwardButton from '../../assets/skip-backward.png';
import LoveButton from '../../assets/loved.png';
import LoopOneButton from '../../assets/repeat-one.png';
import LoopButton from '../../assets/loop.png';
import {useDispatch} from 'react-redux';
import {
    selectSong,
    loopMode,
    updateSongCurrentPosition,
    setSongDuration,
    togglePlayStatus,
} from '../../actions';

let timeCounter;

const PlayerControl = ({listItem}) => {
    const currentUrlList = useSelector((state) => state.player.tripSongUrl);
    const currentLoopMode = useSelector((state) => state.player.loopMode);
    const currentSongPosition = useSelector(
        (state) => state.player.songCurrentPosition,
    );
    const songDuration = useSelector((state) => state.player.songDuration);
    const playStatus = useSelector((state) => state.player.playStatus);

    const [playStatusImage, setPlayStatusImage] = useState(PauseButton);

    const dispatch = useDispatch();

    // handle effects
    useEffect(() => {
        setupSongPlayer();
        return async function () {
            await TrackPlayer.remove(currentUrlList[1]._id);
            // await removePlayerEvents();
            await TrackPlayer.destroy();
        };
    }, []);

    useEffect(() => {
        setupSongPlayer();
    }, [currentUrlList]);

    useEffect(() => {
        if (playStatus) {
            TrackPlayer.play();
            setPlayStatusImage(PauseButton);
            if (timeCounter) {
                clearInterval(timeCounter);
            }
            timeCounter = setInterval(() => {
                trackSongDuration();
                trackSongPosition();
            }, 150);
        } else {
            TrackPlayer.pause();
            setPlayStatusImage(PlayButton);
            clearInterval(timeCounter);
            timeCounter = null;
        }
        return function () {
            clearInterval(timeCounter);
            timeCounter = null;
        };
    }, [playStatus, playStatusImage]);

    // handle duration
    const resetDuration = async () => {
        dispatch(updateSongCurrentPosition(0));
        dispatch(setSongDuration(0));
    };

    const convertDuration = (duration) => {
        let minute,
            second = 0;
        minute = Math.floor(duration / 60);
        second = (duration % 60).toFixed(0);
        if (second < 10) {
            second = '0' + second;
        }
        return minute + ':' + second;
    };

    const trackSongDuration = async () => {
        try {
            dispatch(setSongDuration(await TrackPlayer.getDuration()));
        } catch (e) {
            console.log('There is no song playing', e);
        }
    };

    const trackSongPosition = async () => {
        try {
            dispatch(
                updateSongCurrentPosition(await TrackPlayer.getPosition()),
            );
        } catch (e) {
            console.log('There is no song playing', e);
        }
    };

    const setupSongPlayer = async () => {
        /*
            currentUrlList: {
                previousSong,
                currentSong,
                nextSong
            }
        */
        if (currentUrlList[1]._id !== (await TrackPlayer.getCurrentTrack())) {
            // reset the player if currentSong id is not match with the choosen song, else resume it
            await TrackPlayer.reset();
            await TrackPlayer.setupPlayer();
            TrackPlayer.updateOptions({
                stopWithApp: true,
            });
            await TrackPlayer.add([
                {
                    id: currentUrlList[1]._id,
                    url: currentUrlList[1].songMp3Url,
                    title: currentUrlList[1].songName,
                    artist: currentUrlList[1].songAuthor,
                    artwork: currentUrlList[1].songCover,
                },
            ]).then(() => {
                trackSongDuration();
                trackSongPosition();
                if (playStatus) {
                    TrackPlayer.play();
                }
            });
        }
    };

    const handlePrevSong = () => {
        resetDuration();
        var len = listItem.length;

        var current = listItem[(currentUrlList[1].songIndex + len - 2) % len];
        var previous = listItem[(currentUrlList[1].songIndex + len - 3) % len];
        var next = listItem[(currentUrlList[1].songIndex - 1) % len];

        dispatch(selectSong([previous, current, next]));
    };

    const handleNextSong = () => {
        resetDuration();
        var len = listItem.length;

        var current = listItem[(currentUrlList[1].songIndex + len) % len];
        var previous = listItem[(currentUrlList[1].songIndex + len - 1) % len];
        var next = listItem[(currentUrlList[1].songIndex + 1) % len];

        dispatch(selectSong([previous, current, next]));
    };

    const togglePlay = () => {
        if (playStatus) {
            dispatch(togglePlayStatus(false));
        } else {
            dispatch(togglePlayStatus(true));
        }
    };

    const handleLoopMode = async () => {
        console.log('handleLoopMode', currentLoopMode);
        switch (currentLoopMode) {
            case 'one': {
                console.log('one');
                await dispatch(loopMode('all'));
                break;
            }
            case 'all': {
                console.log('all');
                await dispatch(loopMode('one'));
                break;
            }
            default:
                break;
        }
    };

    return (
        <View style={styles.playerControlWrapper}>
            <View style={styles.progressBarWrapper}>
                <ProgressBar />
            </View>
            <View style={styles.songDurationWrapper}>
                <Text style={{color: globalStyles.darkDescColor}}>
                    {convertDuration(currentSongPosition)}
                </Text>
                <Text style={{color: globalStyles.darkDescColor}}>
                    {convertDuration(songDuration)}
                </Text>
            </View>
            <View style={styles.buttonControlWrapper}>
                <TouchableOpacity onPress={handleLoopMode}>
                    <View>
                        <Image
                            source={
                                currentLoopMode === 'one'
                                    ? LoopOneButton
                                    : LoopButton
                            }
                            style={styles.playButton}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePrevSong}>
                    <View>
                        <Image
                            source={BackwardButton}
                            style={styles.playButton}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={togglePlay}>
                    <View style={styles.playButtonWrapper}>
                        <Image
                            source={playStatusImage}
                            style={styles.playButton}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNextSong}>
                    <View>
                        <Image
                            source={ForwardButton}
                            style={styles.playButton}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View>
                        <Image source={LoveButton} style={styles.playButton} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    playerControlWrapper: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    progressBarWrapper: {
        flex: 0.2,
    },
    songDurationWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonControlWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 2,
    },
    playButtonWrapper: {
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 60 / 2,
    },
    playButton: {
        height: 40,
        width: 40,
    },
});

export default PlayerControl;
