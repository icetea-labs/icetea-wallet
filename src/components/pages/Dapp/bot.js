import Vue from 'vue';
import BotUI from 'botui';
import tweb3 from '../../../service/tweb3';

const initWeb3 = (privateKey, showAlert = false) => {
  try {
    const resp = tweb3.wallet.importAccount(privateKey);
    // var resp = tweb3.wallet.loadFromStorage('123')
    // if (resp === 0) {
    //   window.alert('Wallet empty! Please go to Wallet tab to create account.')
    //   return
    // }
    // console.log('--',resp);
    // byId('address').textContent = tweb3.wallet.defaultAccount;
    return true;
  } catch (error) {
    console.error(error);
    const err = 'Please go to Wallet tab to create or import one first.';
    byId('address').textContent = err;
    showAlert && window.alert(err);
    return false;
  }
};
let web3Inited; //= initWeb3(false)

const queue = [];

let botui = null;

const say = (text, options) => {
  botui.message.add(Object.assign({ content: String(text) }, options || {}));
};

const sayButton = action => {
  if (!Array.isArray(action)) {
    action = [action];
  }
  return botui.action.button({ action });
};

const saySelect = action => {
  return botui.action.select({ action });
};

const speak = items => {
  if (!items) return;
  if (!Array.isArray(items)) {
    items = [items];
  }
  if (!items.length) return;

  return items.reduce((prev, item) => {
    if (typeof item === 'string') {
      return say(item);
    }

    item.type = item.type || 'text';
    switch (item.type) {
      case 'text':
      case 'html':
        return botui.message.add(item);
      case 'input':
        return botui.action.text({
          action: item.content,
        });
      case 'button':
        return sayButton(item.content);
      case 'select':
        return saySelect(item.content);
    }
  }, undefined);
};

function byId(id) {
  return document.getElementById(id);
}

// function json (o) {
//   try {
//     return JSON.stringify(o)
//   } catch (e) {
//     return String(o)
//   }
// }

function fmtNum(n) {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 9,
  });
}

function confirmTransfer(amount) {
  say(`ATTENTION: you are about to transfer <b>${fmtNum(amount)}</b> TEA to this bot.`, {
    type: 'html',
    cssClass: 'bot-intro',
  });
  return sayButton([{ text: "Let's transfer", value: 'transfer' }, { text: 'No way', value: 'no' }]).then(
    result => result && result.value === 'transfer'
  );
}

async function callContract(method, type, value, ...params) {
  const map = {
    none: 'callPure',
    read: 'call',
    write: 'sendCommit',
  };

  const result = await method(...params)[map[type]]({ value });

  if (type === 'write') {
    return result.result;
  }
  return result;
}

async function getBotInfoFromStore(alias) {
  try {
    return await tweb3.contract('system.botstore').methods.query(alias);
  } catch {
    return {};
  }
}

async function getBotInfoFromBot(alias) {
  try {
    return await tweb3
      .contract(alias)
      .methods.botInfo()
      .callPure();
  } catch {
    return {};
  }
}

async function getBotInfo(alias) {
  return Object.assign(await getBotInfoFromBot(alias), await getBotInfoFromStore(alias));
}

function setCommands(commands, defStateAccess) {
  const t = byId('bot-menu-items');
  t.innerHTML = '';
  commands.forEach(c => {
    const a = document.createElement('A');
    a.href = '#';
    a.setAttribute('data-value', c.value);
    a.textContent = c.text || c.value;
    t.appendChild(a);
    a.onclick = function() {
      // closeNav();
      say(c.text || c.value, { human: true });
      pushToQueue('command', c, c.stateAccess || defStateAccess);
    };
  });
}

function pushToQueue(type, content, stateAccess, transferValue, sendback) {
  if (content.value.indexOf(':') > 0) {
    const parts = content.value.split(':', 2);
    type = parts[0];
    content.value = parts[1];
  }
  queue.push({
    type,
    content,
    transferValue,
    sendback,
    stateAccess,
  });
}

// eslint-disable-next-line import/prefer-default-export
export async function connectBot(botAddr, privateKey) {
  if (!web3Inited) {
    web3Inited = initWeb3(privateKey);
  }
  if (!web3Inited) return;

  // if (!botAddr) botAddr = byId('bot_address').value.trim()
  const contract = tweb3.contract(botAddr);

  // get bot info
  // const botInfo = await contract.methods.botInfo().callPure();
  const botInfo = await getBotInfo(botAddr);
  const commands = botInfo.commands || [
    {
      text: 'Start',
      value: 'start',
      stateAccess: 'none',
    },
  ];

  if (!botInfo.stateAccess) {
    const meta = await tweb3.getMetadata(botAddr);
    if (meta && meta.oncommand && meta.oncommand.decorators && meta.oncommand.decorators.length > 0) {
      const deco = meta.oncommand.decorators[0];
      if (deco === 'transaction' || deco === 'payable') {
        botInfo.stateAccess = 'write';
      } else if (deco === 'pure') {
        botInfo.stateAccess = 'none';
      } else {
        botInfo.stateAccess = 'read';
      }
    } else {
      botInfo.stateAccess = 'read';
    }
  } else if (!['read', 'write', 'none'].includes(botInfo.stateAccess)) {
    botInfo.stateAccess = 'read';
  }

  botui = BotUI('my-botui-app', {
    vue: Vue,
  });

  // eslint-disable-next-line no-unused-expressions
  !botInfo.name && (botInfo.name = botAddr);
  // eslint-disable-next-line no-unused-expressions
  !botInfo.description && (botInfo.description = 'N/A');

  botui.message.removeAll();

  setCommands(commands, botInfo.stateAccess);

  // display bot info
  await say(`<b>${botInfo.name}</b><br>${botInfo.description}`, {
    type: 'html',
    cssClass: 'bot-intro',
  });

  // display Start button
  let result = await sayButton({ text: botInfo.start_button || 'Start', value: 'start' });
  let callResult;
  let isFirst = true;
  while (result && result.value) {
    let transferValue = 0;
    if (callResult && callResult.options && callResult.options.value) {
      const ok = await confirmTransfer(callResult.options.value); // should confirm at wallet level
      if (!ok) {
        say('Transfer canceled. You could reconnect to this bot to start a new conversation.');
        return;
      }
      transferValue = callResult.options.value;
    }

    // send lastValue to bot
    callResult = isFirst
      ? await callContract(contract.methods.onstart, botInfo.state_access, 0)
      : await callContract(contract.methods.ontext, botInfo.state_access, transferValue, result.value);
    isFirst = false;

    console.log(callResult);
    if (callResult) {
      result = await speak(callResult.messages || callResult);
      console.log(result);
    } else {
      result = undefined;
    }
  }
}
