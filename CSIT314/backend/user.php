<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

header("Content-Type: application/json");
$method = $_SERVER['REQUEST_METHOD'];

// Database connection
$conn = new mysqli("localhost", "root", "root", "acc_db");
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"));

switch ($method) {
    case 'POST':
        // Check if it's an add or get operation based on the presence of 'action'
        if (isset($data->action) && $data->action === 'getUser') {
            getUser($data, $conn);
        } else {
            addUser($data, $conn);
        }
        break;

    case 'PUT':
        modifyUser($data, $conn);
        break;

    case 'DELETE':
        deleteUser($data, $conn);
        break;

    default:
        echo json_encode(["error" => "Invalid request method"]);
        break;
}

$conn->close();

// Get User Function
function getUser($data, $conn) {
    $email = $data->email;
    $password = $data->password;

    $stmt = $conn->prepare("SELECT * FROM user_acc WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        if (password_verify($password, $row['password'])) {
            echo json_encode($row);
        } else {
            echo json_encode(["error" => "Invalid password"]);
        }
    } else {
        echo json_encode(["error" => "User not found"]);
    }

    $stmt->close();
}

// Add User Function
function addUser($data, $conn) {
    $email = $data->email;
    $password = password_hash($data->password, PASSWORD_BCRYPT);
    $role = $data->role;
    $name = $data->name;
    $hp = $data->hp ?? '';
    $address = $data->address ?? '';

    $stmt = $conn->prepare("INSERT INTO user_acc (email, password, role, name, phone_number, address) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $email, $password, $role, $name, $hp, $address);
    if ($stmt->execute()) {
        echo json_encode(["message" => "User added successfully"]);
    } else {
        echo json_encode(["error" => "Failed to add user"]);
    }

    $stmt->close();
}

// Modify User Function
function modifyUser($data, $conn) {
    $email = $data->email;
    $role = $data->role;
    $name = $data->name;
    $hp = $data->hp ?? '';
    $address = $data->address ?? '';

    $stmt = $conn->prepare("UPDATE user_acc SET role = ?, name = ?, phone_number = ?, address = ? WHERE email = ?");
    $stmt->bind_param("sssss", $role, $name, $hp, $address, $email);
    if ($stmt->execute()) {
        echo json_encode(["message" => "User modified successfully"]);
    } else {
        echo json_encode(["error" => "Failed to modify user"]);
    }

    $stmt->close();
}

// Delete User Function
function deleteUser($data, $conn) {
    $email = $data->email;

    $stmt = $conn->prepare("DELETE FROM user_acc WHERE email = ?");
    $stmt->bind_param("s", $email);
    if ($stmt->execute()) {
        echo json_encode(["message" => "User deleted successfully"]);
    } else {
        echo json_encode(["error" => "Failed to delete user"]);
    }

    $stmt->close();
}
?>
