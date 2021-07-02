import React, {Component} from 'react';
    import {View, Text, Button, TextInput, FlatList, StyleSheet} from 'react-native';
    import axios from 'axios';
    import Config from 'react-native-config';
    
    import NavHeaderRight from '../components/NavHeaderRight';
    import ListCard from '../components/ListCard';
    
    const BASE_URL = Config.NGROK_HTTPS_URL;
    
    class FoodList extends Component {
      static navigationOptions = ({navigation}) => {
        return {
          title: 'Hungry?',
          headerRight: <NavHeaderRight />,
        };
      };
    
      state = {
        foods: [], // list of foods to be rendered on the screen
        query: '',
      };
    
      async componentDidMount() {
        // fetch the array of foods from the server
        const foods_response = await axios.get('${BASE_URL}/foods');
        this.setState({
          foods: foods_response.data.foods,
        });
      }
    
      render() {
        const {foods, query} = this.state;
        return (
          <View style={styles.wrapper}>
            <View style={styles.topWrapper}>
              <View style={styles.textInputWrapper}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={this.onChangeQuery}
                  value={query}
                  placeholder={'What are you craving for?'}
                />
              </View>
    
              <View style={styles.buttonWrapper}>
                <Button
                  onPress={() => this.filterList()}
                  title="Go"
                  color="#c53c3c"
                />
              </View>
            </View>
    
            <FlatList
              data={foods}
              renderItem={this.renderFood}
              contentContainerStyle={styles.list}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        );
      }
    
      onChangeQuery = text => {
        this.setState({
          query: text,
        });
      };
    
      filterList = async () => {
        // filter the list of foods by supplying a query
        const {query} = this.state;
        const foods_response = await axios.get(`${BASE_URL}/foods?query=${query}`);
    
        this.setState({
          foods: foods_response.data.foods,
          query: '',
        });
      };
    
      viewItem = item => {
        // navigate to the FoodDetails screen
        this.props.navigation.navigate('FoodDetails', {
          item,
        });
      };
    
      renderFood = ({item}) => {
        return <ListCard item={item} viewItem={this.viewItem} />;
      };
    }
    
    // <pre-coded styles here..>
    
    export default FoodList;