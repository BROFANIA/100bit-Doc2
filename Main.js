/*
* How to download the No.s:
* -Copy and paste this code to your browser's console
* -Then run getNoData()
* -After finsihing downloading, Run s.grandNo.gen()
* -And you're done. I recommend you save it to your computer using s.save(). other than that you can tinker around with the data all you want
*/
if (location.host !== 'dan-ball.jp')
    window.location.replace("https://dan-ball.jp/javagame/bit/");
var noDate = noData = new Array()
  , s = new Object();
try {
    latestNo = src_max;
} catch (e) {
    window.location.replace("https://dan-ball.jp/javagame/bit/")
}
function getNoDate(p=1, b=Math.ceil(latestNo / 10)) {
    for (let i = p; i <= b; i++) {
        let XHR = new XMLHttpRequest()
          , parser = new DOMParser();
        XHR.open("GET", "/en/javagame/bit/history/?t=a&b=&p=" + i);
        XHR.onreadystatechange = function() {
            if (XHR.readyState === XMLHttpRequest.DONE && XHR.status === 200) {
                for (let doc = parser.parseFromString(XHR.response, "text/html"), j = 0, k = Array.from(doc.getElementsByTagName("td")); j < 12;j++) {
                    if (j > 1) {
                        l = k[j].innerText
                        noDate[parseInt(l.match(/No\.(.*)?[A-Z]/)[1])-1] = l.replace(/No\.[0-9]*/,"");
                    }
                }
            }
        }
        XHR.send();
    }
}

// Although this function can start anywhere, I Recommend to to download the thing as it's not supported yet
function getNoData(noStart=1, noEnd=latestNo) {
    for (let i = noStart; i <= noEnd; i++) {
        let XHR = new XMLHttpRequest();
        XHR.open("GET", "/score/bit2.php?a=0&b=" + i);
        XHR.onreadystatechange = ()=>{
            if (XHR.readyState === XMLHttpRequest.DONE && XHR.status === 200) {
                let j = i - 1;
                noData[j] = XHR.response.slice(1);
            }
        }
        XHR.send();
    }
}

s.decodeBin = function (data) {
    let endImage = new Array(49152),
    dotPlacements = new Array(20000),
    noDots = 0,
    i = 0,
    j = atob(data),
    d = Array(j.length),
    k = d.length,
    pointer = 0;
    endImage.fill(0); 
    for (i = 0; i < k; i++)
            d[i] = j.charCodeAt(i);
    if (6144 <= k)
        for (let i = 0; 6144 > pointer; pointer++)
            for (let l = 7; l >= 0; l--) 
                endImage[i++] = d[pointer] >> l & 1 ;
    let userCount = d[pointer++] << 8 & 65280 | d[pointer++] & 255,
    editCounts = Array(userCount), 
    Users = Array(userCount);
    Users.fill("");
    for (i = 0; i < userCount; i++)
        editCounts[i] = d[pointer++];
    for (i = 0; i < userCount; i++)
        for (j = 0; j < editCounts[i];(pointer += 2 , j++)) {
            dotPlacements[noDots++] = d[pointer] << 8 & 65280 | d[pointer + 1] & 255;
            if (0 > dotPlacements[noDots - 1] || 49152 <= dotPlacements[noDots - 1])
                dotPlacements[noDots - 1] = 49151;
            }
    for (i = 0; i < userCount && pointer < k;(i++ , pointer += j + 1)) {
        for (j = 0; pointer + j < k && 10 != d[pointer + j]; j++) {
            let encodedName = d[pointer + j];
            if (127 >= encodedName) {
                Users[i] += String.fromCharCode(encodedName);
            } else if (223 >= encodedName) {
                encodedName = (encodedName & 31) << 6;
                encodedName += (d[pointer + j + 1] & 63);
                Users[i] += String.fromCharCode(encodedName);
                j += 1;
            } else if (239 >= encodedName) {
                encodedName = (encodedName & 15) << 12;
                encodedName += ((d[pointer + j + 1] & 63) << 6);
                encodedName += (d[pointer + j + 2] & 63);
                Users[i] += String.fromCharCode(encodedName);
                j += 2;
            } else{if (247 >= encodedName) {
                j += 3;
            } else if (251 >= encodedName) {
                j += 4;
            } else if (253 >= encodedName) {
                j += 5;
            }
            Users[i] += "?";
            }
        }
    }
    return [endImage,dotPlacements,Users,editCounts,noDots];
}

