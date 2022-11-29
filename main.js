


window.getLocation = getLocation



function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    }else {
        console.log('not suported')
    }
}

function showPosition(position){
    let lat= position.coords.latitude
    let long= position.coords.longitude
    getAdress(lat,long)
    

}

async function getAdress(lat,lon){
    
    try{
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=18&addressdetails=1`)
        if (response.ok){
            const jsonResponse = await response.json()
            let road = jsonResponse.address.road
            let residencial = jsonResponse.address.residential
            let town = jsonResponse.address.town
            let generalAdress = jsonResponse.display_name
            console.log(jsonResponse)
            showAdress(road,residencial, town, generalAdress)
        }
    }catch(error){
        console.log(error)
    }
}

function showAdress(road, residencial, town, general){
    let x = document.querySelector('#adress')
    if (road){
        x.value = `${road}, ${town}`
    }else if (residencial) {
        x.value = `${residencial}, ${town}`
    }else {
        x.value =  `${general}`

    }
    
 
    
  
    
}