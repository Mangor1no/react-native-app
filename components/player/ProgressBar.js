import React, {useRef} from 'react';
import {useSelector} from 'react-redux';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import globalStyles from '../../style/globalStyles';

const ProgressBar = ({currentDurrationPercentage}) => {
    const currentSongPosition = useSelector(
        (state) => state.player.songCurrentPosition,
    );
    const songDuration = useSelector((state) => state.player.songDuration);

    const _translateX = new Animated.Value(0);

    const handleProgressBarGesture = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: _translateX,
                },
            },
        ],
        {useNativeDriver: true},
    );

    const handleProgressBarStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            _translateX.extractOffset();
        }
    };

    return (
        <View style={styles.progressBarWrapper}>
            <View style={styles.progressBar}>
                <View
                    style={{
                        flex: currentSongPosition,
                        backgroundColor: 'white',
                    }}
                />
                <View
                    style={{
                        flex: songDuration - currentSongPosition,
                        backgroundColor: '#6e6f71',
                    }}
                />
            </View>
            <PanGestureHandler
                onGestureEvent={handleProgressBarGesture}
                onHandlerStateChange={handleProgressBarStateChange}
                // failOffsetX={[0, 100]}
                maxPointers={1}
                minDist={1}
                style={{height: 40}}>
                <Animated.View
                    style={[
                        styles.position,
                        {
                            transform: [
                                {
                                    translateX: _translateX.interpolate({
                                        inputRange: [
                                            currentSongPosition,
                                            Dimensions.get('window').width - 53,
                                        ],
                                        outputRange: [
                                            currentSongPosition,
                                            Dimensions.get('window').width - 53,
                                        ],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                />
            </PanGestureHandler>
        </View>
    );
};

const styles = StyleSheet.create({
    progressBarWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        flex: 1,
    },
    progressBar: {
        height: 2,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#6e6f71',
        position: 'relative',
    },
    position: {
        backgroundColor: '#fff',
        borderRadius: 13,
        width: 13,
        height: 13,
        position: 'absolute',
    },
});

export default ProgressBar;
