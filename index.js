/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = '教えて！Linuxコマンド';
const GET_FACT_MESSAGE = SKILL_NAME + "へようこそ。コマンドを教えてと言ってください。";
const HELP_MESSAGE = '何かお手伝いできることがあれば言ってください';
const HELP_REPROMPT = '何かお手伝いできることがあれば言ってください';
const STOP_MESSAGE = 'またいつでも呼んでください';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = require("./list.json");

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
  'LaunchRequest': function () {
    this.emit('Command');
  },
  'Command': function () {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const {name, explanation, pronunciation} = randomFact;
    const command = pronunciation || name;
    const speechOutput = `${command}について説明します。${command}は${explanation}`;

    this.response.cardRenderer(SKILL_NAME);
    this.response.speak(speechOutput);
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function () {
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;

    this.response.speak(speechOutput).listen(reprompt);
    this.emit(':responseReady');
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(STOP_MESSAGE);
    this.emit(':responseReady');
  },
  'AMAZON.StopIntent': function () {
    this.response.speak(STOP_MESSAGE);
    this.emit(':responseReady');
  },
};

exports.handler = function (event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
