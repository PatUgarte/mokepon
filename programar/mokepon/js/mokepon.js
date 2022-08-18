// Global variables
const attackTypes = ['TIERRA', 'FUEGO', 'AGUA']
const initialBattleResults = '. . .'

let playerLives = 3
let opponentLives = 3
let playerAttack
let opponentAttack
let battleResults

// Functions
const randomize = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const handleOpponentPetSelection = () => {
    let mascotaAleatoria = randomize(1, 3)
    let spanMascotaEnemigo = document.getElementById('lives-section__opponent-pet')
    let opponentPetBadgeElement = document.getElementById('lives-section__opponent-pet-badge')

    if (mascotaAleatoria === 1) {
        spanMascotaEnemigo.innerHTML = 'Capipepo'
        opponentPetBadgeElement.src = './assets/img/mokepones/capipepo-badge.png'
    } else if (mascotaAleatoria === 2) {
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
        opponentPetBadgeElement.src = './assets/img/mokepones/ratigueya-badge.png'
    } else {
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
        opponentPetBadgeElement.src = './assets/img/mokepones/hipodoge-badge.png'
    }
}
const handlePlayerPetSelection = () => {
    // Hide selection section
    let selectionSectionElement = document.getElementById('pet-selection-section')
    selectionSectionElement.style.display = 'none'

    // Show battle section
    let battleSectionElement = document.getElementById('attack-selection-section')
    battleSectionElement.style.display = 'flex'
    let battleResultsElement = document.getElementById('battle-results')
    battleResultsElement.innerHTML = initialBattleResults

    // Player's Mokepon selection
    let hipodogeInputElement = document.getElementById('hipodoge')
    let capipepoInputElement = document.getElementById('capipepo')
    let ratigueyaInputElement = document.getElementById('ratigueya')

    let playerPetSpanElement = document.getElementById('lives-section__player-pet')
    let playerPetBadgeElement = document.getElementById('lives-section__player-pet-badge')
    if (capipepoInputElement.checked) {
        playerPetSpanElement.innerHTML = 'Capipepo'
        playerPetBadgeElement.src = './assets/img/mokepones/capipepo-badge.png'
    } else if (ratigueyaInputElement.checked) {
        playerPetSpanElement.innerHTML = 'Ratigueya'
        playerPetBadgeElement.src = './assets/img/mokepones/ratigueya-badge.png'
    } else if (hipodogeInputElement.checked) {
        playerPetSpanElement.innerHTML = 'Hipodoge'
        playerPetBadgeElement.src = './assets/img/mokepones/hipodoge-badge.png'
    }

    // Opponent's Mokepon selection
    handleOpponentPetSelection()
}

const addNewResultMessage = (resultMessage) => {
    let battleResultsAreaElement = document.getElementById('battle-results')
    if (battleResultsAreaElement.innerHTML === initialBattleResults)
        battleResultsAreaElement.innerHTML = ''

    battleResultsAreaElement.innerHTML = '> Atacaste con ' + playerAttack + ', tu oponente atacó con ' + opponentAttack + ' - ' + resultMessage + (battleResultsAreaElement.innerHTML ? '\n' : '') + battleResultsAreaElement.innerHTML
}

const addFinalResultMessage = (finalResult) => {
    // Set final message
    let battleResultsAreaElement = document.getElementById('battle-results')
    battleResultsAreaElement.innerHTML = '----------------------------------------------------------\n' + finalResult + '\n----------------------------------------------------------\n' + battleResultsAreaElement.innerHTML

    // Disable attack
    let groundButtonElement = document.getElementById('ground-button')
    let fireButtonElement = document.getElementById('fire-button')
    let waterButtonElement = document.getElementById('water-button')
    groundButtonElement.disabled = true
    fireButtonElement.disabled = true
    waterButtonElement.disabled = true

    // Show restart button
    let restartSectionElement = document.getElementById('restart-section')
    restartSectionElement.style.display = 'block'
}

const checkLivesState = () => {
    if (opponentLives === 0)
        addFinalResultMessage('¡Felicitaciones! GANASTE :)')
    else if (playerLives === 0)
        addFinalResultMessage('Lo siento, PERDISTE :(')
}

