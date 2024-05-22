(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // shltr-res-ns:solid-js/web
  var require_web = __commonJS({
    "shltr-res-ns:solid-js/web"(exports, module) {
      module.exports = shelter.solidWeb;
    }
  });

  // plugins/show raw message/index.jsx
  var show_raw_message_exports = {};
  __export(show_raw_message_exports, {
    onUnload: () => onUnload
  });
  var import_web = __toESM(require_web(), 1);
  var import_web2 = __toESM(require_web(), 1);
  var import_web3 = __toESM(require_web(), 1);
  var _tmpl$ = /* @__PURE__ */ (0, import_web.template)(`<code></code>`, 2);
  var {
    util: {
      getFiber,
      reactFiberWalker
    },
    flux: {
      dispatcher,
      stores
    },
    observeDom,
    ui: {
      Button,
      openModal,
      ModalBody,
      ModalFooter,
      ModalRoot,
      ModalHeader,
      ModalSizes
    }
  } = shelter;
  dispatcher.subscribe("CONTEXT_MENU_OPEN", handler);
  function handler(dispatch) {
    const unObserve = observeDom("[id^=message-copy-link]", (elem) => {
      const messageId = reactFiberWalker(getFiber(elem), "message", true).pendingProps.message.id;
      elem.insertAdjacentElement("afterend", (0, import_web3.createComponent)(Button, {
        size: "MEDIUM",
        get onClick() {
          return clicked.bind(null, getMessageObject(messageId));
        },
        children: "show raw message object"
      }));
      unObserve();
    });
    setTimeout(unObserve, 500);
  }
  function clicked(a) {
    const remove = openModal((p) => (0, import_web3.createComponent)(ModalRoot, {
      get size() {
        return ModalSizes.SMALL;
      },
      get children() {
        const _el$ = _tmpl$.cloneNode(true);
        _el$.style.setProperty("overflowX", "scroll");
        _el$.style.setProperty("overflowY", "scroll");
        (0, import_web2.insert)(_el$, () => JSON.stringify(a, null, 2));
        return _el$;
      }
    }));
    dispatcher.dispatch({
      type: "CONTEXT_MENU_CLOSE"
    });
  }
  function getMessageObject(messageId) {
    const fluxMessages = stores.MessageStore.getMessages(stores.SelectedChannelStore.getChannelId());
    return fluxMessages._map[messageId];
  }
  function onUnload() {
    dispatcher.unsubscribe("CONTEXT_MENU_OPEN", handler);
  }
  return __toCommonJS(show_raw_message_exports);
})();
