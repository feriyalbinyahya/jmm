import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { Color, FontConfig } from '../../theme';

const CustomSelect = ({value, setValue, data, title, labelField, valueField, search=true}) => {
    const [isFocus, setIsFocus] = useState(false);
  return (
    <View>
      <Dropdown
            style={[styles.dropdown, (isFocus || value != '') && { borderColor: Color.neutralZeroSeven }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search={search}
            maxHeight={300}
            labelField={labelField}
            valueField={valueField}
            placeholder={`Pilih ${title}`}
            searchPlaceholder="Cari..."
            value={value}
            itemTextStyle={{...FontConfig.bodyTwo, color: '#262626'}}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
            setValue(item[valueField]);
            setIsFocus(false);
            }}
        />
    </View>
  )
}

export default CustomSelect

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
      },
      dropdown: {
        height: 50,
        borderColor:  Color.lightBorder,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
        color: Color.neutralZeroSix
      },
      selectedTextStyle: {
        ...FontConfig.bodyTwo,
        color: Color.primaryText
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
})