import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import LandingSearch from './src/components/LandingSearch';
import Rooftops from './src/components/Rooftops';
import Weather from './src/components/Weather';
// import Analytics from './src/components/Analytics'; Will include this back in when google analytics updates

import Navi from './src/components/Navi';
import Header from './src/components/Header';


export default class App extends React.Component {
  constructor(){
    super()

    this.state = {gotoRoofstops: false, removeSearch: true, weatherComponent: false, data:[]}
    
  }
  async componentDidMount() {
    const response = await fetch(`https://thawing-anchorage-35743.herokuapp.com/api/locations`)
    const json = await response.json()   
    // console.log(json) 
     this.setState({data: json})
     console.log(this.state.data)
  }

  findbyZip = () => {
    let data = this.state.data
    let arr = []
    for (let i = 0; i< data.length; i++){
      
      arr.push(data[i].zipcode)
      
    }
    console.log(arr)
  }

gotoRoofstops = () => {
  this.setState({gotoRoofstops: true, removeSearch: false , weatherComponent: true})
  this.componentDidMount()
  this.findbyZip()
}

homeScreen = (e) => {
  
  this.setState({removeSearch: true, gotoRoofstops:false, weatherComponent: false})

}


  render() {
    return (

          <View style={styles.container}>
            <ScrollView>
              <Header homeScreen ={this.homeScreen}/>
              {
                this.state.gotoRoofstops ? <Rooftops data = {this.state.data}/> : null
              }           
              {
                this.state.removeSearch ? <LandingSearch gotoRoofstops = {this.gotoRoofstops}/> :  null
              }
              {
                this.state.weatherComponent ? <Weather /> : null
              }
               

            </ScrollView>
          </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2D32',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
