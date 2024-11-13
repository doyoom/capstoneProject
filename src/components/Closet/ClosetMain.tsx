import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useCloset } from '../../contexts/ClosetContext';

const ClosetMain = () => {
  const { clothes } = useCloset(); // clothes 배열 가져오기
  const [availableClothes, setAvailableClothes] = useState<string[]>([]); // 선택되지 않은 옷들
  const [chosenClothes, setChosenClothes] = useState<string[]>([]); // 선택된 옷들

  // clothes 값이 변경될 때 availableClothes 초기화
  useEffect(() => {
    setAvailableClothes(clothes);
  }, [clothes]);

  const handleChooseClothes = (itemUri: string) => {
    // 선택된 옷을 availableClothes에서 제거하고 chosenClothes에 추가
    setAvailableClothes(availableClothes.filter((item) => item !== itemUri));
    setChosenClothes([...chosenClothes, itemUri]);
  };

  const handleRemoveFromChosen = (itemUri: string) => {
    // 선택된 옷을 chosenClothes에서 제거하고 availableClothes에 다시 추가
    setChosenClothes(chosenClothes.filter((item) => item !== itemUri));
    setAvailableClothes([...availableClothes, itemUri]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>YOUR CLOSET</Text>

      {/* 선택되지 않은 옷들 */}
      <View style={styles.closetContainer}>
        {availableClothes.map((itemUri, index) => (
          <TouchableOpacity key={index} onPress={() => handleChooseClothes(itemUri)}>
            <View style={styles.clothesContainer}>
              <Image source={{ uri: itemUri }} style={styles.clothesImage} />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitle}>CHOSEN CLOTHES</Text>

      {/* 선택된 옷들 */}
      <View style={styles.chosenClothesContainer}>
        {chosenClothes.map((itemUri, index) => (
          <TouchableOpacity key={index} onPress={() => handleRemoveFromChosen(itemUri)}>
            <View style={styles.chosenClothesItem}>
              <Image source={{ uri: itemUri }} style={styles.clothesImage} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  clothesContainer: {
    width: 130,
    height: 130,
    margin: 10,
  },
  clothesImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  chosenClothesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
    width: '100%',
  },
  chosenClothesItem: {
    width: 130,
    height: 130,
    margin: 10,
    borderColor: 'magenta',
    borderWidth: 2,
    borderRadius: 8,
  },
});

export default ClosetMain;