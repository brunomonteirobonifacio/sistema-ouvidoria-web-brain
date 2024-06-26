// =========================================================================================
// this file is dedicated to get user-related data from database, such as signup and login
// =========================================================================================

// function receives a data object containing the fields and their respective values
async function createUser(data) {
    var statusCode;
    await $.post(`${getPhpPath()}/user.php`, { function: 'createUser', ...data }, (response) => {
        statusCode = response;

        debugger;
    })

    statusCode = parseInt(statusCode.split(' ')[1]) || 500;

    // returns false if registration failed
    if (statusCode != 201) return false;

    return true;
}

async function loginUser(email, password) {
    var successfulLogin;

    await $.post(`${getPhpPath()}/user.php`, { function: 'loginUser', email, password }, (response) => {
        
        // function will retrieve 1 if login was successful, 0 if it wasn't
        successfulLogin = Boolean(parseInt(response));
    })

    return successfulLogin;
}

async function logoffUser() {
    await $.post(`${getPhpPath()}/user.php`, { function: 'logoffUser' });
}

async function getLoggedUsername() {
    var username;

    await $.post(`${getPhpPath()}/user.php`, { function: 'getLoggedUsername' }, (response) => {

        // function will retrive username, or 0 if not logged
        username = response;
    })

    return username;
}

async function getStates() {
    var states = [];

    // gets all states from table `estado` and adds them all as Objects to states array
    await $.post(`${getPhpPath()}/address.php`, { function: 'getStates' }, (response) => {
        const responseArr = response.split('//\\').filter(state => state.trim());
        
        responseArr.forEach(state => states.push(JSON.parse(state)));
    })
    
    return states;
}

async function getCities(stateId) {
    var cities = [];

    // gets all cities from table `cidade` from given state and adds them all as Objects to cities array
    await $.post(`${getPhpPath()}/address.php`, { function: 'getCities', state: stateId }, (response) => {
        const responseArr = response.split('//\\').filter(state => state.trim());

        responseArr.forEach(city => cities.push(JSON.parse(city)));
    })

    return cities;
}

// doesn't rewrite current onload action, instead it just adds to it
window.addEventListener('load', () => {
    if (document.querySelector('.username')) {
        // returns username if logged, '0' if not logged
        getLoggedUsername().then(response => {
            // gets first name of logged user
            $('.username').text(response.split(' ')[0]);
        })
    }

    if (document.querySelector('.user-options')) {
        getLoggedUsername().then(response => {
            const username = response;

            // if user is not logged, show create account and login options
            if (username == '0') {
                
                $('.user-logged').hide();
                $('.user-not-logged').show();

                return;
            }

            $('.user-not-logged').hide();
            $('.user-logged').show();
        })
    }
})

// asks for user to confirm logoff
$('#logoff').on('click', () => {
    $('#logoffModalLabel').text('Sair da conta');
    $('.modal-body').text('Deseja realmente sair de sua conta?');

    $('#logoffModal').modal('show');
})

$('#logoffModalBtn').on('click', async () => {
    await logoffUser();
    
    // send user to homepage after logging off, assuring it always goes to homepage
    window.location.href = `${getPhpPath()}/../index.php`;
})