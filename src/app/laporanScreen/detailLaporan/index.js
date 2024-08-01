import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../../theme'
import HeaderWhite from '../../../components/header/headerWhite'
import Swiper from 'react-native-swiper'
import LaporanImage from '../../../assets/images/example/laporan.png'
import LaporanServices from '../../../services/laporan'
import { useSelector } from 'react-redux'
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import { formatTimeByOffset } from '../../../utils/Utils';
import CustomButton from '../../../components/customButton'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomBottomSheet from '../../../components/bottomSheet'
import { useFocusEffect } from '@react-navigation/native'


const DetailLaporanScreen = ({navigation, route}) => {
    const {id} = route.params;
    const [dataDetail, setDataDetail] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [media, setMedia] = useState([]);
    const [tipe, setTipe] = useState("");
    const [status, setStatus] = useState("Diterima");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const idRelawan = useSelector((state)=>{
        return state.credential.idRelawan;
    })

      const deviceTimeZone = RNLocalize.getTimeZone();
      const [convertedDate, setConvertedDate] = useState("");
  
      // Make moment of right now, using the device timezone
      const today = moment().tz(deviceTimeZone);
  
      // Get the UTC offset in hours
      const currentTimeZoneOffsetInHours = today.utcOffset() / 60;

    const getLaporanDetail = () => {
        setIsLoading(true);
        LaporanServices.getDetail(id)
        .then(res=>{
            console.log(res.data.data)
            setDataDetail(res.data.data);
            setMedia(res.data.data.foto_kegiatan);
            setStatus(res.data.data.status_laporan)
            setTipe(res.data.data.tipe_laporan)
            const convertedToLocalTime = formatTimeByOffset(
                res.data.data.tanggal_dibuat,
                currentTimeZoneOffsetInHours,
              );
            setConvertedDate(convertedToLocalTime);
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err.response);
            setIsLoading(false);
        })
    }

    const handleHapus = () => {
        LaporanServices.deleteLaporan(id)
        .then(res=>{
            console.log(res.data);
            if(res.data.message == "Berhasil menghapus laporan."){
                
            }
        })
        .catch(err=>{
            console.log(err.response);
        })
        navigation.goBack();
    }

    const DeleteView = () => {
        const textHapus = "Laporan akan dihapus secara permanen dan tidak dapat dikembalikan, pastikan anda yakin jika ingin hapus laporan"
        return(
            <View>
                <View style={{alignItems: 'center'}}> 
                    <Text style={{...FontConfig.titleFour, color: Color.primaryText, marginVertical: 5}}>Yakin Hapus Laporan ?</Text>
                    <Text style={{...FontConfig.bodyFour, color: Color.neutral70, textAlign: 'center',
                        marginVertical: 5
                    }}>{textHapus}</Text>
                </View>
                <View style={{flexDirection: 'row', paddingHorizontal: 10, width: '100%', justifyContent: 'center', marginVertical: 10}}>
                    <CustomButton onPress={handleHapus} text={`Hapus`} backgroundColor={Color.neutralZeroOne} borderColor={Color.danger} borderWidth={1}
                    width='45%' height={40} fontStyles={{...FontConfig.buttonZeroOne, color: Color.danger}} />
                    <View style={{width: '5%'}}></View>
                    <CustomButton onPress={()=>setIsModalVisible(false)} text={`Batal`} backgroundColor={Color.neutralZeroOne} borderColor={Color.neutral70} borderWidth={1}
                    width='45%' height={40} fontStyles={{...FontConfig.buttonZeroOne, color: Color.primaryText}} />
                </View>
            </View>
        )
    }

    useFocusEffect(
        React.useCallback(() => {
          getLaporanDetail();
        }, [])
      );
    return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
        <CustomBottomSheet 
      isModalVisible={isModalVisible}
      setModalVisible={setIsModalVisible}
      title={``}
      children={<DeleteView />}
      />
      <HeaderWhite navigation={navigation} title="Detail Laporan" rightChild={status != "Diterima" && status != "Ditolak" && dataDetail.id_pelapor.includes(idRelawan) ? <Pressable
      onPress={()=>setIsModalVisible(true)}><Ionicons name="trash-outline" color={Color.danger} size={22} /></Pressable> : <></>} />
      {!isLoading ? <><Swiper activeDotColor={Color.purple} style={{height: '100%'}}>
        {media.map((item, index)=>{
            return (
                <View key={index} style={{paddingHorizontal: '20%'}}><Image style={styles.imageLaporan} source={{uri: `data:image/png;base64,${item}`}} /></View>
            )
        })}
      </Swiper>
      <View style={{height: 10}}></View>
      <ScrollView style={{paddingHorizontal: 20, height: '33%'}}>
        <View style={{height: 10}}></View>
        <Text style={{...FontConfig.titleThree, color:Color.hitam}}>Detail Laporan</Text>
        <View style={{height: 10}}></View>
        <Text style={styles.textSubject}>Kategori</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{
        color: '#4644D4',
        ...FontConfig.bodyTwo,
        marginVertical: 3,
        textAlign: 'justify'}}>{(tipe).split(" ")[1]}</Text>
            <Text style={{paddingHorizontal: 5}}>~</Text>
            <Text style={styles.textContent}>{dataDetail.tahapan}</Text>
        </View>
        <View style={{height: 10}}></View>
        <Text style={styles.textSubject}>Tanggal dibuat</Text>
        <Text style={styles.textContent}>{convertedDate}</Text>
        <View style={status == "Diterima" ? styles.boxSuccess : status == "Ditolak" ? styles.boxDitolak : styles.boxMenunggu}>
            <Text style={status == "Diterima" ? styles.textSuccess : status == "Ditolak" ? styles.textDitolak : styles.textMenunggu}>{status}</Text>
        </View>
        {status == "Ditolak" ?
            <View style={{backgroundColor: Color.redOne, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 15, marginTop: 5, marginBottom: 15}}>
                <Text style={{...FontConfig.title5, color: '#0A0A0A'}}>Alasan Ditolak</Text>
                <Text style={{...FontConfig.captionZero, color: '#757575',
                    textAlign: 'justify', width: '100%', marginTop: 3
                }}>{dataDetail.alasan_penolakan}</Text>
            </View> : <></>
        }
        <Text style={styles.textSubject}>Judul Laporan</Text>
        <Text style={styles.textContent}>{dataDetail.judul}</Text>
        <View style={{height: 10}}></View>
        <Text style={styles.textSubject}>Deskripsi</Text>
        <Text style={styles.textContent}>{dataDetail.deskripsi}</Text>
        <View style={{height: 10}}></View>
        <Text style={styles.textSubject}>Dokumen</Text>
        {dataDetail.nama_dokumen != "" && dataDetail.nama_dokumen != null ? <Text style={styles.textDokumen}>{dataDetail.nama_dokumen }</Text> :
        <Text>-</Text>
        }
        <Text style={styles.textSubject}>Lokasi</Text>
        <Text style={styles.textContent}>{dataDetail.geotagging_alamat}</Text>
        <View style={{height: 10}}></View>
        <Text style={styles.textSubject}>Saran/Umpan Balik</Text>
        <Text style={styles.textContent}>{dataDetail.saran != "" && dataDetail.saran != null ? dataDetail.saran : "-"}</Text>
        <View style={{height: 10}}></View>
        <View style={{height: 80}}></View>
      </ScrollView>
      {status != "Diterima" && status != "Ditolak" && dataDetail.id_pelapor.includes(idRelawan) ? <View style={styles.bottomSection}>
            <View style={styles.buttonContinue}><CustomButton 
            text="Ubah Laporan" backgroundColor={Color.primaryMain} onPress={()=>navigation.navigate("UbahLaporan", {
                jenisLaporan: 1, typeLaporan: dataDetail.tipe_laporan.split(" ")[1], id: dataDetail.id_csr_laporan,
                alamat: dataDetail.geotagging_alamat, long: dataDetail.geotagging_longlat.split(", ")[0],
                lat: dataDetail.geotagging_longlat.split(", ")[1], title: dataDetail.judul, nama_dokumen: dataDetail.nama_dokumen,
                umpan_balik: dataDetail.saran, desc: dataDetail.deskripsi, tahapan: dataDetail.tahapan, file_dokumen: dataDetail.file_dokumen,
                foto_kegiatan: dataDetail.foto_kegiatan
            })}
            height={40} fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}} /></View>
        </View> : <></>}
      </> : 
      <View style={{height: '60%', justifyContent: 'center'}}><ActivityIndicator size="large" color={Color.grayEight} /></View>
      }
    </View>
  )
}

