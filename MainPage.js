const modal = document.getElementById("modal");
const manual = document.getElementById("manual");
const userName = document.getElementById("userName");
const nextButton1 = document.getElementById("nextButton1");
const nextButton2 = document.getElementById("nextButton2");
const gameArea = document.getElementById("gameArea");
const topSpace = document.getElementById("topSpace");

const playButton1 = document.getElementById("playButton1");
const playButton2 = document.getElementById("playButton2");
const game1EndButton = document.getElementById("game1EndButton");
const game2EndButton = document.getElementById("game2EndButton");
const resultEndButton = document.getElementById("resultEndButton");

const readyScreen1 = document.getElementById("readyScreen1");
const readyScreen2 = document.getElementById("readyScreen2");
const error1 = document.getElementById("error1");
const error2 = document.getElementById("error2");
const game1 = document.getElementById("game1");
const game2 = document.getElementById("game2");
const resultScreen = document.getElementById("resultScreen");

let ready2;
let record1;
let record2;
let recordTotal;
let game1_min;
let game1_sec;
let game1_millisec;
let game2_min;
let game2_sec;
let game2_millisec;

// 스톱워치 구현 관련
let startTime = 0;
let endTime = 0;
let timerStart;
let millisec;
let sec;
let min;
let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");

function modalOff() {
    modal.style.display = "none";
}
function manualOn() {
    manual.style.display = "block";
}
function manualOff() {
    manual.style.display = "none";
}
function gameAreaOn() {
    gameArea.style.display = "block";
}
function inputText() {
    const nameText = document.createTextNode(userName.value);
    topSpace.children[0].appendChild(nameText);
}

// https://im-developer.tistory.com/53
// 위 사이트에서 스톱워치 구현하는 부분을 참고해 작성하였습니다.
playButton1.addEventListener("click", function() {
    if(!startTime) {
        startTime = Date.now();
    } else {
        startTime += (Date.now() - endTime);
    }
    timerStart = setInterval(function() {
        let nowTime = new Date(Date.now() - startTime);

        min = nowTime.getMinutes();
        sec = addZero(nowTime.getSeconds());
        millisec = addZero(Math.floor(nowTime.getMilliseconds() / 10));

        document.getElementById("min").innerText = min;
        document.getElementById("sec").innerText = sec;
        document.getElementById("millisec").innerText = millisec;
        
    }, 1);
});
playButton2.addEventListener("click", function() {
    if(!startTime) {
        startTime = Date.now();
    } else {
        startTime += (Date.now() - endTime);
    }
    timerStart = setInterval(function() {
        let nowTime = new Date(Date.now() - startTime);

        min = nowTime.getMinutes();
        sec = addZero(nowTime.getSeconds());
        millisec = addZero(Math.floor(nowTime.getMilliseconds() / 10));

        document.getElementById("min").innerText = min;
        document.getElementById("sec").innerText = sec;
        document.getElementById("millisec").innerText = millisec;
        
    }, 1);
});
function addZero(num) {
    return (num < 10 ? '0'+num : ""+num);
}

// 게임1 관련
var svg = document.getElementById("svgMain");
let radiusArr = [128, 64, 32, 16, 8, 4, 2];
let colorArr = ["red", "orange", "yellow", "green", "blue", "indigo", "purple"];
let nnn = 1;
let start_x, end_x;
let start_y, end_y;
let random_x, random_y;
let now_x, now_y;
let now_radius, now_color;
let stage = 0;
let count1 = 0;

