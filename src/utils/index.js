import { useEffect, useState } from 'react';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob'

let interval;

const useCountdown = () => {
  const countDownDate = 60000;

  const [countDown, setCountDown] = useState(countDownDate);

  const handleTimer = () => {
    interval = setInterval(() => {

      if (countDown <= 0) {
        clearInterval(interval);
      } else {
        setCountDown(prev => prev - 1000)
      }

    }, 1000);
  }

  useEffect(() => {
    if (countDown == countDownDate) handleTimer()
    if (countDown <= 0) clearInterval(interval);
  }, [countDown]);

  const handleResetTimer = () => setCountDown(countDownDate)

  return [countDown, handleResetTimer];
};


export { useCountdown };
