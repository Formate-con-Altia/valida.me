# Validame

## Descripción


Validame es una aplicación destinada a mejorar la productividad en entornos de empresa o usuario personal. Permite unificar en una sola aplicación, las tareas administrativas necesarias para solicitar y recopilar información de nuestros clientes.

Desarrollado por los alumnos del curso Full Stack Developer, impartido por [Altia](https://www.altia.es/), junto al formador [Óscar Miras](https://github.com/omiras).

<a href="https://validame.herokuapp.com/" target="_blank">Demo</a>

## Tecnologías

- NodeJS - Nos permite tener una aplicación web o API, del lado servidor, usando JavaScript
- Express - Dota de funcionalidades y minimalismo extra a NodeJS en cuanto a las aplicaciones web o API's
- MongoDB - Sistema de base de datos NoSQL. Lenguaje JavaScript. Facilidad y escalabilidad en su uso
- Bootstrap 5.0 - Librería que simplifica el diseño y la adaptación del mismo para cualquier agente de usuario

[Más información](https://github.com/Formate-con-Altia/valida.me/wiki)

## Instalación

Instalar las dependencias:

```bash
npm install
```

Copiar el archivo `.env.example` y renombrarlo a `.env`.

Añadir las siguientes líneas en el archivo `.env` :

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Adicionalmente, decir que la `MONGO_URI` dentro de este archivo utiliza una dirección local, por lo que hay que tener instalado el servidor de MongoDB.

https://www.mongodb.com/try/download/community

Y crear una conexión con el siguiente string:

```
mongodb://localhost:27017/validame  
```

Otra opción es cambiar la `MONGO_URI` por la dirección de una base de datos MongoDB que tengas creada.

Iniciar el servidor:

```bash
npm start
```

La aplicación debería estar ejecutándose en: http://localhost:3000

## Autores

- **Aarón Aira** ([@aaronaira](https://github.com/aaronaira))
- **Adrián Acosta** ([@Aap138](https://github.com/Aap138))
- **Adrián González** ([@AdrianGonzalezFilgueira](https://github.com/AdrianGonzalezFilgueira))
- **Adrián Rey** ([@arlomba](https://github.com/arlomba))
- **Alejandro Alonso** ([@AlexPortas](https://github.com/AlexPortas))
- **Ángel Amado** ([@angel-amado](https://github.com/angel-amado))
- **David Gómez** ([@davidgomezfrieiro](https://github.com/davidgomezfrieiro))
- **David Pérez** ([@k87c](https://github.com/k87c))
- **Hugo Álvarez** ([@HugoAlvrz](https://github.com/HugoAlvrz))
- **Iago Fernández** ([@IagoFernandezBlanco](https://github.com/IagoFernandezBlanco))
- **João Silva** ([@JFSilvaM](https://github.com/JFSilvaM))
- **Leonar Estupiñan** ([@LeonarEQ](https://github.com/LeonarEQ))
- **María Gabriela Hernández** ([@gabihersan988](https://github.com/gabihersan988))
- **Paula Iglesias** ([@PaULah88](https://github.com/PaULah88))
