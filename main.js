


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
            let town = jsonResponse.address.town
            let code = jsonResponse.address.postcode
            let address = jsonResponse.address.residential

            console.log(jsonResponse)
            showAdress(address, town, code)
        }
    }catch(error){
        console.log(error)
    }
}

function showAdress(address, town, code){
    let x = document.querySelector('#adress')
    x.value = `${address}, ${town}, ${code}`
}