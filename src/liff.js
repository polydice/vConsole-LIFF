import tplTabbox from './tabbox.html';
import tplList from './list.html';

const $ = vConsole.$;
const tool = vConsole.tool;

class VConsoleLIFFTab extends vConsole.VConsolePlugin {
  constructor(...args) {
    super(...args);
  }

  onRenderTab(callback) {
    this.$tabbox = $.render(tplTabbox, {});
    callback(this.$tabbox);
  }

  onReady() {
    this.renderProfile();
  }

  onAddTool(callback) {
    let that = this;
    let toolList = [{
      name: 'Refresh',
      global: false,
      onClick: function(e) {
        that.renderProfile();
      }
    }];
    callback(toolList);
  }

  renderProfile() {
    const list = [];
  	let $log = $.one('.vc-log', this.$tabbox);
    $log.innerHTML = 'Refreshing';
    liff.init(data => {
      const profile = data.context;
      const list = Object.keys(profile).map(key => ({ name: tool.htmlEncode(key), value: tool.htmlEncode(profile[key]) }));
  		$log.innerHTML = $.render(tplList, { list: list }, true);
    }, err => {
      $log.innerHTML = err;
    });
  }
}

let tab = new VConsoleLIFFTab('liff', 'LIFF');
vConsole.addPlugin(tab);