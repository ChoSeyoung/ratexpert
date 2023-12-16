import {Animated, Button, Modal, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import HorizontalLine from "../components/HorizontalLine";

const SelectCountry = (props) => {
    const {modalVisible, scaleValue, handleSelectCountryModal} = props;

    const handleCloseModal = () => {
        // 모달을 닫기
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true
        }).start();
        handleSelectCountryModal(false);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCloseModal}
        >
            <SafeAreaView style={styles.modalView}>
                <View style={styles.modalTitleWrapper}>
                    <Text style={styles.modalTitle}>통화 국가 선택</Text>
                </View>
                <ScrollView>
                    <Button title="Close" onPress={handleCloseModal} />
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalTitleWrapper: {
        paddingVertical: 16
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default SelectCountry;