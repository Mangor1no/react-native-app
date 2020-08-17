import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {StyleSheet, View, StatusBar, Platform, Text} from 'react-native';
import globalStyles from './style/globalStyles';
import Main from './components/main/Main';
import Album from './components/album/Album';
import store from './store/store';
import Player from './components/player/Player';
import TrackPlayer from 'react-native-track-player';

const Stack = createStackNavigator();

const App = () => {
    useEffect(() => {
        StatusBar.setBarStyle('light-content');
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('rgba(0,0,0,0)');
            StatusBar.setTranslucent(true);
        }

        TrackPlayer.registerPlaybackService(() =>
            require('./components/player/playerservice/service'),
        );
    }, []);

    const headerOptions = {
        headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: globalStyles.darkBackgroundColor,
            height: 120,
            shadowColor: 'transparent',
        },
        headerTintColor: globalStyles.darkTextColor,
        headerTitleStyle: {
            paddingTop: globalStyles.paddingTopStandard,
            paddingBottom: globalStyles.paddingBottomStandard,
            paddingLeft: 8,
            paddingRight: 8,
            fontSize: globalStyles.fontSizeTitle,
            fontWeight: globalStyles.fontWeightTitle,
        },
        headerTitleAlign: 'left',
    };

    const headerOptionsCustomBackButton = {
        gestureDirection: 'vertical',
        headerLeft: (props) => (
            <Text {...props} style={styles.arrowDown}>
                &lt;
            </Text>
        ),
        headerTitle: '',
        headerTransparent: true,
        headerTitleAlign: 'left',
    };

    const headerOptionsCustomBackButtonDown = {
        gestureDirection: 'vertical',
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerLeft: (props) => (
            <Text {...props} style={styles.arrowDown}>
                &#8964;
            </Text>
        ),
        headerTitle: 'You are listening to',
        headerTitleStyle: {
            marginTop: 26,
            fontSize: 16,
        },
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerTintColor: globalStyles.darkTextColor,
    };

    return (
        <Provider store={store}>
            <View style={styles.appWrapper}>
                <StatusBar />
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Discover"
                        headerMode="screen">
                        <Stack.Screen
                            name="Discover"
                            component={Main}
                            options={headerOptions}
                        />
                        <Stack.Screen
                            name="Album"
                            component={Album}
                            options={headerOptionsCustomBackButton}
                        />
                        <Stack.Screen
                            name="Player"
                            component={Player}
                            options={headerOptionsCustomBackButtonDown}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    appWrapper: {
        flex: 1,
    },
    appContainer: {
        backgroundColor: globalStyles.darkBackgroundColor,
        paddingTop: 25,
        display: 'flex',
        flexWrap: 'wrap',
    },
    arrowDown: {
        fontSize: 36,
        color: '#fff',
        paddingLeft: 20,
        paddingTop: 5,
        fontWeight: '100',
    },
});

export default App;
