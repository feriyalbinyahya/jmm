import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Color, FontConfig } from '../../../theme'
import IconVoucher from '../../../assets/images/icon/icon_voucher.png'
import IconPoin from '../../../assets/images/icon/icon_poin.png'
import IconCopy from '../../../assets/images/icon/icon_copy_white.png'
import { Box } from 'native-base'
import HeaderWhiteNoBorder from '../../../components/header/headerWhiteNoBorder'
import { useIsFocused } from '@react-navigation/native'
import QuillEditor from 'react-native-cn-quill'
import SwipeButton from '@dillionverma/react-native-swipe-button'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard'
import Snackbar from 'react-native-snackbar'

const DetailTukarPoin = ({navigation}) => {
    const kategori = "E-Wallet";
    const judul = "Saldo OVO 1.500";
    const poin ="100";
    const tanggal ="20 Sept 2023"
    const sisa = "20";
    const [height, setHeight] = useState(0);
    const webViewScript = 'window.ReactNativeWebView.postMessage(document.body.scrollHeight)';
    const _editor = React.createRef();
    const [dataBerita, setDataBerita] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSwiped, setSwiped] = useState(false);
    const onWebViewMessage = (event) => {
        _editor.current?.enable(false);
        console.log(`Tinggi : ${event.nativeEvent.data}`);
        setHeight(Number(event.nativeEvent.data)+150);
    }

    handleCopyReferral = () => {
        Clipboard.setString(referal);
        Snackbar.show({
            text: 'Kode voucher telah disalin',
            duration: Snackbar.LENGTH_SHORT,
        });
    }

    const referal = "VCR1500A1";

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

    const value = `<h1 class="ql-align-center">PONGO EDISI TERBARU</h1><p class="ql-align-center"><br></p><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/11nBqHolLng?showinfo=0" __idm_id__="11804673" width="1367px" height="371" style="display: block; margin: auto;"></iframe><p><br></p> <p>Suspendisse fermentum fermentum ex. Praesent a odio ac tortor bibendum faucibus.</p><p><br></p><p>Pellentesque pulvinar gravida nulla tristique rhoncus. Donec rutrum magna lacus, sed ultrices dui tincidunt sed. Ut quis mauris risus. Cras volutpat tempor ultricies. Pellentesque neque lacus, consequat in tortor ut, fringilla varius quam. Fusce iaculis felis in ullamcorper auctor. Integer lectus libero, ornare sit amet eleifend eu, ornare nec justo. Nam pellentesque vitae erat eu porta. Nam dictum iaculis quam in maximus. Fusce sit amet metus in neque dapibus viverra ut eget eros. Fusce elementum, sapien et cursus consectetur, felis sapien semper turpis, ac sagittis ante augue in nunc.</p><p><br></p><p>Integer eu sapien eu velit feugiat posuere. Morbi at dui quis ante placerat .</p><p><br></p><p>Nunc ut leo quis purus mollis laoreet nec non felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempus libero sed nulla ullamcorper, nec consequat quam elementum. Cras sit amet efficitur metus. Donec ut porta erat. Nam lacus tortor, congue malesuada velit in, mollis faucibus risus. Mauris sit amet justo semper eros varius euismod. Integer sagittis tincidunt elementum. Nunc neque eros, tempor et erat vel, lacinia condimentum metus. Vivamus tempor mollis ligula, euismod rhoncus sem ullamcorper ut. Donec placerat fringilla lorem, ac posuere erat venenatis id. Vestibulum volutpat id ipsum vel pellentesque.</p><p>Morbi elementum ante sit amet augue eleifend, in condimentum lorem posuere. Curabitur a mauris id velit dapibus mollis. Duis nec nulla nisl. Cras vitae velit eget turpis aliquet luctus. Ut sem nunc, ornare sed mattis at, cursus non nisi. Phasellus maximus, tellus dapibus ornare faucibus, nunc nunc aliquam ex, at pellentesque lectus massa eget erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque quis tellus a odio lacinia volutpat at non sem. Sed eget lacinia libero, a egestas massa.</p> </p> `;


  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
      <HeaderWhiteNoBorder title="Detail Penukaran Poinku" navigation={navigation} />
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <Text style={{...FontConfig.bodyThree, color: Color.primaryMain}}>{kategori}</Text>
        <Text style={{...FontConfig.buttonOne, color: Color.primaryMain}}>{judul}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20}}>
        <View>
            <Text style={{...FontConfig.captionOne, color: '#616161'}}>Poin yang ditukar</Text>
            <Text style={{...FontConfig.titleSeven, color: '#000000'}} >{`${poin} Poin`}</Text>
        </View>
        <View style={styles.garisVertical}></View>
        <View>
            <Text style={{...FontConfig.captionOne, color: '#616161'}}>Masa berlaku</Text>
            <Text style={{...FontConfig.titleSeven, color: '#000000'}} >{tanggal}</Text>
        </View>
        <View style={styles.garisVertical}></View>
        <View>
            <Text style={{...FontConfig.captionOne, color: '#616161'}}>Sisa Voucher</Text>
            <Text style={{...FontConfig.titleSeven, color: Color.purple}} >{sisa}</Text>
        </View>
      </View>
      <Text style={{...FontConfig.bodyThree, color: '#616161', marginTop: 20,
       marginHorizontal: 20, marginBottom: 10}}>Deskripsi</Text>
      <ScrollView>
        <QuillEditor
                autoSize={true}
                webview={{
                nestedScrollEnabled: false,
                injectedJavaScript:webViewScript,
                onMessage: (e) => onWebViewMessage(e)
                }}
                style={{...styles.editor, height: height,  width: '100%', marginHorizontal: 0}}
                ref={_editor}
                initialHtml={generateHtml(value)}
                container={false}
            />
      </ScrollView>
      <View style={{padding: 15}}>
        {!isSwiped ? <SwipeButton
            Icon={<Ionicons name="chevron-forward-outline" size={18} color={Color.neutralZeroOne}  />}
            onComplete={() => {setSwiped(true);}}
            title="Geser ke kanan untuk klaim"
            height={50}
            containerStyle={{borderColor: Color.neutralZeroOne, backgroundColor: Color.neutralZeroTwo}}
            underlayStyle={{backgroundColor: Color.primaryMain}}
            iconContainerStyle={{backgroundColor: Color.primaryMain, }}
            titleStyle={{...FontConfig.buttonThree, color: '#757575'}}
        /> : 
        <View style={{flexDirection: 'row', justifyContent: 'space-between', 
        paddingHorizontal: 20, paddingVertical: 15, backgroundColor: Color.primaryMain,
        borderRadius: 32, height: 50}}>
            <Text style={{...FontConfig.buttonZeroTwo, color: Color.neutralZeroOne}}>{referal}</Text>
            <Pressable onPress={handleCopyReferral}><Image source={IconCopy} style={{width: 18, height: 18}} /></Pressable>
        </View>
        }
        </View>
    </View>
  )
}

export default DetailTukarPoin

const styles = StyleSheet.create({
    garisVertical: {
        borderWidth: 0.2,
        backgroundColor: Color.hitam, 
        borderColor: Color.hitam,
        height: '90%',
    }
})