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
