import React, { useState } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
    SafeAreaView,
    Text,
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';

import CustomTxtInput from '../../components/CustomTxtInput';
import CustomButton from '../../components/CustomButton';

var db = openDatabase({ name: 'StudentDetails.db' });

const Home = () => {
    const navigation = useNavigation();
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [contactNumber, setContactNumber] = useState('');
    let [email, setEmail] = useState('');
    let [parentName, setParentName] = useState('');
    let [parentContactNo, setParentContactNo] = useState('');
    let [parentEmail, setParentEmail] = useState('');
    let [qualification, setQualification] = useState('');
    let [instituteName, setInstituteName] = useState('');
    let [startDate, setStartDate] = useState('');
    let [endDate, setendDate] = useState('');
    let [grade, setGrade] = useState('');

    let register_student = () => {

        if (!firstName) {
            alert('Please fill First Name');
            return;
        }
        if (!lastName) {
            alert('Please fill Last Name');
            return;
        }
        if (!contactNumber) {
            alert('Please fill Contact Number');
            return;
        }
        if (!email) {
            alert('Please fill email');
            return;
        }
        if (!parentName) {
            alert('Please fill email');
            return;
        }
        if (!parentContactNo) {
            alert('Please fill email');
            return;
        }
        if (!qualification) {
            alert('Please fill email');
            return;
        }
        if (!instituteName) {
            alert('Please fill email');
            return;
        }
        if (!startDate) {
            alert('Please fill email');
            return;
        }
        if (!endDate) {
            alert('Please fill email');
            return;
        }
        if (!grade) {
            alert('Please fill email');
            return;
        }
        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS table_student', []);
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS table_student (first_name VARCHAR(20), last_name VARCHAR(20), contact_number INTEGER, email VARCHAR(20) PRIMARY KEY), parent_name VARCHAR(20), parent_contactNo INTEGER, parent_email VARCHAR(20), qualification VARCHAR(20), institution_name VARCHAR(20), start_date VARCHAR(20), end_date VARCHAR(20), grade INTEGER  ',
                [],
            );
            tx.executeSql(
                'INSERT INTO table_student (first_name, last_name, contact_number, email, parent_name, parent_contactNo, parent_email, qualification, institution_name, start_date, end_date, grade) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
                [firstName, lastName, contactNumber, email, parentName, parentContactNo, parentEmail, qualification, instituteName, startDate, endDate, grade],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'You are Registered Successfully',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('Login'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else alert('Registration Failed');
                }
            );
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView
                            behavior="padding"
                            style={{ flex: 1, justifyContent: 'space-between' }}>
                            <CustomTxtInput
                                placeholder="Enter First Name"
                                onChangeText={(firstName) => setFirstName(firstName)}
                                style={{ padding: 10 }}
                            />
                            <CustomTxtInput
                                placeholder="Enter Last Name"
                                onChangeText={(lastName) => setLastName(lastName)}
                                style={{ padding: 10 }}
                            />
                            <CustomTxtInput
                                placeholder="Enter Contact No"
                                onChangeText={(contactNumber) => setContactNumber(contactNumber)}
                                maxLength={10}
                                keyboardType="numeric"
                                style={{ padding: 10 }}
                            />
                            <CustomTxtInput
                                placeholder="Enter Email"
                                onChangeText={(email) => setEmail(email)}
                                maxLength={50}
                                // keyboardType=""
                                // numberOfLines={5}
                                // multiline={true}
                                style={{ textAlignVertical: 'top', padding: 10 }}
                            />
                            <CustomTxtInput
                                placeholder="Enter Parent Name"
                                onChangeText={(parentName) => setParentName(parentName)}
                                style={{ padding: 10 }}
                            />
                            <CustomTxtInput
                                placeholder="Enter Parent Contact No"
                                onChangeText={(parentContactNo) => setParentContactNo(parentContactNo)}
                                style={{ padding: 10 }}
                            />
                            <CustomTxtInput
                                placeholder="Enter Parent Email"
                                onChangeText={(parentEmail) => setParentEmail(parentEmail)}
                                style={{ padding: 10 }}
                            />
                            <CustomTxtInput
                                placeholder="Enter Qualification"
                                onChangeText={(qualification) => setQualification(qualification)}
                                style={{ padding: 10 }}
                            />
                            <CustomTxtInput
                                placeholder="Enter Institute Name"
                                onChangeText={(instituteName) => setInstituteName(instituteName)}
                                style={{ padding: 10 }}
                            />
                            <CustomTxtInput
                                placeholder="Enter Started Date"
                                onChangeText={(startDate) => setStartDate(startDate)}
                                style={{ padding: 10 }}
                            />
                            <CustomTxtInput
                                placeholder="Enter End Date"
                                onChangeText={(endDate) => setendDate(endDate)}
                                style={{ padding: 10 }}
                            />
                            <CustomTxtInput
                                placeholder="Enter Grade"
                                onChangeText={(grade) => setGrade(grade)}
                                style={{ padding: 10 }}
                            />
                            <CustomButton title="Submit" customClick={register_student} />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Home;
