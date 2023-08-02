import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../customButton';

const GenderChoice = ({gender, setGender, setModalVisible}) => {
    const [onSelect, setOnSelect] = useState(gender);

    const DATA = [
        {
          id: '1',
          gender: 'Perempuan',
        },
        {
          id: '2',
          gender: 'Laki-laki',
        },
      ];

      handleSelected = (item) => {
        setOnSelect(item);
      }

      handlePilih = () => {
        if(onSelect != ''){
            setGender(onSelect);
            setModalVisible(false);
        }
      }

      const Item = ({text}) => (
        <Pressable onPress={()=> {handleSelected(text);}}>
            <View style={text === onSelect? styles.selected : styles.unSelected}>
                <Text style={styles.title}>{text}</Text>
                {text=== onSelect? <Ionicons name="radio-button-on" color={Color.primaryMain} size={22} /> 
                : <Ionicons name="radio-button-off" color={Color.secondaryText} size={22} />}
            </View>
        </Pressable>
      );
  return (
    <View>
      <FlatList
      data={DATA}
      renderItem={({item}) => <Item text={item.gender}/>}
      keyExtractor={item => item.id}
       />
       <View style={{marginTop: 5}}>
            <CustomButton onPress={handlePilih} height={44} text='Pilih' backgroundColor={Color.primaryMain} fontStyles={styles.textPilih} />
        </View>
    </View>
  )
}

export default GenderChoice

const styles = StyleSheet.create({
    unSelected: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    selected: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Color.neutralZeroThree
    },
    title: {
        ...FontConfig.titleThree,
        color: Color.title
    },
    textPilih : {
        ...FontConfig.buttonOne, 
        color: 'white'},
});