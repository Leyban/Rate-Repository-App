import React, { useState } from 'react'
import { FlatList, View, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigate } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import downTriangle from '../assets/down.png'
import theme from '../utils/themes';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#ddd'
  },
  anchor: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modalBG: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    top: '0%',
    left: '0%',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  modalBGG: {
    position: 'absolute',
    top: '0%',
    left: '0%',
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 2,
    margin: 30,
    borderRadius: 5,
  },
  modalItem: {
    padding: 10,
    borderRadius: 5
  },
  down: {
    height: 7,
    width: 10
  },
  faded: {
    color: theme.colors.textSecondary
  }
});

// press effect
const pressableStyle = ({pressed}) => [
  {
    backgroundColor: pressed ? '#ccc' : 'white'
  },
  styles.modalItem
]

// Simple List Item Separator
const ItemSeparator = () => <View style={styles.separator} />;

// Order Picker for flatlist header
const OrderPicker = ({openModal, selectedOrder}) => {
  return (
      <View>
        <Pressable style={styles.anchor} onPress={openModal}>
          <Text fontSize='subheading'>{selectedOrder}</Text>
          <Image source={downTriangle} style={styles.down}/>
        </Pressable>
      </View>
  );
}

// Testable Repository List Component
export const RepositoryListContainer = ({repositories, changeOrder, selectedOrder}) => {
  const [visible, setVisible] = useState(false);
  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const modalSelected = (order) => {
    changeOrder(order)
    closeModal()
  }

  const navigate = useNavigate()
  const onPress = (id) => {
    navigate(`/single/${id}`)
  }

  const repositoryNodes = repositories 
    ? repositories.edges.map(edge => edge.node)
    : []

  const renderItem = ({ item }) => {
    return (
    <Pressable onPress={() => onPress(item.id)}>
      <RepositoryItem {...item}/>
    </Pressable>
    )
  }

  return (
    <View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem ={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={()=><OrderPicker selectedOrder={selectedOrder} openModal={openModal}/>}
      />
      {visible 
        && <View style={styles.modalBG}>
          <Pressable style={styles.modalBGG} onPress={closeModal}/>
          <View style={styles.modalContainer}>
            <View style={styles.modalItem}>
              <Text fontSize='subheading' style={styles.faded}>Select an item..</Text>
            </View>
            <Pressable style={pressableStyle} onPress={()=>modalSelected('Latest repositories')}>
              <Text fontSize='subheading'>Latest repositories</Text>
            </Pressable>
            <Pressable style={pressableStyle} onPress={()=>modalSelected('Highest rated repositories')}>
              <Text fontSize='subheading'>Highest rated repositories</Text>
            </Pressable>
            <Pressable style={pressableStyle} onPress={()=>modalSelected('Lowest rated repositories')}>
              <Text fontSize='subheading'>Lowest rated repositories</Text>
            </Pressable>
          </View>
        </View>
      }
    </View>

  );
}

const RepositoryList = () => {
  const { repositories, changeOrder, selectedOrder } = useRepositories()

  return <RepositoryListContainer repositories={repositories} changeOrder={changeOrder} selectedOrder={selectedOrder}/>
};

export default RepositoryList;