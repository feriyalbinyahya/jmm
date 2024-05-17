import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../customButton';
import IconStar from '../../assets/images/icon/icon_star.png';

const StarChoice = ({item, setItem, setModalVisible, data}) => {
    const [onSelect, setOnSelect] = useState(item);

      handleSelected = (item) => {
        setOnSelect(item);
      }

      handlePilih = () => {
        if(onSelect != ''){
            setItem(onSelect);
            setModalVisible(false);
        }
      }

      const Item = ({item}) => {
        return (
        <Pressable onPress={()=> {handleSelected(item.length);}}>
            <View style={item.length === onSelect? styles.selected : styles.unSelected}>
                <View style={{flexDirection: 'row'}}>
                    {item.map((item, index)=>{
                        return (
                            <Image key={index} source={IconStar} style={{width: 20, height: 20}} />
                        )
                    })}
                    <Text style={{paddingHorizontal: 10, color: Color.neutralZeroSix, ...FontConfig.buttonZeroTwo}}>{`(${item.length})`}</Text>
                </View>
                {item.length=== onSelect? <Ionicons name="radio-button-on" color={Color.primaryMain} size={22} /> 
                : <Ionicons name="radio-button-off" color={Color.secondaryText} size={22} />}
            </View>
        </Pressable>
      );
    }
  return (
    <View>
      <FlatList
      data={data}
      renderItem={({item}) => <Item item={item}/>}
       />
       <View style={{marginTop: 5}}>
            <CustomButton onPress={handlePilih} height={44} text='Pilih' backgroundColor={Color.primaryMain} fontStyles={styles.textPilih} />
        </View>
    </View>
  )
}

export default StarChoice

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
        ...FontConfig.bodyOne,
        color: Color.title
    },
    textPilih : {
        ...FontConfig.buttonOne, 
        color: 'white'},
});