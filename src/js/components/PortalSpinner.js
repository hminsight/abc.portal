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
