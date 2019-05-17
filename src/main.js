console.info('hi')

const expectedTextRegex = new RegExp(
  'failed. Expected:<((.|\\n)*)>. Actual:<((.|\\n)*)>. \n ',
  'm',
)

const expectedElement = document.getElementById('text_output_expected')
const actualElement = document.getElementById('text_output_actual')

function processText(textAreaElement) {
  const rawText = textAreaElement.value

  const execd = expectedTextRegex.exec(rawText) || []
  const expectedText = (execd)[1]
  const actualText = (execd)[3]
  console.info('!', {execd, expectedText, actualText})

  expectedElement.value = expectedText
  actualElement.value = actualText
}
