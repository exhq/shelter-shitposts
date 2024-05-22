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
  const unObserve = observeDom("[id^=user-context-user-profile]", (elem) => {
    //elem.appendChild(<h1>PENIS</h1>)
    const messageId = reactFiberWalker(getFiber(elem), "member", true)
    log(messageId)
    //   .pendingProps.message.id;
    // elem.insertAdjacentElement(
    //   "afterend",
    //   <Button
    //     size={"MEDIUM"}
    //     onClick={clicked.bind(null, getMessageObject(messageId))}
    //   >
    //     show raw message object
    //   </Button>
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


export function onUnload() {
  dispatcher.unsubscribe("CONTEXT_MENU_OPEN", handler);
}
