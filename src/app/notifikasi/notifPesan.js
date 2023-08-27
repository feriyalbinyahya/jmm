import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { height } from '../../assets/constants'
import { Color, FontConfig } from '../../theme';
import NotifItem from '../../components/notifItem';
import NotifikasiServices from '../../services/notifikasi';
const NotifikasiPesan = ({terpilih, setTerpilih, allChecked=false, setAllChecked, setJumlah, onPressNotif}) => {
    const [dataPesan, setDataPesan] = useState([]);
    const renderLoader = () => {
        return(
          <View style={styles.loaderStyle}>
              <ActivityIndicator size="small" color={Color.graySix} />
          </View>
        );
    }

    const getDataPesan = () => {
        NotifikasiServices.getPesan()
        .then(res=>{
            console.log(res.data.data);
            setJumlah(res.data.data.length);
            setDataPesan(res.data.data);
        })
        .catch(err=>{
            console.log(err.response.message);
        })
    }

    useEffect(()=>{
        getDataPesan();
    },[])

  return (
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
        {dataPesan.length != 0 ?<FlatList
            data={dataPesan} 
            renderItem={({item}) => <NotifItem onPressNotif={onPressNotif} setAllChecked={setAllChecked} allChecked={allChecked} item={item} terpilih={terpilih} setTerpilih={setTerpilih} />}
            //ListFooterComponent={renderLoader}
            style={styles.flatlistStyle}
        /> : <></>}
    </View>
  )
}

export default NotifikasiPesan

const styles = StyleSheet.create({
    flatlistStyle: {
        height: height/1.5,
    },
    notifContainer: {
        padding: 20,
        borderColor: Color.lightBorder,
        borderWidth: 0.5,
        backgroundColor: Color.grayTwo
    },
    boxType: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: Color.redOne,
        borderColor: Color.primaryMain,
        borderWidth: 1,
        alignSelf: 'baseline',
        alignItems: 'center'
    },
    textTitle: {
        ...FontConfig.titleThree,
        color: '#000000'
    },
    textType: {
        ...FontConfig.captionOne,
        color: Color.primaryMain
    },
    textDeskripsi: {
        ...FontConfig.bodyThree,
        color: Color.primaryText
    },
})