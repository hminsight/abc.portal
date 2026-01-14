$(function () {
  console.log("jquery & bootstrap are ready");
  
  // Initialize off-canvas menu
  initializeOffcanvasMenu();
});

if (typeof portal_common === "undefined") {
  portal_common = { _namespace: true };
}

portal_common = {};

/**
 * Initialize off-canvas menu functionality
 */
function initializeOffcanvasMenu() {
  const offcanvasElement = document.getElementById('navbarOffcanvas');
  
  if (!offcanvasElement) {
    console.warn('Off-canvas menu element not found');
    return;
  }

  console.log('Initializing off-canvas menu');

  // Handle dropdown toggles within the off-canvas menu
  const dropdownToggles = offcanvasElement.querySelectorAll('.nav-link.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    // Set initial state
    toggle.setAttribute('aria-expanded', 'false');
    
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const parentLi = this.closest('.dropdown');
      const dropdownMenu = parentLi.querySelector('.dropdown-menu');
      
      if (!dropdownMenu) return;
      
      const isCurrentlyOpen = dropdownMenu.classList.contains('show');
      
      // Close all dropdowns first
      offcanvasElement.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
      });
      offcanvasElement.querySelectorAll('.dropdown-toggle').forEach(t => {
        t.setAttribute('aria-expanded', 'false');
      });
      
      // Toggle current dropdown
      if (!isCurrentlyOpen) {
        dropdownMenu.classList.add('show');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Reset all dropdowns when off-canvas is hidden
  offcanvasElement.addEventListener('hidden.bs.offcanvas', function() {
    offcanvasElement.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.classList.remove('show');
    });
    offcanvasElement.querySelectorAll('.dropdown-toggle').forEach(toggle => {
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  console.log('Off-canvas menu initialized with', dropdownToggles.length, 'dropdown toggles');
}

/* Portal Alert ///////////////////////////////////////////////////////////////////////
* How to use:
* Add content by using append or prepend
* Content can be string or HTML string
* alertMsg.show(type) - type can be one of 6 options
      alertMsg.types.SUCCESS
      alertMsg.types.DANGER
      alertMsg.types.WARNING
      alertMsg.types.INFO
      alertMsg.types.MESSAGE
      // Or custom
      {
        cssClass: "alert-custom-css",
        iconClass: "fa-circle-question",
      }

// Delcare the instance 
const alertMsg = new AlertMessage();

** EXAMPLE USAGE **
alertMsg.append('hello is there a problem 4?');
alertMsg.append('hello I take HTML <a href="#>Some link</a>');
alertMsg.prepend('hello is there a problem 1?');
alertMsg.show(alertMsg.types.SUCCESS); // check icon
alertMsg.show(alertMsg.types.DANGER);
alertMsg.show(alertMsg.types.WARNING);
alertMsg.show(alertMsg.types.INFO);
alertMsg.show(alertMsg.types.MESSAGE); // No icon
alertMsg.show();
alertMsg.scrollTo();
alertMsg.reset();
alertMsg.hide();

** Add the HTML to the template where the alert needs to be shown **
<div class="alert-container" portal-alert>
   <div class="alert" role="alert">
     <i aria-hidden="true" class="fa"></i>
     <div class="alert-content"></div>
     <button type="button" class="close" aria-label="Close">
       <span aria-hidden="true">&times;</span>
      </button>
   </div>
</div>
*/
portal_common.PortalAlert = function ($element) {
  const $el = $element === undefined ? $("[portal-alert]") : $element;
  if ($el) {
    this.init($el);
  } else {
    console.warn("Portal Alert - No <div portal-alert></div> html found");
  }
};
portal_common.PortalAlert.prototype = {
  init: function ($el) {
    this.types = {
      SUCCESS: { cssClass: "alert-success", iconClass: "fa-circle-check" },
      WARNING: {
        cssClass: "alert-warning",
        iconClass: "fa-exclamation-triangle",
      },
      DANGER: {
        cssClass: "alert-danger",
        iconClass: "fa-exclamation-triangle",
      },
      INFO: { cssClass: "alert-info", iconClass: "fa-circle-info" },
      MESSAGE: { cssClass: "alert-info", iconClass: "hide" },
    };

    this._offsetY = 20;
    this._msgList = [];
    this._alertClass = this.types.INFO.cssClass;
    this._iconClass = this.types.INFO.iconClass;
    this.$el = $el;
    this.msgHtml = "";
    this.$content = $(".alert-content", this.$el);
    this.$alert = $(".alert", this.$el);
    this.$icon = $(".fa", this.$el);
    this.$icon.hide();
    this.$close = $(".close", this.$el);
    this.$close.on("click", this.hide.bind(this));
  },

  append: function (msg) {
    var addMsg = this.add(msg);
    if (addMsg) {
      this.$content.append(addMsg);
    }
  },

  prepend: function (msg) {
    var addMsg = this.add(msg);
    if (addMsg) {
      this.$content.prepend(addMsg);
    }
  },

  add: function (msg) {
    if (typeof msg === "string") {
      if (!this._msgExists(msg)) {
        this._msgList.push(msg);
        if (this._isHTML(msg)) {
          return msg;
        }
        return (msg = "<p>" + msg + "</p>");
      }
    }
    return null;
  },

  show: function (type) {
    this._alertClass =
      type === undefined ? this.type.INFO.cssClass : type.cssClass;
    this._iconClass =
      type === undefined ? this.type.INFO.iconClass : type.iconClass;
    if (this.$content.children().length > 0) {
      this.$alert.removeClass(this._alertClass);
      //   this._alertClass = props.type;
      if (!this.$alert.hasClass(this._alertClass)) {
        this.$alert.addClass(this._alertClass);
      }

      this.$icon.removeClass(this._iconClass);
      //   this._iconClass = props.icon;
      if (!this.$icon.hasClass(this._iconClass)) {
        this.$icon.addClass(this._iconClass);
      }
      if (this._iconClass) {
        this.$icon.show();
      } else {
        this.$icon.hide();
      }

      if (!this.$el.hasClass("show")) {
        this.$el.addClass("show");
      }
    }
  },

  hide: function () {
    this.$el.removeClass("show");
    this.reset();
  },

  reset: function () {
    this._msgList = [];
    this.$content.empty();
  },

  scrollTo: function () {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: this.$alert.offset().top - this._offsetY,
      },
      1000
    );
  },

  hasAlerts: function () {
    if (this.$content) {
      return this.$content.children().length > 0;
    }
    return false;
  },

  _msgExists: function (msg) {
    var err = false;
    this._msgList.forEach(function (str) {
      var test = str.match(msg);
      if (Array.isArray(test)) {
        err = str.match(msg).length > 0;
      }
    });
    return err;
  },

  _isHTML: function (str) {
    var doc = new DOMParser().parseFromString(str, "text/html");
    return Array.from(doc.body.childNodes).some(function (node) {
      node.nodeType === 1;
    });
  },
};