// Game1에 들어가는 원을 생성해주는 함수로
// x, y 각각의 랜덤한 위치, 일정한 규칙의 반지름, 무지개 색 순서대로의 색상
// 위의 입력들을 받아 원을 생성하고 event를 줘 game1이 진행되도록 한다. 
function createCircle(xx, yy, rr, cc) {
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", xx);
    circle.setAttribute("cy", yy);
    circle.setAttribute("r", rr);
    circle.setAttribute("stroke", cc);
    circle.setAttribute("stroke-width", "2");
    circle.setAttribute("fill", cc);
    if(nnn<3) { //2단계 반지름 60 반복 2번 시작
        stage = 1;
    }else if(nnn <6) { //3단계 반지름 50 반복 3번 시작
        stage = 2;
    }else if(nnn <10) { //4단계 반지름 40 반복 4번 시작
        stage = 3;
    }else if(nnn <15) { //5단계 반지름 30 반복 5번 시작
        stage = 4;
    }else if(nnn <21) { //6단계 반지름 20 반복 6번 시작
        stage = 5;
    }else if(nnn <29) { //7단계 반지름 10 반복 7번 시작
        stage = 6;
    }else {
        return;
    }
    nnn++;
    
    random_x = Math.random();
    random_y = Math.random();
    start_x = 0+radiusArr[stage];
    end_x = 600-radiusArr[stage]-1;
    start_y = 0+radiusArr[stage];
    end_y = 400-radiusArr[stage]-1;
    now_x = Math.floor(random_x * (end_x-start_x+1))+radiusArr[stage] + random_x;
    now_y = Math.floor(random_y * (end_y-start_y+1))+radiusArr[stage] + random_y;
    now_radius = radiusArr[stage];
    now_color = colorArr[stage];
    if(nnn == 29 && stage == 6) {
        circle.addEventListener("click", function() {
            if(timerStart) {
                clearInterval(timerStart);
                endTime = Date.now();
            }
        });
        circle.addEventListener("click", game1End);
    }
    circle.addEventListener("click", function(){clicked(event, now_x, now_y, now_radius, now_color)});    
    svg.appendChild(circle);
}
// 1단계 반지름 70, 반복 1번 시작
createCircle(300, 200, 128, "red");

function clicked(event, xxx, yyy, rrr, ccc) {
    let p = event.target.parentNode;
    p.removeChild(p.lastChild);
    createCircle(xxx, yyy, rrr, ccc);
}
svg.addEventListener("click", clickCount);
function clickCount() {
    count1++;
}

//게임2 관련
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

let keyArr = [];
let num2 = 0;
let count2 = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);    

