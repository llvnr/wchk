import Shell from "../shell.js"
import Accueil from "./accueil.js";

function Auth(doc, options){

    let containerHTML
    let ShellAuthLoadCardHTML
    let ShellAuthCadreLogoHTML
    
    let ContainerPrincipaleContent = document.getElementById("ShellBody");
    ContainerPrincipaleContent.innerHTML = ""

    if(options.device === "desktop"){

        containerHTML = document.createElement('div')
        containerHTML.classList.add('container__application_auth')
        ContainerPrincipaleContent.append(containerHTML)

    } else if(options.device === "mobile"){

        containerHTML = document.getElementById('blockContainer__contenu-content')

    } else {

        containerHTML = document.createElement('div')
        containerHTML.classList.add('container__application_auth')
        ContainerPrincipaleContent.append(containerHTML)

    }

    if(options.mode === "register"){

        // ShellAuthCadreLogoHTML = document.createElement("div")
        // ShellAuthCadreLogoHTML.classList.add("ShellAuth__cadre")

        //     let ShellAuthLogoHTML = document.createElement("img")
        //     ShellAuthLogoHTML.classList.add("ShellAuth__cadre-logo")
        //     ShellAuthLogoHTML.src = "/assets/favicon.png"
        //     ShellAuthCadreLogoHTML.append(ShellAuthLogoHTML)

        // containerHTML.append(ShellAuthCadreLogoHTML)

        let ShellAuthCardHTML = document.createElement("div")
        ShellAuthCardHTML.classList.add("ShellAuth__card")
    
            let ShellAuthTitleHTML = document.createElement("div")
            ShellAuthTitleHTML.classList.add("ShellAuth__title")
            ShellAuthTitleHTML.innerText = "Aucun compte détecté."
            ShellAuthCardHTML.append(ShellAuthTitleHTML)
    
            let ShellAuthActionHTML = document.createElement("div")
            ShellAuthActionHTML.classList.add("ShellAuth__action")
            ShellAuthActionHTML.innerText = "Cliquez-ici pour démarrer le processus de création"
            ShellAuthCardHTML.append(ShellAuthActionHTML)
    
        containerHTML.append(ShellAuthCardHTML)
    
        ShellAuthCardHTML.addEventListener("click", function() {
    
            ShellAuthCardHTML.style.display = "none"
            ShellAuthLoadCardHTML.style.display = "none"
    
            let ShellAuthLoadingUnHTML = document.createElement("div")
            ShellAuthLoadingUnHTML.classList.add("ShellAuth__loading")
            // ShellAuthLoadingUnHTML.style.display = "none"
    
                let ShellAuthLoadingTitleUnHTML = document.createElement("div")
                ShellAuthLoadingTitleUnHTML.classList.add("ShellAuth__loading-title")
                ShellAuthLoadingTitleUnHTML.innerText = "Génération UUID..."
                ShellAuthLoadingUnHTML.append(ShellAuthLoadingTitleUnHTML)
    
                let ShellAuthLoadingLoaderUnHTML = document.createElement("div")
                ShellAuthLoadingLoaderUnHTML.classList.add("ShellAuth__loading-loader")
                ShellAuthLoadingUnHTML.append(ShellAuthLoadingLoaderUnHTML)
    
            containerHTML.append(ShellAuthLoadingUnHTML)
    
            generateUUID()
            .then(result => {
    
                // console.log(result)
    
                if(result.status){
    
                    let randNumber = Math.floor((Math.random() * 99999) + 10000)
                    let uuid = result.uuid 
                    let name = "Anonymous" + randNumber
    
                    ShellAuthLoadingUnHTML.remove()

                    let ShellAuthLoadingDeuxHTML = document.createElement("div")
                    ShellAuthLoadingDeuxHTML.classList.add("ShellAuth__loading")
                    // ShellAuthLoadingDeuxHTML.style.display = "none"
    
                        let ShellAuthLoadingTitleDeuxHTML = document.createElement("div")
                        ShellAuthLoadingTitleDeuxHTML.classList.add("ShellAuth__loading-title")
                        ShellAuthLoadingTitleDeuxHTML.innerText = "Création du compte..."
                        ShellAuthLoadingDeuxHTML.append(ShellAuthLoadingTitleDeuxHTML)
    
                        let ShellAuthLoadingLoaderDeuxHTML = document.createElement("div")
                        ShellAuthLoadingLoaderDeuxHTML.classList.add("ShellAuth__loading-loader")
                        ShellAuthLoadingDeuxHTML.append(ShellAuthLoadingLoaderDeuxHTML)
    
                    containerHTML.append(ShellAuthLoadingDeuxHTML)
    
                    registerAcc({
                        uuid: uuid,
                        name: name
                    })
                    .then(resultDeux => {
    
                        ShellAuthLoadingDeuxHTML.remove()
                        localStorage.setItem("_cc_uuid", uuid)
    
                        let ShellAuthLoadingTroisHTML = document.createElement("div")
                        ShellAuthLoadingTroisHTML.classList.add("ShellAuth__loading")
                        // ShellAuthLoadingTroisHTML.style.display = "none"
    
                            let ShellAuthLoadingTitleTroisHTML = document.createElement("div")
                            ShellAuthLoadingTitleTroisHTML.classList.add("ShellAuth__loading-title")
                            ShellAuthLoadingTitleTroisHTML.innerText = "Connexion..."
                            ShellAuthLoadingTroisHTML.append(ShellAuthLoadingTitleTroisHTML)
    
                            let ShellAuthLoadingLoaderTroisHTML = document.createElement("div")
                            ShellAuthLoadingLoaderTroisHTML.classList.add("ShellAuth__loading-loader")
                            ShellAuthLoadingTroisHTML.append(ShellAuthLoadingLoaderTroisHTML)
    
                        containerHTML.append(ShellAuthLoadingTroisHTML)
    
                        login({
                            uuid: uuid
                        })
                        .then(resultTrois => {
    
                            ShellAuthLoadingTroisHTML.remove()
                            localStorage.setItem("access_token", resultTrois.access_token)

                            if(options.device === "desktop"){

                                Shell.loadNavigation()
                                Shell.loadView('', {
                                    view: Accueil('', '')
                                })
                        
                            } else if(options.device === "mobile"){
                        
                                Shell.loadSousMenuMobile('', '')
                                
                            }
    
                        })
                        .catch(err => {
                            alert(err)
                        })
    
                    })
                    .catch(err => {
                        alert(err)
                    })
    
                } else {
                    alert(result.message)                
                }
    
            })
            .catch(err => {
                alert(err)
            })
    
        })

        ShellAuthLoadCardHTML = document.createElement("div")
        ShellAuthLoadCardHTML.classList.add("ShellAuthLoad__card")
    
            let ShellLoadAuthTitleHTML = document.createElement("div")
            ShellLoadAuthTitleHTML.classList.add("ShellAuthLoad__title")
            ShellLoadAuthTitleHTML.innerText = "Aucun compte détecté."
            ShellAuthLoadCardHTML.append(ShellLoadAuthTitleHTML)
    
            let ShellAuthLoadActionHTML = document.createElement("div")
            ShellAuthLoadActionHTML.classList.add("ShellAuthLoad__action")
            ShellAuthLoadActionHTML.innerText = "Charger votre fichier de récupération..."
            ShellAuthLoadCardHTML.append(ShellAuthLoadActionHTML)

            let ShellAuthInputHTML = document.createElement("input")
            ShellAuthInputHTML.classList.add("ShellAuthLoad__input")
            ShellAuthInputHTML.type = "file"
            ShellAuthInputHTML.accept = ".txt"
            ShellAuthLoadCardHTML.append(ShellAuthInputHTML)    
            
            ShellAuthInputHTML.addEventListener('change', function() {

                const fichier = ShellAuthInputHTML.files[0];
                const reader = new FileReader();

                reader.addEventListener("load", () => {
                 
                  ShellAuthCardHTML.remove()
                  ShellAuthLoadCardHTML.remove()

                  const UUID = reader.result
                  
                  let ShellAuthLoadingTroisHTML = document.createElement("div")
                  ShellAuthLoadingTroisHTML.classList.add("ShellAuth__loading")
                  // ShellAuthLoadingTroisHTML.style.display = "none"
          
                      let ShellAuthLoadingTitleTroisHTML = document.createElement("div")
                      ShellAuthLoadingTitleTroisHTML.classList.add("ShellAuth__loading-title")
                      ShellAuthLoadingTitleTroisHTML.innerText = "Connexion..."
                      ShellAuthLoadingTroisHTML.append(ShellAuthLoadingTitleTroisHTML)
          
                      let ShellAuthLoadingLoaderTroisHTML = document.createElement("div")
                      ShellAuthLoadingLoaderTroisHTML.classList.add("ShellAuth__loading-loader")
                      ShellAuthLoadingTroisHTML.append(ShellAuthLoadingLoaderTroisHTML)
          
                  containerHTML.append(ShellAuthLoadingTroisHTML)
          
                  login({
                      uuid: UUID
                  })
                  .then(resultTrois => {
          
                    ShellAuthLoadingTroisHTML.remove()
                    
                    localStorage.setItem("_cc_uuid", UUID)
                    localStorage.setItem("access_token", resultTrois.access_token)
        
                    if(options.device === "desktop"){
        
                        Shell.loadView('', {
                            view: Accueil('', '')
                        })
                
                    } else if(options.device === "mobile"){
                
                        Shell.loadSousMenuMobile('', '')
                        
                    }
          
                  })
                  .catch(err => {
                      alert(err)
                  })

                });
              
                reader.addEventListener("error", () => {
                  console.error("Erreur de lecture du fichier !");
                });
              
                reader.readAsText(fichier);

            })
    
        containerHTML.append(ShellAuthLoadCardHTML)

    } else if(options.mode === "login"){

        let UUID = localStorage.getItem("_cc_uuid")

        let ShellAuthLoadingTroisHTML = document.createElement("div")
        ShellAuthLoadingTroisHTML.classList.add("ShellAuth__loading")
        // ShellAuthLoadingTroisHTML.style.display = "none"

            let ShellAuthLoadingTitleTroisHTML = document.createElement("div")
            ShellAuthLoadingTitleTroisHTML.classList.add("ShellAuth__loading-title")
            ShellAuthLoadingTitleTroisHTML.innerText = "Connexion..."
            ShellAuthLoadingTroisHTML.append(ShellAuthLoadingTitleTroisHTML)

            let ShellAuthLoadingLoaderTroisHTML = document.createElement("div")
            ShellAuthLoadingLoaderTroisHTML.classList.add("ShellAuth__loading-loader")
            ShellAuthLoadingTroisHTML.append(ShellAuthLoadingLoaderTroisHTML)

        containerHTML.append(ShellAuthLoadingTroisHTML)

        login({
            uuid: UUID
        })
        .then(resultTrois => {

            ShellAuthLoadingTroisHTML.remove()
            localStorage.setItem("access_token", resultTrois.access_token)

            if(options.device === "desktop"){

                Shell.loadView('', {
                    view: Accueil('', '')
                })
        
            } else if(options.device === "mobile"){
        
                Shell.loadSousMenuMobile('', '')
                
            }

        })
        .catch(err => {
            alert(err)
        })

    }

    async function generateUUID() {

        const response = await fetch('/api/uuid', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const uuid = await response.json();
        return uuid;

    }

    async function registerAcc(options) {

        const response = await fetch('/api/auth/register', {
            method: "POST",
            body: JSON.stringify({
                uuid: options.uuid,
                name: options.name
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const acc = await response.json();
        return acc;

    }

    async function login(options) {

        const response = await fetch('/api/auth/login', {
            method: "POST",
            body: JSON.stringify({
                uuid: options.uuid,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const acc = await response.json();
        return acc;

    }

}

export default Auth;