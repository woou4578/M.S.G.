<?php
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$userName = test_input($_POST["val1"]);
$gameRecord1 = test_input($_POST["val2"]);
$gameRecord2 = test_input($_POST["val3"]);
$gameRecordTotal = test_input($_POST["val4"]);

$record1FileName = "record1.json";
$record2FileName = "record2.json";
$recordTotalFileName = "recordTotal.json";

// 파일이 없을수도 있기 때문에 a+ 값을 넣어 파일이 없다면 생성하도록 한다.
// ajax로 넘긴 ID와 기록들을 3종류의 json 파일에 각각 넣게 된다.
$r1File = fopen($record1FileName, "a+");
$r1Obj = array("ID"=> $userName, "record1"=> $gameRecord1);
$r1Json = json_encode($r1Obj, JSON_UNESCAPED_UNICODE);
if(filesize($record1FileName) == 0) {
    fwrite($r1File, $r1Json);
}else {
    fwrite($r1File, "\n");
    fwrite($r1File, $r1Json);
}
fclose($r1File);

$r2File = fopen($record2FileName, "a+");
$r2Obj = array("ID"=> $userName, "record2"=> $gameRecord2);
$r2Json = json_encode($r2Obj, JSON_UNESCAPED_UNICODE);
if(filesize($record2FileName) == 0) {
    fwrite($r2File, $r2Json);
}else {
    fwrite($r2File, "\n");
    fwrite($r2File, $r2Json);
}
fclose($r2File);

$rTotalFile = fopen($recordTotalFileName, "a+");
$rTotalObj = array("ID"=> $userName, "recordTotal"=> $gameRecordTotal);
$rTotalJson = json_encode($rTotalObj, JSON_UNESCAPED_UNICODE);
if(filesize($recordTotalFileName) == 0) {
    fwrite($rTotalFile, $rTotalJson);
}else {
    fwrite($rTotalFile, "\n");
    fwrite($rTotalFile, $rTotalJson);
}
fclose($rTotalFile);
?>