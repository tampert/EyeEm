<?php
$_POST = file_get_contents("php://input", true);
$request = json_decode($_POST);
$image_src =  $request->image_src;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://vision-api.eyeem.com/v1/analyze");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "{   \"requests\":[   {         \"tasks\":[            {               \"type\":\"TAGS\"            },            {               \"type\":\"CAPTIONS\"        },            {               \"type\":\"AESTHETIC_SCORE\"            }         ],         \"image\":{ \"url\":\"$image_src\"         }      }   ]}");
curl_setopt($ch, CURLOPT_POST, 1);

$headers = array();
$headers[] = "Content-Type: application/json";
$headers[] = "Accept: application/json";
$headers[] = "Authorization: Bearer medp0ncntohc0dcrh4807nodptalrplnv6717k8a";
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
echo $result;
curl_close ($ch);
?>