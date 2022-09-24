process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
NODE_TLS_REJECT_UNAUTHORIZED='0';

const fetch = require('node-fetch');
const axios = require('axios');

const baseUrl ='https://api.intra.42.fr/';
const tokenRoute = 'oauth/token';
const b2r ='/v2/projects/42cursus-boot2root/projects_users';
let final = [];
let accessToken;
let header2;

const headers = {
    "Content-Type": "application/json",
    'Host': 'api.intra.42.fr',
    'User-Agent': 'curl/7.64.1',
    'Accept': '*/*',
};

// const header2 = {
//     'Authorization': 'Bearer ' + accessToken
// };
const params2 = {
    'page[size]':'100',
    'page[number]':'0',
    'filter[campus]':'17'
};

const dataToken = {
    'grant_type':'client_credentials',
    'client_id':'38da7f0e8a8b68063188e0bb210c4645b6124300c58e29416e2e967ce0f9f629',
    'client_secret':'39b04df9bd390e296175d025d5c3d16cd9b7d7dd15b9e432f63dada4b348ea5b',
};

// axios.post(baseUrl+tokenRoute, dataToken)
//     .then(response => {accessToken = response.data.access_token; console.log(accessToken)});
//
// axios.get(baseUrl+b2r, {headers:header2, params:params2})
//     .then(response => {
//         for(let i = 0; i < response.data.length; i++){
//             if(response.data[i].final_mark>0){
//                 final.push(response.data[i].user.login + '   ' + response.data[i].status + '   ' + response.data[i].final_mark);
//             }
//     }
//     return final
//     })
//     .catch(e => console.log(e))
//     .then(final => console.log(final));

// const header2 = {
//     'Authorization': 'Bearer ' + accessToken
// };

axios.post(baseUrl+tokenRoute, dataToken)
    .then(response => {accessToken = response.data.access_token})
    .then(accessToken => header2 = {'Authorization': 'Bearer ' + accessToken})
    .then(axios.get(baseUrl+b2r, {headers:header2, params:params2})
        .then(response => {
            for(let i = 0; i < response.data.length; i++){
                if(response.data[i].final_mark>0){
                    final.push(response.data[i].user.login + '   ' + response.data[i].status + '   ' + response.data[i].final_mark);
                }
            }
            return final
        })
        .catch(e => console.log(e))
        .then(final => console.log(final)))

// axios.get(baseUrl+b2r, {headers:header2, params:params2})
//     .then(response => {
//         for(let i = 0; i < response.data.length; i++){
//             if(response.data[i].final_mark>0){
//                 final.push(response.data[i].user.login + '   ' + response.data[i].status + '   ' + response.data[i].final_mark);
//             }
//     }
//     return final
//     })
//     .catch(e => console.log(e))
//     .then(final => console.log(final));

// const header2 = {
//     'Authorization': 'Bearer ' + accessToken
// };
