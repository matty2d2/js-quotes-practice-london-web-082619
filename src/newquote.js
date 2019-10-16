const newQuote = {
    createElement: function(tag, options = {}) {
      const element = document.createElement(tag);
      if (options.className) element.className = options.className;
      if (options.id) element.id = options.id;
      if (options.type) element.type = options.type;
      if (options.value) element.value = options.value;
      if (options.innerText) element.innerText = options.innerText;
      if (options.children) element.append(...options.children);
      if (options.eventType) element.addEventListener(options.eventType, options.eventHandler) 
      return element;
    }
  };