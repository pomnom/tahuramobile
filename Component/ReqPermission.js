import React, {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';

const ReqPermission = async () => {
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Aplikasi ini membutuhkan akses ke File',
        buttonNeutral: 'Tanya Nanti',
        buttonNegative: 'Tolak',
        buttonPositive: 'Izinkan',
      },
    );
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Aplikasi ini membutuhkan akses lokasi',
        buttonNeutral: 'Tanya Nanti',
        buttonNegative: 'Tolak',
        buttonPositive: 'Izinkan',
      },
    );
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Aplikasi ini membutuhkan akses lokasi',
        buttonNeutral: 'Tanya Nanti',
        buttonNegative: 'Tolak',
        buttonPositive: 'Izinkan',
      },
    );
  } catch (err) {
    console.warn(err);
  }
};

export default ReqPermission;
