import Accueil from "./views/accueil.js"
import Config from "./module.js";

function loadNavigation() {

    let ShellCenterHTML = document.getElementById("ShellCenter")

        let ShellTopNavigationHTMl = document.createElement("ul")
        ShellTopNavigationHTMl.classList.add("ShellTop__navigation")
    
        let arrMenu = [
            // {
            //     name: "Accueil",
            //     action: "accueil"
            // }
        ]

        arrMenu.forEach(element => {
            
            let ShellTopNavigationElementHTML = document.createElement("li")
            ShellTopNavigationElementHTML.classList.add("ShellTop__navigation-element")
            ShellTopNavigationElementHTML.innerText = element.name 
            ShellTopNavigationHTMl.append(ShellTopNavigationElementHTML)

            ShellTopNavigationElementHTML.addEventListener('click', function() {

                let event = new CustomEvent('button-event', {
        
                    detail: {
                        action: element.action,
                    }
        
                });
        
                document.dispatchEvent(event)
        
            })

        });

    ShellCenterHTML.append(ShellTopNavigationHTMl)

    let script1

    let ShellTopRightHTML = document.getElementById("ShellTopRight")
    ShellTopRightHTML.innerHTML = ""

    let getThemeModeUn = localStorage.getItem("__thmode")
    if (getThemeModeUn == null) localStorage.setItem("__thmode", "light")

    let getThemeModeDeux = localStorage.getItem("__thmode")
    let btnThemeHTML = document.createElement("i")
    if(getThemeModeDeux === "light"){
        btnThemeHTML.classList.add("bi", "bi-brightness-high", "iconMode")
        btnThemeHTML.dataset.state = "light"
        script1 = document.createElement('link');
        script1.rel = "stylesheet"
        script1.href = "css/light.css";
        document.head.appendChild(script1);
    } else if(getThemeModeDeux === "night"){
        btnThemeHTML.classList.add("bi", "bi-brightness-high-fill", "iconMode")
        btnThemeHTML.dataset.state = "night"
        script1 = document.createElement('link');
        script1.rel = "stylesheet"
        script1.href = "css/dark.css";
        document.head.appendChild(script1);
    }

    ShellTopRightHTML.append(btnThemeHTML)

    btnThemeHTML.addEventListener("click", function(e) {

        let themeState = e.target.dataset.state

        if(themeState === "light") {
            btnThemeHTML.dataset.state = "night"
            btnThemeHTML.classList.remove("bi-brightness-high")
            btnThemeHTML.classList.add("bi-brightness-high-fill")
            localStorage.setItem("__thmode", "night")
            script1.href = "css/dark.css";
        } else if(themeState === "night"){
            btnThemeHTML.dataset.state = "light"
            btnThemeHTML.classList.remove("bi-brightness-high-fill")
            btnThemeHTML.classList.add("bi-brightness-high")
            localStorage.setItem("__thmode", "light")
            script1.href = "css/light.css";
        }


    })

    // <i class="bi bi-brightness-high"></i>

}

function loadEvent() {

    document.addEventListener('button-event', function (event) {

        event.preventDefault()

        let action = event.detail.action

        switch (action) {
            case 'accueil':
                loadView('', {
                    view: Accueil('', '')
                })
                break;                    
            default:
                break;
        }

    })

}

function loadConfig() {

    let ShellTopLeftHTML = document.getElementById("ShellTop__left")
    ShellTopLeftHTML.innerHTML = ""

    let ShellBottomHTML = document.getElementById("ShellBottom")
    ShellBottomHTML.innerHTML = ""

    ShellTopLeftHTML.innerText = Config.name
    ShellBottomHTML.innerText = Config.footer

    if(Config.enabledAnalytics && Config.codeG4A.length != 0){

        // Créer la balise <script async>
        let script1 = document.createElement('script');
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${Config.codeG4A}`;
        script1.async = true;

        // Créer la balise <script> pour configurer Google Analytics
        let script2 = document.createElement('script');
        script2.innerHTML = `window.dataLayer = window.dataLayer || [];\n\
                            function gtag(){dataLayer.push(arguments);}\n\
                            gtag('js', new Date());\n\
                            gtag('config', '${Config.codeG4A}');`;

        // Ajouter les balises <script> à la section <head> de la page
        document.head.appendChild(script1);
        document.head.appendChild(script2);

    }

}

function loadView(options) {

    return options.view;

}

export default {
    loadNavigation,
    loadEvent,
    loadConfig,
    loadView
}