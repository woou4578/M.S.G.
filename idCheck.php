<?php
// 처음 modal창에서 입력하고자 하는 ID를 확인해주는 부분으로
// recordTotal.json 파일에 입력한 ID가 이미 존재하는지 확인해준다.
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$newId = test_input($_POST["newId"]);
$idArr;
$myFileName = "recordTotal.json";
$myFile = fopen($myFileName, "r");

$nameExist = "";
$index = 0;
while(!feof($myFile)) {
    $str = fgets($myFile);
    $obj = json_decode($str);
    if(isset($obj->ID)) {
        $idArr[$index] = $obj->ID;
        $index++;
    }
}
fclose($myFile);

for($i = 0; $i < count($idArr); $i++){
    if($idArr[$i] == $newId) {
        $nameExist = "true";
        break;
    }
}
if($nameExist == "") {
    echo "false";
}else {
    echo "true";
}   
?>