import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../customButton';

const JenisFigurChoice = ({setModalVisible, data, navigation}) => {
    const [onSelect, setOnSelect] = useState("");

      handleSelected = (item) => {
        setOnSelect(item);
      }

      handlePilih = () => {
        if(onSelect != ''){
            setModalVisible(false);
            navigation.navigate("BuatFigur", {jenis: onSelect.toLowerCase()})
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
      data={data}
      renderItem={({item}) => <Item text={item.name}/>}
      keyExtractor={item => item.id}
       />
       <View style={{marginTop: 5}}>
            <CustomButton onPress={handlePilih} height={44} text='Pilih' backgroundColor={Color.primaryMain} fontStyles={styles.textPilih} />
        </View>
    </View>
  )
}

export default JenisFigurChoice

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
        backgroundColor: Color.redOne
    },
    title: {
        ...FontConfig.titleThree,
        color: Color.title
    },
    textPilih : {
        ...FontConfig.buttonOne, 
        color: 'white'},
});