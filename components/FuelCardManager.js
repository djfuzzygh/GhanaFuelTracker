import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles';

const FUEL_CARDS = {
  GOIL: ['GOIL Fleet Card', 'GOIL Corporate Card'],
  SHELL: ['Shell Fleet Card', 'Shell V-Power Card'],
  TOTAL: ['Total Card', 'Total Fleet Solutions'],
  PUMA: ['Puma Corporate Card'],
};

export default function FuelCardManager() {
  const { user } = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({
    provider: '',
    cardType: '',
    cardNumber: '',
    expiryDate: '',
  });

  useEffect(() => {
    loadUserCards();
  }, []);

  const loadUserCards = async () => {
    const mockCards = [
      { id: 1, provider: 'GOIL', cardType: 'GOIL Fleet Card', cardNumber: '1234', expiryDate: '12/24' },
      { id: 2, provider: 'SHELL', cardType: 'Shell V-Power Card', cardNumber: '5678', expiryDate: '06/25' },
    ];
    setCards(mockCards);
  };

  const addCard = async () => {
    const newCardWithId = { ...newCard, id: Date.now() };
    setCards([...cards, newCardWithId]);
    setNewCard({ provider: '', cardType: '', cardNumber: '', expiryDate: '' });
  };

  const renderCardItem = ({ item }) => (
    <View style={styles.cardItem}>
      <Text style={styles.cardProvider}>{item.provider}</Text>
      <Text style={styles.cardType}>{item.cardType}</Text>
      <Text style={styles.cardNumber}>•••• {item.cardNumber.slice(-4)}</Text>
      <Text style={styles.cardExpiry}>Expires: {item.expiryDate}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Fuel Cards</Text>
      
      <FlatList
        data={cards}
        renderItem={renderCardItem}
        keyExtractor={item => item.id.toString()}
        style={styles.cardList}
      />

      <View style={styles.addCardForm}>
        <Picker
          selectedValue={newCard.provider}
          onValueChange={(value) => setNewCard({ ...newCard, provider: value, cardType: '' })}
          style={styles.picker}
        >
          <Picker.Item label="Select Provider" value="" />
          {Object.keys(FUEL_CARDS).map((provider) => (
            <Picker.Item key={provider} label={provider} value={provider} />
          ))}
        </Picker>

        {newCard.provider && (
          <Picker
            selectedValue={newCard.cardType}
            onValueChange={(value) => setNewCard({ ...newCard, cardType: value })}
            style={styles.picker}
          >
            <Picker.Item label="Select Card Type" value="" />
            {FUEL_CARDS[newCard.provider].map((type) => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
        )}

        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={newCard.cardNumber}
          onChangeText={(value) => setNewCard({ ...newCard, cardNumber: value })}
        />

        <TextInput
          style={styles.input}
          placeholder="Expiry Date (MM/YY)"
          value={newCard.expiryDate}
          onChangeText={(value) => setNewCard({ ...newCard, expiryDate: value })}
        />

        <TouchableOpacity style={styles.addButton} onPress={addCard}>
          <Text style={styles.addButtonText}>Add Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}