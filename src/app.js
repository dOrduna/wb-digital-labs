import {VDOM} from "./vdom/vdom";
import {JsonPlaceholderService} from "./api/json-placeholder-service";
import {ModalWindow} from "./utils/modal-window";
const vdom = new VDOM();
const modalWindow = new ModalWindow();
const jsonPlaceholderService = new JsonPlaceholderService();

const lap = (label, lapRecord) => {
  const start = new Date().getTime();
  return () => {
    const elapsedTime = new Date().getTime() - start;

    if (lapRecord) {
      lapRecord.push(elapsedTime);
    }

    console.log(label, 'took', elapsedTime, 'ms')
  }
};

const noPhotosMessage = "Something's not right, we couldn't retrieve the photos. Please try again.";

export class App {
  constructor() {
    this.renderLapTimes = [];
    this.virtualDomRenderLapTimes = [];

    $(document).ready( () =>  {
       setTimeout (() =>{
         this.run();
        }, 0)
     });
  }

  run() {
    this.$buttonBar = $("[data-role='button-bar']");
    this.$buttonBar.on("click", "button", this.onButtonClick.bind(this));
    this.toggleButtonState();
  }

  renderPhotos(photos) {
    this.dataLap();

    if (photos == null || photos.length === 0) {
      modalWindow.showMessage(noPhotosMessage);
      return;
    }

    this.renderPhotosLap = lap("renderPhotos", this.renderLapTimes);
    document.getElementById('app').innerHTML =
      $('<div class="container">').append(
        photos.map(
          _ => `<div class="card"><img src="${_.url}"></div>`)).html();

    this.onRenderFinished();
  }

  renderPhotosUsingVdom(photos) {
    this.dataLap();

    if (photos == null || photos.length === 0) {
      modalWindow.showMessage(noPhotosMessage);
      return;
    }

    this.renderPhotosLap = lap("renderPhotosVDOM", this.virtualDomRenderLapTimes);
    const vApp = vdom.createElement("div", {
      attrs: {
        id: "app"
      },
      children: [
        vdom.createElement("div", {
          attrs: {
            class: "container"
          },
          children: photos.map((_) => {
            return vdom.createElement('div', {
              attrs: {
                class: "card"
              },
              children: [
                vdom.createElement('img', {
                  attrs: {
                    src: _.url,
                  }
                })
              ]
            });
          })
        })
      ]
    });

    vdom.mount(vdom.render(vApp), document.getElementById('app'));

    this.onRenderFinished();
  }

  onButtonClick (e) {
    if (!e) {
      return;
    }

    let renderFn;
    const $app = $("#app");

    switch ($(e.target).attr("data-action")) {
      case "clear": {
        $app.empty();
        this.toggleButtonState();
        return;
      }
      case "render": {
        renderFn = this.renderPhotos.bind(this);
        break;
      }
      case "vdom-render": {
        renderFn = this.renderPhotosUsingVdom.bind(this);
        break;
      }
    }

    this.dataLap = lap("data");
    // jsonPlaceholderService.fetchTestPhotos(renderFn);
    jsonPlaceholderService.fetchPhotos(renderFn);
  }

  toggleButtonState() {
    const $app = $("#app");

    $("[data-action='clear']").prop("disabled", $app.children().length === 0);
  }

  onRenderFinished() {
    this.renderPhotosLap();
    this.toggleButtonState();
    modalWindow.showScore({
      renders: this.renderLapTimes,
      vDomRenders: this.virtualDomRenderLapTimes
    });
  }

}