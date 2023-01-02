import React, { useRef, useState } from 'react'
import { FlatList, View, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import { useNavigate } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import downTriangle from '../assets/down.png'
import search from '../assets/Search.png'
import cross from '../assets/X.png'
import theme from '../utils/themes';
import TextInput from './TextInput';

const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#ddd'
  },
  anchor: {
    padding: 15,
    marginLeft: 15,
    marginRight: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modalBG: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    top: -66,
    left: '0%',
    width: '100%',
    height: screenHeight,
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
    width: 10,
    marginRight:10
  },
  faded: {
    color: theme.colors.textSecondary
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 20,
    marginBottom: 5,
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  shadowProp: {
    elevation: 10,
    shadowColor: '#000',
  },
  searchBarInput: {
    flex:1,
    marginLeft: 10,
    marginRight: 10,
  },
  searchImg: {
    width: 20,
    height: 20,
  },
  clearImg: {
    width: 25,
    height: 25
  }
});



// Simple List Item Separator
const ItemSeparator = () => <View style={styles.separator} />;

// Order Picker Modal
const OrderPickerModal = ({closeModal, modalSelected}) => {
  // press effect
  const pressableStyle = ({pressed}) => [
    {
      backgroundColor: pressed ? '#ccc' : 'white'
    },
    styles.modalItem
  ]

  return <View style={styles.modalBG}>
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

// Search Bar
const SearchBar = ({searchKeyword, setSearchKeyword}) => {
  const onChange = (value) => {
    setSearchKeyword(value)
  }

  const onClear = () => {
    setSearchKeyword('')
  }

  return <View style={[styles.searchBar, styles.shadowProp]}>
    <Image source={search} style={styles.searchImg}/>
    <TextInput 
      style={styles.searchBarInput}
      onChangeText = {onChange}
      value = {searchKeyword}
    />
    <Pressable onPress={onClear}>
      <Image source={cross} style={styles.clearImg}/>
    </Pressable>
    </View>
}

// Flatlist header
const RepositoryListHeader = ({openModal, selectedOrder, searchKeyword, setSearchKeyword}) => {
  return <View>
    <SearchBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
    <OrderPicker selectedOrder={selectedOrder} openModal={openModal} />
  </View>
}


export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;

    return (
      <RepositoryListHeader
        selectedOrder={props.selectedOrder} 
        openModal={props.openModal} 
        searchKeyword={props.searchKeyword}
        setSearchKeyword={props.setSearchKeyword}
      />
    );
  };


  renderItem = ({ item }) => {
    return (
    <Pressable onPress={() => this.props.onRepositoryPress(item.id)}>
      <RepositoryItem {...item}/>
    </Pressable>
    )
  }

  render() {
    const props = this.props;
    const repositoryNodes = props.repositories ? props.repositories.edges.map(edge => edge.node) : []

    return (
      <View>
          <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem ={this.renderItem}
            keyExtractor={item => item.id}
            ListHeaderComponent={this.renderHeader}
          />
          {props.visible && <OrderPickerModal closeModal={props.closeModal} modalSelected={props.modalSelected} />}
      </View>

    );
  }
}



const RepositoryList = () => {
  const { 
    repositories, 
    changeOrder, 
    selectedOrder,
    searchKeyword,
    setSearchKeyword 
  } = useRepositories()


  // Modal States
  const [visible, setVisible] = useState(false);
  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const modalSelected = (order) => {
    changeOrder(order)
    closeModal()
  }

  // Single Repository Navigation
  const navigate = useNavigate()
  const onRepositoryPress = (id) => {
    navigate(`/single/${id}`)
  }

  return <RepositoryListContainer 
    repositories={repositories} 
    changeOrder={changeOrder} 
    selectedOrder={selectedOrder}
    searchKeyword={searchKeyword}
    setSearchKeyword={setSearchKeyword}
    visible={visible}
    openModal={openModal}
    closeModal={closeModal}
    modalSelected={modalSelected}
    onRepositoryPress={onRepositoryPress}
  />
};

export default RepositoryList;