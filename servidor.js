const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Configurar el proxy
app.use('/api', createProxyMiddleware({
  target: 'http://192.168.1.235:8574/sntssrv.dll/api/rest/tsm/calcula_RentaVitalicia',
  changeOrigin: true,
}));

// Resto de la configuración del servidor...

app.listen(5500, () => {
  console.log('Servidor escuchando en el puerto 5501');
});
