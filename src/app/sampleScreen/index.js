import React from 'react'
import { Button, Center, Text, useColorMode, useColorModeValue } from 'native-base'
import { useTranslation } from 'react-i18next';

function SampleScreen() {
  const { t } = useTranslation()
  const {
    colorMode,
    toggleColorMode
  } = useColorMode();
  const text = useColorModeValue("Dark", "Light");
  const bg = useColorModeValue("warmGray.50", "coolGray.800");
  const textColor = useColorModeValue("coolGray.800", "warmGray.50");
  return (
    <Center flex={1} bg={bg}>
      <Text color={textColor} fontWeight={700}>{t('welcome')}</Text>
      <Button onPress={toggleColorMode} mt={5}>{`Change ${text}`}</Button>
    </Center>
  )
}

export default SampleScreen