// Game2에서의 랜덤한 방향키들을 keyArr에 숫자 형태로 저장한다.
function makeRandomValue() {
    let rand1_4;
    for(let i = 0; i<50; i++) {
        rand1_4 = Math.floor(Math.random()*4)+1;
        keyArr.push(rand1_4);
    }
}
// 위에서 저장한 keyArr에 있는 값들을 토대로 image 들을 바꿔주도록 한다.
function showImg(inputNum) {
    // 이미지 출처 : https://www.pngmart.com/ko/image/26168
    if(inputNum == 1) {
        document.getElementById("imageId").src = "./images/right1.png";
    }else if(inputNum == 2) {
        document.getElementById("imageId").src = "./images/up1.png";
    }else if(inputNum == 3) {
        document.getElementById("imageId").src = "./images/left1.png";
    }else if(inputNum == 4) {
        document.getElementById("imageId").src = "./images/down1.png";
    }
}
// 키보드 입력이 들어왔을때 동작하는 함수이다.
// 화면에 나오는 이미지와 키보드 방향키 입력이 같다면 다음 이미지가 나오도록 한다.
function keyDownHandler(e) {
    if(ready2) {
        if(e.key == 37 || e.key == "ArrowRight") {
            rightPressed = true;
            if(keyArr[num2] == 1){
                num2++;
                showImg(keyArr[num2]);
            }
        }else if(e.key == 38 || e.key == "ArrowUp") {
            upPressed = true;
            if(keyArr[num2] == 2){
                num2++;
                showImg(keyArr[num2]);
            }
        }else if(e.key == 39 || e.key == "ArrowLeft") {
            leftPressed = true;
            if(keyArr[num2] == 3){
                num2++;
                showImg(keyArr[num2]);
            }
        }else if(e.key == 40 || e.key == "ArrowDown") {
            downPressed = true;
            if(keyArr[num2] == 4){
                num2++;
                showImg(keyArr[num2]);
            }
        }
        count2++;
        if(num2 == keyArr.length) {
            if(timerStart) {
                clearInterval(timerStart);
                endTime = Date.now();
            }
            game2End();
            return;
        }
    }
}
// 키보드에서 손을 떼었을 때 동작하는 함수이다.
function keyUpHandler(e) {
	if(e.key == 37 || e.key == "ArrowRight") {
	    rightPressed = false;
    }
    else if(e.key == 39 || e.key == "ArrowLeft") {
	    leftPressed = false;
    }
    else if(e.key == 38 || e.key == "ArrowUp") {
	    upPressed = false;
    }
    else if(e.key == 40 || e.key == "ArrowDown") {
	    downPressed = false;
    }
}
// 입력한 ID가 기존 json 파일에 있는지 확인해주는 함수
function idExistCheck(newName) {
    let fileExist;
    if(newName.length > 0) {
        $.ajax({
            url: "idCheck.php",
            type: "POST",
            async: false,
            data: {
                newId: newName
            },
            success:function(data) {
                if(data == "true") {
                    fileExist = "true";
                }else {
                    fileExist = "false";
                }
            },
            error:function(e) {
                alert(e.reponseText);
            }
        });
        return fileExist;
    }
}
// step1, step2 순서대로 해 modal창을 전환하고 게임 창이 나오도록 한다.
function step1() {
    ready2 = false;
    let nowCheck = idExistCheck(userName.value);
    if(userName.value != "") {
        if(nowCheck == "true") {
            alert("이미 존재하는 ID입니다. 다른 ID를 입력해주세요.");
        }else {
            modalOff();
            manualOn();
        }
    }else{
        alert("ID를 입력해주세요");
    }
}
function step2() {
    manualOff();
    gameAreaOn();
    inputText();
}
// Game1 진행, 잠시 정비, Game2 진행 하는 부분
function pressPlayGame1() {
    // play버튼을 누르면 게임을 시작하게 됩니다.
    readyScreen1.style.display = "none";
    game1.style.display = "block"; 
}
function game1End() {
    ready2 = true;
    // 게임1 종료와 관련된 부분입니다.
    game1_min = document.getElementById("min").innerText;
    game1_sec = document.getElementById("sec").innerText;
    game1_millisec = document.getElementById("millisec").innerText;
    game1.style.display = "none";
    // 준비 페이지 켜기;
    startTime = 0;
    min = 0;
    sec = 0;
    millisec = 0;
    document.getElementById("min").innerText = "00";
    document.getElementById("sec").innerText = "00";
    document.getElementById("millisec").innerText = "00";
    timerStart = null;
    readyScreen2.style.display = "block";
}
function pressPlayGame2() {
    readyScreen2.style.display = "none";
    game2.style.display = "block";
    makeRandomValue();
    showImg(keyArr[num2]);
}
// Game2가 끝나고 각종 기록들을 출력하고 
// 각종 값들을 계산해 각종 조건을 고려해 정리하고 출력한다.
function game2End() {
    ready2 = false;
    // 게임2 종료 후 부분입니다.
    game2_min = document.getElementById("min").innerText;
    game2_sec = document.getElementById("sec").innerText;
    game2_millisec = document.getElementById("millisec").innerText;
    game2.style.display = "none";
    // 결과 페이지 켜기;
    resultScreen.style.display = "block";
    let r1 = "Game1 걸린 시간은 "+game1_min+"분 "+game1_sec+"."+game1_millisec+"초입니다.";
    let r2 = "Game2 걸린 시간은 "+game2_min+"분 "+game2_sec+"."+game2_millisec+"초입니다.";
    let e1 = count1-28;
    let e2 = count2-50;

    let temp1_msec = Number(game1_millisec) + 50*e1;
    let temp1_sec = Number(game1_sec);
    let temp1_min = Number(game1_min);
    let temp2_msec = Number(game2_millisec) + 50*e2;
    let temp2_sec = Number(game2_sec);
    let temp2_min = Number(game2_min);
    if(temp1_msec >= 100) {
        let parse1 = parseInt(temp1_msec/100);
        temp1_sec += parse1;
        temp1_msec -= parse1*100;
    }
    if(temp1_sec >= 60) {
        let parse1 = parseInt(temp1_sec/60);
        temp1_min += parse1;
        temp1_sec -= parse1*60;
    }

    if(temp2_msec >= 100) {
        let parse2 = parseInt(temp2_msec/100);
        temp2_sec += parse2;
        temp2_msec -= parse2*100;
    }
    if(temp2_sec >= 60) {
        let parse2 = parseInt(temp2_sec/60);
        temp2_min += parse2;
        temp2_sec -= parse2*60;
    }

    temp1_msec = addZero(temp1_msec);
    temp1_sec = addZero(temp1_sec);
    temp1_min = String(temp1_min);
    temp2_msec = addZero(temp2_msec);
    temp2_sec = addZero(temp2_sec);
    temp2_min = String(temp2_min);

    record1 = temp1_min + temp1_sec + temp1_msec;
    record2 = temp2_min + temp2_sec + temp2_msec;

    let result1 = "Game1 최종 기록은 "+temp1_min+"분 "+temp1_sec+"."+temp1_msec+"초입니다.";
    let result2 = "Game2 최종 기록은 "+temp2_min+"분 "+temp2_sec+"."+temp2_msec+"초입니다.";
    
    let total_millisec = Number(temp1_msec) + Number(temp2_msec);
    let total_sec = Number(temp1_sec) + Number(temp2_sec);
    let total_min = Number(temp1_min) + Number(temp2_min);
    if(total_millisec >= 100) {
        total_millisec -= 100;
        total_sec += 1;
    }
    if(total_sec >= 60) {
        total_sec -= 60;
        total_min += 1;
    }
    total_millisec = addZero(total_millisec);
    total_sec = addZero(total_sec);
    total_millisec = String(total_millisec);
    total_sec = String(total_sec);
    total_min = String(total_min);
    let rTotal = "총 합산 기록은 "+total_min+"분 "+total_sec+"."+total_millisec+"초입니다.";
    recordTotal = total_min + total_sec + total_millisec;

    document.getElementById("record1Result").innerText = r1;
    error1.innerText = "게임1 틀린 횟수는 "+e1;
    document.getElementById("record2Result").innerText = r2;
    error2.innerText = "게임2 틀린 횟수는 "+e2;
    document.getElementById("finalResult1").innerText = result1;
    document.getElementById("finalResult2").innerText = result2;
    document.getElementById("recordTotalResult").innerText = rTotal;

    addRecord();
}
// 위에서 계산된 기록들을 저장하도록 해주는 함수
function addRecord() {
    let nowName = userName.value;
    if(nowName.length > 0) {
        $.ajax({
            url: "addRecord.php",
            type: "POST",
            data: {
                val1: nowName,
                val2: record1,
                val3: record2,
                val4: recordTotal
            },
            success:function(data) {
            },
            error:function(e) {
                alert(e.reponseText);
            }
        });
    }
}
// 아래 3개의 함수는 마지막 top 10 결과 부분에서
// 테이블에 출력될 수 있도록 해주는 함수
function getRecordTotal() {
    let val = "recordTotal";
    if((userName.value).length > 0) {
        $.ajax({
            url: "getRecordTotal.php",
            type: "POST",
            data: {
                jsonName: val
            },
            success:function(data) {
                gameArea.style.display = "none";
                document.getElementById("result_modal").style.display = "block";
                document.getElementById("totalTable").innerHTML = data;
            },
            error:function(e) {
                alert(e.reponseText);
            }
        });
    } 
}
function getRecord1() {
    let val = "record1";
    if((userName.value).length > 0) {
        $.ajax({
            url: "getRecord1.php",
            type: "POST",
            data: {
                jsonName: val
            },
            success:function(data) {
                document.getElementById("record1Table").innerHTML = data;
            },
            error:function(e) {
                alert(e.reponseText);
            }
        });
    } 
}
function getRecord2() {
    let val = "record2";
    if((userName.value).length > 0) {
        $.ajax({
            url: "getRecord2.php",
            type: "POST",
            data: {
                jsonName: val
            },
            success:function(data) {
                document.getElementById("record2Table").innerHTML = data;
            },
            error:function(e) {
                alert(e.reponseText);
            }
        });
    } 
}

resultEndButton.addEventListener("click", getRecord1);
resultEndButton.addEventListener("click", getRecord2);
resultEndButton.addEventListener("click", getRecordTotal);

nextButton1.addEventListener("click", step1);
nextButton2.addEventListener("click", step2);
playButton1.addEventListener("click", pressPlayGame1);
playButton2.addEventListener("click", pressPlayGame2);