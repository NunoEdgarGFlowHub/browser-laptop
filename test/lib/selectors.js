module.exports = {
  minimizeButton: '.min-btn',
  maximizeButton: '.max-btn',
  closeButton: '.close-btn',
  urlInput: '#urlInput',
  activeWebview: '.frameWrapper.isActive webview',
  activeTab: '[data-test-active-tab]',
  activeTabTitle: '[data-test-active-tab] [data-test-id="tabTitle"]',
  activeTabFavicon: '[data-test-active-tab] [data-test-favicon]',
  pinnedTabsTabs: '.pinnedTabs [data-test-id="tab"]',
  tabsTabs: '.tabs [data-test-id="tab"]',
  navigator: '#navigator',
  navigatorLoadTime: '#navigator .loadTime',
  newFrameButton: '.tabs .newFrameButton',
  tabPage: '.tabPage',
  tabPage1: '[data-tab-page="0"]',
  tabPage2: '[data-tab-page="1"]',
  closeTab: '[data-test-id="closeTabIcon"]',
  urlbarIcon: '.urlbarIcon',
  urlBarSuggestions: '.urlBarSuggestions',
  titleBar: '#titleBar',
  navigatorBookmarked: '#navigator .removeBookmarkButton',
  navigatorNotBookmarked: '#navigator .bookmarkButton',
  bookmarksToolbar: '[data-test-id="bookmarksToolbar"]',
  notificationBar: '[data-test-id="notificationBar"]',
  errorContent: '.errorContent',
  errorUrl: '.errorUrl',
  errorText: '.errorText',
  findBar: '.findBar',
  findBarInput: '.searchStringContainer input',
  findBarMatches: '.foundResults',
  findBarMatchCase: '#caseSensitivityCheckbox',
  findBarNextButton: '.findButton.findNext',
  findBarPrevButton: '.findButton.findPrev',
  findBarClearButton: '.findClear',
  braveMenu: '.braveMenu:not(.braveShieldsDisabled)',
  braveMenuDisabled: '.braveMenu.braveShieldsDisabled',
  adsBlockedStat: '.braveryStat.adsBlockedStat',
  adsBlockedControl: '[data-test-id="adsBlockedControl"]',
  showAdsOption: '[data-l10n-id="allowAdsAndTracking"]',
  blockAdsOption: '[data-l10n-id="blockAds"]',
  cookieControl: '[data-test-id="cookieControl"]',
  allowAllCookiesOption: '[data-l10n-id="allowAllCookies"]',
  blockAllCookiesOption: '[data-l10n-id="blockAllCookies"]',
  braveryPanel: '.braveryPanel',
  httpsEverywhereStat: '.braveryStat.redirectedResourcesStat',
  httpsEverywhereSwitch: '.httpsEverywhereSwitch .switchMiddle',
  noScriptStat: '.braveryStat.noScriptStat',
  fpStat: '.braveryStat.fpStat',
  fpSwitch: '.fingerprintingProtectionSwitch .switchMiddle',
  noScriptSwitch: '.noScriptSwitch .switchMiddle',
  noScriptNavButton: '#navigator .noScript',
  noScriptInfo: '.noScriptInfo',
  noScriptAllowTempButton: '[data-l10n-id="allowScriptsTemp"]',
  noScriptAllowOnceButton: '[data-l10n-id="allowScriptsOnce"]',
  noScriptAllowButton: '[data-l10n-id="allowScripts"]',
  safeBrowsingSwitch: '.safeBrowsingSwitch .switchMiddle',
  backButton: '.backforward .backButton',
  forwardButton: '.backforward .forwardButton',
  reloadButton: '.reloadButton',
  clearBrowsingDataPanel: '.clearBrowsingDataPanel',
  clearBrowsingDataButton: '.clearBrowsingDataButton',
  clearDataButton: '.clearDataButton',
  securityTab: '[data-l10n-id="security"]',
  paymentsTab: '[data-l10n-id="payments"]',
  syncTab: '[data-l10n-id="sync"]',
  doneButton: '[data-l10n-id="done"]',
  homepageInput: '[data-l10n-id="homepageInput"]',
  syncSwitch: '.syncContainer .switchBackground',
  walletSwitch: '[data-test-id="enablePaymentsSwitch"] .switchBackground',
  addFundsButton: '[data-test2-id="addFunds"]',
  advancedSettings: '[data-l10n-id="advancedSettings"]',
  fundsSelectBox: '[data-test-id="fundsSelectBox"]',
  paymentsStatus: '[data-test-id="walletStatus"]',
  siteSettingItem: '.siteSettingItem',
  ledgerTable: '[data-test-id="ledgerTable"]',
  bitcoinDashboard: '[data-test-id="bitcoinDashboard"]',
  advancedSettingsButton: '[data-test-id="advancedSettingsButton"]',
  backupWallet: '[data-l10n-id="backupLedger"]',
  recoverWallet: '[data-l10n-id="recoverLedger"]',
  recoverWalletFromFileButton: '[data-l10n-id="recoverFromFile"]',
  recoveryOverlayOkButton: '[data-l10n-id="ok"]',
  saveWalletFile: '[data-l10n-id="saveRecoveryFile"]',
  balanceRecovered: '[data-l10n-id="balanceRecovered"]',
  balanceNotRecovered: '[data-l10n-id="ledgerRecoveryFailedMessage"]',
  modalCloseButton: 'button.close',
  coinbaseBuyButton: '[data-l10n-id="add"]',
  paymentQRCode: '[title="Brave wallet QR code"]',
  removeButton: '[data-l10n-id="remove"]',
  paymentHistoryButton: '[data-test-id="paymentHistoryButton"]',
  paymentsWelcomePage: '[data-test-id="paymentsMessage"]',
  autofillAddressPanel: '.autofillAddressPanel',
  autofillCreditCardPanel: '.autofillCreditCardPanel',
  allowRunInsecureContentButton: '[data-test-id="allowRunInsecureContentButton"]',
  dismissAllowRunInsecureContentButton: '[data-test-id="dismissAllowRunInsecureContentButton"]',
  denyRunInsecureContentButton: '[data-test-id="denyRunInsecureContentButton"]',
  dismissDenyRunInsecureContentButton: '[data-test-id="dismissDenyRunInsecureContentButton"]',
  tabsToolbar: '.tabsToolbar',
  hamburgerMenu: '.menuButton',
  contextMenu: '.contextMenu',
  okButton: '[data-l10n-id="ok"]',
  customFiltersInput: '[data-test-id="customFiltersInput"]',
  showAllLedger: '[data-l10n-id="showAll"]',
  // used by the MessageBox control
  msgBoxSuppress: '[data-test-id^="msgBoxTab_"] .switchMiddle',
  msgBoxSuppressTrue: '[data-test-id^="msgBoxTab_"] .switchMiddle .switchBackground.switchedOn',
  msgBoxMessage: '[data-test-id="msgBoxMessage"]',
  msgBoxTitle: '[data-test-id="msgBoxTitle"]'
}
