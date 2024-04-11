//These are the function to show the statistics within the No.s of 100bit

// These variables are here because, it lags alot if you used s.grandNo directly
var editCountAll = s.grandNo[3]
//, usersAll = s.grandNo[2]
//, dotPlacementsAll = s.grandNo[1];

//print the grid
function printGrid(end = dotPlacementsAll.length) {
    let canvas = document.createElement('canvas')
      , ctx = canvas.getContext('2d')
      , k = new ImageData(256,192)
      , ImgBin = new Array(49152).fill(0);
    canvas.width = 256;
    canvas.height = 192;
    for (let i = 0; i < end; i++) 
        ImgBin[dotPlacementsAll[i]] ^= 1;
    for (let j = i = 0; i < 49152; i++) {
        k.data[j++] = [255,0][ImgBin[i]];
        k.data[j++] = [255,0][ImgBin[i]];
        k.data[j++] = [255,0][ImgBin[i]];
        k.data[j++] = 255;
    }
    ctx.putImageData(k,0,0)
    canvas.toDataURL();
    console.log("%c ",'background-image: url('+canvas.toDataURL()+');line-height:0px;font-size:1px;padding: 96px 128px;background-size: 256px 192px');
}

function userEditCount(users, editCount) {
    let rank = {};
    for (let i = 0; i < editCount.length; i++) {
        if (rank[users[i]] === undefined)
            rank[users[i]] = 0;
        rank[users[i]] += editCount[i];
    }
    return rank;
}

// Tally how much Users edit
function editCountPopularity() {
    var instance = new Array(101);
    instance.fill(0);
    for (let n of s.grandNo[3]) 
        instance[n]++;
    return instance
}

// Just try it ;)
function findMultiplets() {
    let n = [""];n= n.concat(s.grandNo[2]);
    for (let i = 0, f; i < n.length; i++, f=Math.ceil(i/200)) {
        if (n[i] === n[i+1] && n[i] === n[i+2] && n[i] === n[i+3] && n[i] === n[i+4] && n[i] === n[i+5] & n[i] === n[i+6] && n[i] === n[i+7] && n[i] === n[i+8]) {
            console.log(`%cNonaplets found at ${i} or No.${f} by ${n[i]}`,"font-weight: bold;background: red; color: white;")
            i += 8
        } else if (n[i] === n[i+1] && n[i] === n[i+2]&& n[i] === n[i+3]) {
            console.log(`%cQuadruplets found at ${i} or No.${f} by ${n[i]}`,"font-weight: bold;background: red; color: white;")
            i += 3
        } else if (n[i] === n[i+1] && n[i] === n[i+2]) {
            console.log(`%cTriplets found at ${i} or No.${f} by ${n[i]}`,"font-weight: bold;background: black; color: white;")
            i += 2
        } else if (n[i] === n[i+1] && n[i] === n[i+3]) {
            console.log(`%cNear triplets type I found at ${i} or No.${f} by ${n[i]}`,"background: black; color: white;");
            i++
        } else if (n[i] === n[i+2] && n[i] === n[i+3]) {
            console.log(`%cNear triplets type II found at ${i} or No.${f} by ${n[i]}`,"background: black; color: white;");
        } else if (n[i] === n[i+1]) {
            console.log(`%cDoublets found at ${i} or No.${f} by ${n[i]}`,"font-weight: bold;text-shadow: 1px 1px 0 rgb(128,128,128);")
        } else if (n[i] === n[i+2]) {
            console.log(`Near doublets found at ${i} or No.${f} by ${n[i]}`)
        }
    }
}
