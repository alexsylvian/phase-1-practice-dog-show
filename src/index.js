document.addEventListener('DOMContentLoaded', () => {
    const dogTable = document.getElementById('table-body')

    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(dogData => {
        dogData.forEach(dog => {
            const dogRow = document.createElement('tr')
            dogRow.innerHTML = `
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <button class ="edit-button" data-id="${dog.id}">Edit Dog</button>
            `
            dogTable.append(dogRow)

            const buttons = document.getElementsByClassName('edit-button')
        })
    })
})