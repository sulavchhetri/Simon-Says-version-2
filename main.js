var mistakenumber = 0
var finalanswercount = 0
var idnumber = 16
var boxnumber = 4

function randomboxgenerator(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

//This function is necessary to create at most two answer boxes at each column, whose probability must also be lower
function getColumnNumber() {
    var num = Math.random();
    if (num < 0.35) {
        finalanswercount += 2
        return 2
    }
    else {
        finalanswercount += 1
        return 1
    }
}

answerobject = {}

function numberofbox(n) {
    for (let i = 0; i < 4 * n; i += 4) {
        answerlist = []
        singlecolumn = getColumnNumber()
        if (singlecolumn == 2) {
            num1 = randomboxgenerator(i + 1, i + 5)
            answerlist.push(num1)
            num2 = randomboxgenerator(i + 1, i + 5)
            while (answerlist.includes(num2)) {
                num2 = randomboxgenerator(i + 1, i + 5)
            }
            answerlist.push(num2)
        }
        else {
            num = randomboxgenerator(i + 1, i + 5)
            answerlist.push(num)
        }
        answerobject[i] = answerlist
    }
}

function defaultcolor(clicked) {
    document.getElementById(clicked).style.backgroundColor = '#241977';
}

function onwrong() {
    if (mistakenumber == 1) {
        document.getElementById('100').style.backgroundColor = 'red'
    }
    else if (mistakenumber == 2) {
        document.getElementById('101').style.backgroundColor = 'red'
    }
    else if (mistakenumber == 3) {
        document.getElementById('102').style.backgroundColor = 'red'
        document.getElementById('alertbox').style.display = 'flex'
        document.getElementsByClassName('maincontainer')[0].style.pointerEvents = 'none';
    }
}

function tryagain() {
    number = 0
    guesslist = []
    finalanswerlist = []
    mainguesslist = []
    finalanswercount = 0
    boxnumber = 4
    mistakenumber = 0;
    idnumber = 16
    document.getElementById('number').innerHTML = '40'
    document.getElementById('alertbox').style.display = 'none'
    document.getElementById('lastbox').style.display = 'none'
    document.getElementsByClassName('maincontainer')[0].style.pointerEvents = 'auto';
    document.getElementById('number').style.color = 'white'
    document.getElementById('100').style.backgroundColor = '#393211'
    document.getElementById('101').style.backgroundColor = '#393211'
    document.getElementById('102').style.backgroundColor = '#393211'
    document.getElementById('small').innerHTML = `
            <div class="fieldcontainer">
                <div class="box 50" id='1' onclick="changecolor(this.id)"></div>
                <div class="box 50" id='2' onclick="changecolor(this.id)"></div>
                <div class="box 50" id='3' onclick="changecolor(this.id)"></div>
                <div class="box 50" id='4' onclick="changecolor(this.id)"></div>
            </div>
            <div class="fieldcontainer">
                <div class="box 51" id='5' onclick="changecolor(this.id)"></div>
                <div class="box 51" id='6' onclick="changecolor(this.id)"></div>
                <div class="box 51" id='7' onclick="changecolor(this.id)"></div>
                <div class="box 51" id='8' onclick="changecolor(this.id)"></div>
            </div>
            <div class="fieldcontainer">
                <div class="box 52" id='9' onclick="changecolor(this.id)"></div>
                <div class="box 52" id='10' onclick="changecolor(this.id)"></div>
                <div class="box 52" id='11' onclick="changecolor(this.id)"></div>
                <div class="box 52" id='12' onclick="changecolor(this.id)"></div>
            </div>
            <div class="fieldcontainer">
                <div class="box 53" id='13' onclick="changecolor(this.id)"></div>
                <div class="box 53" id='14' onclick="changecolor(this.id)"></div>
                <div class="box 53" id='15' onclick="changecolor(this.id)"></div>
                <div class="box 53" id='16' onclick="changecolor(this.id)"></div>
            </div>
    `
    numberofbox(4)
    setTimeout(initialscreen, 1500, 4)
    setTimeout(defaultscreen, 2300, 4)
    setTimeout(columnwhite, 2500, 0)
}

var finalanswerlist = []
function singlelist(n) {
    for (let i = 0; i < 4 * n; i += 4) {
        x = answerobject[i]
        for (let j = 0; j < x.length; j++) {
            // console.log(x[j])
            finalanswerlist.push(x[j])
        }
    }
}

//functions for displaying the flashes  of answer, so the user get the idea of where to click
function initialscreen(n) {
    singlelist(n)
    for (let i = 0; i < finalanswerlist.length; i++) {
        document.getElementById(finalanswerlist[i]).style.backgroundColor = 'whitesmoke'
    }
}

function defaultscreen(n) {
    singlelist(n)
    for (let i = 0; i < finalanswerlist.length; i++) {
        document.getElementById(finalanswerlist[i]).style.backgroundColor = '#241977'
    }
}

function columnwhite(n) {
    for (let i = n; i < n + 4; i++) {
        let para = document.getElementById(i + 1)
        para.style.backgroundColor = 'whitesmoke'
    }
}

function columndefault(n) {
    for (let i = n; i < n + 4; i++) {
        let para = document.getElementById(i + 1)
        para.style.backgroundColor = '#241977'
    }
}

//for the timer shown in the bottom right corner
function timer(n) {
    var time = parseInt(document.getElementById('number').innerHTML)
    setTimeout(() => {
        if (time < 25 && time > 0) {
            time -= 1
            document.getElementById('number').style.color = 'red'
            document.getElementById('number').innerHTML = time
        }
        else if (time > 24) {
            time -= 1
            document.getElementById('number').innerHTML = time

        }
        else {
            document.getElementById('number').style.color = 'red'
            document.getElementById('number').innerHTML = 'Time up!!'
            document.getElementById('alertbox').style.display = 'flex'
            document.getElementsByClassName('maincontainer')[0].style.pointerEvents = 'none'
            for(let i = 0; i<4*n; i+=4){
                setTimeout(columndefault,0,i)
            }
        }
    }, 0)
}
var intervalid = setInterval(timer, 1000,boxnumber+1)



numberofbox(4)
setTimeout(initialscreen, 1000, 4)
setTimeout(defaultscreen, 1800, 4)


setTimeout(columnwhite, 2200, 0)

guesslist = []
mainguesslist = []
var number = 0

function changecolor(clicked) {
    console.log(answerobject)
    var elem = document.getElementById(clicked)
    if (guesslist.includes(parseInt(clicked))) {
        elem.style.backgroundColor = 'red'
        setTimeout(defaultcolor, 150, clicked)
        mistakenumber += 1;
        onwrong();
    }
    else {
        if (answerobject[number].includes(parseInt(clicked))) {
            guesslist.push(parseInt(clicked))
            mainguesslist.push(parseInt(clicked))
            elem.style.backgroundColor = 'green'
            console.log(guesslist.length)
            console.log(answerobject[number].length)
            if (guesslist.length == answerobject[number].length) {
                if (mainguesslist.length == finalanswercount) {
                    boxnumber += 1
                    if (boxnumber == 8) {
                        setTimeout(columndefault, 0, number)
                        document.getElementById('lastbox').style.display = 'flex'
                        document.getElementsByClassName('maincontainer')[0].style.pointerEvents = 'none'
                    }
                    else {
                        setTimeout(columndefault, 0, number)
                        number = 0
                        guesslist = []
                        finalanswerlist = []
                        mainguesslist = []
                        finalanswercount = 0
                        document.getElementsByClassName('smallcontainer')[0].innerHTML += `
                    <div class="fieldcontainer">
                    <div class="box 50" id='${idnumber + 1}' onclick="changecolor(this.id)"></div>
                    <div class="box 50" id='${idnumber + 2}' onclick="changecolor(this.id)"></div>
                    <div class="box 50" id='${idnumber + 3}' onclick="changecolor(this.id)"></div>
                    <div class="box 50" id='${idnumber + 4}' onclick="changecolor(this.id)"></div>
                    </div>`
                        idnumber += 4
                        numberofbox(boxnumber)
                        setTimeout(initialscreen, 600, boxnumber)
                        setTimeout(defaultscreen, 1500, boxnumber)
                        setTimeout(columnwhite, 1800, 0)
                    }
                }
                else {
                    setTimeout(columndefault, 500, number)
                    number += 4
                    guesslist = []
                    setTimeout(columnwhite, 500, number)
                }
            }
        }
        else {
            elem.style.backgroundColor = 'red'
            setTimeout(defaultcolor, 150, clicked)
            mistakenumber += 1;
            onwrong();
        }
    }
}