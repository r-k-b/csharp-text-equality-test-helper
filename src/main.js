console.info('hi')

const expectedTextRegex = new RegExp(
  'failed. Expected:<((.|\\n)*)>. Actual:<((.|\\n)*)>. \n ',
  'm',
)

const expectedElement = document.getElementById('text_output_expected')
const actualElement = document.getElementById('text_output_actual')

const sync = debounce(function _sync(bool) {
  if (bool) {
    expectedElement.scrollTop = actualElement.scrollTop
  } else {
    actualElement.scrollTop = expectedElement.scrollTop
  }
}, 20, true)

expectedElement.addEventListener('scroll', debounce(select_scroll_1, 100, false), false)
actualElement.addEventListener('scroll', debounce(select_scroll_2, 100, false), false)

function select_scroll_1() {
  console.log('s1')
  sync(false)
}

function select_scroll_2() {
  console.log('s2')
  sync(true)
}

function processText(textAreaElement) {
  const rawText = textAreaElement.value

  const results = expectedTextRegex.exec(rawText) || []
  const expectedText = results[1]
  const actualText = results[3]
  console.info('!', {results, expectedText, actualText})

  expectedElement.value = expectedText
  actualElement.value = actualText
}


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  let timeout
  return function () {
    const context = this, args = arguments
    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