/**
 * Create and manage cookies
 */
portal_common.setCookie = (name, value, days = 1) => {
  let expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

portal_common.getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

portal_common.eraseCookie = (name) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

/** Portal Modal ///////////////////////////////////////////////
 * How to use:
 * HTML template has been placed in the EO-Footer

// Delcare the instance 
const portalModal = new PortalModal();

// Basic usage             
portalModal.show((modal) => {
      // This is the call back function
      if (modal.result === 'yes') {
          // Do something on user response
          console.log('callback', modal.data);
      }
},
      {
          // Title string only
          title: 'This is a custom modal',
          // Details can be a string or html
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      }
);


// Advanced usage
portalModal.show((modal) => {
      // This is the call back function
      if (modal.result === 'yes') {
          // Do something on user response
          console.log('callback', modal.data);
      }
      if (modal.result === 'not-sure') {
          // Do something on user response
          console.log('callback - not sure what to do', modal.data);
      }
  },

      {
          // Title string only
          title: 'This is a custom modal',
          // Details can be a string or html
          content: '<strong>Lorem ipsum dolor sit amet</strong> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et <a href="#">dolore magna aliqua.</a> ',
          // Custom buttons
          btns: [
              { value: '', label: 'Cancel', cssClass: 'btn-secondary btn-left' },
              { value: 'not-sure', label: 'Not sure?', cssClass: 'btn-warning' },
              { value: 'yes', label: 'Yes please!', cssClass: 'btn-primary' }
          ]
      },
      // Pass soome data through to the call back function
      { data: 'pass some data' }
);

*/

portal_common.PortalModal = function () {
  var self = this;
  var loaded = function () {
    var $el = $("[portal-modal]");
    if ($el.length > 0) {
      self.init($el);
    } else {
      console.warn("Portal Modal - No <div portal-modal></div> html found");
    }
  };
  if (document.readyState !== "complete") {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        loaded();
      },
      false
    );
  } else {
    loaded();
  }
};
portal_common.PortalModal.prototype = {
  init: function ($el) {
    this._data = null;
    this._$modal = $el;
    this._$title = $(".modal-title", this._$modal);
    this._$body = $(".modal-body", this._$modal);
    this._$footer = $(".modal-footer", this._$modal);
    this._callback = null;
    this.__onHide = this._onHide.bind(this);
    this.__onClick = this._onClick.bind(this);
    this._default = {
      title: "Warning!",
      content: "Choose an option",
      btns: [
        { label: "Cancel", value: null, cssClass: "btn-left" },
        { label: "Yes", value: "yes", cssClass: "btn-primary" },
      ],
    };
    this._content = this._default;
    this._ready = true;
    if (this._showWhenReady && this._props) {
      this.show(this._props.callback, this._props.data, this._props.props);
    }
    this._showWhenReady = false;
  },

  _config: function () {
    this._$title.html(this._content.title);
    this._$body.html(this._content.content);
    if (Array.isArray(this._content.btns)) {
      this._addButtons();
    }
  },

  _addButtons: function () {
    var self = this;
    this._$footer.children().remove();
    this._content.btns.forEach(function (btnContent) {
      var $btn = $(document.createElement("button"));
      $btn.prop("type", "button");
      $btn.data("value", btnContent.value);
      $btn.html(btnContent.label);
      $btn.addClass("btn");
      $btn.addClass(btnContent.cssClass);
      $btn.on("click", self.__onClick);
      self._$footer.append($btn);
    });
  },

  _onClick: function (e) {
    this._$modal.off("hidden.bs.modal", this.__onHide);
    this.hide();
    if (this._callback) {
      var val = $(e.target).data("value");
      this._callback({ result: val, data: this._data });
    }
  },

  _onHide: function () {
    this._$modal.off("hidden.bs.modal", this.__onHide);
    if (this._callback) {
      this._callback({ result: null, data: this._data });
    }
  },

  getDefaults: function () {
    return this._default;
  },

  show: function (callback, props, data) {
    if (this._ready) {
      this._val = null;
      this._data = data;
      this._callback = callback;
      this._content.title = props.title ? props.title : this._default.title;
      this._content.content = props.content
        ? props.content
        : this._default.content;
      this._content.btns = props.btns ? props.btns : this._default.btns;
      this._config();
      this._$modal.modal("show");
      this._$modal.on("hidden.bs.modal", this.__onHide);
      this.focus();
    } else {
      this._showWhenReady = true;
      this._props = {
        callback: callback,
        data: data,
        props: props,
      };
    }
  },

  hide: function () {
    if (this._ready) {
      this._$modal.modal("hide");
      this._$modal.off("hidden.bs.modal", this.__onHide);
    }
  },

  focus: function () {
    if (this._ready) {
      this._$modal.focus();
    }
  },

  getValue: function () {
    return this._val;
  },
};

