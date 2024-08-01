import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import { Color, FontConfig } from '../../../theme'
import { useIsFocused } from '@react-navigation/native';
import IconTime from '../../../assets/images/icon/icon_time.png';
import * as RNLocalize from 'react-native-localize';
import { formatTimeByOffset } from '../../../utils/Utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment-timezone';

const TentangCSR = ({route}) => {
    const {judul, deskripsi, convertedDate, namaPembuat} = route.params;
    const [height, setHeight] = useState(0);
    const webViewScript = 'window.ReactNativeWebView.postMessage(document.body.scrollHeight)';
    const _editor = React.createRef();
    const isFocused = useIsFocused();
    const [tanggal, setTanggal] = useState('');
    const deviceTimeZone = RNLocalize.getTimeZone();
    const today = moment().tz(deviceTimeZone);

    // Get the UTC offset in hours
    const currentTimeZoneOffsetInHours = today.utcOffset() / 60;

    const onWebViewMessage = (event) => {
        _editor.current?.enable(false);
        console.log(`Tinggi : ${event.nativeEvent.data}`);
        setHeight(Number(event.nativeEvent.data)+150);
    }

    useEffect(()=>{
      if(convertedDate != ''){
        const convertedToLocalTime = formatTimeByOffset(
            convertedDate,
            currentTimeZoneOffsetInHours,
        );
        setTanggal(convertedToLocalTime);
      }
    },[])

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
  return (
    <ScrollView style={{flex:1, backgroundColor: Color.neutralZeroOne}}>
        <View style={{height: 10}}></View>
        <View style={{padding: 10, borderWidth: 1, borderColor: Color.neutral40}}>
          <View style={{flexDirection: 'row', alignItems: 'center', }}>
              <Ionicons name="person-outline" size={16} color={Color.neutral70} />
              <View style={{width: 4}}></View>
              <Text style={{...FontConfig.bodyThree, color: Color.neutralZeroSeven}}>{`Program Dibuat : `}</Text>
              <Text style={{...FontConfig.titleSemiBoldFour, color: '#757575'}}>{namaPembuat}</Text>
          </View>
          <View style={{height: 2}}></View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={{width: 16, height: 16}} source={IconTime} />
              <View style={{width: 4}}></View>
              <Text style={{...FontConfig.bodyThree, color: Color.neutralZeroSeven}}>{`Tanggal Dibuat : `}</Text>
              <Text style={{...FontConfig.titleSemiBoldFour, color: '#757575'}}>{tanggal}</Text>
          </View>
        </View>
        <Text style={styles.textJudulBerita}>{judul}</Text>
        <QuillEditor
            autoSize={true}
            webview={{
            nestedScrollEnabled: false,
            injectedJavaScript:webViewScript,
            onMessage: (e) => onWebViewMessage(e)
            }}
            style={{...styles.editor, height: height,  width: '100%', marginHorizontal: 0}}
            ref={_editor}
            initialHtml={generateHtml(deskripsi)}
            container={false}
        />
    </ScrollView>
  )
}

export default TentangCSR

const styles = StyleSheet.create({
    editor: {
        padding: 0,
        borderColor: Color.primaryMain,
        borderWidth: 1,
        marginHorizontal: 30,
        marginVertical: 5,
        backgroundColor: 'white',
        flex: 1,
        
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
})