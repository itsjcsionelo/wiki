const heroIMG = document.querySelector('.app--hero__img')
const signIn = document.querySelector('[data-signin]')
const signInAlt = document.querySelector('[data-signin-alt]')
const signOut = document.querySelector('[data-signout]')
const signOutAlt = document.querySelector('[data-signout-alt]')
const appSearch = document.querySelector('[data-search]')
const appAuth = document.querySelector('[data-auth]')
const searchIC = document.querySelector('[data-search-ic]')
const loginUser = document.querySelector('[data-login]')
const registerUser = document.querySelector('[data-register]')
const user = document.querySelector('[data-user]')
const status = document.querySelector('[data-status]')
const hero = document.querySelector('[data-hero]')
const design = document.querySelector('[data-design]')
const desc = document.querySelector('[data-desc]')
const suggestions = document.querySelector('[data-suggestions]')
const searchBar = document.querySelector('[data-search-bar]')
const searchBtn = document.querySelector('[data-search-btn]')

const fullRes = heroIMG.getAttribute('data-src')
heroIMG.src = fullRes

const subjects = suggestions.children

for (let i = 0; i < subjects.length; ++i) {
    let sub = subjects[i]
    sub.onclick = () => {
        let value = sub.textContent.substring(1)
        searchBar.value = value
    }
}

searchBar.addEventListener("keypress", e => {
    if (e.key === 'Enter') searchBar.value = ''
})

searchBtn.onclick = () => searchBar.value = ''

signIn.onclick = () => {
    appSearch.style.display = 'none'
    appAuth.style.display = 'grid'
    signIn.style.display = 'none'
    searchIC.style.display = 'block'
    signInAlt.style.transform = 'rotate(180deg)'
    design.style.opacity = '0'
    desc.style.opacity = '0'

    window.addEventListener('resize', () => {
        if (document.defaultView.getComputedStyle(searchIC).display === 'block') {
            signIn.style.display = 'none'
        }
    })
}

signInAlt.onclick = () => {

    if (signInAlt.style.transform === 'rotate(180deg)') {
        signInAlt.style.transform = 'rotate(0)'
        appAuth.style.display = 'none'
        appSearch.style.display = 'grid'
        hero.style.display = 'grid'
        design.style.opacity = '1'
        desc.style.opacity = '1'
        searchIC.style.display = 'none'

        window.addEventListener('resize', () => signIn.style.display = 'block')

        searchIC.onclick.call(searchIC)

    } else {

        appAuth.style.display = 'grid'
        appSearch.style.display = 'none'
        signInAlt.style.transform = 'rotate(180deg)'
        design.style.opacity = '0'
        desc.style.opacity = '0'
        searchIC.style.display = 'block'

        window.addEventListener('resize', () => signIn.style.display = 'none')

        signIn.onclick.call(signIn)

    }
}

searchIC.onclick = () => {
    appSearch.style.display = 'grid'
    appAuth.style.display = 'none'
    signIn.style.display = 'block'
    searchIC.style.display = 'none'
    signInAlt.style.transform = 'rotate(0)'
    design.style.opacity = '1'
    desc.style.opacity = '1'
}

loginUser.onclick = () => {
    appAuth.firstElementChild.style.display = 'grid'
    appAuth.lastElementChild.style.display = 'none'
}

registerUser.onclick = () => {
    appAuth.firstElementChild.style.display = 'none'
    appAuth.lastElementChild.style.display = 'grid'
}

const regUsername = document.querySelector('[data-reg-username]')
const regEmail = document.querySelector('[data-reg-email]')
const regPass = document.querySelector('[data-reg-pass]')
const passReq = document.querySelector('[data-pass-req]')
const signUp = document.querySelector('[data-signup]')
const appMessage = document.querySelector('[data-app-message]')
const authMessage = document.querySelector('[data-auth-message]')

