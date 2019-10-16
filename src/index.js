
document.addEventListener('DOMContentLoaded', () => {
    const newQuoteForm = document.getElementById('new-quote-form');
    const quoteList = document.getElementById('quote-list');
    
    showQuotes();
    newQuoteForm.addEventListener('submit', showNewQuote);

    function showQuotes(){
        getQuotes().then(json=>addAllQuotesToList(json, quoteList))
    }


    function addAllQuotesToList(array, list){
        array.forEach(quote => {appendCard(quote, list)});
    }

    function appendCard(quote, list) {
        list.append(addQuoteToList(quote))
    }

    function addQuoteToList(quote){
        const card = createQuoteCard(quote);
        return card;
    }


    function showNewQuote(e){
        e.preventDefault();
        postQuote(createNewQuote(e))
            .then(json => {
                json.likes = [];
                appendCard(json, quoteList);
            })
        e.target.reset();
    }


    function createNewQuote(e){
        const quote = {
            quote: e.target[0].value,
            author: e.target[1].value,
        }
        return quote;
    }


    function removeQuote(e, quote){
        const itemToDelete = e.target.parentNode.parentNode;
        deletePost(quote)
            .then(() => itemToDelete.parentNode.removeChild(itemToDelete))
    }


    function likeQuote(e, quote){
        const likeNumber = e.currentTarget.firstChild;
        const like = createLikesObj(quote);
        postLike(like)
            .then(() => {
                getLikes(quote)
                    .then(json =>{ likeNumber.innerText = json.likes.length})
            })
    }
    

    function createLikesObj(quote){
        const like = {
            quoteId: quote.id,
            createdAt: Math.floor(Date.now() / 1000)
        };
        return like;
    }
    

    function showEditForm(e, quote, card){
        const button = e.target;
        if (button.className == 'btn-info'){
            button.className = 'active';
            const form = makeEditForm(quote, card);
            button.parentNode.appendChild(form);
        }else{
            button.className ='btn-info';
            button.parentNode.removeChild(button.parentNode.lastChild);
        }       
    }

    function editQuote(e, quote, card){
        e.preventDefault();
        
        quote.quote = e.target[0].value;
        quote.author = e.target[1].value;

        patchQuote(quote)
            .then(() => quoteList.replaceChild(addQuoteToList(quote), card))
    }


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////// CREATE QUOTE CARD BELOW /////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    
    const createLi = options => newQuote.createElement("li", options);
    const createBlockQuote = options => newQuote.createElement("blockquote", options);
    const createP = options => newQuote.createElement("p", options);
    const createFooter = options => newQuote.createElement("footer", options);
    const createSpan = options => newQuote.createElement("span", options);
    const createButton = options => newQuote.createElement("button", options);
    const createForm = options => newQuote.createElement('form', options);
    const createLabel = options => newQuote.createElement('label', options);
    const createInput = options => newQuote.createElement('input', options);
    const createBreak = () => document.createElement('br');

    function createQuoteCard(quote){
        const card = createLi({
            className: "quote-card",
            children: [
                createBlockQuote({
                    className: 'blockquote',
                    children: [
                        createP({
                            className: 'mb-0',
                            innerText: quote.quote
                        }),
                        createFooter({
                            className: 'blockquote-footer',
                            innerText: quote.author
                        }),
                        createButton({
                            eventType: 'click',
                            eventHandler: (e) => likeQuote(e, quote),
                            className: 'btn-danger',
                            children: [
                                createSpan({
                                    innerText: `${quote.likes.length}`
                                }),
                                createSpan({
                                    innerText: ' ♡'
                                })
                            ] 
                        }),
                        createButton({
                            eventType: 'click',
                            eventHandler: (e) => showEditForm(e, quote, card),
                            className: 'btn-info',
                            innerText: 'Edit ✎',
                        }),
                        createButton({
                            eventType: 'click',
                            eventHandler: (e) => removeQuote(e, quote),
                            className: 'btn-dark',
                            innerText: 'Delete ☠︎',
                        }),
                        createBreak()   
                    ]
                })
            ]
        })
        return card;
    }
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////// CREATE EDIT FORM BELOW /////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    function makeEditForm(quote, card){
        const form = createForm({
                        eventType: 'submit',
                        eventHandler: (e) => editQuote(e, quote, card),
                        children: [
                            createLabel({
                                innerText: 'Edit Quote'
                            }),
                            createInput({
                                type: 'text',
                                value: quote.quote,
                            }),
                            createLabel({
                                innerText: 'Author'
                            }),
                            createInput({
                                type: 'text',
                                value: quote.author,
                            }),
                            createButton({
                                innerText: 'Edit',
                                class: 'btn-warning',
                                type: 'submit'
                            }),
                            createBreak()
                        ]
                    })
        return form;
    }
    
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    
})