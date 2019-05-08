const size = {
  contentMargin: "20px auto 30px",
  maxWidth: "1200px",
  minWidth: "1200px",
  basictTradePageMaxWidth: "1260px",
  basictTradePageMinWidth: "1260px",
  fontSizeSm: "12px",
  fontSizeMd: "14px",
  fontSizeLg: "16px",
  fontSizeXl: "18px",
  fontSizeXxl: "20px",
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700
}

const color = {
  bg: "#FBFBFB",
  crosshair: "#888888",
  short: "#ea0070",
  shortFill: "#ea0070",
  long: "#70a800",
  longFill: "#70a800",
  cta: "#FBFBFB",
  ctaHighlight: "#F5F5F5",
  alert: "#FFD506",
  category: "light",
  grid: "#E6E6E6",
  lineColor: "#555",
  textColor: "#999",
  maLine: "#f0b90b",
  ma1: "#ffc200",
  ma2: "#6600cc",
  ma3: "#cc0066"
}

export const theme = Object.assign({}, size ,{
  mode: "LIGHT",
  headerBg: "#12161C",
  fiatPriceColor: "#333333",
  TxHashColor: "#212833",
  CheckBoxLabelColor: "#848E9C",
  thColor: "#848E9C",
  qrcodeBg: "#fff",
  exchangeTitleColor: "#848e9c",
  headerDropdownBg: "#252D38",
  dropdownBg: "#fff",
  dropdownSelectBgColor: "rgba(234, 236, 239, 0.2)",
  dropdownSelectItemColor: "#848E9C",
  dropdownTextDisplayColor: "#fff",
  popupBg: "#fff",
  bg1: "#fff",
  bg2: "#fff",
  inputBgColor: "#fff",
  inputColor: "#212833",
  borderColor: "#DFE2E7",
  selcetItemColor: "#DFE2E7",
  calendarButtonEnable: "#212833",
  calendarButtonDisable: "#848E9C",
  greyBg: "#f7f7f7",
  border: "#e6e6e6",
  border1: "#d4d4d4",
  activeBorder: "#f3ba2f",
  boxShadow: "0px 3px 20px 0px rgba(90,102,124,0.2)",
  toolTipBoxShadow: "0 0 12px rgba(0,0,0,.175)",
  activeBg: "#fff9e7",
  boxheadbg: "#f7f7f7",
  tableRowBg: "#fafafa",
  tabBorderColor: "#ddd",
  tabBg: "#fff",
  buttonbg: "#fff",
  chartbuttonbg: "#e6e6e6",
  buttonbgactive: "#f0b90b",
  buttonbgdisabled: "#ddd",
  buttonColorActive: "#f0b90b",
  okButtonBg: "#f0b90b",
  cancelButtonBg: "#fff",
  up: "#70a800",
  down: "#ea0070",
  shallowDigitOpacity: .45,
  highlight: "#f0b90b",
  chartTheme: "chart-white2",
  depthTheme: "depth-white",
  chartDropdownSeparator: "#f4f4f4",
  fontColor: "#48515d",
  fontColor2: "#555",
  fontColor3: "#666",
  fontColor4: "#999",
  fontColor5: "#ccc",
  fontColor6: "#fff",
  formsbg: "#f7f7f7",
  inputBorder: "#e2e2e2",
  formsHeaderbg: "transparent",
  inputBg: "#fff",
  heading: "#262d33",
  tableRowHoverBg: "rgba(253,247,236,1)",
  miniSymbolsTabActive: "rgba(253, 242, 216, 0.75)",
  loadingShadeColor: "rgba(255,255,255,0.3)",
  errorInputBg: "#f7dee0",
  errorInputBorderColor: "#ef4b5a",
  tooltipBg: "#fff",
  counterColor: "#f5bc00",
  bnbBurning: "#e8b342",
  bnbBurnClose: "#aaa",
  buttonPrimaryColor: "#F0B90B",
  xfersLogoBoxBg: "#23448E",
  lineColor: "#f0f0f0",
})

export const zIndex = {
  negitive: -1,
  zeroIndex: 0,
  normalZIndex: 100,
  inputLabel: 100,
  textContent: 100,
  input: 300,
  inputUnit: 600,
  fixedTableHeader: 700,
  filter: 800,
  fixedTab: 900,
  placeOrder: 900,
  placeOrderWidth: 1e3,
  dropdown: 1e3,
  calendar: 1e3,
  shade: 1e3,
  footer: 1e3,
  tradeOrders: 1e3,
  tradePair: 1e3,
  header: 1100,
  modal: 1100,
  loading: 1100,
  fullScreen: 1100,
  routeLoading: 1200
}