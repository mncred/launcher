// Login Elements
const loginOfflineCancelContainer = document.getElementById('loginOfflineCancelContainer')
const loginOfflineCancelButton = document.getElementById('loginOfflineCancelButton')
const loginOfflineUsername = document.getElementById('loginOfflineUsername')
const loginOfflineButton = document.getElementById('loginOfflineButton')
const loginOfflineForm = document.getElementById('loginOfflineForm')

let loginOfflineViewOnSuccess = VIEWS.landing
let loginOfflineViewOnCancel = VIEWS.loginOptions
let loginOfflineViewCancelHandler

loginOfflineCancelButton.onclick = (e) => {
    switchView(getCurrentView(), loginOfflineViewOnCancel, 500, 500, () => {
        loginOfflineUsername.value = ''
        if (loginOfflineViewCancelHandler != null) {
            loginOfflineViewCancelHandler()
            loginOfflineViewCancelHandler = null
        }
    })
}

// Disable default form behavior.
loginOfflineForm.onsubmit = () => { return false }

// Bind login button behavior.
loginOfflineButton.addEventListener('click', () => {
    if (!/^[a-zA-Z0-9_]{1,16}$/.test(loginOfflineUsername.value.trim())) {
        return
    }
    AuthManager.addOfflineAccount(loginOfflineUsername.value).then((value) => {
        updateSelectedAccount(value)
        setTimeout(() => {
            switchView(VIEWS.loginOffline, loginOfflineViewOnSuccess, 500, 500, async () => {
                // Temporary workaround
                if (loginOfflineViewOnSuccess === VIEWS.settings) {
                    await prepareSettings()
                }
                loginOfflineViewOnSuccess = VIEWS.landing // Reset this for good measure.
                loginOfflineViewCancelHandler = null // Reset this for good measure.
                loginOfflineUsername.value = ''
            })
        }, 100)
    })
})