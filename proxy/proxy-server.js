const http = require('http');
const httpProxy = require('http-proxy');

// Crea un nuevo servidor proxy
const proxy = httpProxy.createProxyServer();

// Configura el servidor proxy para redirigir las solicitudes entrantes
const server = http.createServer((req, res) => {
  // Redirige la solicitud a la URL de destino
  proxy.web(req, res, { target: 'http://192.168.1.235:8574/sntssrv.dll/api/rest/tsm/calcula_RentaVitalicia' });
});

// Maneja los errores del servidor proxy
proxy.on('error', (err, req, res) => {
  console.error('Error en el servidor proxy:', err);
  res.writeHead(500, {
    'Content-Type': 'text/json'
  });
  res.end('Ocurrió un error en el servidor proxy.');

});

// Inicia el servidor proxy en el puerto deseado


const puerto =5500;
    server.listen(puerto, () => {
    console.log(`Servidor proxy en ejecución en el puerto ${puerto}`);
});


// verificar la tabulacion con el json 



