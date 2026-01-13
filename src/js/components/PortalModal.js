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
