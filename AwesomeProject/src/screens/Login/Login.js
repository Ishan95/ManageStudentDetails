import React, { useState, useEffect } from 'react';
import { Text, View, Button, SafeAreaView } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';

import CustomTextInput from '../../components/CustomTxtInput';
import CustomButton from '../../components/CustomButton';

var db = openDatabase({ name: 'AdminDatabase.db' });

const Login = () => {
    const navigation = useNavigation();
    let [adminName, setAdminName] = useState('');
    let [adminPassword, setAdminPassword] = useState({});
    const loggingData = [
        { name: 'Admin1', password: 'A1' },
        { name: 'Admin2', password: 'A2' },
        { name: 'Admin3', password: 'A3' },
    ];

    useEffect(() => {
        db.transaction(function (txn) {
            txn.executeSql('DROP TABLE IF EXISTS table_admin', []);
            txn.executeSql(
                'CREATE TABLE IF NOT EXISTS table_admin(admin_name VARCHAR(20), admin_password VARCHAR(20))',
                [],
            );
            loggingData.forEach(admin => {
                txn.executeSql(
                    'INSERT INTO table_admin(admin_name, admin_password) VALUES (?, ?)',
                    [admin.name, admin.password],
                    (txnObj, resultSet) => {
                        //Table Created
                    },
                    (txObj, error) => {
                        console.error('Something Went Wrong');
                    }
                );
            });
        });

    }, []);

    let searchAdmin = () => {
        if (!adminName) {
            alert('Please Input User name');
            return;
        }
        if (!adminPassword) {
            alert('Please Input Password');
            return;
        }
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_admin where admin_name = ?',
                [adminName],
                (tx, results) => {
                    var len = results.rows.length;
                    console.log('len', len);
                    if (adminName == loggingData[0].name) {
                        tx.executeSql(
                            'SELECT * FROM table_admin where admin_password = ?',
                            [adminPassword],
                            (tx, results) => {
                                if (adminPassword == loggingData[0].password) {
                                    navigation.navigate('Home');
                                } else {
                                    alert('Invalid Password');
                                }
                            }
                        )
                    } else if (adminName == loggingData[1].name) {
                        tx.executeSql(
                            'SELECT * FROM table_admin where admin_password = ?',
                            [adminPassword],
                            (tx, results) => {
                                if (adminPassword == loggingData[1].password) {
                                    navigation.navigate('Home');
                                } else {
                                    alert('Invalid Password');
                                }
                            }
                        )
                    } else if (adminName == loggingData[2].name) {
                        tx.executeSql(
                            'SELECT * FROM table_admin where admin_password = ?',
                            [adminPassword],
                            (tx, results) => {
                                if (adminPassword == loggingData[2].password) {
                                    navigation.navigate('Home');
                                } else {
                                    alert('Invalid Password');
                                }
                            }
                        )
                    } else {
                        alert('Invalid User');
                    }
                }
            );
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <CustomTextInput
                        placeholder="Enter User Name"
                        onChangeText={(adminName) => setAdminName(adminName)}
                        style={{ padding: 10 }}
                    />
                    <CustomTextInput
                        placeholder="Enter Password"
                        onChangeText={(adminPassword) => setAdminPassword(adminPassword)}
                        style={{ padding: 10 }}
                    />
                    <CustomButton title="SUBMIT" customClick={searchAdmin} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;
