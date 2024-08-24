<?php
$servername = "localhost";
$username = "band";
$password = "khj021101!";
$dbname = "band";

// MySQL 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 요청 방식에 따른 처리
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 할 일 항목 추가
    $id = $_POST['id'];
    $title = $_POST['title'];
    $start = $_POST['start'];

    $stmt = $conn->prepare("INSERT INTO todos (id, title, start) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $id, $title, $start);

    if ($stmt->execute()) {
        echo json_encode(['id' => $id, 'title' => $title, 'start' => $start]);
    } else {
        http_response_code(500);
        echo 'Server Error';
    }

    $stmt->close();

} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // 모든 할 일 항목 가져오기
    $sql = "SELECT * FROM todos";
    $result = $conn->query($sql);

    $todos = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $todos[] = $row;
        }
    }
    echo json_encode($todos);

} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // 할 일 항목 삭제
    parse_str(file_get_contents("php://input"), $_DELETE);
    $id = $_DELETE['id'];

    $stmt = $conn->prepare("DELETE FROM todos WHERE id = ?");
    $stmt->bind_param("s", $id);

    if ($stmt->execute()) {
        http_response_code(204);
    } else {
        http_response_code(500);
        echo 'Server Error';
    }

    $stmt->close();
}

$conn->close();
?>
