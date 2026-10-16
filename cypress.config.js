require('dotenv').config();// used npm install dotenv, dotenv reads .env file
const { plugin } = require('@cypress/grep/plugin');
const environments = require('./config/environments')
const languages = require('./config/languages')
const { defineConfig } = require("cypress");

const environment = process.env.TEST_ENV || 'qa'
const requestedLanguage = process.env.TEST_LANGUAGE || 'en-US'
const language = Object.values(languages).includes(requestedLanguage)?requestedLanguage:'en-US'
//Object.values(languages)=['en-US','de-DE','fr-FR','ja-JP','es-ES']
module.exports = defineConfig({
  env:{
      email:process.env.TEST_EMAIL,
      password:process.env.TEST_PASSWORD,
  },
  expose:{
      //language:'en-US',
      //environment:'qa',

      language:language,
      environment:environment// or write language,environment its same thing
    },
    retries: {
        runMode: 2,
        openMode: 0
    },
    video: true,
    reporter: 'mochawesome',
  e2e: {
    //baseUrl:'https://practicesoftwaretesting.com/',//comes from config/environments
    //baseurl is a built-in cypress configuration property while apiUrl is custom property
    //expose:{
      //language:'en-US',
      //environment:'qa',
    //},
    setupNodeEvents(on, config) { // config object has an env property 
      console.log('url is ',config.baseUrl)

      console.log('lang is',config.expose.language)
      //console.log(config.expose.environment)
      //const environment = config.expose.environment; //qa

      console.log('Environment:',environment)
      console.log('Language:',language)

      on('before:browser:launch', (browser = {}, launchOptions) => {

        if (browser.family === 'chromium' || browser.name === 'electron') {
            launchOptions.args.push('--enable-logging');
            launchOptions.args.push('--disable-blink-features=AutomationControlled');
        }

        return launchOptions;
      });

     
      config.baseUrl=environments[environment].baseUrl;
      config.expose.apiUrl=environments[environment].apiUrl;
      console.log('baseUrl is  ',config.baseUrl);
      plugin(config);

      return config;
    },
  },
});
