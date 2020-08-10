import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {StyleSheet, SafeAreaView, StatusBar, Platform} from 'react-native';
import globalStyles from './components/style/globalStyles';
import Main from './components/main/Main';
import Album from './components/album/Album';
import store from './store/store';

const Stack = createStackNavigator();

const App = () => {
    useEffect(() => {
        StatusBar.setBarStyle('light-content');
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('rgba(0,0,0,0)');
            StatusBar.setTranslucent(true);
        }
    }, []);

    const headerOptions = {
        headerLeft: () => null,
        headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: globalStyles.darkBackgroundColor,
            height: 120,
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
    };

    return (
        <Provider store={store}>
            <SafeAreaView style={styles.appWrapper}>
                <StatusBar />
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Discover">
                        <Stack.Screen
                            name="Discover"
                            component={Main}
                            options={headerOptions}
                        />
                        <Stack.Screen
                            name="Album"
                            component={Album}
                            options={{headerShown: false}}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
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
});

export default App;
