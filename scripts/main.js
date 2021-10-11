document.getElementById("inputbox").addEventListener('input', changeEvent)

var searchResults = 0;
var foundFromContent = [];

function changeEvent() {
    [...document.querySelectorAll('section[role="grid"] div ul')].forEach(div => {
        div.innerHTML = "";
    })
    searchResults = 0;

    var searchtext = document.getElementById("inputbox").value.toLowerCase();

    if (searchtext != "" && searchtext.length >= 3) {
        for (var j = 0; j < ENTRIES.length; j++) {
            for (var i = 0; i < ENTRIES[j].data.length; i++) {
                var subtext = ENTRIES[j].data[i].text;
                if (subtext.toLowerCase().includes(searchtext)) {
                    if (foundFromContent.indexOf(ENTRIES[j].name) == -1) {
                        foundFromContent.push(ENTRIES[j].name);
                        var newSection = document.createElement("div");
                        var newSectionList = document.createElement("ul");
                        newSection.setAttribute("content", ENTRIES[j].name);
                        newSection.appendChild(newSectionList);
                        var newSectionTitle = document.createElement("h2");
                        newSectionTitle.innerHTML = ENTRIES[j].name;
                        newSection.appendChild(newSectionTitle);
                        document.querySelectorAll('section[role="grid"]')[0].appendChild(newSection);
                    }

                    var sub = document.createElement("li");
                    sub.setAttribute("onclick", "copyTextFromElement(this)");

                    var substringStartIndex = subtext.toLowerCase().indexOf(searchtext);
                    var substringEndIndex = searchtext.length + substringStartIndex;

                    var beginningText = "<span>" + subtext.slice(0, substringStartIndex) + "</span>";
                    var markText = "<mark>" + subtext.slice(substringStartIndex, substringEndIndex) + "</mark>";
                    var endingText = "<span>" + subtext.slice(substringEndIndex) + "</span>";


                    var timestring = ENTRIES[j].data[i].time.split(",")[0];
                    var timeArray = timestring.split(":");
                    var hours = parseInt(timeArray[0]);
                    var minutes = parseInt(timeArray[1]);
                    var seconds = timeArray[2];

                    minutes = (hours * 60) + minutes;
                    
                    sub.innerHTML = beginningText + markText + endingText + "<br/>" + "<i>(" + ENTRIES[j].name + " " + minutes + ":" + seconds + ")</i>";
                    document.querySelectorAll('div[content="' + ENTRIES[j].name + '"] ul')[0].appendChild(sub);

                    

                    searchResults++;
                }
            }
        }
    }

    if (searchtext.length >= 3) {
        document.getElementById("results-num").innerHTML = searchResults.toLocaleString() + " results";
    } else {
        document.getElementById("results-num").innerHTML = "";
    }    
}

function copyTextFromElement(e) {
    var childNodes = e.childNodes;
    var quoteText = "> " + childNodes[0].innerText + childNodes[1].innerText + childNodes[2].innerText;
    var citeText = childNodes[4].innerText;
    citeText = citeText.substring(1, citeText.length - 1);
    quoteText += "\n- " + citeText;
    console.log(quoteText);
    copyToClipboard(quoteText);
}

function copyToClipboard (text) {
    return navigator.clipboard.writeText(text);
}