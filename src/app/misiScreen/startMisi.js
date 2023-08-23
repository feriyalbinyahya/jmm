import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, Dimensions, Linking, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, FontConfig } from '../../theme'
import HeaderRed from '../../components/header/headerRed'
import IconTime from '../../assets/images/icon/icon_time.png';
import IconDeadline from '../../assets/images/icon/icon_deadline.png';
import IconSatu from '../../assets/images/icon/icon_satu.png';
import IconDua from '../../assets/images/icon/icon_dua.png';
import IconTiga from '../../assets/images/icon/icon_tiga.png';
import IconDone from '../../assets/images/icon/icon_done.png';
import CustomButton from '../../components/customButton';
import MisiServices from '../../services/misi';
import CustomCarousel from '../../components/customCarousel';
import {AspectRatio,} from 'native-base'

const StartMisiScreen = ({navigation, route}) => {

    const {id, judul, deskripsi, startDate, deadlineDate, is_important} = route.params;
    const [stepOne, setStepOne] = useState(false);
    const [stepTwo, setStepTwo] = useState(false);
    const [stepThree, setStepThree] = useState(false);
    const [dataMisiDetail, setDataMisiDetail] = useState([]);
    const [status, setStatus] = useState(status);
    const [bisaEdit, setBisaEdit] = useState(0);
    const [alasanTolak, setAlasanTolak] = useState("");
    const [judulKegiatan, setJudulKegiatan] = useState("");
    const [konsepKegiatan, setKonsepKegiatan] = useState("");
    const [laporanKegiatan, setLaporanKegiatan] = useState([]);
    const [namaFile, setNamaFile] = useState("");
    const [kategori, setKategori] = useState([]);
    const [media, setMedia] = useState([]);
    const [namaFoto, setNamaFoto] = useState([]);
    const [perkiraanPartisipan, setPerkiraanPartisipan] = useState("");
    const [tandaiKawan, setTandaiKawan] = useState([]);
    const [namaTeman, setNamaTeman] = useState([]);
    const [tautan, setTautan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const CommandItem = ({image, title, content, subtitle, is_done}) => {
        return (
            <View style={{flexDirection: 'row', padding: 10, borderWidth: 1, 
            borderColor: Color.neutralZeroFour, borderRadius: 8, marginVertical: 10,}} >
                <Image style={{width: 30, height: 30}} source={image} />
                <View style={{width: 15}}></View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 8}}>
                  <View style={{width: '80%'}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text style={styles.textCommandTitle}>{title}</Text>
                          {subtitle ? <Text style={{...FontConfig.buttonThree, color: Color.neutralZeroSeven,
                          marginHorizontal: 5}}>{subtitle}</Text> : <></>}
                      </View>
                      <Text style={styles.textCommandContent}>{content}</Text>
                  </View>
                  {is_done ? <Image style={{width: 22, height: 22}} source={IconDone} /> : <></>}
                </View>
            </View>
        )
    }

    const handleLanjutkan = () => {
      navigation.navigate("FormMisi",{id : id, judul_kegiatan: judulKegiatan, konsep_kegiatan: konsepKegiatan, 
        laporan_kegiatan: laporanKegiatan, media: media, nama_foto: namaFoto, nama_file: namaFile, link: tautan, 
        perkiraan_partisipan: perkiraanPartisipan, tandai_kawan: tandaiKawan, nama_teman: namaTeman});
    }

    const getMisiDetail = () => {
      setIsLoading(true);
      MisiServices.getMisiDetail(id)
      .then(res=>{
        console.log(res.data.data[0]);
        setDataMisiDetail(res.data.data);
        setStatus(res.data.data[0].status_konfirmasi);
        if(res.data.data[0].status_konfirmasi == "Belum Selesai"){
          //check step one
          if(res.data.data[0].judul_kegiatan != "" && res.data.data[0].konsep_kegiatan != "" && res.data.data[0].laporan_kegiatan.length != 0){
            setStepOne(true);
          }
          if(res.data.data[0].media.length != 0 && res.data.data[0].tautan.length != 0){
            setStepTwo(true);
          }
          if(res.data.data[0].perkiraan_partisipan != "" && res.data.data[0].tandai_kawan.length != 0){
            setStepThree(true);
          }
        }else if(res.data.data[0].status_konfirmasi == "Ditolak"){
          setBisaEdit(res.data.data[0].bisa_edit);
          setAlasanTolak(res.data.data[0].alasan_tolak);
        }
        setJudulKegiatan(res.data.data[0].judul_kegiatan);
        setKonsepKegiatan(res.data.data[0].konsep_kegiatan);
        if(res.data.data[0].laporan_kegiatan.length != 0){
          setLaporanKegiatan(res.data.data[0].laporan_kegiatan[0]);
          setNamaFile(res.data.data[0].laporan_kegiatan[0].media);
        }
        
        let tempNamaFoto = [];
        let tempBase64 = [];
        for(var i=0; i<res.data.data[0].media.length; i++){
          tempNamaFoto.push(res.data.data[0].media[i].media);
          tempBase64.push(res.data.data[0].media[i].base64_information);
        }
        setNamaFoto(tempNamaFoto);
        console.log(tempBase64);
        setMedia(tempBase64);
        let tempTautan = [];
        for(var i=0; i<res.data.data[0].tautan.length; i++){
          tempTautan.push(res.data.data[0].tautan[i].tautan);
        }
        setTautan(tempTautan);
        setPerkiraanPartisipan(res.data.data[0].perkiraan_partisipan);
        let tempNamaTeman = [];
        let tempIdTeman = [];
        for(var i=0; i<res.data.data[0].tandai_kawan.length; i++){
          tempIdTeman.push(res.data.data[0].tandai_kawan[i].id);
          tempNamaTeman.push(res.data.data[0].tandai_kawan[i].nama);
        }
        setTandaiKawan(tempIdTeman);
        setNamaTeman(tempNamaTeman);
        setIsLoading(false);
      })
      .catch(err=>{
        console.log(err.response.data.message);
        setIsLoading(false);
        if(err.response.data.message == "Tidak ada misi dengan id tersebut."){
          setStatus("Misi Aktif");
        }
      })
    }

    const InfoItem = ({judul, content}) => {
      return(
        <View style={{marginBottom: 10}}>
          <Text style={{...FontConfig.bodyThree, color: Color.neutralZeroSeven}}>{judul}</Text>
          <View style={{height: 2}}></View>
          <Text style={{...FontConfig.bodyTwo, color: Color.hitam}}>{content}</Text>
        </View>
      )
    }

    const FotoView = ({data, size}) => {
      return (
          <>
          {data?.map((item, index)=> {
              return(
                  <View key={index} style={{width: size, marginHorizontal: 10}}>
                    <AspectRatio w="100%" ratio={16 / 9}>
                      <Image source={{uri: item}} />
                    </AspectRatio>
                  </View>
              )
            })}
          </>
      )
  }
  const width = Dimensions.get('window').width;

    useEffect(()=>{
      getMisiDetail();
    }, [])

  return (
    <View style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
      <HeaderRed navigation={navigation} title="Misi" />
      {!isLoading ? <ScrollView style={{ flex: 1}}>
        <View style={{padding: 20}}>
          <Text style={is_important ? styles.textMisiSangatPenting : styles.textMisi}>{is_important ?
          `MISI SANGAT PENTING` : `MISI`}</Text>
          <View style={{height: 10}}></View>
          <Text style={{...FontConfig.titleOne, color: Color.neutralTen}}>{judul}</Text>
          <View style={{height: 10}}></View>
          <Text style={{...FontConfig.bodyTwo, width: '90%', color: Color.neutralZeroSeven}}>{deskripsi}</Text>
          <View style={{height: 10}}></View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={{width: 16, height: 16}} source={IconTime} />
              <View style={{width: 4}}></View>
              <Text style={{...FontConfig.bodyThree, color: Color.neutralZeroSeven}}>{`Misi dibuat : `}</Text>
              <Text style={{...FontConfig.buttonThree, color: Color.neutralZeroSeven}}>{startDate}</Text>
          </View>
          <View style={{height: 5}}></View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={{width: 16, height: 16}} source={IconDeadline} />
              <View style={{width: 4}}></View>
              <Text style={{...FontConfig.bodyThree, color: Color.neutralZeroSeven}}>{`Batas waktu : `}</Text>
              <Text style={{...FontConfig.buttonThree, color: Color.danger}}>{deadlineDate}</Text>
          </View>
          <View style={{height: 10}}></View>

          {/** Konsep kegiatan */}
          {status == "Misi Aktif" || status == "Belum Selesai" || bisaEdit== "1" || bisaEdit == 1 ? <>
          {status == "Ditolak" ? <View style={{paddingHorizontal: 15, paddingVertical: 10, marginBottom: 10, backgroundColor: '#FFEBEE', borderRadius: 8}}>
            <Text style={{...FontConfig.titleFour, color: Color.neutralTen}}>Alasan Ditolak</Text>
            <View style={{height: 2}}></View>
            <Text style={{...FontConfig.bodyThree, color: Color.neutralZeroSeven}}>{alasanTolak}</Text>
          </View> : <></>}
          <CommandItem is_done={stepOne} image={IconSatu} content={`Konsep dapat dijelaskan dalam kolom deskripsi dan (jika ada) lampirkan pada dokumen`}
          title="Siapkan Konsep Kegiatan" />
          <CommandItem is_done={stepTwo} image={IconDua} content={`Bukti dapat berupa foto atau video`}
          title="Lampirkan Bukti Kegiatan" />
          <CommandItem is_done={stepThree} image={IconTiga} content={`Masukan perkiraan partisipan dan tandai keikutsertaan kawan yang telah kamu daftar`}
          title="Partisipan" subtitle={`(Opsional)`} /></> : 

          
          <View >
            {/** MISI DETAIL */}
            <View style={{paddingHorizontal: 15, paddingVertical: 3, alignSelf: 'baseline', borderRadius: 24,
              backgroundColor: status == "Terkirim" ? Color.blue : status == "Diterima" ? Color.successMain : Color.danger}}>
              <Text style={{...FontConfig.captionOne, color: Color.neutralZeroOne}}>{status}</Text>
            </View>
            <View style={{height: 20}}></View>
            <View style={{paddingVertical: 10}}>
              <Text style={{...FontConfig.titleThree, color: Color.neutralTen}}>Tentang kegiatan</Text>
              <View style={{height: 10}}></View>
              <InfoItem judul="Judul Kegiatan" content={judulKegiatan} />
              <InfoItem judul="Konsep Kegiatan" content={konsepKegiatan} />
              <InfoItem judul="Laporan Kegiatan" content={namaFile} />
            </View>
            <View style={styles.garis}></View>
            <View style={{paddingVertical: 10}}>
              <Text style={{...FontConfig.titleThree, color: Color.neutralTen}}>Bukti kegiatan</Text>
              <View style={{height: 10}}></View>
              <Text style={{...FontConfig.bodyThree, color: Color.neutralZeroSeven}}>Foto</Text>
              <View style={{height: 15}}></View>
              <CustomCarousel children={<FotoView data={media} size={width*0.6}  />}  size={width*0.5}/>
              <View style={{height: 15}}></View>
              <Text style={{...FontConfig.bodyThree, color: Color.neutralZeroSeven}}>Tautan</Text>
              {tautan.map((item, index)=>{
                return(
                  <Pressable key={index} onPress={()=>Linking.openURL(`https://${item}`)}><Text style={{...FontConfig.linkOne, color: '#1989C8', textDecorationLine: 'underline'}}>{item}</Text></Pressable>
                )
              })}
            </View>
            <View style={styles.garis}></View>
            <View style={{paddingVertical: 10}}>
              <Text style={{...FontConfig.titleThree, color: Color.neutralTen}}>Partisipan</Text>
              <View style={{height: 10}}></View>
              <InfoItem judul="Perkiraan Partisipan" content={perkiraanPartisipan} />
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>{namaTeman.map((item, index)=> {
                  if(index == namaTeman.length-1){
                      return(
                          <Text key={index} style={{...FontConfig.bodyTwo, color: Color.hitam}}>{item}</Text>
                      )
                  }else{
                  return(
                      <Text key={index} style={{...FontConfig.bodyTwo, color: Color.hitam}}>{`${item}, `}</Text>
                  )}
              })}</View>
            </View>
          </View>
          
          }
        </View>
      </ScrollView> : <View style={{height: '60%', justifyContent: 'center'}}><ActivityIndicator size="large" color={Color.neutralTen} /></View>}
      {!isLoading ? status == "Belum Selesai" || status == "Misi Aktif" || bisaEdit == "1" || bisaEdit == 1 ? <View style={styles.bottomSection}>
          <View style={styles.buttonContinue}>
            {bisaEdit == "1" || bisaEdit == 1 ? 
                <CustomButton
                onPress={handleLanjutkan} 
                borderColor={Color.danger}
                borderWidth={1}
                fontStyles={{...FontConfig.buttonOne, color: Color.danger}}
                width='100%' height={44} text="Perbaiki Misi"
                backgroundColor={Color.neutralZeroOne}
                /> :
                <CustomButton
                onPress={handleLanjutkan} 
                fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
                width='100%' height={44} text="Mulai Misi"
                backgroundColor={Color.primaryMain}
                />
                }
          </View>
        </View> : <></> : <></>}
    </View>
  )
}

export default StartMisiScreen

const styles = StyleSheet.create({
    textMisiSangatPenting: {
        color: Color.magenta,
        ...FontConfig.captionUpperTwo
    },
    textCommandTitle: {
        ...FontConfig.titleThree,
        color: Color.neutralTen
    },
    textCommandContent: {
        ...FontConfig.bodyTwo,
        color: Color.neutralZeroSeven
    },
    bottomSection: {
        backgroundColor: Color.neutralZeroOne,
        height: '12%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowOpacity: 1,
        shadowOffset: {width: 2, height: 4},
        shadowRadius: 3,
        shadowColor: 'black',
        elevation: 10
      },
      buttonContinue: {
        borderRadius: 20, 
        width: '80%',
      },
      garis: {
        borderBottomWidth: 1,
        borderColor: '#E0E0E0'
    }
})