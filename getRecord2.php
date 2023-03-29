<?php
//게임2의 결과를 table 형태로 출력해주는 부분
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$val = test_input($_POST["jsonName"]);
$arr2;
$fileName = $val.".json";
$myfile1 = fopen($fileName, "r");
while(!feof($myfile1)) {
    $str = fgets($myfile1);
    $obj = json_decode($str);
    if(isset($obj->ID) and isset($obj->$val)) {
        $arr2[$obj->ID] = $obj->$val;
    }
}
fclose($myfile1);
asort($arr2);

echo "<tr><th>ID</th><th>GAME 2 기록</th></tr>";

$num = 0;
foreach($arr2 as $key => $value){
    if($num == 10) {
        break;
    }
    $msec = substr($value, -2);
    $sec = substr($value, -4, 2);
    $min = substr($value, -5, 1);
    echo "<tr> <td>  ".$key."</td>";
    echo "<td>".$min."분 ".$sec.".".$msec."초 </td> <tr>";
    $num++;
}
?>