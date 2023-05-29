import Config from "../module.js"

function Accueil(doc, options){

    // LOAD CSS 
        let cssNormalService = document.getElementById('cssNormalService')
        cssNormalService.href = '/css/module/style.css';
        let cssResponsiveService = document.getElementById('cssResponsiveService')
        cssResponsiveService.href = '/css/module/responsive.css';
    // LOAD CSS 

    let ContainerPrincipaleContent = document.getElementById("ShellBody");
    ContainerPrincipaleContent.innerHTML = ""

    let cadreService = document.createElement('div')
    cadreService.classList.add('cadre__service')
        {
            // let logoServiceHTML = document.createElement('img')
            // logoServiceHTML.classList.add('cadre__service_logo')
            // logoServiceHTML.src = options.logo
            // cadreService.append(logoServiceHTML)
            // let titleHTML = document.createElement('h2')
            // titleHTML.innerText = options.app
            // cadreService.append(titleHTML)
            let descriptionHTML = document.createElement('small')
            descriptionHTML.innerText = Config.description
            cadreService.append(descriptionHTML)
            
        }
    ContainerPrincipaleContent.append(cadreService)

    let containerHTML = document.createElement('div')
    containerHTML.classList.add('container__application')

        let WstaLabelNameHTML = document.createElement("div")
        WstaLabelNameHTML.classList.add("wsta__label-name")
        WstaLabelNameHTML.innerText = "Nom de domaine : "
        containerHTML.append(WstaLabelNameHTML)

        let WstaInputHTML = document.createElement("input")
        WstaInputHTML.type = "text"
        WstaInputHTML.classList.add("wsta__input")
        containerHTML.append(WstaInputHTML)

        let alertHTML = document.createElement('div')
        alertHTML.classList.add('alert')
        alertHTML.style.display = "none"
        containerHTML.append(alertHTML)

        let WstaButtonCheckHTML = document.createElement("button")
        WstaButtonCheckHTML.classList.add("wsta__button-check")
        WstaButtonCheckHTML.innerText = "Vérifier le statut"
        containerHTML.append(WstaButtonCheckHTML)

        WstaButtonCheckHTML.addEventListener("click", function() {

            let url = WstaInputHTML.value 

            WstaButtonCheckHTML.disabled = true
            WstaButtonCheckHTML.innerText = "Patientez..."

            checkStatusDomain(url)
            .then(resultat => {

                let uuid = localStorage.getItem("_cc_uuid")

                gtag('event', 'service_wstachecker', {
                    'uuid': uuid,
                    "status": resultat.status,
                    "url": url
                })

                if(resultat.status){

                    WstaButtonCheckHTML.disabled = false
                    WstaButtonCheckHTML.innerText = "Vérifier le statut"

                    alertHTML.classList.add('success')
                    alertHTML.style.display = null 
                    alertHTML.innerText = resultat.message

                    setTimeout(() => {
                        alertHTML.classList.remove('success')
                        alertHTML.style.display = "none";
                    }, 5000);
                } else {

                    WstaButtonCheckHTML.disabled = false
                    WstaButtonCheckHTML.innerText = "Vérifier le statut"

                    alertHTML.style.display = null 
                    alertHTML.innerText = resultat.message

                    setTimeout(() => {
                        alertHTML.style.display = "none";
                    }, 5000);
                }

            })
            .catch(err => {
                alert(err)
            })

        })

    ContainerPrincipaleContent.append(containerHTML)

    async function checkStatusDomain(url){

        const response = await fetch('/api/wstachecker/checkdomain', {
            method: "POST",
            body: JSON.stringify({
                url: url
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const status = await response.json();
        return status;

    }

}

export default Accueil;