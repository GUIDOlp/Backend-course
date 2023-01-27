# Desafio entregable con MongoDB

## Comandos utilizados:

### Consigna:
___
Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.

Terminal 1: Abrimos una consola e inicializamos el servidor de Mongodb con el siguiente comando

```
mongod --dbpath "C:\Users\usuario\Desktop\Backend\carpeta principal\clase-17\e-commerce";
```

```
Esto nos creara por defecto una serie de archivos y carpetas en la ruta donde le pasamos el path, y que luego transformaremos en formato zip.;
```

Terminal 2: Habiendo iniciado nuestro servidor de MongoDB, abrimos otra consola y nos conectamos, esta vez desde el lado del cliente. Antes, debemos dirigirnos al directorio de MongoDB nuestra carpeta local, y cliquear en el archivo mongosh.exe. El comando para el cliente es el siguiente:
```
mongosh;
```
- Para crear la base de datos:
```
use ecommerce;
```
- Para crear las colecciones:
```
db.createCollection("mensajes");
db.createCollection("productos");
```

### Items:
___
1)Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB.

2) Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990).

```
db.productos.insertMany([
{nombre: "chocolate", precio: 120, thumbnail: "url1"},
{nombre: "cafe", precio: 580, thumbnail: "url2"},
{nombre: "cuaderno", precio: 900, thumbnail: "url3"},
{nombre: "pizza", precio: 1280, thumbnail: "url4"},
{nombre: "empanadas", precio: 1700, thumbnail: "url5"},
{nombre: "pescado", precio: 2300, thumbnail: "url6"},
{nombre: "cortinas", precio: 2860, thumbnail: "url7"},
{nombre: "mesa", precio: 3350, thumbnail: "url8"},
{nombre: "mancuernas", precio: 4320, thumbnail: "url9"},
{nombre: "tv", precio: 4990, thumbnail: "url10"}
])

db.mensajes.insertMany([
{email: "eliggiguido@hotmail.com", mensaje: "hola", timestamp: ISODate()},
{email: "gdfgfg@hotmail.com", mensaje: "hola como estas", timestamp: ISODate()},
{email: "klklg@hotmail.com", mensaje: "bien y vos", timestamp: ISODate()},
{email: "kwerew@hotmail.com", mensaje: "me alegro", timestamp: ISODate()},
{email: "mmj@hotmail.com", mensaje: "gracias por preguntar", timestamp: ISODate()},
{email: "xsa@hotmail.com", mensaje: "no hay porque", timestamp: ISODate()},
{email: "zaaz@hotmail.com", mensaje: "nos estamos hablando", timestamp: ISODate()},
{email: "bvnbvn@hotmail.com", mensaje: "dale", timestamp: ISODate()},
{email: "sdff@hotmail.com", mensaje: "saludos", timestamp: ISODate()},
{email: "ñol@hotmail.com", mensaje: "otro para vos", timestamp: ISODate()}
])
```

3)Listar todos los documentos en cada colección.
```
db.productos.find();
db.mensajes.find();
```

4)Mostrar la cantidad de documentos almacenados en cada una de ellas.
```
db.productos.countDocuments();
db.mensajes.countDocuments();
```

5)Realizar un CRUD sobre la colección de productos:
a) Agregar un producto más en la colección de productos
```
db.productos.insertOne({nombre: "notebook", precio: 7800, thumbnail: "url11"});
```

b) Realizar una consulta por nombre de producto específico:

-Listar los productos con precio menor a 1000 pesos.
```
db.productos.find({precio: {$lt: 1000}});
```

-Listar los productos con precio entre los 1000 a 3000 pesos.
```
db.productos.find({$and: [{precio: {$gte: 1000}}, {precio: {$lte: 3000}}]});
```

-Listar los productos con precio mayor a 3000 pesos.
```
db.productos.find({precio: {$gt: 3000}});
```

-Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
```
db.productos.find({}, {nombre: 1, _id: 0}).sort({precio: 1}).skip(2).limit(1);
```

c)Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.

```
db.productos.updateMany({},{$set: {stock: 100}},{upsert:false,multi:true});
```

d) Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 

```
db.productos.updateMany({precio: {$gt: 4000}}, {$set: {stock: 0}});
```

e)Borrar los productos con precio menor a 1000 pesos 

```
db.productos.deleteMany({precio: {$lt: 1000}});
```

6) Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.

```
use admin
db.createUser({"user": "pepe", "pwd": "asd456", roles: [{role: "read", db: "ecommerce"}]})
```

-Reiniciamos mongosh en el cliente y probamos el login del usuario anteriormente creado

```
nos colocamos en la carpeta admin, y escribimos el comando db.auth("pepe", "asd456") para loguearnos;
luego colocando el comando db.getUsers() y nos arroja el usuario creado anteriormente
```

