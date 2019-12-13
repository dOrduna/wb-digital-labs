export class ModalWindow {
  constructor() {

  }

  show(content) {
    const $body = $("body");

    this.$background = $('<div class="dialog-background">');
    this.$background.css({
      backgroundColor: "#000000",
      opacity: 0.5
    });

    if (content == null) {
      return;
    }
      this.$dialog = $([
        `<div class="dialog-container">
        <div class="dialog">
            ${content}
            <p class="footer">Click anywhere to close this window.</p>     
        </div>
      </div>`
      ].join(""));

    $body.append(this.$background);
    $body.append(this.$dialog);
    $body.toggleClass('modal-open', true);

    $body.click(() => {
      this.$background.remove();
      this.$dialog.remove();
      $body.toggleClass('modal-open', false);
    });
  }

  showScore({ renders, vDomRenders }) {
    this.show([
      `<table class="table">
        <tr class="row">
          <td class="cell"><div>Normal DOM times:</div></td>
          <td class="cell"><div>Virtual DOM times:</div></td>      
        </tr>
        <tr class="row">
          <td class="cell"><ul>${renders.map(_ => `<li>${_} ms</li>`).join("")}</ul></td>
          <td class="cell"><ul>${vDomRenders.map(_ => `<li>${_} ms</li>`).join("")}</ul></td>
        </tr>
      </table>`
    ].join(""));
  }

  showMessage(message) {
    this.show([
      `<p>${message}</p>`
    ].join(""));
  }
}