regPass.onfocus = () => passReq.style.display = 'grid'
signUp.onclick = () => setTimeout(() => passReq.style.display = 'none', 5000)
heroIMG.onclick = () => passReq.style.display = 'none'

regUsername.addEventListener("keypress", e => {
    if (e.key === 'Enter') store()
})
regEmail.addEventListener("keypress", e => {
    if (e.key === 'Enter') store()
})
regPass.addEventListener("keypress", e => {
    if (e.key === 'Enter') store()
})

const store = () => {

    let validator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let count = 0

    passReq.style.display = 'none'

    if (
        regUsername.value.length === 0 ||
        regEmail.value.length === 0 ||
        regPass.value.length === 0
    ) return failedReq('Please Fill All Required Fields')

    if (!regEmail.value.match(validator))
        return failedReq('Invalid Email Address')

    if (regPass.value.length < 4)
        return failedReq('Password must be at least 4 characters')
    if (regPass.value.indexOf(' ') >= 0)
        return failedReq('Password must not contain spaces')

    for (index in regPass.value)
        if (!isNaN(parseInt(regPass.value[index]))) count++
    if (count < 2) return failedReq('Password must have at least 2 numbers')

    else successfulReq()
}

const emailValidator = (email) => {

    if (email.value.match(validator)) {
        alert("Valid email address!");
        document.form1.text1.focus();
        return true;
    } else {
        alert("You have entered an invalid email address!");
        document.form1.text1.focus();
        return false;
    }

}

const successfulReq = () => {
    localStorage.setItem('Username', regUsername.value);
    localStorage.setItem('Email', regEmail.value);
    localStorage.setItem('Password', regPass.value);

    regUsername.value = ''
    regEmail.value = ''
    regPass.value = ''
    appMessage.innerText = 'Successfully Signed Up'
    appMessage.classList.add('success')
    authMessage.innerText = 'Successfully Signed Up'
    authMessage.classList.add('success')

    setTimeout(() => {
        appMessage.style.opacity = 0;
        authMessage.style.opacity = 0;

        setTimeout(() => {
            appMessage.classList.remove('success')
            appMessage.innerText = ''
            appMessage.style.opacity = 1;

            authMessage.classList.remove('success')
            authMessage.innerText = ''
            authMessage.style.display = 'none'

            setTimeout(() => {
                authMessage.style.opacity = '1';
                authMessage.style.display = 'block'
            }, 200)

        }, 500)

    }, 2000)

    loginUser.onclick.call(loginUser)
}

const failedReq = (message) => {
    appMessage.innerText = message
    appMessage.classList.add('fail')
    authMessage.innerText = message
    authMessage.classList.add('fail')

    setTimeout(() => {
        appMessage.style.opacity = 0;
        authMessage.style.opacity = 0;

        setTimeout(() => {
            appMessage.classList.remove('fail')
            appMessage.innerText = ''
            appMessage.style.opacity = 1;

            authMessage.classList.remove('fail')
            authMessage.innerText = ''
            authMessage.style.display = 'none'

            setTimeout(() => {
                authMessage.style.opacity = '1';
                authMessage.style.display = 'block'
            }, 200)

        }, 500)

    }, 2000)
}

const logEmail = document.querySelector('[data-log-email]')
const logPass = document.querySelector('[data-log-pass]')

logEmail.addEventListener("keypress", e => {
    if (e.key === 'Enter') check()
})

logPass.addEventListener("keypress", e => {
    if (e.key === 'Enter') check()
})

