# Ruebook

A project for [BostonHacks](https://bostonhacks.io/) [2021](https://bostonhacks-2021.devpost.com/)! 

> "For you there's rosemary and rue; 
> these keep seeming and savour all the winter long." 
> 
> Shakespeare - *The Winter's Tale*

We designed a journaling web application which analyzes user sentiment and seeks to demonstrate what users are most stressed about. Mental health has been especially important in the wake of the COVID-19 pandemic, therefore we decided to create a responsive website which gives mental health tips and serves to encourage users.

We utilized Google's Cloud Natural Language API for this project. 

## Setup configuration

After running `git clone https://github.com/synkathairo/ruebook`, use `npm install` to install the requisite npm packages. Create a file called `.env` in your cloned directory, with the following format:

```js
API_KEY=apiKeyTextHere
```
Place your API key as needed above, derived from Google Cloud. Follow [these steps](https://cloud.google.com/natural-language/docs/quickstart) to activate the Cloud Natural Language API from Google Cloud. Then follow [these steps](https://cloud.google.com/docs/authentication/api-keys) to obtain an API key.

## To run

Use `npm server` within the directory to run as configured at `http://localhost:8081` or `http://127.0.0.1:8081`.