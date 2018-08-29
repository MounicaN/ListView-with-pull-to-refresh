import React, { Component } from 'react';
import { StyleSheet, View, ListView, RefreshControl, Text } from 'react-native'
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      numbers: [1, 2],
      cnt: 3,
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }
    this.onRefresh = this.onRefresh.bind(this);
  }
  componentWillMount() {
    this.setState((PrevState) => {
      PrevState.dataSource = this.state.dataSource.cloneWithRows(this.state.numbers)
      return PrevState.dataSource
    })
  }
  onRefresh() {
    this.setState({ isRefreshing: true })
    this.setState({ cnt: this.state.cnt + 1 })
    var tmpNumbers = this.state.numbers;
    tmpNumbers.push(this.state.cnt);
    this.setState({ numbers: tmpNumbers })
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(this.state.numbers) })
    this.setState({ isRefreshing: false })
  }
  render() {
    return (
      <View>
        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>NUMBERS</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(number) => <View style={styles.list}><Text>{number}</Text></View>}
          refreshControl={
            <RefreshControl onRefresh={this.onRefresh} refreshing={this.state.isRefreshing} />
          }
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  list: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    margin: 5,
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 1,
    backgroundColor: '#28edb8'
  }
})