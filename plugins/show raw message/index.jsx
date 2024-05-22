const {
    util: { getFiber, reactFiberWalker },
    flux: { dispatcher, stores },
    observeDom: observeDom,
    ui: {
      Button,
      openModal,
      ModalBody,
      ModalFooter,
      ModalRoot,
      ModalHeader,
      ModalSizes,
    },
  } = shelter;
  
  dispatcher.subscribe("CONTEXT_MENU_OPEN", handler);
  
  function handler(dispatch) {
    const unObserve = observeDom("[id^=message-copy-link]", (elem) => {
      const messageId = reactFiberWalker(getFiber(elem), "message", true)
        .pendingProps.message.id;
      elem.insertAdjacentElement(
        "afterend",
        <Button
          size={"MEDIUM"}
          onClick={clicked.bind(null, getMessageObject(messageId))}
        >
          show raw message object
        </Button>
      );
      unObserve();
    });
    setTimeout(unObserve, 500);
  }
  
  function clicked(a) {
    const remove = openModal((p) => (
      <ModalRoot size={ModalSizes.SMALL}>
        <code style={{ overflowX: "scroll", overflowY: "scroll" }}>
          {JSON.stringify(a, null, 2)}
        </code>
      </ModalRoot>
    ));
  
    dispatcher.dispatch({ type: "CONTEXT_MENU_CLOSE" });
  }
  
  function getMessageObject(messageId) {
    const fluxMessages = stores.MessageStore.getMessages(
      stores.SelectedChannelStore.getChannelId()
    );
    return fluxMessages._map[messageId];
  }
  
  export function onUnload() {
    dispatcher.unsubscribe("CONTEXT_MENU_OPEN", handler);
  }
  