document.addEventListener('DOMContentLoaded', () => {
    const dogTable = document.getElementById('table-body')
    const dogForm = document.getElementById('dog-form')

    function createTable(){
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
        })
    })
    }

    createTable()

    dogTable.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-button')) {
            const dogID = event.target.getAttribute('data-id')
            fetch(`http://localhost:3000/dogs/${dogID}`)
            .then(res => res.json())
            .then(dog => {
                dogForm.innerHTML = `
                <input type="hidden" name="dogID" value="${dog.id}" />
                <input type="text" name="name" placeholder="dog's name" value="${dog.name}" />
                <input type="text" name="breed" placeholder="dog's breed" value="${dog.breed}" />
                <input type="text" name="sex" placeholder="dog's sex" value="${dog.sex}" />
                <input type="submit" value="Submit" />
                `
            })
        }
    })

    dogForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const dogID = dogForm.querySelector('[name="dogID"]').value;

        const updatedDog = {
            name:dogForm.querySelector('[name="name"]').value,
            breed:dogForm.querySelector('[name="breed"]').value,
            sex:dogForm.querySelector('[name="sex"]').value
        }

        fetch(`http://localhost:3000/dogs/${dogID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(updatedDog)
        })
        .then(() => {
            dogTable.innerHTML = ''
            createTable()
        })

    })
})