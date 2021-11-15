(function(){
    let output = "";
    let container = document.querySelector(".container")
    function getHTMLOutput (data){
        output += getHeadNav (data.headNav);
        output += getLineUp (data.lineup);
        output += getSocial (data.social);
        output += getCountdownContainer ();
        output += getInfo (data.info);
        output += getMeerWeten (data.meerWeten);
        return output
    }
    
    container.innerHTML = getHTMLOutput(data);
    let countdownContainer = document.querySelector(".countdown_container");
    let IMGs = document.querySelectorAll(".LargeIMG");
    let activeIMGContainer = document.querySelector(".image_active");
    let closeBttn = document.querySelector("#close_bttn");

    function getArtistSocial(dataArtistSocial) {
            return `<li><a href="${dataArtistSocial.website}">${dataArtistSocial.website}</a></li>
            <li><a href="${dataArtistSocial.facebook}">${dataArtistSocial.facebook}</a></li>
            <li><a href="${dataArtistSocial.twitter}">${dataArtistSocial.twitter}</a></li>
            <li><a href="${dataArtistSocial.instagram}">${dataArtistSocial.instagram}</a></li>
            `
    };

    IMGs.forEach(element => {
        element.addEventListener("click", (e) => {
            activeIMGContainer.innerHTML = `<img src="${data.lineup[e.currentTarget.id].artist.picture.small}" alt="${(data.lineup[e.currentTarget.id].artist.name -1)} picture" id="${data.lineup[e.currentTarget.id].id}" class="img_${data.lineup[e.currentTarget.id].id} SmallIMG">
            <h2 class="h2_${data.lineup[e.currentTarget.id].id}">${data.lineup[e.currentTarget.id].artist.name}</h2>
            <p>${days[new Date(data.lineup[e.currentTarget.id].from).getDay()]} ${data.lineup[e.currentTarget.id].place.name}</p>
            <p>${data.lineup[e.currentTarget.id].artist.synopsis}</p>
            <iframe width="560" height="315" src="${data.lineup[e.currentTarget.id].artist.media[0].sourceId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <ul>
            ${getArtistSocial(data.lineup[e.currentTarget.id].artist.social)}
            </ul>
            `
        });
    });

    closeBttn.addEventListener("click", () => {
        activeIMGContainer.innerHTML = ``
    })



    setInterval(function(){
        countdownContainer.innerHTML = getCountDown(data.timeStart)
    }, 1000)




    function getHeadNav(dataHeadNav) {
        let tempstr = `<a href="https://www.rockwerchter.be/nl/"><h1>1-4 July Festivalpark Werchter Belgium</h1></a>
        <nav>
        <ul class="header_nav_list">
        `;
        dataHeadNav.forEach(element => {
            if (element.type === "internal") {
                tempstr += `<li><a href="${element.link}" class="nav nav_${element.name}">${element.name}</a></li>
            `
            } else {
                tempstr += `<li><a href="${element.link}" class="nav nav_${element.name}" target= "_blank">${element.name}</a></li>
                `
            }
        });
        tempstr += `</ul>
        </nav>`
        return tempstr
    };

    function getLineUp(dataLineUp) {
        let tempstr = `<div class="lineUp">
        `
        dataLineUp.forEach(element => {
            tempstr += `<div class="artist_container artist_${element.id}_container">
            <img src="${element.artist.picture.large}" alt="${element.artist.name} picture" id="${(element.id - 1)}" class="img_${element.id} LargeIMG">
            <h2 class="h2_${element.id}">${element.artist.name}</h2>
            <p>${days[new Date(element.from).getDay()]} ${element.place.name}</p>
            </div>
            `
        });
        tempstr += `</div>
        <a><button id="close_bttn">close</button></a>
        <div class="image_active"></div>`
        return tempstr
    };

    function getSocial(dataSocial) {
        let tempstr = `<div class="social_container">
        <h2>Social</h2>
        <ul class="social_list">
        `
        dataSocial.forEach(element => {
            tempstr += `<li class="social_bttn ${element.type}">
            <a href="${element.link}"  target="_blank"><img src="images/social-media-icon-pack/${element.type}.svg" alt="${element.name}"></a>
            </li>
            `
        });
        tempstr += `</ul>
        </div>
        `
        return tempstr
    };

    function getCountdownContainer() {
        let tempstr = `<div class="countdown_container">
        </div>
        `
        return tempstr
    };

    function getInfo(dataInfo) {
        let tempstr = `<div class="info_container">
        <h2>Info</h2>
        <ul class="info_list">
        `
        dataInfo.forEach(element => {
            tempstr += `<li><a href="${element.link}">${element.name}</a></li>
            `
        });

        tempstr += `</ul>
        </div>
        `
        return tempstr
    };

    function getMeerWeten(dataMeerWeten) {
        let tempstr = `<div class="meerWeten_container">
        <h2>Meer Weten?</h2>
        <ul class="meerWeten_list">
        `
        dataMeerWeten.forEach(element => {
            tempstr += `<li><a href="${element.link}">${element.name}</a></li>
            `
        });

        tempstr += `</ul>
        </div>
        <h2>Newsletter</h2>
        `
        return tempstr
    };

    function getCountDown(dataTimeStart) {
        let timeDiff = dataTimeStart - new Date();
        let days = Math.floor(timeDiff / 86400000)
        let hours = Math.floor((timeDiff - (days * 86400000))/ 3600000)
        let minutes = Math.floor(((timeDiff - (days * 86400000)) - (hours * 3600000))/ 60000)
        let seconds = Math.round((((timeDiff - (days * 86400000 ))- (hours * 3600000))- (minutes * 60000))/ 1000)
        return `${days}:${hours}:${minutes}:${seconds}`
    }
})();