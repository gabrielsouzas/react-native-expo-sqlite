import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import CarRepository, { Car } from '../src/database/CarRepository';
import { createCar } from '../src/controller/carController';

const repository = new CarRepository();

export default function Home() {
    const [cars, setCars] = useState<Car[]>([]);
    const [id, setId] = useState('');

    const create = async () => {
      /* const id = await repository.create({
        brand: "VW",
        model: "Fusca",
        hp: Math.floor(Math.random() * 100),
      });
      console.log("Created: ", id); */

      const response = await createCar({
        brand: "VW",
        model: "Fusca",
        hp: Math.floor(Math.random() * 100),
      });

      console.log(response);

      await all();
    }

    const all = async () => {
      const cars = await repository.all();
      setCars(cars);

      console.log(cars);
    }

    const remove = async () => {
      const rowsAffected = await repository.remove(Number(id));
      console.log(rowsAffected);

      await all();
    }

    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Button onPress={create} title='CREATE' />
          <Text>{`Criar um registro \nno banco de dados`}</Text>
        </View>
        <View style={styles.item}>
          <Button onPress={all} title='ALL' />
          <Text>{`Busca os registros \nno banco de dados`}</Text>
        </View>
        <View style={styles.item}>
          <Button onPress={remove} title='REMOVE' />
          <TextInput
          style={styles.input}
          placeholder="ID"
          placeholderTextColor="#e1e2df80"
          value={id}
          onChangeText={(newText) => setId(newText)}
        />
          <Text>{`Remove um registro \nno banco de dados`}</Text>
        </View>
        
        <View style={styles.list}>
          {cars.map((car) => (
            <View style={styles.listItem} key={car.id}>
              <Text>{car.id} - </Text>
              <Text>
                {car.brand} {car.model} {car.hp}
              </Text>
            </View>
          ))}
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    width: 300,
    height: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(225, 226, 223, 0.5)',
    paddingLeft: 5,
    paddingBottom: 4,
    paddingTop: 4,
    fontSize: 14,
    height: 40,
    borderRadius: 4,
  },
  list: {
    width: 300,
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#0004',
  }
});