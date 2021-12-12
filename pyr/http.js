if (!window.browser && window.chrome) {
  window['browser'] = chrome;
}

const settings = {
  ram: {
    betstars: false
  },

  wc: {
    qa: true,
    cashier:false,
    deposit:false,
    paycallback2:true
  },

  ice: {

  }
};

function redirectURL(requestDetails) {
  let url = requestDetails.url;
  // QA cashier

  // if (url === 'https://cdn-qa.pyrsoftware.ca/wc/2.20.187/cashier.js') {
  //   return {
  //     redirectUrl: 'https://cdn-qa.pyrsoftware.ca/wc/2.20.188/cashier.js'
  //   };
  // }
  if (settings.wc.qa ) {
    let version = '2.20.1303'
    if (settings.wc.qa.paycallback2) {   
      if (url === `https://cdn-qa.pyrsoftware.ca/wc/${version}/paycallback2.js`) {
        return {
          redirectUrl: 'http://localhost:3000/cashier/scripts/paycallback2.js'
        };
      }

      if (url === `https://rc.cashier-qa.pyr/paycallback2/i18n/locales/en.js`) {
        return {
          redirectUrl: 'http://localhost:3000/cashier/i18n/locales/en.js'
        };
      }

      if (url.match(/https\:\/\/rc\.cashier\-qa\.p+yr\/paycallback2\/templates\//)) {
        let u = url.replace(/https\:\/\/rc\.cashier\-qa\.pyr\/paycallback2\/templates\//, 'http://localhost:3000/cashier/templates/');
        // let u = url.replace(/https\:\/\/rc\.cashier\-qa\.pyr\/cashier\/templates\//, 'https://localhost/wc2front/app/templates/');
        return {
          redirectUrl: u
        };
      }
    }

    if (settings.wc.qa.cashier) {
      if (url === `https://cdn-qa.pyrsoftware.ca/wc/${version}/cashier.js`) {
        return {
          redirectUrl: 'http://localhost:3000/cashier/scripts/cashier.js'
        };
      }
  
      // if (url === `https://rc.cashier-qa.pyr/cashier/i18n/locales/en.js`) { 
      if (url === `https://cdn-qa.pyrsoftware.ca/wc/${version}/i18n/locales/en.js`) {
        return {
          redirectUrl: 'http://localhost:3000/cashier/i18n/locales/en.js'
        };
      }
  
      if (url === `https://cdn-qa.pyrsoftware.ca/wc/${version}/styles/2015/cashier.css`) {
        return {
          redirectUrl: 'http://localhost:3000/cashier/styles/2015/cashier.css'
          // redirectUrl: 'https://localhost/wc2front/.tmp/styles/2015/cashier.css'
        };
      }
  
      // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
      // UNUSED ALT_1
      function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
      }
  
      // https://cdn-qa.pyrsoftware.ca/wc/${version}/images/common/logos/mobilepay.png
      // http://localhost:3000/cashier/images/common/logos/mobilepay.png

      let imagesUrl = `https://cdn-qa.pyrsoftware.ca/wc/${version}/images/`;
      // UNUSED ALT_1 BEGIN
      // let imagesUrlRegexEscaped = escapeRegExp(imagesUrl);
      // let regex = new RegExp(imagesUrlRegexEscaped, 'g');
      // UNUSED ALT_1 END
      if (url.indexOf(imagesUrl) === 0) {
        let u = url.replace(imagesUrl, 'http://localhost:3000/cashier/images/');
        return {
          redirectUrl: u
        }
      }
  
      if (url.match(/https\:\/\/rc\.cashier\-qa\.pyr\/cashier\/templates\//)) {
        let u = url.replace(/https\:\/\/rc\.cashier\-qa\.pyr\/cashier\/templates\//, 'http://localhost:3000/cashier/templates/');
        // let u = url.replace(/https\:\/\/rc\.cashier\-qa\.pyr\/cashier\/templates\//, 'https://localhost/wc2front/app/templates/');
        return {
          redirectUrl: u
        };
      }
    }

    if (settings.wc.qa.deposit) {
      if (url === `https://cdn-qa.pyrsoftware.ca/wc/${version}/deposit.js`) { //how to display?
        return {
          redirectUrl: 'http://localhost:3000/deposit/scripts/deposit.js'
        };
      }

      if (url === `https://rc.cashier-qa.pyr/deposit/i18n/locales/en.js`) { //how to display
        return {
          redirectUrl: 'http://localhost:3000/deposit/i18n/locales/en.js'
        };
      }

      if (url.match(/https\:\/\/rc\.cashier\-qa\.pyr\/deposit\/templates\//)) {
        // let u = url.replace(/https\:\/\/rc\.cashier\-qa\.pyr\/cashier\/templates\//, 'http://localhost:3000/cashier/templates/');
        let u = url.replace(/https\:\/\/rc\.cashier\-qa\.pyr\/deposit\/templates\//, 'https://localhost/wc2front/app/templates/');
        return {
          redirectUrl: u
        };
      }

      if (url.indexOf('https://localhost/wc2front/.tmp/images/') === 0) {
        let u = url.replace('https://localhost/wc2front/.tmp/images/', 'https://localhost/wc2front/app/images/');
        return {
          redirectUrl: u
        };
      }

      // https://rc.cashier-qa.pyr/deposit/templates/common/alertBox.html
      // https://rc.cashier-qa.pyr/cashier/templates/common/alertBox.html
    }
  }

  /* CDN -> CDN */
  // if (url === 'https://cashier.rationalcdn.com/ram/2.0.285/ram.js') {
  //   url = "https://cashier.rationalcdn.com/ram/2.0.304/ram.js";
  // } else {
  //   return;
  // }

  /* CDN -> local build */
  // if (url === 'https://cashier.rationalcdn.com/ram/2.0.285/ram.js') {
  //   url = "http://localhost/ramfront/dist/scripts/ram.js";
  // } else if (url === 'https://ram.qacore.pyr/i18n/locales/en.js') {
  //   url = "http://localhost/ramfront/dist/i18n/locales/en.js";
  // } else {
  //   return;
  // }

  // if (url.match(/https\:\/\/rws\.qa\.pyr\/rws\/resolverurls/)) {
  //   url = url.replace(/https\:\/\/rws\.qa\.pyr\/rws\/resolverurls/, 'http://localhost/rws/resolverurls');
  // }

  /* CDN -> local live */
  // if (url === 'https://cashier.rationalcdn.com/ram/2.0.285/ram.js') {
  //   url = "http://localhost:9000/scripts/ram.js";
  // } else if (url === 'https://ram.qacore.pyr/i18n/locales/en.js') {
  //   url = "http://localhost:9000/i18n/locales/en.js";
  // } else if (url.indexOf('https://sports.qacore.pyr/templates/') === 0) {
  //   url = url.replace('https://sports.qacore.pyr/templates/', 'http://localhost/ramfront/app/templates/');
  // } else {
  //   return;
  // }

  if (settings.ram.betstars) {
    if (url === 'https://s1.rationalcdn.com/vendors/cms/assets/common/scripts/cross-ux/ram-active.js') {
      return {
        redirectUrl: 'https://localhost/ramfront/.tmp/scripts/ram.js'
      };
    } else if (url === 'https://www.betstars.com/styles/ram.css') {
      return {
        redirectUrl: 'https://localhost/ramfront/.tmp/styles/ram.css'
      };
    } else if (url.match(/https\:\/\/www\.betstars\.com\/templates\//)) {
      return {
        redirectUrl: url.replace(/https\:\/\/www\.betstars\.com\/templates\//, 'https://localhost/ramfront/app/templates/')
      };
    } else if (url.match(/https\:\/\/ram\.betstars\.com\/i18n\/locales\//)) {
      return {
        redirectUrl: url.replace(/https\:\/\/ram\.betstars\.com\/i18n\/locales\//, 'https://localhost/ramfront/app/i18n/locales/')
      };
    }
  }

  // QA RAM
  if(settings.ram) {
    // if (requestDetails.initiator.match(/https\:\/\/ram\.qa(.*)?\.pyr/)) {
      if (url.match(/https\:\/\/ram\.qa(.*)?\.pyr\/scripts\/ram\.js/)) {
        url = "https://localhost/ramfront/.tmp/scripts/ram.js";
        return {
          redirectUrl: url
        };
      } else if (url === 'https://ram.qa.pyr/styles/ram.css') {
        url = 'https://localhost/ramfront/.tmp/styles/ram.css';
        return {
          redirectUrl: url
        };
      } else if (url.match(/https\:\/\/ram\.qa(.*)?\.pyr\/i18n\/locales\//)) {
        url = url.replace(/https\:\/\/ram\.qa(.*)?\.pyr\/i18n\/locales\//, 'https://localhost/ramfront/app/i18n/locales/');
        return {
          redirectUrl: url
        };
      } else if (url.match(/https\:\/\/ram\.qa(.*)?\.pyr\/templates\//)) {
        url = url.replace(/https\:\/\/ram\.qa(.*)?\.pyr\/templates\//, 'https://localhost/ramfront/app/templates/');
        return {
          redirectUrl: url
        };
      } else if (url.indexOf('https://localhost/ramfront/.tmp/images/') === 0) {
        let u = url.replace('https://localhost/ramfront/.tmp/images/', 'https://localhost/ramfront/app/images/');
        return {
          redirectUrl: u
        };
      } else {
        return;
      }
    // }
    // if (url.match(/https\:\/\/ram\.qa(-.*)?\.pyr\/scripts\/ram\.js/)) {
    //   console.log(url)
    //   url = "https://localhost/ramfront/.tmp/scripts/ram.js";
    //   // url = 'http://localhost:9000/scripts/ram.js'
    //   // url = 'http://localhost/ramfront/dist/scripts/ram.js'
    //   console.log(url)
    // } else if (url.match(/https\:\/\/ram\.qa(-.*)?\.pyr\/i18n\/locales\//)) {
    //   console.log(url)
    //   url = url.replace(/https\:\/\/ram\.qa(-.*)?\.pyr\/i18n\/locales\//, 'https://10.30.1.111/ram/i18n/locales/');
    //   console.log(url)
    // } else if (url === 'https://ram.qa.pyr/styles/ram.css') {
    //   console.log(url)
    //   url = 'https://10.30.1.111/ram/styles/ram.css';
    //   console.log(url)
    // } else {
    //   return;
    // }
  }
}

browser.webRequest.onBeforeRequest.addListener(
  redirectURL,
  {urls: ["<all_urls>"]},
  ["blocking"]
);
