import './App.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Rnd } from 'react-rnd';
import NewPlantMenu from './newPlantMenu';



const App = () => (
    <div className='app-ui'>
      <Header />
      <Garden />
    </div>

)


//App Title Bar
const Header = props => {
  return (
    <div className='header-container'>
      <header className='app-header'>
        <h3>Farmestry</h3>
      </header>
    </div>
  )
}


//Draggable and Resizable Crop/Plant Components
const Plant = props => {

  const [responseData, setResponseData] = useState([]); 


  useEffect(() => {
    axios.get(`https://openfarm.cc/api/v1/crops/?filter=${props.plantInfo['species']}}`)
    .then(res => {
      console.log(res)
      setResponseData(res.data)
    }

    ).catch(err => {
      console.log(err)
    })
  }, [])


  function displayPlantInfo(){
    {props.setInfoDisplay({...props.infoDisplay, 
 
      description: responseData['data'][0]['attributes']['description'], 
      image:responseData['data'][0]['attributes']['main_image_path'],
      sun_requirements: responseData['data'][0]['attributes']['sun_requirements'],
      sowing_method: responseData['data'][0]['attributes']['sowing_method'],
      spread: responseData['data'][0]['attributes']['spread'],
      row_spacing: responseData['data'][0]['attributes']['row_spacing'],
      height: responseData['data'][0]['attributes']['height'],
      species: props.plantInfo['species'],
      nickName: props.plantInfo['nickName'],
      dateCreated: props.plantInfo['dateCreated']
    })}
    console.log("CLICKED")
  }

  if(responseData.length != 0){
    console.log(responseData)
    const image = responseData['data'][0]['attributes']['svg_icon']
    displayPlantInfo();

  return(
    <Rnd
    default={{
      x: 0,
      y: 0,
      width: 90,
      height: 90,
    }}className='plant-pot' 
      resizeGrid={[15,15]} 
      dragGrid={[15, 15]} 
      minHeight='90px' 
      minWidth='90px'  
      onDragStop={displayPlantInfo}>

      <img src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}` } className="plant-icon" onError={(e)=>{e.target.onerror = null; e.target.src="./assets/leaf.png"}} onClick={displayPlantInfo}/>


    </Rnd>
    );
  } else {
    return(
      //Render this while GET request hasn't returned respones
      <Rnd
        default={{
          x: 90,
          y: 90,
          width: 90,
          height: 90,
          
        }}className='plant-pot' 
          resizeGrid={[15,15]} 
          dragGrid={[15, 15]} 
          minHeight='90px' 
          minWidth='90px'>

          <img src={`./assets/loading.png` } className="plant-icon" alt="Plant" onClick={displayPlantInfo} />


      </Rnd>
    )
  }
}


//Crop Information Dashboard RnD
const Dashboard = props => {
  return (
    <Rnd   default={{
      x: 1480,
      y: 30,
      width: 400,
      height: 890,
      
    }}  className='dashboard' enableResizing={false} bounds='parent' dragGrid={[15, 15]}>
        <img src={props.infoDisplay['image'] } className="plant-image" onError={(e)=>{e.target.onerror = null; e.target.src="./assets/leaf.png"}} />
        
        <h5>Nickname: </h5>
        <h2>{props.infoDisplay['nickName']}</h2>
 
        <h5>Species:</h5>
        <h3>{props.infoDisplay['species']}</h3>
        
        <h5>Date Acquired:</h5>
        <h3>{props.infoDisplay['dateCreated']}</h3>
       
        <h5>Description:</h5>
        <p id='plantDescription'>{props.infoDisplay['description']}</p>
       
        <h5>Sun Requirements:</h5>
        <h3>{props.infoDisplay['sun_requirements']}</h3>
        
        <h5>Sowing Method:</h5>
        <p id='plantSowMethod'>{props.infoDisplay['sowing_method']}</p>
        
        <h5>Spread:</h5>
        <h3>{props.infoDisplay['spread']}</h3>
        
        <h5>Row Spacing:</h5>
        <h3>{props.infoDisplay['row_spacing']}</h3>
       
        <h5>Height:</h5>
        <h3>{props.infoDisplay['height']}</h3>
        
    </Rnd>
  )

}



//Parent of Crop Elements and Dashboards
const Garden = props => {
  const [plants, setPlant] = useState([]);
  const [infoDisplay, setInfoDisplay] = useState([])
  let plonk = {species:'', nickName: '', dateCreated: '', image:''};

  const addPlant = () => {
    setPlant(plants => [...plants, <Plant plantInfo={ plonk } infoDisplay={infoDisplay} setInfoDisplay={setInfoDisplay}/>]);
    console.log(plants)
  }

  const removePlant = (id) => {
    //Todo
  }


  const updatePlant = (id) => {
    //Todo
  }

  return(
    
  <div className='garden'>
    <AddPlantDialogBox addPlant={addPlant} plonk={plonk} infoDisplay={infoDisplay} setInfoDisplay={setInfoDisplay}/>

    <Dashboard infoDisplay={infoDisplay} setInfoDisplay={setInfoDisplay} plonk={plonk}/>
      {plants.map((item, i) => (
        <div key={i}>{item}</div>
      )
      )}
  </div>
  );
}


//For creating new Crop Elements in user's garden
const AddPlantDialogBox = props => {
  const [showResults, setShowResults] = React.useState(false)

  const onClick = () => setShowResults(!showResults)
  console.log(showResults)

  return (
    <div className='inputDiv'>
      <input type="submit" value="Plant new crop!" onClick={onClick} />
      { showResults ? <NewPlantMenu className='inputForm' plonk={props.plonk} createNew={props.addPlant}/> : null }
    </div>
  )
}



export default App;

