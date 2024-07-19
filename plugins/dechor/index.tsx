const {
  util: {
    log
  },
  ui: {
    Button,
    openModal,
    ModalBody,
    ModalFooter,
    ModalRoot,
    ModalHeader,
    ModalSizes,
  },
  observeDom,
} = shelter

log("lod")
const unObserve = observeDom("[class^=message_]", (elem) => {
  elem.insertAdjacentElement("afterbegin",
    <Button
      size={"MEDIUM"}
      onClick={() => { console.log("balls") }}
    >
      balls
    </Button>)
  unObserve()
})

export function onUnload() {
  log("gon")
  unObserve()
}