import React, { useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {FlatList} from 'react-native-gesture-handler'
import { auth, db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import {Container, Card, UserInfo, UserImgWrapper, UserImg, 
  TextSection, UserInfoText, UserName, PostTime, MessageText} from '../styles/MessagesStyles'

const MessagesScreen = ({navigation}) => {
    const [Messages, setMessages] = useState([]);
    useLayoutEffect(() => {

        const q = query(collection(db, 'chatList'), where('users', 'array-contains', auth?.currentUser?.email));
        
        const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                users: doc.data().users,
                user: doc.data().user,
                createdAt: doc.data().createdAt.toDate(),                
                text: doc.data().text,
                
            }))
        ));

        return () => {
          unsubscribe();
        };

    }, [navigation]);


    return (
      <Container>
        <FlatList
        data={Messages}
        keyExtractor={item=>item._id} //look for a way of display user name who is not user[]

        renderItem={({item}) => (
          <Card onPress={() => navigation.navigate('Chat', {userName: item.users[1]})}> 
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={require('../assets/man.jpg')}/>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.users[1]}</UserName>
                    <PostTime></PostTime>
                  </UserInfoText>
                  <MessageText>{item.text}</MessageText>
                </TextSection>
              </UserImgWrapper>
            </UserInfo>
            
          </Card>
        )}
        />
      </Container>
         
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 100,
},

});