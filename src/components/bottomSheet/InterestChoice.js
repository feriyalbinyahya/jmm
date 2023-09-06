import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../customButton';

const InterestChoice = ({item, setItem, setModalVisible, data, id, setId}) => {
    const [onSelect, setOnSelect] = useState(item);
    const [idSelect, setIdSelect] = useState(id);

      handleSelected = (item, id) => {
        setOnSelect(item);
        setIdSelect(id);
      }

      handlePilih = () => {
        if(onSelect != ''){
            setItem(onSelect);
            setId(idSelect);
            setModalVisible(false);
        }
      }

      const Item = ({text, id}) => (
        <Pressable onPress={()=> {handleSelected(text, id);}}>
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
      renderItem={({item}) => <Item text={item.nama} id={item.id}/>}
      keyExtractor={item => item.id}
       />
       <View style={{marginTop: 5}}>
            <CustomButton onPress={handlePilih} height={44} text='Pilih' backgroundColor={Color.primaryMain} fontStyles={styles.textPilih} />
        </View>
    </View>
  )
}

export default InterestChoice

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
        ...FontConfig.bodyOne,
        color: Color.title
    },
    textPilih : {
        ...FontConfig.buttonOne, 
        color: 'white'},
});