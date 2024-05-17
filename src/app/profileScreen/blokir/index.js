import { FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderRed from '../../../components/header/headerRed'
import { Color, FontConfig } from '../../../theme'
import ProfileServices from '../../../services/profile'
import ImageServices from '../../../services/getImage'
import AwesomeAlert from 'react-native-awesome-alerts'
import IconEmpty from '../../../assets/images/warning/empty2.png'

const ListBlokirScreen = ({navigation}) => {
    const subtitle = "Daftar pengguna yang anda blokir, anda dapat membuka blokiran dengan tekan tombol “Buka Blokir”";
    const [listPengguna, setListPengguna] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showAlertUnblock, setShowAlertUnblock] = useState(false);
    const [idUnblock, setIdUnblock] = useState();

    const getListPengguna = () => {
        setIsLoading(true);
        ProfileServices.getListBlokir()
        .then(res=>{
            console.log(res.data.data);
            setListPengguna(res.data.data);
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err.response);
        })
    }

    const unblockUser = () => {
        ProfileServices.unblockPerson(idUnblock)
        .then(res=>{
            console.log(res.data);
            getListPengguna();
            setShowAlertUnblock(false);
        })
        .catch(err=>{
            console.log(err.response);
        })
    }

    const onRefresh =  () => {
        setRefreshing(true);
        getListPengguna();
        setRefreshing(false);
    }

    const handleUnblock = (id) => {
        setIdUnblock(id);
        setShowAlertUnblock(true);
    }

    const UserItem = ({image, nama, id}) => {
        const [dataImage, setDataImage] = useState("");
        const [isLoading, setIsLoading] = useState(false);

        const getDataImage = () =>{
            setIsLoading(true);
            ImageServices.getImage("relawan", image)
            .then(res=>{
              setDataImage(res.data.data);
              setIsLoading(false);
            })
            .catch(err=>{
              console.log(err);
            })
          }
    
          useEffect(()=>{
            if(image){
                getDataImage();
            }
          }, [])
        return(
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
            borderBottomWidth: 1, borderBottomColor: Color.lightBorder, padding: 20}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={styles.imageLaporan} source={{uri: `data:image/png;base64,${dataImage}`}} />
                    <View style={{width:10}}></View>
                    <Text style={{...FontConfig.titleThree, color: Color.title}}>{nama}</Text>
                </View>
                <Pressable onPress={() => {
                    handleUnblock(id);
                }} style={{borderWidth:1, height: 33, borderColor: Color.neutralColorGrayEight,
                paddingHorizontal: 8, justifyContent: 'center',
                borderRadius: 8}}>
                    <Text style={{...FontConfig.captionMediumOne, color: Color.primaryText}}>Buka Blokir</Text>
                </Pressable>
            </View>
        )
    }

    useEffect(()=>{
        getListPengguna();
    },[])

    return (
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
      <HeaderRed title="Pengguna Diblokir" navigation={navigation} />
      <Text style={{...FontConfig.bodyThree, color: Color.title,
        padding: 20}}>{subtitle}</Text>
        {listPengguna.length == 0 ?
        <View style={{alignItems: 'center', paddingVertical: '30%', paddingHorizontal: 20}}>
            <Image style={{width: 120, height: 88}} source={IconEmpty} />
            <View style={{height: 20}}></View>
            <Text style={{...FontConfig.titleTwo, color: Color.title}}>Belum ada pengguna yang diblokir</Text>
            <Text style={{...FontConfig.bodyTwo, color: Color.secondaryText, textAlign: 'center'}}>Jika ada pengguna yang diblokir, akan tertampil disini</Text>
        </View> :
        <FlatList
        data={listPengguna}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
        style={{height: '78%'}}
        renderItem={({item}) => <UserItem id={item.id_blocked_user} image={item.foto_profil} nama={item.nama_lengkap} />
        }
        />
        }
        <AwesomeAlert
          show={showAlertUnblock}
          showProgress={false}
          title="Yakin Ingin Buka Blokir Pengguna ?"
          message="Jika anda membuka blokir pengguna, anda dapat melihat kembali aktivitas pengguna."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          confirmText="Buka Blokir"
          cancelText="Batal"
          titleStyle={{...FontConfig.titleTwo, color: Color.title}}
          messageStyle={{...FontConfig.bodyThree, color: Color.grayEight}}
          confirmButtonStyle={{backgroundColor: Color.primaryMain, width: '50%', height: '80%',  alignItems: 'center'}}
          cancelButtonStyle={{width: '40%', height: '80%',  alignItems: 'center'}}
          confirmButtonTextStyle={{...FontConfig.buttonThree}}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            unblockUser();
          }}
          onCancelPressed={()=>{
            setShowAlertUnblock(false);
          }}
        />
    </View>
  )
}

export default ListBlokirScreen

const styles = StyleSheet.create({
    imageLaporan: {
        width: 40,
        height: 40,
        borderRadius: 100
    },
})