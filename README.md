# Personal Page Admin - NodeJS

> Little Description
## Table of Contents

-   [Support](https://github.com/nodejs/node/blob/master/README.md#support)
-   [Release Types](https://github.com/nodejs/node/blob/master/README.md#release-types)
    -   [Download](https://github.com/nodejs/node/blob/master/README.md#download)

## Overview

Big description

## Clone

```bash
git clone https://github.com/Javier-Caballero-Info/personal_page_admin_nodejs.git
git remote rm origin
git remote add origin <your-git-path>
```

## .babelrc

Here you can specify the version of Nodejs that you want the code to compile to. 

```json
{
  "presets": [
    ["env", {
      "targets": {
        "node": "8.11.1"
      },
      "test": {
        "plugins": [ "istanbul" ]
      }
    }]
  ]
}
```
## Requirements

* **NodeJs:** 8.11.1 or above
* **Npm:** 5.6.0 or above
* **Yarn:** 1.6.0  or above
## Installation

1. ### NodeJs and Npm
Latest LTS Version: **8.11.1** (includes npm 5.6.0)

- Debian / Ubuntu
```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
```

```bash
sudo apt install -y nodejs
```

```bash
sudo apt install -y build-essential
```

- MacOS

	- Bash
	```bash
	curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
	```
	- Brew
	```bash
	brew install node
	```
	- MacPorts
	```bash
	port install nodejs8
	```

- Windows

	- Chocolatey
	```bash
	cinst nodejs.install
	```
	- Scoop
	```bash
	scoop install nodejs
	```
	- MSI installer
	Download [here](http://nodejs.org/#download) the installer.


2. ### Yarn

- Debian / Ubuntu
```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```
```bash
sudo apt update
```
```bash
sudo apt install --no-install-recommends yarn
```

- MacOS

	- Brew
	```bash
	brew install yarn --without-node
	```
	- MacPorts
	```bash
	sudo port install yarn
	```

- Windows

	- Chocolatey
	```bash
	choco install yarn
	```
	- Scoop
	```
	scoop install yarn
	```
	- MSI installer
	Download [here](https://yarnpkg.com/latest.msi) the installer.

For more details, please visit [https://yarnpkg.com/lang/en/docs/install](https://yarnpkg.com/lang/en/docs/install/).
	
3. ### Foreman
We use foreman to load the environment variables from `.env` file. This is important to prevent accidental commit of sensitive data to github
```bash
 yarn global add foreman
```

4. ### Dependencies

This will install all dependencies from package.json

```bash
 yarn install
 ``` 
 
## Add/Remove packages

```bash
 yarn add <PACKAGE_NAME>
 yarn add --dev <PACKAGE_NAME>
 yarn remove <PACKAGE_NAME>
```

## Environment

For development, store all the environment variable in the `.env` file. This will be included in `.gitignore` so that it will not be commited to github.
Make sure you create the `.env` file or the service will not run.

The `.env` should contain the following:
```bash
DB_USER=user
DB_PASS=123456
DB_NAME=testdb
DB_HOST=localhost
```

## Developing

Using `.env` config file
```bash
nf start
```
Or using `environment variables`
```
yarn dev
```

## Test

You can use any reporters that are supported by istanbul: `clover`, `cobertura`, `html`, `json-summary`, `json`, `lcov`, `lcovonly`, `none`, `teamcity`, `text-lcov`, `text-summary`, `text`.

>Setup the environment variables before run the command.

```
yarn test
```

## Report
>Setup the environment variables before run the command.
```
yarn cover
```

## Build

```
yarn build
```

## Running with Docker

To run the server on a Docker container, please execute the following from the root directory:

### building the image
```bash
docker build -t personal_page_admin .
```
### starting up a container
```bash
docker run -p 3000:3000 personal_page_admin
```
## Contributing

Contributions welcome! See the  [Contributing Guide](https://github.com/Javier-Caballero-Info/personal_page_admin_nodejs/blob/master/CONTRIBUTING.md).

## Author

Created and maintained by [Javier Hernán Caballero García](https://javiercaballero.info)).

## License

GNU General Public License v3.0

See  [LICENSE](https://github.com/Javier-Caballero-Info/personal_page_admin_nodejs/blob/master/LICENSE)
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI4MDc4NDE1XX0=
-->