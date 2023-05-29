import Shell from "./shell.js"
import Accueil from "./views/accueil.js"

Shell.loadConfig()
Shell.loadNavigation()
Shell.loadEvent()
Shell.loadView('', {
    view: Accueil('', '')
})