const check = () => {
    const storedUser = localStorage.getItem('Username')
    const storedEmail = localStorage.getItem('Email')
    const storedPass = localStorage.getItem('Password')

    if (logEmail.value === storedEmail && logPass.value === storedPass) {
        logEmail.value = ''
        logPass.value = ''
        appMessage.innerText = 'Successfully Signed In'
        appMessage.classList.add('success')
        authMessage.innerText = 'Successfully Signed In'
        authMessage.classList.add('success')

        setTimeout(() => {
            appMessage.style.opacity = 0;
            authMessage.style.opacity = 0;

            setTimeout(() => {
                appMessage.classList.remove('success')
                appMessage.innerText = ''
                appMessage.style.opacity = 1;

                authMessage.classList.remove('success')
                authMessage.innerText = ''
                authMessage.style.display = 'none'

                setTimeout(() => {
                    authMessage.style.opacity = '1';
                    authMessage.style.display = 'block'
                }, 200)

            }, 500)

        }, 2000)

        searchIC.onclick.call(searchIC)
        status.childNodes[0].textContent = 'Hello, '
        status.childNodes[1].textContent = storedUser
        signOut.style.display = 'block'
        signIn.style.display = 'none'
        signInAlt.style.display = 'none'

        if (design.display === 'block') {
            signOutAlt.style.display = 'block'
        } else {
            signOutAlt.style.display = 'none'
        }

        window.addEventListener('resize', () => {
            if (designStyle.getPropertyValue('display') === 'block') {
                signOutAlt.style.display = 'block'
                signInAlt.style.display = 'none'
            } else {
                signOutAlt.style.display = 'none'
                signOut.style.display = 'block'
                signIn.style.display = 'none'
            }
        })

    } else {
        appMessage.innerText = 'Invalid Login Credentials'
        appMessage.classList.add('fail')
        authMessage.innerText = 'Invalid Login Credentials'
        authMessage.classList.add('fail')

        setTimeout(() => {
            appMessage.style.opacity = 0
            authMessage.style.opacity = 0

            setTimeout(() => {
                appMessage.classList.remove('fail')
                appMessage.innerText = ''
                appMessage.style.opacity = 1;

                authMessage.classList.remove('fail')
                authMessage.innerText = ''
                authMessage.style.display = 'none'

                setTimeout(() => {
                    authMessage.style.opacity = '1';
                    authMessage.style.display = 'block'
                }, 200)

            }, 500)

        }, 2000)
    }
}

signOut.onclick = () => {
    status.childNodes[0].textContent = 'You are, '
    status.childNodes[1].textContent = 'Anonymous'
    signOut.style.display = 'none'
    signIn.style.display = 'block'

    window.addEventListener('resize', () => {
        if (document.defaultView.getComputedStyle(signOut).display === 'block') {
            signOut.style.display = 'none'
            signIn.style.display = 'block'
        }

        if (designStyle.getPropertyValue('display') === 'block') {
            signInAlt.style.display = 'block'
            signOutAlt.style.display = 'none'
        } else {
            signInAlt.style.display = 'none'
        }
    })
}

signOutAlt.onclick = () => {
    status.childNodes[0].textContent = 'You are, '
    status.childNodes[1].textContent = 'Anonymous'
    signOutAlt.style.display = 'none'
    signInAlt.style.display = 'block'

    window.addEventListener('resize', () => {
        if (designStyle.getPropertyValue('display') === 'block') {
            signInAlt.style.display = 'block'
            signIn.style.display = 'none'
            signOutAlt.style.display = 'none'
        } else {
            signOut.style.display = 'none'
            signIn.style.display = 'block'
            signInAlt.style.display = 'none'
        }
    })
}

const existingUser = localStorage.getItem('Username')

if (existingUser !== null) {
    status.childNodes[0].textContent = 'Hello, '
    status.childNodes[1].textContent = existingUser
    signOut.style.display = 'block'
    signInAlt.style.display = 'none'
    signIn.style.display = 'none'
}

const appLogo = document.querySelector('[data-app-logo]')
const designStyle = document.defaultView.getComputedStyle(design)


if (user.textContent === 'Anonymous') {
    signOutAlt.style.display = 'none'
}

window.addEventListener('resize', () => {
    if (document.defaultView.getComputedStyle(searchIC).display === 'block') {
        signIn.style.display = 'none'
    }
})