const Fhir = require('./node_modules/fhir.js/src/adapters/native');
var client = Fhir({
    baseUrl: 'https://XXXXXXXXX.execute-api.us-east-2.amazonaws.com/fhir',
    
    headers: {
      'x-api-key':'EXAMPLE-API-KEY-Gv2eBhprQF96YEvmIG',
      'accept':'*/*'
    }
});

function getName(r) {
  let name = '';
  if (r.name && r.name.length > 0) {
    if (r.name[0].given && r.name[0].given.length > 0) {
      name += `${r.name[0].given[0]} `;
    }
    if (r.name[0].family) {
      name += r.name[0].family;
    }
  }

  return name;
}
window.patientDetails = function (id=4) {
    const pTitle= document.querySelector('#patientModalTitle');
    const pBody= document.querySelector('#patientModalBody');

    client.read({type: 'Patient', patient: id}).then((res) => {
        pTitle.innerHTML=getName(res.data)
        pBody.innerHTML='<pre>'+JSON.stringify(res.data,null, '   ')+'</pre>'
        $('#patientModal').modal('show')
        
        //alert (res.data);
    })
}
window.getPatients = function (page = 1, limit = 25) {
  //$('.alert').alert()
  const pDoc = document.querySelector('#pagination');
  const ptDoc = document.querySelector('#patients');
  var searchFor=document.querySelector('#search').value;
  if (searchFor==='') {
    searchFor=' ';
  }
  //alert(searchFor);
  client.search({
    type: 'Patient',
    query: {
      _count: limit*page,
      "name:contains": searchFor
      //_page: page
    }
  })
    .then((res) => {
      const bundle = res.data;
      const skipRecords=(page-1)*limit
      var resultId=0;
      ptDoc.innerHTML = '      <thead><tr><th scope="col">Name</th><th scope="col">Gender</th><th scope="col">DOB</th></tr></thead>		  ';
      if (bundle.total>0) bundle.entry.forEach((patient) => {
            resultId++;
            const name = getName(patient.resource);
            const gender=patient.resource.gender;
            const age=patient.resource.birthDate;
            const pid=patient.resource.id
            //const li = document.createElement('tr');
            //li.innerText = name+' '+gender+' '+age;
            //ptDoc.appendChild(li)
            const tr = document.createElement('tr');
            if ((name.length>0)&&(resultId>skipRecords)) {
                tr.innerHTML = '<td><a href="#" onclick="patientDetails(id='+pid+')">'+name+'</a> </td><td> '+gender+'</td><td>'+age;
                ptDoc.appendChild(tr)
        
            }
        } 
    
    );
      //pDoc.innerHTML = `Page: ${page}<br>${limit} of ${bundle.total}`;
      numPages=Math.ceil(bundle.total/limit)
      pagesHTML=''
      for (p=1;p<numPages;p++) {
        if (p===page){
            activePage=' active'
        } else {
            activePage=''
        }
        pagesHTML=pagesHTML+'\n<li class="page-item"><a class="page-link'+activePage+'" href="#" onClick="getPatients(page='+p+')">'+p+'</a></li>'
      }
      pDoc.innerHTML = ' <nav aria-label="Page navigation example">'+
        '<ul class="pagination">'+
        //'<li class="page-item"><a class="page-link" onClick="getPatients(page=1)">1</a></li>'+
        //'<li class="page-item"><a class="page-link" onClick="getPatients(page=2)">2</a></li>'+
        //'<li class="page-item"><a class="page-link" onClick="getPatients(page=3)">3</a></li>'+
        //'<li class="page-item"><a class="page-link" onClick="#">Next</a></li>'+
        pagesHTML+
        '</ul></nav>'+ 'Total:' + bundle.total 
      //pDoc.innerHTML = '<li class="page-item"><a class="page-link" href="#">1</a></li>'
    })
    .catch((err) => {
      ptDoc.innerHTML = '';
      pDoc.innerHTML = 'Error';
      // Error responses
      if (err.status) {
        console.log(err);
        console.log('Error', err.status);
      }
      // Errors
      if (err.data && err.data) {
        console.log('Error', err.data);
      }
    });
}
