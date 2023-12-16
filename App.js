import React, {useState, useRef} from 'react';
import {View, Modal, Button, Animated, SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import {StatusBar} from "expo-status-bar";
import SelectCountry from "./modals/SelectCountry";
import KoreaFlag from './assets/flags/korea.svg';

const App = () => {
    // 모달의 가시성을 관리하는 상태 변수, 기본값은 false (닫힘)
    const [modalVisible, setModalVisible] = useState(false);
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handleOpenModal = () => {
        // 모달을 열기
        Animated.spring(scaleValue, {
            toValue: 0.87,
            useNativeDriver: true
        }).start();
        setModalVisible(true);
    };

    const handleSelectCountryModal = (flag) => {
        setModalVisible(flag)
    }

    return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
            <Animated.View style={{
                flex: 1,
                transform: [{scale: scaleValue}],
                backgroundColor: 'white',
                borderRadius: 16,
                paddingTop: 50
            }}>
                <View style={{height: 48, justifyContent: 'center', paddingHorizontal: 16}}>
                    <Text style={{fontSize: 24}}>RateXpert</Text>
                </View>
                <View style={{height: 48, paddingHorizontal: 16, backgroundColor: 'grey'}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 2, }}>
                            <View>
                                <KoreaFlag width="100%" height="100%"/>
                            </View>

                        </View>
                        <View style={{flex: 5, justifyContent: 'center', paddingHorizontal: 16}}>
                            <Text>ISO코드</Text>
                        </View>
                        <View style={{flex: 5, alignItems: 'flex-end', justifyContent: 'center'}}>
                            <Text>가격</Text>
                        </View>
                    </View>
                </View>
                <Button title="Open Modal" onPress={handleOpenModal}/>
            </Animated.View>

            <SelectCountry modalVisible={modalVisible} scaleValue={scaleValue}
                           handleSelectCountryModal={handleSelectCountryModal}/>

            <StatusBar style="auto"/>
        </View>
    );
};

export default App;
