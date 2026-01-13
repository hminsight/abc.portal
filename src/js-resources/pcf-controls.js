/*! Copyright (C) Microsoft Corporation. All rights reserved. */
var pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad;
!(function () {
  "use strict";
  var e = {
      d: function (t, o) {
        for (var n in o)
          e.o(o, n) &&
            !e.o(t, n) &&
            Object.defineProperty(t, n, {
              enumerable: !0,
              get: o[n],
            });
      },
      o: function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      },
      r: function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module",
          }),
          Object.defineProperty(e, "__esModule", {
            value: !0,
          });
      },
    },
    t = {};
  e.r(t),
    e.d(t, {
      ToggleControl: function () {
        return c;
      },
    });
  var o,
    n = React,
    i = FluentUIReact,
    r =
      ((o = function (e, t) {
        return (
          (o =
            Object.setPrototypeOf ||
            ({
              __proto__: [],
            } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var o in t)
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            }),
          o(e, t)
        );
      }),
      function (e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Class extends value " + String(t) + " is not a constructor or null"
          );
        function n() {
          this.constructor = e;
        }
        o(e, t),
          (e.prototype =
            null === t
              ? Object.create(t)
              : ((n.prototype = t.prototype), new n()));
      }),
    a = (function (e) {
      function t(t) {
        var o = e.call(this, t) || this;
        return (
          (o._toggleRef = function (e) {
            o._toggle = e;
          }),
          o
        );
      }
      return (
        r(t, e),
        (t.prototype.componentDidMount = function () {
          this.props.shouldFocus && this._toggle.focus();
        }),
        (t.prototype.render = function () {
          var e = this.props,
            t = e.onText,
            o = e.offText,
            r = e.checked,
            a = e.disabled,
            l = e.onChange,
            s = e.styles,
            c = e.ariaLabel;
          return n.createElement(i.Toggle, {
            onText: t,
            offText: o,
            checked: r,
            onChange: l,
            disabled: a,
            styles: s,
            componentRef: this._toggleRef,
            role: "switch",
            ariaLabel: c,
          });
        }),
        t
      );
    })(n.Component),
    l = (0, i.memoizeFunction)(function (e) {
      var t = e.checked,
        o = e.disabled,
        n = e.pillCheckedBackground,
        i = e.pillCheckedHoveredBackground;
      return {
        root: {
          border: "1px solid transparent",
          margin: "0px 2px",
          padding: "6px 2px 6px 2px",
        },
        pill: [
          t &&
            !o && {
              backgroundColor: n,
              selectors: {
                ":hover": {
                  backgroundColor: i,
                },
              },
            },
        ],
        text: [
          {
            fontFamily: e.normalFontFamily,
          },
          !o && {
            selectors: {
              ":hover": {
                cursor: "pointer",
              },
            },
          },
        ],
        container: {
          border: "1px solid transparent",
          width: "100%",
          minWidth: 100,
          flex: "1 1 auto",
        },
      };
    }),
    s = FluentUIReactv940,
    c = (function () {
      function e() {
        (this._checked = !1),
          (this._context = {}),
          (this._disabled = !1),
          (this._notifyOutputChanged = function () {}),
          (this._optionLabels = {}),
          (this._readable = !1),
          (this._required = !1),
          (this._shouldFocusToggleComponent = !1),
          (this._onChange = this._onChange.bind(this)),
          (this._modernOnChange = this._modernOnChange.bind(this)),
          (this._onNullValueClick = this._onNullValueClick.bind(this));
      }
      return (
        (e.prototype.init = function (e, t, o) {
          var n, i, r, a;
          (this._context = e),
            t && (this._notifyOutputChanged = t),
            (this._shouldUseModernToggle =
              !!(null ===
                (i =
                  null === (n = this._context.utils) || void 0 === n
                    ? void 0
                    : n.isFeatureEnabled) || void 0 === i
                ? void 0
                : i.call(n, "ModernToggleControl")) &&
              (null ===
                (a =
                  null === (r = this._context.appSettings) || void 0 === r
                    ? void 0
                    : r.getIsFluentThemingEnabled) || void 0 === a
                ? void 0
                : a.call(r)));
        }),
        (e.prototype.updateView = function (t) {
          return t.utils.isNullOrUndefined(t.parameters.value)
            ? null
            : ((this._context = t),
              (this._controlLabel =
                t.mode.label || t.parameters.value.attributes.DisplayName),
              (this._disabled = !this._isEnabled(t)),
              (this._optionLabels = this._getOptionLabels(
                t.parameters.value.attributes.Options
              )),
              (this._readable = this._isReadable(t)),
              (this._required = this._isRequired(t)),
              (this._ariaLabel = this._getAriaLabel()),
              (this._checked = !!t.parameters.value.raw),
              t.factory.createElement(
                "CONTAINER",
                {
                  id: e.TOGGLE_CONTAINER_ID,
                },
                this._readable
                  ? t.utils.isNullOrUndefined(t.parameters.value.raw)
                    ? this._renderNullValueComponent(t)
                    : this._renderToggleComponent(t)
                  : this._renderNoReadComponent(t)
              ));
        }),
        (e.prototype.getOutputs = function () {
          return {
            value: this._checked,
          };
        }),
        (e.prototype.getOutputSchema = function (e, t) {
          return Promise.resolve({});
        }),
        (e.prototype.destroy = function () {}),
        (e.prototype._renderNullValueComponent = function (t) {
          var o = ""
            .concat(this._ariaLabel, ": ")
            .concat(this._context.resources.getString("CC_Toggle_SelectValue"));
          return this._shouldUseModernToggle
            ? n.createElement(
                s.Button,
                {
                  appearance: "transparent",
                  "aria-label": o,
                  as: this._disabled ? "button" : null,
                  id: e.TOGGLE_BUTTON_ID,
                  onClick: !this._disabled && this._onNullValueClick,
                  style: {
                    minWidth: 0,
                    paddingBottom: 1,
                    paddingLeft: s.tokens.spacingHorizontalSNudge,
                    paddingRight: s.tokens.spacingHorizontalSNudge,
                    paddingTop: 1,
                  },
                },
                e.TOGGLE_NO_VALUE_TEXT
              )
            : t.factory.createElement(
                "BUTTON",
                {
                  id: e.TOGGLE_BUTTON_ID,
                  type: !this._disabled && "button",
                  onClick: !this._disabled && this._onNullValueClick,
                  style: {
                    backgroundColor: "transparent",
                    border: "none",
                  },
                  accessibilityLabel: o,
                },
                e.TOGGLE_NO_VALUE_TEXT
              );
        }),
        (e.prototype._renderNoReadComponent = function (t) {
          return this._shouldUseModernToggle
            ? n.createElement(
                s.Label,
                {
                  id: e.TOGGLE_LABEL_NO_READ_ID,
                  style: {
                    paddingBottom: 1,
                    paddingLeft: s.tokens.spacingHorizontalSNudge,
                    paddingRight: s.tokens.spacingHorizontalSNudge,
                    paddingTop: 1,
                  },
                },
                e.TOGGLE_NO_READ_TEXT
              )
            : t.factory.createElement(
                "LABEL",
                {
                  id: e.TOGGLE_LABEL_NO_READ_ID,
                  style: {
                    backgroundColor: "transparent",
                    border: "none",
                    padding: "1px 6px 1px 6px",
                  },
                  accessibilityLabel: this._ariaLabel,
                },
                e.TOGGLE_NO_READ_TEXT
              );
        }),
        (e.prototype._renderToggleComponent = function (e) {
          var t = !!e.parameters.value.raw,
            o = t ? this._optionLabels.onText : this._optionLabels.offText,
            i = "".concat(this._ariaLabel, ": ").concat(o);
          if (this._shouldUseModernToggle)
            return n.createElement(s.Switch, {
              "aria-label": i,
              checked: t,
              disabled: this._disabled,
              indicator: {
                style: {
                  lineHeight: s.tokens.lineHeightBase300,
                },
              },
              label: t ? this._optionLabels.onText : this._optionLabels.offText,
              onChange: this._modernOnChange,
            });
          var r = l({
              pillCheckedBackground:
                this._context.theming.colors.linkcolor.normal.text,
              pillCheckedHoveredBackground:
                this._context.theming.colors.linkcolor.normal.text,
              normalFontFamily: this._context.theming.normalfontfamily,
              checked: t,
              disabled: this._disabled,
            }),
            c = this._shouldFocusToggleComponent;
          return (
            (this._shouldFocusToggleComponent = !1),
            n.createElement(a, {
              onText: this._optionLabels.onText,
              offText: this._optionLabels.offText,
              checked: t,
              onChange: this._onChange,
              disabled: this._disabled,
              styles: r,
              shouldFocus: c,
              ariaLabel: i,
            })
          );
        }),
        (e.prototype._onChange = function (e, t) {
          this._onChangeHelper(t);
        }),
        (e.prototype._modernOnChange = function (e, t) {
          this._onChangeHelper(t.checked);
        }),
        (e.prototype._onChangeHelper = function (e) {
          this._context.utils.isNullOrUndefined(e) ||
            this._checked === e ||
            ((this._checked = e), this._notifyOutputChanged());
        }),
        (e.prototype._onNullValueClick = function () {
          (this._checked =
            this._context.parameters.value.attributes.DefaultValue),
            (this._shouldFocusToggleComponent = !0),
            this._notifyOutputChanged();
        }),
        (e.prototype._getOptionLabels = function (e) {
          return {
            onText: (e && e[1] && e[1].Label) || "Yes",
            offText: (e && e[0] && e[0].Label) || "No",
          };
        }),
        (e.prototype._isEnabled = function (e) {
          var t =
            e.parameters.value.security &&
            !!e.parameters.value.security.editable;
          return !(
            e.mode.isControlDisabled ||
            !t ||
            e.mode.isPreview ||
            (e.page && e.page.isPageReadOnly)
          );
        }),
        (e.prototype._isReadable = function (e) {
          return (
            e.parameters.value.security &&
            !!e.parameters.value.security.readable
          );
        }),
        (e.prototype._isRequired = function (e) {
          return (
            1 === e.parameters.value.attributes.RequiredLevel ||
            2 === e.parameters.value.attributes.RequiredLevel
          );
        }),
        (e.prototype._getAriaLabel = function () {
          if (!this._required) return this._controlLabel || "";
          var e = this._context.resources.getString("CC_Toggle_Required");
          return this._controlLabel
            ? "".concat(this._controlLabel, ": ").concat(e)
            : e;
        }),
        (e.TOGGLE_NO_VALUE_TEXT = "---"),
        (e.TOGGLE_NO_READ_TEXT = "***"),
        (e.TOGGLE_CONTAINER_ID = "toggle-container"),
        (e.TOGGLE_BUTTON_ID = "toggle-button"),
        (e.TOGGLE_LABEL_NO_READ_ID = "toggle-label-no-read"),
        e
      );
    })();
  pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = t;
})();
if (window.ComponentFramework && window.ComponentFramework.registerControl) {
  ComponentFramework.registerControl(
    "MscrmControls.FieldControls.ToggleControl",
    pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.ToggleControl
  );
} else {
  var MscrmControls = MscrmControls || {};
  MscrmControls.FieldControls = MscrmControls.FieldControls || {};
  MscrmControls.FieldControls.ToggleControl =
    pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.ToggleControl;
  pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = undefined;
}
