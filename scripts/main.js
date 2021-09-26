document.getElementById("inputbox").addEventListener('input', changeEvent)

function changeEvent() {
    document.getElementById("sublist").innerHTML = null;

    var searchtext = document.getElementById("inputbox").value.toLowerCase();

    if (searchtext != "") {
        for (var j = 0; j < ENTRIES.length; j++) {
            for (var i = 0; i < ENTRIES[j].data.length; i++) {
                var subtext = ENTRIES[j].data[i].text;

                

                if (subtext.toLowerCase().includes(searchtext) && searchtext.length >= 3) {
                    var sub = document.createElement("li");
                    var substringStartIndex = subtext.toLowerCase().indexOf(searchtext);
                    var substringEndIndex = searchtext.length + substringStartIndex;

                    var beginningText = subtext.slice(0, substringStartIndex);
                    var markText = "<mark>" + subtext.slice(substringStartIndex, substringEndIndex) + "</mark>";
                    var endingText = subtext.slice(substringEndIndex);


                    var timestring = ENTRIES[j].data[i].time.split(",")[0];
                    var timeArray = timestring.split(":");
                    var hours = parseInt(timeArray[0]);
                    var minutes = parseInt(timeArray[1]);
                    var seconds = timeArray[2];

                    minutes = (hours * 60) + minutes;
                    
                    sub.innerHTML = beginningText + markText + endingText + "<br/>" + "<i>(" + ENTRIES[j].name + " " + minutes + ":" + seconds + ")</i>";
                    document.getElementById("sublist").appendChild(sub);

                }
            }
        }
    }
}