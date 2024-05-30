// This file contains functions used for form utilities within the system

async function getStates() {
    var states = []

    // gets all states from table `estado` and adds them all as Objects to states array
    await $.post('../php-scripts/address.php', { function: 'getStates' }, (response) => {
        const responseArr = response.split('//\\').filter(state => state.trim())
        
        responseArr.forEach(state => states.push(JSON.parse(state)))
    })
    
    return states
}

async function getCities(stateId) {
    var cities = []

    // gets all cities from table `cidade` from given state and adds them all as Objects to cities array
    await $.post('../php-scripts/address.php', { function: 'getCities', state: stateId }, (response) => {
        const responseArr = response.split('//\\').filter(state => state.trim())

        responseArr.forEach(city => cities.push(JSON.parse(city)))
    })

    return cities
}

if ($('state')) {
    getStates().then(states => {
        // creates an option in the selector for each state
        states.forEach(state => {

            const option = document.createElement('option')
            option.value = state.id_estado
            option.innerText = state.nome_estado
            
            document.getElementsByName('state').forEach(selector => selector.append(option))
        })
    })
}

if ($('city')) {
    document.getElementsByName('state').forEach(element => 
        element.addEventListener('change', () => {

            document.getElementsByName('city').forEach(selector => selector.innerHTML = `<option selected>Cidade</option>`)

            var state = $(element).val()
            
            
            // if there was no selected state (the "selected state" being "Estado"), it disables the city selector and doesn't proceed
            if (state == 'Estado') {
                document.getElementsByName('city').forEach(selector => selector.setAttribute('disabled', true))
                return
            }

            document.getElementsByName('city').forEach(selector => selector.removeAttribute('disabled'))
            
            getCities(state).then(cities => {

                // creates an option in the selector for each state
                cities.forEach(city => {

                    const option = document.createElement('option')
                    option.value = city.id_cidade
                    option.innerText = city.nome_cidade

                    document.getElementsByName('city').forEach(selector => selector.append(option))
                })
            }
            )

        })
    )
}

// TODO: make this vaildateForm() work and use it instead of Bootstraps
function checkFormValidity(form) {
    const formData = new FormData(form)
    var allValid = true
    
    var validateField = {
        name: validName,
        email: validEmail,    
        phone: validPhone,
        whatsapp: validPhone,
        cpf: validCPF,
        birthdate: validBirthdate,
        state: validState,
        city: validCity,

    }

    formData.entries().forEach(async input => {
        if (validateField[input[0]]) {
            const formInput = form[input[0]]
            
            const validField = await validateField[input[0]](formInput)

            // the next valid fields won't change the result if there was an invalid field before
            // this won't stop the verification though, as all invalid fields should be warned to the user
            allValid = !allValid ? false : validField
            return
        }
    })

    return allValid
}
    
if ($('button#signup_btn')) {
    $('button#signup_btn').on('click', () => {
        var form = document.querySelector('form.needs-validation')
        
        if (!checkFormValidity(form)) {
            return
        }
        
        // using FormData.entries() to create an object structured as {*input[i]_name*: *input[i]_value*}
        const formData = new FormData(form)
        const dataObj = Object.fromEntries(formData.entries())
        
        debugger
        createUser(dataObj).then();
    })
}