import { StyleSheet, Text, View, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import HeaderWhite from '../../components/header/headerWhite'
import { Color, FontConfig } from '../../theme'
import ImageExample from '../../assets/images/example/Bonar.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
import IconFacebook from '../../assets/images/icon/icon_facebook.png';
import IconTwitter from '../../assets/images/icon/icon_twitter.png';
import IconTiktok from '../../assets/images/icon/icon_tiktok.png';
import IconInstagram from '../../assets/images/icon/icon_instagram.png';
import SimpatisanServices from '../../services/simpatisan'
import { useFocusEffect } from '@react-navigation/native'
import UserAvatar from 'react-native-avatar-generator';

const DetailSimpatisanScreen = ({navigation, route}) => {
    const {id} = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [dataSimpatisan, setDataSimpatisan] = useState([]);

    const RowItem = ({subject, text}) => {
        return(
            <View style={styles.rowContent}>
                <Text style={styles.subjectContent}>{subject}</Text>
                <View style={{width: 10}}></View>
                <Text style={styles.textContent}>{text}</Text>
            </View>
        )
    }

    const MediaSosialItem = ({image, username}) => {
        return(
        <View style={{flexDirection: 'row'}}>
            <Image source={image} style={{width: 18, height: 18}} />
            <View style={{width: 5}}></View>
            <Text style={styles.textContent}>{username}</Text>
        </View>)
    }

    const handleEdit = () => {
        const data = dataSimpatisan[0];
        const firstname = data.nama_lengkap.split(" ")[0];
        const lastname = data.nama_lengkap.split(" ")[1];

        navigation.navigate("EditSimpatisan", {Foto : data.foto, Firstname: firstname, Lastname : lastname, 
            Phone : data.nomor_ponsel, Instagram : data.sosmed_instagram, Tiktok : data.sosmed_tiktok,
             Facebook: data.sosmed_fb, Twitter: data.sosmed_twitter, 
            Provinsi : data.provinsi, Id_provinsi: data.id_provinsi, Kota : data.kabkot, Id_kota: data.id_kabkot, Id_kecamatan: data.id_kecamatan, Kecamatan : data.kecamatan, Capres : data.preferensi_capres,
             AlasanSuka:data.alasan_preferensi_capres, CapresTidakSuka: data.capres_tidak_suka,
              AlasanTidakSuka: data.alasan_capres_tidak_suka, id: id, tanggal_lahir: data.tanggal_lahir, jenis_kelamin: data.jenis_kelamin});
    }

    const getDetailSimpatisan = () => {
        setIsLoading(true);
        SimpatisanServices.getDetailSimpatisan(id)
        .then(res=>{
            console.log(res.data.data);
            setDataSimpatisan(res.data.data);
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err.response);
        })
    }

    useFocusEffect(
        React.useCallback(() => {
            getDetailSimpatisan();
        }, [])
      );

  return (
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
      <HeaderWhite title="Detail Kawan" navigation={navigation} />
      {dataSimpatisan.length != 0 ? <ScrollView>
        <View style={{alignItems: 'center', padding: 10, backgroundColor: Color.neutralZeroOne}}>
            {dataSimpatisan[0].foto != "" ? <Image source={{uri: `data:image/png;base64,${dataSimpatisan[0].foto}`}} style={{width: 100, height: 100, borderRadius: 66}} /> : 
            <UserAvatar
            size={100}
            fontWeight="bold"
            color="#FFFFFF"
            backgroundColor={Color.redOne}
            firstName={dataSimpatisan[0].nama_lengkap.split(" ")[0]}
            lastName={dataSimpatisan[0].nama_lengkap.split(" ")[1]}
          />
            }
            <View style={{height: 12}}></View>
            <Pressable onPress={handleEdit} style={styles.buttonEdit}>
                <Text style={{...FontConfig.bodyThree, color: '#000000'}}>Edit</Text>
                <View style={{width: 2}}></View>
                <Ionicons name="chevron-forward-outline" color="#000000" size={14} />
            </Pressable>
        </View>

        <View style={styles.container}>
            {/**Data pribadi */}
            <Text style={styles.titleContain}>Data Pribadi</Text>
            <View style={{height: 5}}></View>
            <RowItem subject="Nama Lengkap" text={dataSimpatisan[0].nama_lengkap} />
            <RowItem subject="Nomor Ponsel" text={dataSimpatisan[0].nomor_ponsel} />
            <RowItem subject="Jenis Kelamin" text={dataSimpatisan[0].jenis_kelamin} />
            <RowItem subject="Tanggal Lahir" text={dataSimpatisan[0].tanggal_lahir} />
            <View style={{height: 15}}></View>
            {/**Media Sosial */}
            <Text style={styles.titleContain}>Media Sosial</Text>
            <View style={{height: 15}}></View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', columnGap: 30, rowGap: 10}}>
                {dataSimpatisan[0].sosmed_fb != "" ? <MediaSosialItem image={IconFacebook} username={dataSimpatisan[0].sosmed_fb} /> : <></>}
                {dataSimpatisan[0].sosmed_instagram != "" ? <MediaSosialItem image={IconInstagram} username={dataSimpatisan[0].sosmed_instagram} /> : <></>}
                {dataSimpatisan[0].sosmed_tiktok != "" ? <MediaSosialItem image={IconTiktok} username={dataSimpatisan[0].sosmed_tiktok} /> : <></>}
                {dataSimpatisan[0].sosmed_twitter != "" ? <MediaSosialItem image={IconTwitter} username={dataSimpatisan[0].sosmed_twitter} /> : <></>}
            </View>
            <View style={{height: 20}}></View>
            {/**Domisili */}
            <Text style={styles.titleContain}>Domisili</Text>
            <View style={{height: 10}}></View>
            <RowItem subject="Provinsi" text={dataSimpatisan[0].provinsi} />
            <RowItem subject="Kab/Kota" text={dataSimpatisan[0].kabkot} />
            <RowItem subject="Kecamatan" text={dataSimpatisan[0].kecamatan} />
            <View style={{height: 15}}></View>

            <View style={styles.garis}></View>

            {/**Preferensi Capres */}
            <View style={{height: 15}}></View>
            <Text style={styles.titleContain}>Preferensi Capres</Text>
            <View style={{height: 10}}></View>
            <Text style={styles.subjectContent}>Capres yang disuka</Text>
            <View style={{height: 5}}></View>
            <Text style={styles.textContent}>{dataSimpatisan[0].preferensi_capres}</Text>
            <View style={{height: 10}}></View>
            <Text style={styles.subjectContent}>Alasan : </Text>
            <View style={{height: 5}}></View>
            <Text style={styles.textContent}>{dataSimpatisan[0].alasan_preferensi_capres}</Text>
            <View style={{height: 10}}></View>
            <Text style={styles.subjectContent}>Capres yang tidak disuka</Text>
            <View style={{height: 5}}></View>
            <Text style={styles.textContent}>{dataSimpatisan[0].capres_tidak_suka}</Text>
            <View style={{height: 10}}></View>
            <Text style={styles.subjectContent}>Alasan : </Text>
            <View style={{height: 5}}></View>
            <Text style={styles.textContent}>{dataSimpatisan[0].alasan_capres_tidak_suka}</Text>
        </View>
      </ScrollView> : <View style={{flex: 1, marginTop: '40%'}}><ActivityIndicator size="large" color={Color.graySix} /></View>}
    </View>
  )
}

export default DetailSimpatisanScreen

const styles = StyleSheet.create({
    buttonEdit: {
        backgroundColor: Color.neutralZeroOne,
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderColor: Color.graySix
    },
    container: {
        padding: 20
    },
    titleContain: {
        ...FontConfig.titleThree,
        color: '#000000'
    },
    rowContent: {
        flexDirection: 'row',
        marginVertical: 5
    },
    subjectContent: {
        ...FontConfig.bodyTwo,
        color: '#757575'
    },
    textContent: {
        ...FontConfig.bodyTwo,
        color: '#000000'
    },
    garis: {
        borderBottomWidth: 1,
        borderColor: '#E0E0E0'
    }
})