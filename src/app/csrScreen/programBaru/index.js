import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, SafeAreaView, Dimensions, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import HeaderWhite from '../../../components/header/headerWhite'
import ImageExample from '../../../assets/images/example/laporan.png'
import { Color, FontConfig } from '../../../theme'
import IconSeen from '../../../assets/images/icon/icon_seen.png'
import BoxKategori from '../../../components/kategori'
import IconTime from '../../../assets/images/icon/icon_time.png';
import IconDeadline from '../../../assets/images/icon/icon_deadline.png';
import IconComment from '../../../assets/images/icon/icon_comment.png';
import IconShare from '../../../assets/images/icon/icon_share.png';
import IconLike from '../../../assets/images/icon/icon_like.png';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import BeritaServices from '../../../services/berita'
import { useIsFocused } from '@react-navigation/native';
import Share from 'react-native-share';
import IconLiked from '../../../assets/images/icon/icon_liked.png'
import CustomButton from '../../../components/customButton'
import CustomBottomSheet from '../../../components/bottomSheet'
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import { formatTimeByOffset } from '../../../utils/Utils';

const ProgramBaruScreen = ({navigation, route}) => {
    const [height, setHeight] = useState(0);
    const webViewScript = 'window.ReactNativeWebView.postMessage(document.body.scrollHeight)';
    const _editor = React.createRef();
    const isFocused = useIsFocused();
    const {id, dataAcara} = route.params;
    const [dataBerita, setDataBerita] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [jumlahLike, setJumlahLike] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const deviceTimeZone = RNLocalize.getTimeZone();
    const [convertedDate, setConvertedDate] = useState("");

    // Make moment of right now, using the device timezone
    const today = moment().tz(deviceTimeZone);

    // Get the UTC offset in hours
    const currentTimeZoneOffsetInHours = today.utcOffset() / 60;
    useEffect(()=>{
        if(dataBerita.length != 0){
            const convertedToLocalTime = formatTimeByOffset(
                dataBerita.tanggal,
                currentTimeZoneOffsetInHours,
            );
            setConvertedDate(convertedToLocalTime);
        }
    },[dataBerita])


    const getDataBerita = () => {
        setIsLoading(true);
        BeritaServices.getDetailBerita(id)
        .then(res=> {
            console.log(res.data.data);
            setDataBerita(res.data.data[0]);
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err.response.data.message);
        })
    }

    const value = `<h1 class="ql-align-center">PONGO EDISI TERBARU</h1><p class="ql-align-center"><br></p><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/11nBqHolLng?showinfo=0" __idm_id__="11804673" width="1367px" height="371" style="display: block; margin: auto;"></iframe><p><br></p> <p>Suspendisse fermentum fermentum ex. Praesent a odio ac tortor bibendum faucibus.</p><p><br></p><p>Pellentesque pulvinar gravida nulla tristique rhoncus. Donec rutrum magna lacus, sed ultrices dui tincidunt sed. Ut quis mauris risus. Cras volutpat tempor ultricies. Pellentesque neque lacus, consequat in tortor ut, fringilla varius quam. Fusce iaculis felis in ullamcorper auctor. Integer lectus libero, ornare sit amet eleifend eu, ornare nec justo. Nam pellentesque vitae erat eu porta. Nam dictum iaculis quam in maximus. Fusce sit amet metus in neque dapibus viverra ut eget eros. Fusce elementum, sapien et cursus consectetur, felis sapien semper turpis, ac sagittis ante augue in nunc.</p><p><br></p><p>Integer eu sapien eu velit feugiat posuere. Morbi at dui quis ante placerat .</p><p><br></p><p>Nunc ut leo quis purus mollis laoreet nec non felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempus libero sed nulla ullamcorper, nec consequat quam elementum. Cras sit amet efficitur metus. Donec ut porta erat. Nam lacus tortor, congue malesuada velit in, mollis faucibus risus. Mauris sit amet justo semper eros varius euismod. Integer sagittis tincidunt elementum. Nunc neque eros, tempor et erat vel, lacinia condimentum metus. Vivamus tempor mollis ligula, euismod rhoncus sem ullamcorper ut. Donec placerat fringilla lorem, ac posuere erat venenatis id. Vestibulum volutpat id ipsum vel pellentesque.</p><p>Morbi elementum ante sit amet augue eleifend, in condimentum lorem posuere. Curabitur a mauris id velit dapibus mollis. Duis nec nulla nisl. Cras vitae velit eget turpis aliquet luctus. Ut sem nunc, ornare sed mattis at, cursus non nisi. Phasellus maximus, tellus dapibus ornare faucibus, nunc nunc aliquam ex, at pellentesque lectus massa eget erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque quis tellus a odio lacinia volutpat at non sem. Sed eget lacinia libero, a egestas massa.</p> </p> `;

    const onWebViewMessage = (event) => {
        _editor.current?.enable(false);
        console.log(`Tinggi : ${event.nativeEvent.data}`);
        setHeight(Number(event.nativeEvent.data)+150);
    }

    const generateHtml = (content) => `
    <!DOCTYPE html>\n
    <html>
      <head>
        <title></title>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=320, user-scalable=no">
        <style type="text/css">
          body {
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
    `
    useEffect(()=> {
        if(isFocused){
            setHeight(0);
            getDataBerita();
        }
    },[isFocused]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
      <HeaderWhite navigation={navigation} title={`CSR`} />
      {!isLoading ?
        dataBerita.length != 0 ?
      <ScrollView style={{backgroundColor: Color.neutralZeroOne}}>
        <Image style={styles.imageBerita} source={{uri: `data:image/png;base64,${dataBerita.cover_berita}`}} />
        <View style={styles.containBeritaSection}>
            <View style={{height: 5}}></View>
            
            <View style={{padding: 10, marginHorizontal: 20, borderWidth: 1, borderColor: Color.neutral40}}>
                <View style={{flexDirection: 'row', alignItems: 'row'}}>
                    <Image style={{width: 16, height: 16}} source={IconTime} />
                    <View style={{width: 4}}></View>
                    <Text style={{...FontConfig.bodyThree, color: Color.neutralZeroSeven}}>{`Program Dibuat : `}</Text>
                    <Text style={{...FontConfig.titleSemiBoldFour, color: '#757575'}}>{convertedDate}</Text>
                </View>
                <View style={{height: 3}}></View>
            </View>
            <View style={{height: 15}}></View>
            <View style={{height: 5, backgroundColor: Color.neutral40}}></View>
            <View style={{height: 10}}></View>
            <Text style={styles.textJudulBerita}>{dataBerita.judul}</Text>
            <QuillEditor
                autoSize={true}
                webview={{
                nestedScrollEnabled: false,
                injectedJavaScript:webViewScript,
                onMessage: (e) => onWebViewMessage(e)
                }}
                style={{...styles.editor, height: height,  width: '100%', marginHorizontal: 0}}
                ref={_editor}
                initialHtml={generateHtml(dataBerita.deskripsi)}
                container={false}
            />
        </View>
      </ScrollView> 
      : <></>
      : <View style={{height: '100%', backgroundColor: Color.neutralZeroOne}}>
        <ActivityIndicator style={{marginTop: '50%'}} size="large" color={Color.primaryMain} />
        </View>
      }
      {dataBerita.length != 0 ?  
        <View style={styles.bottomSection}>
        <View style={styles.buttonContinue}><CustomButton 
        text="Kirim Proposal" backgroundColor={Color.primaryMain} onPress={()=>navigation.navigate("BuatProposal")}
        height={40} fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}} /></View>
      </View> : <></>
    }
    </SafeAreaView>
  )
}

