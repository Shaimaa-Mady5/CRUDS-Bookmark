var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var siteDescription = document.getElementById("siteDesc");
var siteList = [];
var updateIndex =0;
if(localStorage.getItem('sites') != null){
    siteList = JSON.parse(localStorage.getItem('sites'))
    displayData()
}

function addSite() {
  var site = {
    name: siteName.value,
    url: siteUrl.value,
    description :siteDescription.value,
  };
  siteList.push(site);
  clearInput()
    localStorage.setItem('sites' , JSON.stringify(siteList));
    displayData()

}

function clearInput() {
    siteName.value =""
    siteUrl.value =""
    siteDescription.value =""
}
function displayData() {
    var allTableData = "";
    for( var i=0 ; i<siteList.length ; i++ ){
        allTableData+=`
        <tr>
        <td>${i+1}</td>
        <td>${siteList[i].name}</td>
        <td>${siteList[i].description}</td> 
        <td><a href="${siteList[i].url}" target="-blank"><button class="btn btn-warning "><i class="fa-solid fa-eye pe-1"></i>Visit</button></a></td>
        <td><button onclick="updateSite(${i})" class="btn btn-success"><i class="fa-solid fa-pen-to-square"></i> Update</button></td>
        <td><button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>
        `
    }
    document.getElementById('bodyData').innerHTML=allTableData;
    
}

function deleteSite(index){
    siteList.splice(index,1)
    localStorage.setItem('sites' , JSON.stringify(siteList));
    displayData()
    console.log(siteList)
}

function searchSite(){
    var term=document.getElementById("searchSite").value;
    var allTableData = "";
   for( var i=0 ; i<siteList.length ; i++){
        if( siteList[i].name.toLowerCase().includes(term.toLowerCase()) ){
            allTableData+=`
            <tr>
            <td>${i+1}</td>
            <td>${siteList[i].name}</td>
            <td>${siteList[i].description}</td> 
            <td><a href="${siteList[i].url}" target="-blank"><button class="btn btn-warning "><i class="fa-solid fa-eye pe-1"></i>Visit</button></a></td>
            <td><button class="btn btn-success"><i class="fa-solid fa-pen-to-square"></i> Update</button></td>
            <td><button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>
            `    
        }
        document.getElementById('bodyData').innerHTML=allTableData;
     
   }

}
function updateSite(index){
    updateIndex= index;
    siteName.value =siteList[index].name;
    siteUrl.value =siteList[index].url
    siteDescription.value = siteList[index].description
    document.getElementById('btnSubmit').classList.add('d-none')
    document.getElementById('btnUpdate').classList.remove('d-none')
}
function updateButton(){
    var site = {
        name: siteName.value,
        url: siteUrl.value,
        description :siteDescription.value,
      };
      siteList.splice( updateIndex , 1, site)
      document.getElementById('btnSubmit').classList.remove('d-none')
      document.getElementById('btnUpdate').classList.add('d-none')
      localStorage.setItem('sites' , JSON.stringify(siteList))
      displayData()
      clearInput()
}



