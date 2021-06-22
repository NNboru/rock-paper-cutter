# [Rock Paper Scissors!](https://play-rock.cloudno.de)

This directory contains express back-end code.

To run local server for development, run `node app` from this directory.

For production build -
- In _front directory_ run `npm run build` and copy these files to _back directory_ -
    - `front/build/index.html` to `back/views/index.ejs`
    - `front/build/*` to `back/public/*`
    - Then from _back directory_ run `node app` to start local server at port 2000.

Dependencies for this project -
- cookie-parser
- dotenv
- ejs
- express
- mongoose
- morgan
- socket.io