const battleExecution = () => {
    let playerLivesElement = document.getElementById('player-lives')
    let opponentLivesElement = document.getElementById('opponent-lives')

    if (opponentAttack === playerAttack) {
        addNewResultMessage('EMPATE')
    } else if (playerAttack === attackTypes[1] && opponentAttack === attackTypes[0]) {
        addNewResultMessage('GANASTE')
        opponentLives--
        opponentLivesElement.src = `./assets/img/number-${opponentLives}.png`
    } else if (playerAttack === attackTypes[2] && opponentAttack === attackTypes[1]) {
        addNewResultMessage('GANASTE')
        opponentLives--
        opponentLivesElement.src = `./assets/img/number-${opponentLives}.png`
    } else if (playerAttack === attackTypes[0] && opponentAttack === attackTypes[2]) {
        addNewResultMessage('GANASTE')
        opponentLives--
        opponentLivesElement.src = `./assets/img/number-${opponentLives}.png`
    } else {
        addNewResultMessage('PERDISTE')
        playerLives--
        playerLivesElement.src = `./assets/img/number-${playerLives}.png`
    }

    checkLivesState()
}

const getRandomOpponentAttack = () => {
    let randomAttackNumber = randomize(1, 3)
    if (randomAttackNumber === 1) {
        opponentAttack = attackTypes[1]
    } else if (randomAttackNumber === 2) {
        opponentAttack = attackTypes[2]
    } else {
        opponentAttack = attackTypes[0]
    }

    battleExecution()
}

const groundAttack = () => {
    playerAttack = attackTypes[0]
    getRandomOpponentAttack()
}
const fireAttack = () => {
    playerAttack = attackTypes[1]
    getRandomOpponentAttack()
}
const waterAttack = () => {
    playerAttack = attackTypes[2]
    getRandomOpponentAttack()
}

const restartGame = () => { location.reload() }

const iniciarJuego = () => {
    // Hide battle section
    let battleSectionElement = document.getElementById('attack-selection-section')
    let restartSectionElement = document.getElementById('restart-section')
    battleSectionElement.style.display = 'none'
    restartSectionElement.style.display = 'none'

    // Mokeballs visual effect (showing pet cards)
    let mokeballImageElements = document.querySelectorAll('.pet-container__mokeball')
    let petCardElements = document.querySelectorAll('.pet-container__card--hidden')
    for (let i = 0; i < mokeballImageElements.length; i++) {
        mokeballImageElements[i].addEventListener('click', function () {
            mokeballImageElements[i].classList.remove('pet-container__mokeball')
            mokeballImageElements[i].classList.add('pet-container__mokeball--hidden')
            petCardElements[i].classList.remove('pet-container__card--hidden')
            petCardElements[i].classList.add('pet-container__card')
        })
    }

    // Player's pet selection
    let petSelectionButtonElement = document.getElementById('pet-selection-button')
    petCardElements[0].addEventListener('click', function () {
        petCardElements[0].classList.add('pet-container__card--checked--capipepo')
        petCardElements[1].classList.remove('pet-container__card--checked--ratigueya')
        petCardElements[2].classList.remove('pet-container__card--checked--hipodoge')
        petSelectionButtonElement.classList.remove('pet-selection__button--disabled')
    })
    petCardElements[1].addEventListener('click', function () {
        petCardElements[0].classList.remove('pet-container__card--checked--capipepo')
        petCardElements[1].classList.add('pet-container__card--checked--ratigueya')
        petCardElements[2].classList.remove('pet-container__card--checked--hipodoge')
        petSelectionButtonElement.classList.remove('pet-selection__button--disabled')
    })
    petCardElements[2].addEventListener('click', function () {
        petCardElements[0].classList.remove('pet-container__card--checked--capipepo')
        petCardElements[1].classList.remove('pet-container__card--checked--ratigueya')
        petCardElements[2].classList.add('pet-container__card--checked--hipodoge')
        petSelectionButtonElement.classList.remove('pet-selection__button--disabled')
    })
    petSelectionButtonElement.addEventListener('click', handlePlayerPetSelection)

    // Setting battle initial conditions
    let playerLivesElement = document.getElementById('player-lives')
    let opponentLivesElement = document.getElementById('opponent-lives')
    playerLivesElement.src = `./assets/img/number-${playerLives}.png`
    opponentLivesElement.src = `./assets/img/number-${opponentLives}.png`

    // Selecting attack types
    let groundButtonElement = document.getElementById('ground-button')
    let fireButtonElement = document.getElementById('fire-button')
    let waterButtonElement = document.getElementById('water-button')
    groundButtonElement.addEventListener('click', groundAttack)
    fireButtonElement.addEventListener('click', fireAttack)
    waterButtonElement.addEventListener('click', waterAttack)

    // Restarting game
    let restartButtonElement = document.getElementById('restart-section__button')
    restartButtonElement.addEventListener('click', restartGame)
}

const playAudio = (url) => { new Audio(url).play() }

window.addEventListener('load', iniciarJuego)