/* Portal Spinner //////////////////////////////////////////////////////////
* How to use
* HTML Template is within the Footer.html
// Declare the instance
const portalSpinner = new PortalSpinner();
// Show and hide
portalSpinner.show();
portalSpinner.hide();
*/
portal_common.PortalSpinner = function () {
  var self = this;
  var loaded = function () {
    console.log("loaded", this._showWhenReady);
    var $el = $("[portal-spinner]");
    if ($el.length > 0) {
      self.init($el);
    }
  };
  if (
    document.readyState !== "complete" &&
    document.readyState !== "interactive"
  ) {
    document.addEventListener("DOMContentLoaded", () => {
      loaded();
    });
  } else {
    loaded();
  }
};
portal_common.PortalSpinner.prototype = {
  init: function ($el) {
    this._props;
    this._isOpen = false;
    this.__hideComplete = (e) => this._hideComplete(e);
    this._$el = $el;
    this._$text = $(".portal-spinner-text", this._$el);
    this._ready = true;
    this._focusRestrict();
    if (this._showWhenReady) {
      this.show(this._props);
    }
    this._showWhenReady = false;
  },

  show: function (props) {
    this._props = props;
    console.log("ready", this._ready);
    if (this._ready) {
      if (!this._isOpen) {
        this._isOpen = true;
        if (props && props.blur) {
          $(document.body).addClass("blur-content");
        }
        $(document.html).addClass("no-scroll");
        this._lastFocus = document.activeElement;
        this._$el.attr("tabindex", 0);
        this._$el[0].focus();
        this._$el.fadeIn();
        this._$el.addClass("is-active");
      }
    } else {
      this._showWhenReady = true;
    }
  },

  hide: function () {
    this._isOpen = false;
    if (this._ready) {
      this._$el.fadeOut(this.__hideComplete);
      if (this._lastFocus) {
        this._lastFocus.focus();
      }
      if ($(document.body).hasClass("blur-content")) {
        $(document.body).removeClass("blur-content");
      }
    }
  },

  _hideComplete: function () {
    $(document.html).removeClass("no-scroll");
    this._$el.removeClass("is-active");
  },

  _focusRestrict: function (e) {
    document.addEventListener(
      "focus",
      function (e) {
        if (this._isOpen && !$el[0].contains(e.target)) {
          e.stopPropagation();
          $el[0].focus();
        }
      },
      true
    );
  },
};
