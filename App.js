
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Picker, Switch} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component{

  constructor(props)
  {
    super(props);
    this.state = {fu: 20, han: 1, handValue: 0, oyaValue: 0, koValue: 0, oya: false}
    this.calculate = this.calculate.bind(this);
  }

  calculate(fu, han, oya)
  {
    if(han >= 5)
    {
      if(han == 5)
      {
        value = 8000;
      }
      else if(han<=7)
      {
        value = 12000;
      }
      else if(han<=10)
      {
        value = 16000
      }
      else if(han <=12)
      {
        value = 24000
      }
      else if(han <=13)
      {
        value = 32000;
      }
    }
    else
    {
      value = fu * Math.pow(2, han + 2) * 4
      value = Math.ceil(value / 100) * 100
    }


    if(oya)
    {
      value = value * 1.5
      oyaValue = ""
      koValue = Math.ceil(value / 3 / 100) * 100
    }
    else
    {
      oyaValue = Math.ceil(value / 2 / 100) * 100
      koValue = Math.ceil(value / 4 / 100) * 100
    }


    this.setState({ handValue: value, oyaValue: oyaValue, koValue: koValue })

  }

  componentDidMount()
  {
    this.calculate(this.state.fu, this.state.han);
  }

  render() {
    return (
      <View style={styles.container}>
        <View >
          <Switch
          value = {this.state.oya}
          onValueChange={(value)=>{
            this.setState({oya: !this.state.oya});
            this.calculate(this.state.fu, this.state.han, value);
          }}
          />
        <Text>Fu</Text>
          <Picker
            selectedValue={this.state.fu}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) =>{
              this.setState({ fu: itemValue });
              this.calculate(itemValue, this.state.han, this.state.oya);
            }

            }>
            {[20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110].map(value =>{return <Picker.Item key={`fu_${value}`}
              label={`${value}`} value={value} />})}
          </Picker>
        </View>
        <View >
        <Text>Han</Text>
          <Picker
            selectedValue={this.state.han}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) =>{
              this.setState({ han: itemValue });
              this.calculate(this.state.fu, itemValue, this.state.oya);
            }
            }>
            {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]).map(value => {
              return <Picker.Item key={`han_${value}`}
                label={`${value}`} value={value} />
            })}

          </Picker>
        </View>
        <View>

          <Text>
            {this.state.handValue}{(this.state.oya) ? `(${this.state.koValue})` : `(${this.state.oyaValue} / ${this.state.koValue})`}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