function saveFile(blob, name){
    let blobUrl = URL.createObjectURL(blob)
    ,   link = document.createElement("a");
    link.href = blobUrl;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove()
}

function saveNoDate() {
    let k
      , l
      , a = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12"
        };
    for (let i = 0; i < noDate.length; i++) {
        k = noDate[i].replace(","," ").split(" ");
        l = k.pop()
        k[0] = a[k[0]];
        noDate[i] = [k.join("/"),l].join(" ");
    }
    saveFile(new Blob([noDate.join("\n")]), "Dates");
}

function openFile(f) {
	fileInput = document.createElement("input")
	fileInput.type = 'file'
	fileInput.onchange = function(e) {
		file = e.target.files[0],
		reader = new FileReader();
		reader.onload = function(e) {
			f(e.target.result);
		}
		reader.readAsArrayBuffer(file)
	}
	document.body.appendChild(fileInput);
	fileInput.click()
	fileInput.remove()
}

function binify() {
    prefix = new Uint16Array(2);
    prefix[0] = ((61<<8)+10),
    prefix[1] = noData.length;
    enditCounts = (s.grandNo[3]);
    editCounts.unshift(0)
    editCounts = new Uint8Array(editCounts)
    Users = s.grandNo[2].join("\n");
    Users.unshift("");
    dotPlacements = new Uint16Array(s.grandNo[1])
    saveFile(new Blob([prefix,editCounts,Users,"\n",dotPlacements],{type:"application/octet-stream"}),"100bitBin.bin")
}

s.sheet = []
s.decode = function (start=0, end=latestNo) {
    for (let i = start; i < end; i++) {
        s.sheet[i] = s.decodeBin(noData[i])
    }
}

s.grandNo = [[],[],[],[],[]]
s.grandNo.gen = function() {
    s.decode()
    for (let i = k = 0; i < noData.length; i++) {
        s.grandNo[2]=s.grandNo[2].concat(s.sheet[i][2]);
        s.grandNo[3]=s.grandNo[3].concat(s.sheet[i][3]);
        for (let j = 0; j < s.sheet[i][4]; j++) {
            s.grandNo[1][k++] = s.sheet[i][1][j]
        }
    }
}

//To use this type openFile(debinify)
function deBinify(b) {
    l = new DataView(b)
    get16 = (a) => {return l.getUint16(a,true)};
    get8 = (a) => {return l.getUint8(a)};
    let h = get16(2) * 200
    , editCounts = []
    , dotPlacements = []
    , k = b.byteLength
    , Users = new Array(h);
    Users.fill("")
    for (pointer = 4; pointer < h + 4; pointer++) {
        editCounts[pointer - 4] = get8(pointer);
    }
    for (i = 0; i < h && pointer < k;(i++ , pointer += j + 1)) {
        for (j = 0; pointer + j < k && 10 != get8(pointer + j); j++) {
            let encodedName = get8(pointer + j);
            if (127 >= encodedName) {
                Users[i] += String.fromCharCode(encodedName);
            } else if (223 >= encodedName) {
                encodedName = (encodedName & 31) << 6;
                encodedName += (get8(pointer + j + 1) & 63);
                Users[i] += String.fromCharCode(encodedName);
                j += 1;
            } else if (239 >= encodedName) {
                encodedName = (encodedName & 15) << 12;
                encodedName += ((get8(pointer + j + 1) & 63) << 6);
                encodedName += (get8(pointer + j + 2) & 63);
                Users[i] += String.fromCharCode(encodedName);
                j += 2;
            } else{if (247 >= encodedName) {
                j += 3;
            } else if (251 >= encodedName) {
                j += 4;
            } else if (253 >= encodedName) {
                j += 5;
            }
            Users[i] += "?";
            }
        }
    }
    for (i = 0; pointer < k; pointer+=2) {
        dotPlacements[i++] = get16(pointer);
    }
    s.grandNo[3]=editCounts,
    s.grandNo[2]=Users,
    s.grandNo[1]=dotPlacements
}
