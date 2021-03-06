const tab = require('../../components/tab')
const fm = require('../../components/feeds-manager')
const extend = require('../../utils/extend')
const tap = require('../../mixins/tap')
const network = require('../../mixins/network')
const i18n = require('../../i18n/index')

const para = {count: 10}
const urls = ['/statuses/mentions', '/statuses/replies']

Page(extend({}, tap, {
  data: {
    index: 0
  },
  onLoad () {
    wx.setNavigationBarTitle({title: i18n.mentions.title})
    this.setData({i18n})
    fm.load(this, urls[this.data.index], para)
    network.listen(this)
  },
  onShow () {
    tab.updateNotis()
  },
  onPullDownRefresh () {
    fm.load(this, urls[this.data.index], para)
  },
  onReachBottom () {
    fm.loadMore(this, urls[this.data.index], para)
    tab.updateNotis()
  },
  tapIndex (e) {
    const index = e.currentTarget.dataset.index
    if (index !== this.data.index) {
      this.setData({
        feeds_arr: null,
        index
      })
      fm.load(this, urls[this.data.index], para)
    }
  },
  onTabItemTap () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  }
}))
