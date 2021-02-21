const argonautesList = document.querySelector('.argoList');
const form = document.querySelector('#add-argonaute-form');


/**********************************************************************/
//Render UI
const renderArgo = (element) => {
    document.querySelector('.argoList').innerHTML += `
        <div class="col-4 argoName" data-id= ${element.id}>
        <div>${element.data().name}</div>
        <i class="far fa-trash-alt trash" id='${element.id}'></i>
        </div>
    `
}
// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!(form.name.value.length)) {
        document.querySelector('.error').classList.remove('d-none')
    } else {
        document.querySelector('.error').classList.add('d-none')
        db.collection('argonautes').add({
            name: form.name.value
        });
    }

    form.name.value = '';
});
// real-time listener
db.collection('argonautes').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            renderArgo(change.doc)
            // renderUI(change.doc);
        } else if (change.type == 'removed') {
            let argoDiv = argonautesList.querySelector('[data-id=' + change.doc.id + ']');
            argonautesList.removeChild(argoDiv);
        }
    });
    //delete data
    let trashIcons = document.querySelectorAll('.trash')
    trashIcons.forEach((icon) => {
        icon.addEventListener('click', (e) => {
            db.collection('argonautes').doc(e.target.id).delete();
        });
    })
})







