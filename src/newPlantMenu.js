import React, { useState } from "react";
import { Rnd } from 'react-rnd';
import Carousel from 'react-elastic-carousel'


const NewPlantMenu = props => {
//   const [species, setSpecies] = useState("");
//   const [name, setName] = useState("");
//   const [dateAcquired, setDateAcquired] = useState("");
  const [plantInfo, setPlantInfo] = useState({species:'', nickName: '', dateCreated: '', image:''});
  const [selectedIcon, setSelectedIcon] = useState([])


  function handleClick(source) {
    props.plonk['image']=source;
    console.log(source);
    console.log(props.plonk['image'])
  }

  const Button = props => {
    const [isSelected, setColor] = useState(false);

    function changeColor(){
      if(selectedIcon.length==0){
        setColor(!isSelected);
      }
    }

    let btn_class= isSelected? "blackButton" : "whiteButton";

    return (
      <div>
          <button className={btn_class}
                  onClick={ () => {handleClick(props.source); 
                                    changeColor();} }>
                    <img className='plant-icon' src={`./assets/${props.source}`} className="plant-icon" alt="Plant" /> 
           </button>
      </div>
 )
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

  const PlantIcon = props => {
    return(
      <Button source={props.source} onClick={() => handleClick(props.source)} />
        
    )

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