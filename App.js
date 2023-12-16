import React, {useState, useRef} from 'react';
import {View, Modal, Button, Animated, SafeAreaView, StyleSheet, Text, Image, TextInput} from 'react-native';
import {StatusBar} from "expo-status-bar";
import SelectCountry from "./modals/SelectCountry";
import KoreaFlag from './assets/flags/korea.svg';
import JapanFlag from './assets/flags/japan.svg';
import UsaFlag from './assets/flags/usa.svg';
import HorizontalLine from "./components/HorizontalLine";

const App = () => {

    // 입력된 금액
    const [values, setValues] = useState({
        base: '1,000',
        input1: '108.71'
    });

    // 금액 변경시 실행되는 함수
    const handleChange = (text, name) => {
        // 숫자만 추출 (콤마 제거)
        const unformatted = text.replace(/,/g, '');
        const formattedText = unformatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        setValues(prevValues => ({...prevValues, [name]: formattedText}));
    };

    // 모달의 가시성을 관리하는 상태 변수, 기본값은 false (닫힘)
    const [modalVisible, setModalVisible] = useState(false);
    // 모달이 열릴 경우 부모 컴포넌트는 크기가 약간 줄어드는 기능 구현
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
                {/* 상단 타이틀 영역*/}
                <View style={{height: 48, justifyContent: 'center', paddingHorizontal: 16}}>
                    <Text style={{fontSize: 24}}>RateXpert</Text>
                </View>
                {/*기본 환율 적용 범위*/}
                <View style={{height: 40, paddingHorizontal: 16, marginVertical: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 2,}}>
                            <KoreaFlag width="100%" height="100%"/>
                        </View>
                        <View style={{flex: 2, justifyContent: 'center', paddingHorizontal: 16}}>
                            <Text>KOR</Text>
                        </View>
                        <View style={{flex:10, alignItems: 'flex-end', justifyContent: 'center'}}>
                            <TextInput keyboardType="numeric"
                                       defaultValue={values.base}
                                       onChangeText={(text) => handleChange(text, 'base')}
                                       style={{fontSize: 32}}
                            />
                        </View>
                    </View>
                </View>
                {/* 한화 환율 분리선 적용 */}
                <HorizontalLine/>
                {/* 비교 환율 영역*/}
                <View style={{height: 40, paddingHorizontal: 16, marginVertical: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 2,}}>
                            <UsaFlag width="100%" height="100%"/>
                        </View>
                        <View style={{flex: 2, justifyContent: 'center', paddingHorizontal: 16}}>
                            <Text>USD</Text>
                        </View>
                        <View style={{flex:10, alignItems: 'flex-end', justifyContent: 'center'}}>
                            <TextInput keyboardType="numeric"
                                       defaultValue={values.base}
                                       onChangeText={(text) => handleChange(text, 'base')}
                                       style={{fontSize: 32}}
                            />
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
