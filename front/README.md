# [Rock Paper Scissors!](https://play-rock.cloudno.de)

This directory contains react front end code.

For testing and development of front-end, run `npm start` from this directory.
To direct requests to node server add `"proxy": "http://localhost:2000"` in _front/package.json_ file.

For production build -
- In _front directory_ run `npm run build` and copy these files to _back directory_ -
    - `front/build/index.html` to `back/views/index.ejs`
    - `front/build/*` to `back/public/*`
    - Then from _back directory_ run `node app` to start local server at port 2000.

<br />

_This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)_