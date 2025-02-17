/*  

Add an event listener that runs 

  when a user clicks on the map element. 

*/ 

map.on('mousemove', (event) => { 
  const features = map.queryRenderedFeatures(event.point, { 
    layers: ['zhejiang-homestaysites'] // replace with your layer name 
  }); 
  if (!features.length) { 
    return; 
  } 
  const feature = features[0]; 

  const popup = new mapboxgl.Popup({ offset: [0, -15], className:"my-popup"}) 
    .setLngLat(feature.geometry.coordinates) 
    .setHTML(`<h3>${feature.properties.Name}</h3>
              <p>Level: ${feature.properties.Level}</p>
              <p>Address: ${feature.properties.address}</p>`)
    .addTo(map); 
}); 

filterType = ["!=", ["get", "Level"], "placeholder"];
//Radio button interaction code goes below
map.setFilter("zhejiang-homestaysites", ["all",  filterType]);
document.getElementById('filters').addEventListener('change', (event) => {
const type = event.target.value;
console.log(type);
// update the map filter
if (type === 'all') {
            filterType = ["all"];
        } else if (type === 'Platinum lodge') {
            filterType = ["==", ["get", "Level"], "Platinum lodge"];
        } else if (type === 'Jinsu') {
            filterType = ["==", ["get", "Level"], "Jinsu"];
        } else {
            console.log('error');
        }
 map.setFilter("zhejiang-homestaysites", ["all", filterType]);
});


