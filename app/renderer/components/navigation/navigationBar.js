/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

const React = require('react')
const Immutable = require('immutable')
const ImmutableComponent = require('./../../../../js/components/immutableComponent')

const cx = require('../../../../js/lib/classSet')
const UrlBar = require('./urlBar')
const windowActions = require('../../../../js/actions/windowActions')
const appActions = require('../../../../js/actions/appActions')
const siteTags = require('../../../../js/constants/siteTags')
const messages = require('../../../../js/constants/messages')
const settings = require('../../../../js/constants/settings')
const ipc = require('electron').ipcRenderer
const {isSourceAboutUrl, getBaseUrl} = require('../../../../js/lib/appUrlUtil')
const AddEditBookmarkHanger = require('../addEditBookmarkHanger')
const siteUtil = require('../../../../js/state/siteUtil')
const eventUtil = require('../../../../js/lib/eventUtil')
const UrlUtil = require('../../../../js/lib/urlutil')
const getSetting = require('../../../../js/settings').getSetting
const windowStore = require('../../../../js/stores/windowStore')
const contextMenus = require('../../../../js/contextMenus')
const LongPressButton = require('./../../../../js/components/longPressButton')
const PublisherToggle = require('../publisherToggle')

class NavigationBar extends ImmutableComponent {
  constructor () {
    super()
    this.onToggleBookmark = this.onToggleBookmark.bind(this)
    this.onStop = this.onStop.bind(this)
    this.onReload = this.onReload.bind(this)
    this.onHome = this.onHome.bind(this)
    this.onReloadLongPress = this.onReloadLongPress.bind(this)
  }

  get activeFrame () {
    return windowStore.getFrame(this.props.activeFrameKey)
  }

  get loading () {
    return this.props.activeFrameKey !== undefined && this.props.loading
  }

  onToggleBookmark () {
    const editing = this.bookmarked
    // show the AddEditBookmarkHanger control; saving/deleting takes place there
    let siteDetail = siteUtil.getDetailFromFrame(this.activeFrame, siteTags.BOOKMARK)
    const key = siteUtil.getSiteKey(siteDetail)

    if (key !== null) {
      siteDetail = siteDetail.set('parentFolderId', this.props.sites.getIn([key, 'parentFolderId']))
      siteDetail = siteDetail.set('customTitle', this.props.sites.getIn([key, 'customTitle']))
    }
    siteDetail = siteDetail.set('location', UrlUtil.getLocationIfPDF(siteDetail.get('location')))
    windowActions.setBookmarkDetail(siteDetail, siteDetail, null, editing, true)
  }

  onReload (e) {
    if (eventUtil.isForSecondaryAction(e)) {
      appActions.tabCloned(this.activeFrame.get('tabId'), {active: !!e.shiftKey})
    } else {
      ipc.emit(messages.SHORTCUT_ACTIVE_FRAME_RELOAD)
    }
  }

  onReloadLongPress (target) {
    contextMenus.onReloadContextMenu(target)
  }

  onHome (e) {
    const tabId = this.activeFrame.get('tabId')
    getSetting(settings.HOMEPAGE).split('|')
      .forEach((homepage, i) => {
        if (i === 0 && !eventUtil.isForSecondaryAction(e)) {
          appActions.loadURLRequested(tabId, homepage)
        } else {
          appActions.createTabRequested({
            url: homepage,
            active: false
          })
        }
      })
  }

  onStop () {
    ipc.emit(messages.SHORTCUT_ACTIVE_FRAME_STOP)
    if (this.props.navbar.getIn(['urlbar', 'focused'])) {
      windowActions.setUrlBarActive(false)
      const shouldRenderSuggestions = this.props.navbar.getIn(['urlbar', 'suggestions', 'shouldRender']) === true
      const suggestionList = this.props.navbar.getIn(['urlbar', 'suggestions', 'suggestionList'])
      if (!shouldRenderSuggestions ||
          // TODO: Once we take out suggestion generation from within URLBarSuggestions we can remove this check
          // and put it in shouldRenderUrlBarSuggestions where it belongs.  See https://github.com/brave/browser-laptop/issues/3151
          !suggestionList || suggestionList.size === 0) {
        windowActions.setUrlBarSelected(true)
      }
    }
  }

  get bookmarked () {
    return this.props.activeFrameKey !== undefined &&
      siteUtil.isSiteBookmarked(this.props.sites, Immutable.fromJS({
        location: this.props.location,
        partitionNumber: this.props.partitionNumber
      }))
  }

  get titleMode () {
    return this.props.activeTabShowingMessageBox ||
      (
        this.props.mouseInTitlebar === false &&
        !this.props.bookmarkDetail &&
        this.props.title &&
        !['about:blank', 'about:newtab'].includes(this.props.location) &&
        !this.loading &&
        !this.props.navbar.getIn(['urlbar', 'focused']) &&
        !this.props.navbar.getIn(['urlbar', 'active']) &&
        getSetting(settings.DISABLE_TITLE_MODE) === false
      )
  }

