@echo off 
openssl req -config C:\wamp\bin\apache\Apache2.2.21\conf\openssl.cnf -new -out IF26RoadsServer.csr 
pause && cls 
openssl rsa -in privkey.pem -out IF26RoadsServer.key 
openssl x509 -in IF26RoadsServer.csr -out IF26RoadsServer.cert -req -signkey IF26RoadsServer.key -days 365 
openssl x509 -in IF26RoadsServer.cert -out IF26RoadsServer.der.crt -outform DER 
pause && exit