<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];

  // Menyimpan data ke file teks (data.txt)
  $data = "$name, $email, $message\n";
  file_put_contents("data.txt", $data, FILE_APPEND);

  // Respon ke klien
  header("Content-Type: application/json");
  echo json_encode(["message" => "Terima kasih! Pesan Anda telah berhasil dikirim."]);
} else {
  header("HTTP/1.1 405 Method Not Allowed");
  header("Allow: POST");
  echo "Metode tidak diizinkan.";
}
?>
