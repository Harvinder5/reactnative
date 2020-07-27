import {createStackNavigator,createAppContainer} from 'react-navigation';
import ComponentScreen from './src/screens/ComponentScreen';
import ListScreen from './src/screens/ListScreen';
import HomeScreen from './src/screens/HomeScreen';
import ImageScreen from './src/screens/ImageScreen';
import CounterScreen from './src/screens/CounterScreen';
import ColorScreen from './src/screens/ColorScreen';
import SquareScreen from './src/screens/SquareScreen';
import CounterScreenReducer from './src/screens/CounterScreenReducer';
import TextScreen from './src/screens/TextScreen';
import BoxScreen from './src/screens/BoxScreen';
import LayoutScreen from './src/screens/LayoutScreen';

const navigator = createStackNavigator({
    Components: ComponentScreen,
    List: ListScreen,
    Home:HomeScreen,
    Image:ImageScreen,
    Counter:CounterScreen,  
    Color:ColorScreen,  
    Square:SquareScreen,  
    CounterReducer:CounterScreenReducer,  
    TextScreen:TextScreen,  
    BoxScreen:BoxScreen,
    LayoutScreen:LayoutScreen  
},{
  initialRouteName:'Home',
  defaultNavigationOptions:{
    title :'App'
  }
});


export default createAppContainer(navigator); 