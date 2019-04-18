
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Picker, Switch, Button, Alert} from 'react-native';


export default class App extends Component{

  constructor(props)
  {
    super(props);
    this.state = {fu: 20, han: 1, handValue: 0, oyaValue: 0, koValue: 0, oya: false}
    this.calculate = this.calculate.bind(this);
    this.name = this.name.bind(this);
    this.showFuHelp = this.showFuHelp.bind(this);
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
    }
    else
    {
      if((han == 4 && fu >= 40) || (han == 3 && fu >= 70) )
      {
        value = 8000
      }
      else
      {
        value = fu * Math.pow(2, han + 2) * 4
        value = Math.ceil(value / 100) * 100
      }

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
  name()
  {
    if(this.state.han < 5)
    {
      if(this.state.handValue == 8000 || this.state.handValue == 12000)
      {
        return "満貫 Mangan";
      }
      return "";
    }
    else if(this.state.han == 5)
    {
      return "満貫 Mangan"
    }
    else if(this.state.han <=7)
    {
      return "跳満 Haneman"
    }
    else if (this.state.han <=10)
    {
      return "倍満 Baiman";
    }
    else if(this.state.han <=12)
    {
      return "三倍満 Sanbaiman"
    }
  }

  showFuHelp()
  {
    Alert.alert("符 Fu Helper:", "Ganar: 20 \n Ron con mano oculta: 10 \n \
    Tsumo sin pinfu: 2 \n \
    Pareja de dragones o viento relevante: 2 \n \
    Pon simples expuesto / oculto: 2 / 4 \n \
    Pon terminales/honores expuesto/oculto: 4 / 8  \n \
    Kan simples expuesto / oculto: 8 / 16 \n \
    Kan terminales expuesto / oculto 16 / 32 \n \
    Single / Side / Closed wait: 2")
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Button
            title='Fus'
            onPress={this.showFuHelp} />
        </View>
        <View style={styles.row}>
          <Text>Dealer?</Text>
          <Switch
            value={this.state.oya}
            onValueChange={(value) => {
              this.setState({ oya: !this.state.oya });
              this.calculate(this.state.fu, this.state.han, value);
            }}
          />

        </View>
        <View style={styles.row}>
            <View style={styles.container}>
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
            <View style={styles.container}>
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
        </View>
        <View>
          <Text style={styles.name}>{this.name()}</Text>
          <Text style={styles.score}>
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  row: {
    margin: 20,
    flexDirection: 'row',
  },
  name: {
    fontSize: 35
  },
  score: {
    fontSize: 35
  }
});
