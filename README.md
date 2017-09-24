# Bunq Web #
An open source, self hosted dashboard for Bunq.

![Screenshot](https://i.gyazo.com/17a82f6700a2207b773fa566d2bef651.png)

## Setup

#### Step 1: Install dependencies
```bash
$ composer install
$ npm install
```

#### Step 2: Compile assets
```bash
$ npm install -g grunt
$ grunt
```

#### Step 3: Config file
Rename the `config.yml.dist` from the `app/config` folder to `config.yml`.

#### Step 4: API Key + Config
open in the `config.yml`. fill in your API key and fill in the Permitted IP's

#### Step 5: Determine the right environment
In the `config.yml` easily switch the `sandbox` to `false` to switch to the Bunq production API.