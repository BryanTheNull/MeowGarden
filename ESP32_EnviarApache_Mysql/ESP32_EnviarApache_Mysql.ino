#include <WiFi.h>

// Datos de la red Wi-Fi
const char* ssid = "BryanS21FE";
const char* password = "12345678";

// Dirección y ruta del servidor apache 
const char* host = "192.168.56.104";  // Dirección IP del servidor apache (IP DEL PC HOST)
const int port = 80;                // Puerto del servidor (80 para HTTP)
const char* path = "/data.php";     // Ruta del archivo PHP

// Establecer conexión con un servidor remoto
WiFiClient client;

void setup() {
  // Iniciar la comunicación serial
  Serial.begin(115200);
  conectarWifi();
}

void loop() {
  enviarDatosServidorApache();
  delay(10000); // Enviar datos cada 10 segundos
}

// Función para conectar al Wi-Fi
void conectarWifi(){
  Serial.println("Conectando al Wi-Fi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(2000);
    Serial.print(".");
  }
  Serial.println("\nConectado al Wi-Fi");
  Serial.println("Dirección IP del ESP32: " + WiFi.localIP().toString());
}

// Función para enviar los datos al servidor Apache
void enviarDatosServidorApache(){
  // Simular datos de sensores
  float humedad = random(300, 800) / 10.0;       // Generar valor entre 30.0 y 80.0
  float temperatura = random(150, 300) / 10.0;   // Generar valor entre 15.0 y 30.0

  // Crear la URL con los datos
  String query = String(path) + "?humedad=" + String(humedad, 2) + "&temperatura=" + String(temperatura, 2);

  // Intentar conectar el ESP32 al servidor Apache
  if (!client.connect(host, port)) {
    Serial.println("Error: No se pudo conectar al servidor.");
    return;
  }
  // Enviar solicitud HTTP GET
  enviarSolicitudHTTP(query);
}

// Función para enviar la solicitud HTTP GET al servidor
void enviarSolicitudHTTP(const String& query) {
  client.print("GET " + query + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "Connection: close\r\n\r\n");
  Serial.println("Solicitud enviada.");
  Serial.println("URL Generada: " + query);
}