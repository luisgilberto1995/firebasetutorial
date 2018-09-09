const cafelist = document.querySelector('#cafe-list')
const formulario = document.querySelector('#add-cafe-form')

//crear elemento y renderizar cafe
function renderCafe(doc){
    let li = document.createElement('li')
    let nombre = document.createElement('span')
    let ciudad = document.createElement('span')
    let cross = document.createElement('div')

    li.setAttribute('data-id', doc.id)
    nombre.textContent = doc.data().nombre
    ciudad.textContent = doc.data().ciudad
    cross.textContent = 'x'

    li.appendChild(nombre)
    li.appendChild(ciudad)
    li.appendChild(cross)

    cafelist.appendChild(li)

    //Eliminar datos

    cross.addEventListener('click', (e) => {
        e.stopPropagation()
        let id =e.target.parentElement.getAttribute('data-id')

        db.collection('cafes').doc(id).delete()
    })
}

//----------------Obtener Todos los Datos
//db.collection('cafes').get().then( (snapshot) => {
//   //console.log(snapshot.docs)
//      snapshot.docs.forEach(doc => {
//     //console.log(doc.data)
//      renderCafe(doc)
//});
//})

//-----------------Obtener datos por consulta
//db.collection('cafes').where('ciudad', '==', 'PS1').get().then( (snapshot) => {
    //console.log(snapshot.docs)
 //   snapshot.docs.forEach(doc => {
 //       //console.log(doc.data)
 //       renderCafe(doc)
 //   });
//})


//-------------Obtener datos y ordenarlos
//db.collection('cafes').orderBy('ciudad').get().then( (snapshot) => {
    //console.log(snapshot.docs)
//    snapshot.docs.forEach(doc => {
//        //console.log(doc.data)
//        renderCafe(doc)
//    });
//})



//Guardar datos
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        nombre: formulario.nombre.value,
        ciudad: formulario.consola.value
    })

    formulario.nombre.value = ''
    formulario.consola.value = ''
})


//--------------Tiempo real
db.collection('cafes').orderBy('ciudad').onSnapshot( snapshot => 
{
    let changes = snapshot.docChanges();
    console.log(changes)
    changes.forEach(change => 
    {
        console.log(change.doc.data())
        if(change.type == 'added')
        {
            renderCafe(change.doc)
        }
        else if (change.type == 'removed')
        {
            let li = cafelist.querySelector('[data-id='+change.doc.id+']')
            cafelist.removeChild(li);
        }
    });
})