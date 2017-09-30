# Bunq Web #
An open source, self hosted dashboard for Bunq.

![Screenshot](https://i.gyazo.com/6ef6be8e053256e8d9dc8b7ab3713cd8.gif)

## Setup

#### Step 1: Download the latest release
Download the latest release (ZIP file) from [this page](https://github.com/DennisSnijder/BunqWeb/releases).

#### Step 2: Setup hosting
Setup your local hosting.
make sure the index is pointed towards the `/web` folder

#### Step 3: Config file
Rename the `config.yml.dist` from the `app/config` folder to `config.yml`.

#### Step 4: API Key + Config
open in the `config.yml`. fill in your API key and fill in the Permitted IP's

#### Step 5: Determine the right environment
In the `config.yml` easily switch the `sandbox` to `false` to switch to the Bunq production API.


## Development Setup

#### Step 1: Install dependencies
```bash
$ composer install
$ npm install
```

#### Step 2: Compile assets
```bash
$ npm install -g grunt webpack cross-env
$ npm run build
$ npm run serve
```

#### Step 3: Config file
Rename the `config.yml.dist` from the `app/config` folder to `config.yml`.

#### Step 4: API Key + Config
open in the `config.yml`. fill in your API key and fill in the Permitted IP's

#### Step 5: Determine the right environment
In the `config.yml` easily switch the `sandbox` to `false` to switch to the Bunq production API.
