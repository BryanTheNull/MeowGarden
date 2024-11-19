#include <WiFi.h>

// Datos de la red Wi-Fi
const char* ssid = "vF-2.4-VERONICA-A";
const char* password = "va256657";

// Dirección del servidor donde está el archivo PHP
const char* server = "http://192.168.56.1/data.php";  // Cambia la IP por la correcta

WiFiClient client;

void setup() {
  // Iniciar la comunicación serial
  Serial.begin(115200);

  // Conectar al Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando al Wi-Fi...");
  }
  Serial.println("Conectado al Wi-Fi");
  Serial.println(WiFi.localIP());

  // Simular datos de sensores
  float humedad = random(30, 80);   // Humedad aleatoria entre 30 y 80
  float temperatura = random(15, 30); // Temperatura aleatoria entre 15 y 30


  // Crear la URL con los datos
  String url = String(server) + "?humedad=" + String(humedad) + "&temperatura=" + String(temperatura);

  // Imprimir los datos por la consola serial
  //Serial.println(url);

  // Realizar la solicitud HTTP
  if (client.connect(server, 80)) {
    client.print(String("GET ") + url + " HTTP/1.1\r\n" +
                 "Host: " + server + "\r\n" +
                 "Connection: close\r\n\r\n");

     // Leer la respuesta del servidor
    while (client.available()) {
        String line = client.readStringUntil('\r');
        Serial.println(line);  // Ver la respuesta completa del servidor
    }
  }

  // Esperar la respuesta
  delay(500);
}

void loop() {
  // Esperar antes de enviar los próximos datos
  delay(500);  // Enviar cada 10 segundos
}