export default ProgramBaruScreen

const styles = StyleSheet.create({
    imageBerita: {
        width: '100%',
        height: 192
    },
    containBeritaSection: {
        paddingVertical: 20,
        flex: 1,
        height: '100%'
    },
    rowInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInfo: {
        ...FontConfig.bodyThree,
        color: Color.grayEight,
        marginLeft: 3
    },
    iconInfo: {
        width: 14,
        height: 14
    },
    textCreatedBy: {
        ...FontConfig.bodyTwo,
        color: '#000000'
    },
    textJudulBerita: {
        ...FontConfig.titleOne,
        color: Color.title,
        marginVertical: 10,
        paddingHorizontal: 20
    },
    textDeskripsiBerita: {
        marginVertical: 10,
        ...FontConfig.bodyTwo,
        color: Color.primaryText,
        textAlign: 'justify'
    },
    textKategori: {
        ...FontConfig.bodyThree,
        color: Color.primaryText
    },
    kategoriSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 10,
        columnGap: 10,
        marginVertical: 10
    },
    infoBeritaSection: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: 10
    },
    iconBerita: {
        width: 20,
        height: 20
    },
    textIconBerita: {
        ...FontConfig.bodyThree,
        color: '#000000',
        marginLeft: 4
    },
    editor: {
        flex: 0,
        padding: 0,
        borderColor: Color.primaryMain,
        borderWidth: 1,
        marginHorizontal: 30,
        marginVertical: 5,
        backgroundColor: 'white',
        flex: 1,
        
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
        elevation: 10
    },
      buttonContinue: {
        borderRadius: 20, 
        width: '80%',
    },
})