import { StyleSheet, Text, View } from 'react-native'
import { rS, rMS } from './src/styles/Responsive'
const App = () => {
  return (
    <View>
      <Text style={{ paddingTop: rS(250), fontSize: rMS(20) }}>App</Text>
    </View>
  )
}
export default App
const styles = StyleSheet.create({})