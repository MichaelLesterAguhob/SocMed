<?php 

$file = $_FILES['file'];

echo json_encode(['status'=>'success', 'file'=>$_FILES['file']]);

?>