export default class MCQs {
  constructor({ data }) {
    this.data = data
  }
  static get toolbox() {
    return {
      name: 'MCQs',
      icon: '<svg class="svg-icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M807.296 653.312H382.72V228.736h450.176v-51.2H357.12c-14.08 0-25.6 11.52-25.6 25.6v475.776c0 14.08 11.52 25.6 25.6 25.6h475.776c14.08 0 25.6-11.52 25.6-25.6V542.08h-51.2v111.232z"  /><path d="M257.792 393.472h-51.2v413.312c0 14.08 11.52 25.6 25.6 25.6h413.312v-51.2H257.792V393.472zM487.168 385.28l-36.224 36.224L600.448 570.88a25.3824 25.3824 0 0 0 36.096 0l263.936-263.936-36.224-36.224-245.76 245.76L487.168 385.28z"  /></svg>'
    }
  }
  render() {
    const wrapper = document.createElement('div')
    wrapper.classList.add('mcq-wrapper')

    const question = document.createElement('input')
    question.classList.add('mcq-question')
    question.placeholder = 'Enter the question....'

    const ans1 = document.createElement('input')
    ans1.classList.add('mcq-answer1')
    ans1.placeholder = 'answer 1'

    const ans2 = document.createElement('input')
    ans2.classList.add('mcq-answer2')
    ans2.placeholder = 'answer 2'

    const ans3 = document.createElement('input')
    ans3.classList.add('mcq-answer3')
    ans3.placeholder = 'answer 3'

    const ans4 = document.createElement('input')
    ans4.classList.add('mcq-answer4')
    ans4.placeholder = 'answer 4'

    const correctAnsText = document.createElement('p')
    correctAnsText.innerHTML = 'Correct Answer:'

    const correctAns = document.createElement('input')
    correctAns.classList.add('mcq-correctAns')
    correctAns.placeholder = 'Enter the correct answer'
    if (Object.keys(this.data).length !== 0) {
      question.value = this.data.question
      ans1.value = this.data?.options[0]
      ans2.value = this.data?.options[1]
      ans3.value = this.data?.options[2]
      ans4.value = this.data?.options[3]
      correctAns.value = this.data.correctAns
    }

    wrapper.appendChild(question)
    wrapper.appendChild(ans1)
    wrapper.appendChild(ans2)
    wrapper.appendChild(ans3)
    wrapper.appendChild(ans4)
    wrapper.appendChild(correctAnsText)
    wrapper.appendChild(correctAns)

    return wrapper
  }
  save(blockContent) {
    const question = blockContent.querySelector('.mcq-question').value
    const answer1 = blockContent.querySelector('.mcq-answer1').value
    const answer2 = blockContent.querySelector('.mcq-answer2').value
    const answer3 = blockContent.querySelector('.mcq-answer3').value
    const answer4 = blockContent.querySelector('.mcq-answer4').value
    const correctAns = blockContent.querySelector('.mcq-correctAns').value
    return {
      question: question,
      options: [answer1, answer2, answer3, answer4],
      correctAns: correctAns
    }
  }
}
