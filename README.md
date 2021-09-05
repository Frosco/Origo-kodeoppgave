# Origo-kodeoppgave

A coding test by the digital department of the City of Oslo.
The project consists of an express backend and a React frontend. It uses Typescript in both projects.

## Local development ("Running it")

Open a shell and navigate to the `api` folder. Then run `npm install` and `npm start`.

Open another shell and navigate to the `frontend` folder. Run `npm install` and `npm start`. Open a browser and go to <http://localhost:3000> .

## A note about Kubernetes

The files containing Kubernetes resources are meant as an illustration for how a production configuration of this project could look like. To make it work, a dns address needs to be obtained and the docker images need to be uploaded to a registry and the corresponding references in code and yaml-files need to be replaced. Furthermore it is assumed that the nginx ingress controller is present on the cluster.
