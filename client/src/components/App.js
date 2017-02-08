import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
class App extends React.Component{
  render(){
    return(
      <div>
        <Header/>
        <Home/>
        <Footer/>
      </div>
    )
  }
 }
// function App(){
//   return(
//     <div>
//       <Header/>
//       <Home/>
//       <Footer/>
//     </div>
//   )
// }
export default App;
