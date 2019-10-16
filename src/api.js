const quotesUrlBase = 'http://localhost:3000/quotes';
const embedLikes = '?_embed=likes&_sort=author';
const likesUrl = 'http://localhost:3000/likes';

//////////////////////////////////////////////////
function configObj(obj, method){
    return {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(obj)
    }
}
//////////////////////////////////////////////////
//////////////////////////////////////////////////
function getQuotes(){
    return fetch(quotesUrlBase+embedLikes)
        .then(resp => resp.json())
}


function postQuote(quote){
    const method = 'POST'
    return fetch(quotesUrlBase, configObj(quote, method)) 
        .then(resp => resp.json())
}


function patchQuote(quote){
    method = 'PATCH';
    return fetch(quotesUrlBase+'/'+quote.id, configObj(quote, method))
        .then(resp => resp.json())
}


function deletePost(quote){
    const method = 'DELETE'
    return fetch(quotesUrlBase+'/'+quote.id, configObj(quote, method))
        .then(resp => resp.json())
}
//////////////////////////////////////////////////
//////////////////////////////////////////////////
function postLike(like){
    const method = 'POST';
    return fetch(likesUrl, configObj(like, method))
        .then(resp => resp.json())
}


function getLikes(quote){
    const getUrl = quotesUrlBase+'/'+quote.id+embedLikes;
    return fetch(getUrl)
        .then(resp => resp.json())
}
//////////////////////////////////////////////////

