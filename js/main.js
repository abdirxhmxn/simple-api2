//https://dattebayo-api.onrender.com
document.querySelector('button').addEventListener('click', searchNaruto)

function searchNaruto() {
    let name = document.querySelector('input').value.toLowerCase()
    const url = `https://dattebayo-api.onrender.com/characters?name=${name}`
    // const url = `https://dattebayo-api.onrender.com/akatsuki`
    // const url = `https://dattebayo-api.onrender.com/tailed-beasts`
    const image = document.querySelector('img')
    const displayName = document.querySelector('#name')
    const familyTree = document.querySelector('#family')
    const affiliation = document.querySelector('p')
    reset()
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let shinobi = data.characters[0]

            console.log(shinobi)
            image.src = shinobi.images[0]
            const container = document.createElement('div')
            for (i = 0; i < 10; i++) {
                const art = document.createElement('p')
                art.innerText = `${shinobi.jutsu[i]}`
                container.appendChild(art)
            }
            document.body.appendChild(container)
            displayName.innerText = shinobi.name

            if (!shinobi.family.mother && !shinobi.family.father) {
                familyTree.innerText = `${displayName.innerText} is an orphan.`
            } else if (!shinobi.family.father && shinobi.family.mother) {
                familyTree.innerText = [`Mother: ${shinobi.family.mother}\n  Father: Unknown`]
            } else if (shinobi.family.mother && shinobi.family.father) {
                familyTree.innerText = [`Mother: ${shinobi.family.mother}\n  Father: ${shinobi.family.father}`]
            }
            // familyTree.innerText = [`Mother: ${shinobi.family.mother}\n  Father: ${shinobi.family.father}`]
        })
        .catch(err => {
            console.log(`err ${err}`)
        })
}
function reset() {
    const info = document.querySelectorAll('p')
    if (info) {
        info.forEach(element => {
            //https://developer.mozilla.org/en-US/docs/Web/API/Element/remove
            element.remove()
        })
    }
}