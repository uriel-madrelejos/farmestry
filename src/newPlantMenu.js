import React, { useState } from "react";
import { Rnd } from 'react-rnd';
import Carousel from 'react-elastic-carousel'


const NewPlantMenu = props => {

  const [plantInfo, setPlantInfo] = useState({species:'', nickName: '', dateCreated: '', image:''});
  const [selectedIcon, setSelectedIcon] = useState([])


  function handleClick(source) {
    props.plonk['image']=source;
    console.log(source);
    console.log(props.plonk['image'])
  }




  const handleSubmit = (e) => {
      e.preventDefault();
      props.plonk['species'] = plantInfo['species']
      props.plonk['nickName'] = plantInfo['nickName']
      props.plonk['dateCreated'] = plantInfo['dateCreated']
      console.log(plantInfo);
    //   props.parentCallback(plantInfo);
      props.createNew();
  }  


  return (
    <Rnd
    default={{
      x: 790,
      y: 140,
      width: 300,
      height: 260,
      
    }} className='plant-form' enableResizing={false} dragGrid={[15, 15]}
    >
      {/* <Carousel>
          {PLANT_IMAGES.map(image => (
          <PlantIcon  source={image} key={image} name ={image}/>
        ))}
      </Carousel> */}

 
    <form onSubmit={handleSubmit} className='form'>


      <label>What crop will you be planting?</label>
      <input
        type="text"
        required
        value={plantInfo.species}
        onChange={e => {setPlantInfo({...plantInfo, species: e.target.value})
    
        }}
        placeholder="Species"
      />
      <br/>
      <label>What will you name it?</label>
      <br/>
      <input
        type="text"
        required
        value={plantInfo.nickName}
        onChange={e => setPlantInfo({...plantInfo, nickName: e.target.value})}
        placeholder="Nickname"
      />
            <br/>
      <label>Date Acquired</label>
      <br/>
      <input
        type="date"
        required
        value={plantInfo.dateAcquired}
        onChange={e => setPlantInfo({...plantInfo, dateCreated: e.target.value})}
        placeholder="Estimated Age"
      />
      <br/>

       <input type='submit' value='plant!' />


    </form>
    </Rnd>
  );
}


export default NewPlantMenu;