export default DetailLaporanScreen

const styles = StyleSheet.create({
    textSuccess: {
        color: Color.successMain,
        ...FontConfig.bodyThree
    },
    textDitolak: {
        color: Color.danger,
        ...FontConfig.bodyThree
    },
    textMenunggu: {
        color: Color.warning,
        ...FontConfig.bodyThree
    },
    boxSuccess: {paddingVertical: 8, marginVertical: 10, paddingHorizontal: 20,  borderWidth: 1, borderColor: Color.successMain, 
        alignSelf: 'baseline', borderRadius: 24, backgroundColor: '#F0FFF3'},
    boxDitolak: {paddingVertical: 8, marginVertical: 10, paddingHorizontal: 20,  borderWidth: 1, borderColor: Color.danger, 
        alignSelf: 'baseline', borderRadius: 24, backgroundColor: Color.redOne},
    boxMenunggu: {paddingVertical: 8, marginVertical: 10, paddingHorizontal: 20,  borderWidth: 1, borderColor: Color.warning, 
        alignSelf: 'baseline', borderRadius: 24, backgroundColor: Color.warningSurface},
    textSubject: {
        ...FontConfig.bodyTwo,
        color:Color.neutralZeroSeven
    },
    textContent: {
        color: Color.hitam,
        ...FontConfig.bodyTwo,
        marginVertical: 3,
        textAlign: 'justify'
    },
    textDokumen: {
        color: Color.blue,
        ...FontConfig.bodyTwo,
        marginVertical: 3,
        textAlign: 'justify',
        textDecorationLine: 'underline'
    },
    imageLaporan: {
        height: '100%',
        width: '100%'
    },
    bottomSection: {
        backgroundColor: Color.neutralZeroOne,
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowOpacity: 1,
        shadowOffset: {width: 2, height: 4},
        shadowRadius: 3,
        shadowColor: 'black',
        elevation: 10,
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    buttonContinue: {
        borderRadius: 20, 
        width: '80%',
    },
})