  get locationId () {
    return getBaseUrl(this.props.location)
  }

  get publisherId () {
    return this.props.locationInfo && this.props.locationInfo.getIn([this.locationId, 'publisher'])
  }

  get visiblePublisher () {
    const hostPattern = UrlUtil.getHostPattern(this.publisherId)
    const hostSettings = this.props.siteSettings.get(hostPattern)
    const ledgerPaymentsShown = hostSettings && hostSettings.get('ledgerPaymentsShown')
    return typeof ledgerPaymentsShown === 'boolean'
      ? ledgerPaymentsShown
      : true
  }

  get isPublisherButtonEnabled () {
    return getSetting(settings.PAYMENTS_ENABLED) &&
      UrlUtil.isHttpOrHttps(this.props.location) &&
      this.visiblePublisher
  }

  componentDidMount () {
    ipc.on(messages.SHORTCUT_ACTIVE_FRAME_BOOKMARK, () => this.onToggleBookmark())
    ipc.on(messages.SHORTCUT_ACTIVE_FRAME_REMOVE_BOOKMARK, () => this.onToggleBookmark())
  }

  render () {
    if (this.props.activeFrameKey === undefined ||
        this.props.siteSettings === undefined) {
      return null
    }

    return <div id='navigator'
      ref='navigator'
      data-frame-key={this.props.activeFrameKey}
      className={cx({
        titleMode: this.titleMode
      })}>
      {
        this.props.bookmarkDetail && this.props.bookmarkDetail.get('isBookmarkHanger')
        ? <AddEditBookmarkHanger sites={this.props.sites}
          currentDetail={this.props.bookmarkDetail.get('currentDetail')}
          originalDetail={this.props.bookmarkDetail.get('originalDetail')}
          destinationDetail={this.props.bookmarkDetail.get('destinationDetail')}
          shouldShowLocation={this.props.bookmarkDetail.get('shouldShowLocation')}
          withHomeButton={getSetting(settings.SHOW_HOME_BUTTON)}
          />
        : null
      }
      {
        this.titleMode
        ? null
        : this.loading
          ? <span className='navigationButtonContainer'>
            <button data-l10n-id='stopButton'
              className='navigationButton stopButton'
              onClick={this.onStop} />
          </span>
          : <span className='navigationButtonContainer'>
            <LongPressButton
              l10nId='reloadButton'
              className='navigationButton reloadButton'
              onClick={this.onReload}
              onLongPress={this.onReloadLongPress} />
          </span>
      }
      {
        !this.titleMode && getSetting(settings.SHOW_HOME_BUTTON)
        ? <span className='navigationButtonContainer'>
          <button data-l10n-id='homeButton'
            className='navigationButton homeButton'
            onClick={this.onHome} />
        </span>
        : null
      }
      <div className='startButtons'>
        {
          !this.titleMode
          ? <span className='bookmarkButtonContainer'>
            <button data-l10n-id={this.bookmarked ? 'removeBookmarkButton' : 'addBookmarkButton'}
              className={cx({
                navigationButton: true,
                bookmarkButton: true,
                removeBookmarkButton: this.bookmarked,
                withHomeButton: getSetting(settings.SHOW_HOME_BUTTON)
              })}
              onClick={this.onToggleBookmark} />
          </span>
          : null
        }
      </div>
      <UrlBar ref='urlBar'
        activeFrameKey={this.props.activeFrameKey}
        canGoForward={this.props.canGoForward}
        searchDetail={this.props.searchDetail}
        loading={this.loading}
        location={this.props.location}
        title={this.props.title}
        history={this.props.history}
        isSecure={this.props.isSecure}
        hasLocationValueSuffix={this.props.hasLocationValueSuffix}
        startLoadTime={this.props.startLoadTime}
        endLoadTime={this.props.endLoadTime}
        titleMode={this.titleMode}
        urlbar={this.props.navbar.get('urlbar')}
        onStop={this.onStop}
        menubarVisible={this.props.menubarVisible}
        noBorderRadius={this.isPublisherButtonEnabled}
        activeTabShowingMessageBox={this.props.activeTabShowingMessageBox}
        enableNoScript={this.props.enableNoScript}
        scriptsBlocked={this.props.scriptsBlocked}
        />
      {
        isSourceAboutUrl(this.props.location)
        ? <div className='endButtons'>
          <span className='browserButton' />
        </div>
        : <div className='endButtons'>
          {
            <PublisherToggle
              location={this.props.location}
              locationInfo={this.props.locationInfo}
              siteSettings={this.props.siteSettings}
              synopsis={this.props.synopsis}
            />
          }
        </div>
      }
    </div>
  }
}

module.exports = NavigationBar
