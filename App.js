import React, {useState, useRef, useEffect} from 'react';
import {View, Modal, Button, Animated, SafeAreaView, StyleSheet, Text, Image, TextInput, FlatList} from 'react-native';
import {StatusBar} from "expo-status-bar";
import SelectCountry from "./modals/SelectCountry";
import KoreaFlag from './assets/flags/korea.svg';
import JapanFlag from './assets/flags/japan.svg';
import UsaFlag from './assets/flags/usa.svg';
import EurFlag from './assets/flags/eu.svg';
import HorizontalLine from "./components/HorizontalLine";
import target from './data/target.json';
import AppLoading from 'expo-app-loading';
import {useFonts, Silkscreen_400Regular, Silkscreen_700Bold} from '@expo-google-fonts/silkscreen';

const App = () => {
    let [fontsLoaded] = useFonts({
        Silkscreen_400Regular,
        Silkscreen_700Bold,
    });

    const [data, setData] = useState([]);

    useEffect(() => {
        // JSON 객체를 배열로 변환
        const dataArray = Object.entries(target).map(([key, value]) => {
            return {
                key: key,
                isoCode: value.isoCode,
                countryName: value.countryName,
                currencyName: value.currencyName,
            };
        });
        setData(dataArray);
    }, []);

    // 입력된 금액
    const [values, setValues] = useState({
        base: '1,000',
        JPY: '108.71',
        USD: '0.77',
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

    const handleSelectCountryModal = (show) => {
        setModalVisible(show);
    }

    const renderFlag = (isoCode) => {
        if (isoCode === 'USD') {
            return <Image source={require('./assets/flags/usa.png')} style={{width: "100%", height: "100%"}} />
        } else if (isoCode === 'USD') {
            return <Image source={require('./assets/flags/japan.png')} style={{width: "100%", height: "100%"}} />
        } else if (isoCode === 'EUR') {
            return <Image source={require('./assets/flags/eu.png')} style={{width: "100%", height: "100%"}} />
        }
    }

    // FlatList의 항목을 렌더링하는 함수
    const renderItem = ({item}) => (
        <View style={styles.row}>
            <View style={{flex: 1}}>
                {renderFlag(item.isoCode)}
            </View>
            <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 16}}>
                <Text style={styles.name}>{item.isoCode}</Text>
            </View>
            <View style={{flex: 5, alignItems: 'flex-end', justifyContent: 'center'}}>
                <TextInput keyboardType="numeric"
                           defaultValue={values[item.isoCode]}
                           onChangeText={(text) => handleChange(text, item.isoCode)}
                           style={styles.currency}
                />
            </View>
        </View>
    );

    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
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
                        <Text style={styles.title}>RateXpert</Text>
                    </View>
                    {/*기본 환율 적용 범위*/}
                    <View style={styles.row}>
                        <View style={{flex: 2}}>
                            <KoreaFlag width="100%" height="100%"/>
                        </View>
                        <View style={{flex: 2, justifyContent: 'center', paddingHorizontal: 16}}>
                            <Text style={styles.name}>KOR</Text>
                        </View>
                        <View style={{flex: 10, alignItems: 'flex-end', justifyContent: 'center'}}>
                            <TextInput keyboardType="numeric"
                                       defaultValue={values.base}
                                       onChangeText={(text) => handleChange(text, 'base')}
                                       style={{fontSize: 32}}
                            />
                        </View>
                    </View>
                    {/* 한화 환율 분리선 적용 */}
                    <HorizontalLine/>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.key}
                    />

                    <Button title="Open Modal" onPress={handleOpenModal}/>
                </Animated.View>

                <SelectCountry modalVisible={modalVisible} scaleValue={scaleValue}
                               handleSelectCountryModal={handleSelectCountryModal}/>

                <StatusBar style="auto"/>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    row: {height: 40, paddingHorizontal: 16, marginVertical: 10, flexDirection: 'row'},
    title: {fontFamily: 'Silkscreen_400Regular', fontSize: 24},
    name: {fontFamily: 'Silkscreen_400Regular', fontSize: 24},
    currency: {fontFamily: 'Silkscreen_400Regular', fontSize: 34, width: '100%', textAlign: 'right'},
});

export default App;
